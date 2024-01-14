<template>
  <div class="AdminAnswerBookShow"
       :style="localOptions.style">
    <q-card v-if="!answerBook.loading && answerBook.id">
      <q-card-section class="flex justify-between">
        <div>{{ answerBook.test_info.title }}</div>
      </q-card-section>
      <q-separator />
      <q-banner>
        <div class="row">
          <div class="col-md-6 col-12">
            وضعیت آزمون:
            {{ answerBook.status_info.label }}
          </div>
          <div v-if="answerBook.grader_info"
               class="col-md-6 col-12">
            مصحح:
            {{ answerBook.grader_info.firstname }}
            {{ answerBook.grader_info.lastname }}
            (کدملی: {{ answerBook.grader_info.national_code }})
          </div>
        </div>
      </q-banner>
      <q-separator />
      <q-banner>
        <div class="row">
          <div class="col-md-4 col-12">
            زمان شروع:
            {{ toShamsi(answerBook.attending_start_time) }}
          </div>
          <div class="col-md-4 col-12">
            {{ answerBook.owner_info.firstname }}
            {{ answerBook.owner_info.lastname }}
            (کدملی: {{ answerBook.owner_info.national_code }})
          </div>
          <div class="col-md-4 col-12">
            نمره نهایی
            <template v-if="answerBook.status === 'GRADING'">
              {{ totalScore }}
            </template>
            <template v-else>
              {{ answerBook.total_score }}
            </template>
          </div>
        </div>
      </q-banner>
      <q-list separator>
        <q-item v-for="(answerSheet, answerSheetIndex) in answerBook.answer_sheet_info.list"
                :key="answerSheetIndex"
                clickable>
          <div class="row full-width q-col-gutter-md">
            <div class="col-md-10 col-12">
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
            <div class="col-md-2 col-12">
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
              <div class="q-mt-md input-grate-question">
                <q-input v-model="scores[answerSheetIndex].score"
                         :loading="scores[answerSheetIndex].loading"
                         dense>
                  <template v-slot:append>
                    <q-btn color="primary"
                           label="ثبت نمره"
                           outline
                           :loading="scores[answerSheetIndex].loading"
                           @click="submitScore(answerSheetIndex)" />
                  </template>
                </q-input>
              </div>
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
      <template v-if="answerBook.objection_request">
        <div>
          متن اعتراض:
        </div>
        <div v-html="answerBook.objection_request" />
      </template>
      <template v-if="answerBook.objection_request && !answerBook.objection_result">
        <q-separator class="q-my-xl" />
        <q-card-section>
          <entity-edit v-if="mounted"
                       ref="objectionEntityEdit"
                       v-model:value="objectionInputs"
                       title="پاسخ به اعتراض"
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
      <template v-else-if="answerBook.objection_result">
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
import { APIGateway } from 'src/api/APIGateway.js'
import { EntityShow, EntityEdit } from 'quasar-crud'
import { AnswerBook } from 'src/models/AnswerBook.js'
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'

export default {
  name: 'AdminAnswerBookShow',
  components: { EntityShow, EntityEdit },
  mixins: [mixinWidget, mixinAuth],
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
      scores: [],
      objectionInputs: [
        { type: 'input', name: 'objection_result', responseKey: 'objection_result', label: 'متن پاسخ', placeholder: ' ', inputType: 'textarea', col: 'col-12' }
      ],
      objectionApi: APIGateway.answerBook.APIAdresses.submitObjectionResult(this.$route.params.answer_book_id),
      answerBook: new AnswerBook()
    }
  },
  computed: {
    totalScore () {
      let totalScore = 0
      this.scores.forEach(item => {
        if (item.score) {
          totalScore += parseFloat(item.score)
        }
      })
      return totalScore
    }
  },
  mounted () {
    this.getAnswerBook()
    this.mounted = true
  },
  methods: {
    sendObjection () {
      this.answerBook.loading = true
      this.$refs.objectionEntityEdit.editEntity(false)
        .then(() => {
          this.getAnswerBook()
        })
        .catch(() => {
          this.getAnswerBook()
        })
    },
    toShamsi (miladi) {
      return Assist.miladiToShamsi(miladi)
    },
    loadAnswerBook (answerBook) {
      this.answerBook = new AnswerBook(answerBook)
      this.answerBook.answer_sheet_info.list.forEach((answerSheetItem) => {
        this.questionInputs.push(this.questionInput)
        this.scores.push({
          answerSheetId: answerSheetItem.id,
          score: answerSheetItem.score,
          loading: false
        })
      })
    },
    setGraderToMe () {
      this.answerBook.loading = true
      APIGateway.answerBook.setGraderToMe(this.$route.params.answer_book_id)
        .then((answerBook) => {
          this.loadAnswerBook(answerBook)
          this.answerBook.loading = false
        })
        .catch(() => {
          this.getAnswerBook()
          this.answerBook.loading = false
        })
    },
    submitScore (index) {
      this.scores[index].loading = true
      APIGateway.answerSheet.submitScore(this.scores[index].answerSheetId, this.scores[index].score)
        .then(() => {
          this.scores[index].loading = false
          this.getAnswerBook()
        })
        .catch(() => {
          this.scores[index].loading = false
        })
    },
    getAnswerBook () {
      this.answerBook.loading = true
      APIGateway.answerBook.get(this.$route.params.answer_book_id)
        .then((answerBook) => {
          this.loadAnswerBook(answerBook)
          this.answerBook.loading = false
        })
        .catch(() => {
          this.answerBook.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminAnswerBookShow {
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
      .input-grate-question {
        .q-input {
          .q-field__inner .q-field__control {
            height: 40px;
            min-height: 40px;
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
