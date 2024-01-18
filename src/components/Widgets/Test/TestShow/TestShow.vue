<template>
  <div class="TestShow"
       :style="localOptions.style">
    <q-card v-if="!answerBook.loading && answerBook.id">
      <q-card-section class="flex justify-between">
        <div>{{ answerBook.test_info.title }}</div>
      </q-card-section>
      <q-separator />
      <q-banner>
        <div class="row">
          <div class="col-md-3 col-12">
            {{ toShamsi(answerBook.attending_start_time) }}
          </div>
          <div class="col-md-3 col-12">
            {{ answerBook.test_info.test_questions_info.list.length }}
            سوال
          </div>
          <div class="col-md-3 col-12">
            {{ answerBook.test_info.duration_deadline }}
            دقیقه
          </div>
          <div class="col-md-3 col-12">
            نمره نهایی:
            {{ answerBook.total_score }}
          </div>
        </div>
      </q-banner>
      <q-list separator>
        <q-item v-for="(answerSheet, answerSheetIndex) in answerBook.answer_sheet_info.list"
                :key="answerSheetIndex"
                clickable>
          <div class="full-width">
            <div class="flex justify-end">
              <q-badge v-if="answerSheet.score !== null">
                {{ answerSheet.score }}
                از
                {{ answerSheet.test_question_info.question_info.mark }}
                نمره
              </q-badge>
              <q-badge v-else>
                {{ answerSheet.test_question_info.question_info.mark }}
                نمره
              </q-badge>
            </div>
            <div>
              <div v-html="'<span>' + (answerSheetIndex + 1) + ' - </span>' + answerSheet.test_question_info.question_info.text" />
              <q-card class="q-mt-sm">
                <q-card-section>
                  <div>
                    متن پاسخ:
                  </div>
                  <div>
                    {{ answerSheet.answer_text }}
                  </div>
                  <div v-if="answerSheet.answer_attachment">
                    <q-separator class="q-my-md" />
                    <q-btn outline
                           color="primary"
                           icon="attachment"
                           label="فایل پیوست"
                           :href="answerSheet.answer_attachment"
                           target="_blank" />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-item>
      </q-list>
      <q-separator class="q-my-lg" />
      <div class="q-pa-lg">
        <entity-show v-if="mounted"
                     ref="entityShow"
                     v-model:value="overallAnswerInput"
                     :loaded-data="answerBook"
                     :show-close-button="false"
                     :show-edit-button="false"
                     :show-expand-button="false"
                     :show-save-button="false"
                     :show-index-button="false"
                     :show-reload-button="false"
                     :default-layout="false" />
      </div>
      <template v-if="$route.query.send_objection && $route.query.send_objection.toString() === '1' && !answerBook.objection_request && answerBook.is_enabled_objecting">
        <q-separator class="q-my-xl" />
        <q-card-section>
          <entity-edit v-if="mounted"
                       ref="objectionEntityEdit"
                       v-model:value="objectionInputs"
                       title="ثبت اعتراض"
                       :api="objectionApi"
                       :loaded-data="{}"
                       :show-close-button="false"
                       :show-edit-button="false"
                       :show-expand-button="false"
                       :show-save-button="false"
                       :show-reload-button="false">
            <template #after-form-builder>
              <div class="flex justify-end q-mt-md">
                <q-btn color="primary"
                       label="ثبت اعتراض"
                       @click="sendObjection" />
              </div>
            </template>
          </entity-edit>
        </q-card-section>
      </template>
      <template v-else-if="answerBook.objection_request">
        <q-separator class="q-my-lg" />
        <q-card-section>
          <div>
            متن اعتراض:
          </div>
          <div v-html="answerBook.objection_request.toString().replace(/(?:\r\n|\r|\n)/g, '<br>')" />
        </q-card-section>
      </template>
      <template v-if="answerBook.objection_result">
        <div>
          نتیجه اعتراض:
        </div>
        <div v-html="answerBook.objection_result" />
      </template>

    </q-card>
    <div v-else>
      کمی صبر کنید...
    </div>
  </div>
</template>

<script>
import Assist from 'src/assets/js/Assist.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EntityShow, EntityEdit } from 'quasar-crud'
import { AnswerBook } from 'src/models/AnswerBook.js'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'TestShow',
  components: { EntityShow, EntityEdit },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      overallAnswerInput: [
        // { type: 'input', name: 'overall_answer_text', responseKey: 'overall_answer_text', label: 'متن پاسخ جامع', placeholder: ' ', inputType: 'textarea', col: 'col-12' },
        { type: 'file', name: 'overall_answer_attachment', responseKey: 'overall_answer_attachment', label: 'فایل پیوست جامع', placeholder: ' ', col: 'col-12' }
      ],
      questionInput: [
        { type: 'input', name: 'answer_text', responseKey: 'answer_text', label: 'متن پاسخ', placeholder: ' ', inputType: 'textarea', col: 'col-12' },
        { type: 'file', name: 'answer_attachment', responseKey: 'answer_attachment', label: 'فایل پیوست', placeholder: ' ', col: 'col-12' }
      ],
      questionInputs: [],
      objectionInputs: [
        { type: 'input', name: 'objection_request', responseKey: 'objection_request', label: 'متن اعتراض', placeholder: ' ', inputType: 'textarea', col: 'col-12' }
      ],
      objectionApi: APIGateway.answerBook.APIAdresses.submitObjectionRequest(this.$route.params.answer_book_id),
      participateType: null,
      participateTypeDialog: false,
      answerBook: new AnswerBook(),
      remainingTime: 0,
      timerInterval: null
    }
  },
  computed: {
    formattedRemainingTime () {
      const hours = Math.floor(this.remainingTime / 3600)
      const minutes = Math.floor((this.remainingTime % 3600) / 60)
      const seconds = this.remainingTime % 60

      // Add zero padding for hours, minutes, and seconds
      const formattedHours = hours.toString().padStart(2, '0')
      const formattedMinutes = minutes.toString().padStart(2, '0')
      const formattedSeconds = seconds.toString().padStart(2, '0')

      return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds
    }
  },
  mounted () {
    // this.getAnswerBook()
    this.getTestQuestions()
    this.mounted = true
  },
  methods: {
    sendObjection () {
      this.answerBook.loading = true
      this.$refs.objectionEntityEdit.editEntity(false)
        .then(() => {
          this.getTestQuestions()
        })
        .catch(() => {
          this.getTestQuestions()
        })
    },
    onAllQuestionsSending () {
      this.answerBook.loading = true
    },
    onAllQuestionsSentSuccess () {
      this.answerBook.loading = false
      this.backToClassList()
    },
    onAllQuestionsSentFailed () {
      this.answerBook.loading = false
    },
    onSingleQuestionsSending () {
      this.answerBook.loading = true
    },
    onSingleQuestionsSentSuccess () {
      this.answerBook.loading = false
      this.backToClassList()
    },
    onSingleQuestionsSentFailed () {
      this.answerBook.loading = false
    },
    toShamsi (miladi) {
      return Assist.miladiToShamsi(miladi)
    },

    startTest () {
      this.$router.push({ name: this.participateType, params: { question_id: 1 } })
    },
    getRemainingTimeInSeconds (serverTimeStr, attendingStartTimeStr, durationInMinutes) {
      // Convert the strings to Date objects
      const serverTime = new Date(serverTimeStr)
      const attendingStartTime = new Date(attendingStartTimeStr)

      // Calculate the difference in milliseconds
      const timeDiffInMilliseconds = serverTime - attendingStartTime

      // Convert the difference to seconds
      const timeDiffInSeconds = timeDiffInMilliseconds / 1000

      // Calculate the remaining time in seconds considering the duration
      return (durationInMinutes * 60) - timeDiffInSeconds
    },
    backToClassList () {
      // this.$router.push({ name: 'UserPanel.Profile.AllClassrooms' })
    },
    getAnswerBook () {
      this.answerBook.loading = true
      APIGateway.answerBook.get(this.$route.params.answer_book_id)
        .then((answerBook) => {
          this.answerBook = new AnswerBook(answerBook)
          this.answerBook.loading = false
        })
        .catch(() => {
          this.answerBook.loading = false
          this.backToClassList()
        })
    },
    getTestQuestions () {
      this.answerBook.loading = true
      APIGateway.answerBook.getTestQuestions(this.$route.params.answer_book_id)
        .then((answerBook) => {
          this.answerBook = new AnswerBook(answerBook)
          this.answerBook.loading = false
          this.answerBook.answer_sheet_info.list.forEach(() => {
            this.questionInputs.push(this.questionInput)
          })
          this.remainingTime = this.getRemainingTimeInSeconds(this.answerBook.server_time, this.answerBook.attending_start_time, this.answerBook.duration)
          FormBuilderAssist.setAttributeByName(this.objectionInputs, 'objection_request', 'value', this.answerBook.objection_request)
        })
        .catch(() => {
          this.answerBook.loading = false
          this.backToClassList()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.TestShow {
  :deep(.q-banner) {
    background: #FCF9F4 0 0 no-repeat padding-box;
    padding: 20px;
    .q-banner__content {
      font-size: 16px;
      font-weight: normal;
    }
  }
  :deep(.q-list) {
    .q-item {
      .q-item__section {
        display: inline-block;
        .entity-crud-formBuilder {
          margin-top: 8px;
          .outsideLabel {
            margin-bottom: 8px;
          }
        }
      }
      .q-badge {
        background: #ACBCAE 0 0 no-repeat padding-box;
        border-radius: 18px;
        height: 32px;
        padding: 4px 16px;
      }
    }
  }
}
</style>
