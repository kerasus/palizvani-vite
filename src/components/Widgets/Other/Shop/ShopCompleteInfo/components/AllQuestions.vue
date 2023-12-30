<template>
  <div class="AllQuestions">
    <div class="question-navigator">
      <q-btn v-if="questionPanel < answerBook.answer_sheet_info.list.length"
             color="indigo-7"
             outline
             size="sm"
             class="btn-next-question"
             @click="changeQuestion(questionPanel + 1)">
        سوال بعدی
        <q-icon name="arrow_back_ios" />
      </q-btn>
      <q-btn v-if="questionPanel > 1"
             color="indigo-7"
             outline
             size="sm"
             class="btn-prev-question"
             @click="changeQuestion(questionPanel - 1)">
        <q-icon name="arrow_forward_ios" />
        سوال قبلی
      </q-btn>
      <q-linear-progress size="32px"
                         :value="(questionPanel / answerBook.answer_sheet_info.list.length)"
                         color="light-blue-5">
        <div class="absolute-full flex flex-center">
          <q-badge color="white"
                   text-color="accent">
            سوال
            {{ questionPanel }}
            از
            {{ answerBook.answer_sheet_info.list.length }}
          </q-badge>
        </div>
      </q-linear-progress>
    </div>
    <q-tab-panels v-model="questionPanel"
                  animated>
      <q-tab-panel v-for="(answerSheet, answerSheetIndex) in answerBook.answer_sheet_info.list"
                   :key="answerSheetIndex"
                   :name="(answerSheetIndex + 1)">
        <div v-html="'<span>' + (answerSheetIndex + 1) + ' - </span>' + answerSheet.test_set_question_info.question_info.text" />
        <div>
          <entity-create v-if="mounted"
                         :ref="'entityCreate_' + answerSheetIndex.toString()"
                         v-model:value="questionInputs[answerSheetIndex]"
                         :api="singleQuestionSendAnswerApi"
                         :default-layout="false"
                         :show-close-button="false"
                         :show-edit-button="false"
                         :show-expand-button="false"
                         :show-save-button="false"
                         :show-reload-button="false" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <q-separator class="q-my-lg" />
    <q-card-actions class="flex justify-end AllQuestionsForm">
      <q-btn color="primary"
             @click="confirmAnswers">
        ارسال پرسشنامه
      </q-btn>
    </q-card-actions>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { AnswerBook } from 'src/models/AnswerBook.js'
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AllQuestions',
  components: { EntityCreate },
  props: {
    answerBook: {
      type: AnswerBook,
      default: new AnswerBook()
    }
  },
  data () {
    return {
      mounted: false,
      questionPanel: 1,
      questionInputs: [],
      singleQuestionSendAnswerApi: APIGateway.answerSheet.APIAdresses.base,
      api: APIGateway.answerBook.APIAdresses.submitOverallAnswer(this.$route.params.answer_book_id)
    }
  },
  mounted () {
    this.setInputs()
    this.mounted = true
  },
  methods: {
    changeQuestion (newNumber) {
      this.questionPanel = newNumber
    },
    setInputs () {
      this.answerBook.answer_sheet_info.list.forEach((answerSheetItem, answerSheetIndex) => {
        this.questionInputs.push([
          { type: 'input', name: 'answer_text', label: 'متن پاسخ', placeholder: ' ', value: answerSheetItem.answer_text, inputType: 'textarea', col: 'col-12' },
          { type: 'file', name: 'answer_attachment', label: 'فایل پیوست', placeholder: ' ', value: answerSheetItem.answer_attachment, col: 'col-12' },
          { type: 'hidden', name: 'answer_book', value: this.answerBook.id },
          { type: 'hidden', name: 'test_set_question', value: answerSheetItem.test_set_question },
          {
            type: BtnControlComp,
            name: 'btn',
            responseKey: 'btn',
            label: 'ثبت پاسخ',
            placeholder: ' ',
            atClick: () => {
              const answerText = FormBuilderAssist.getInputsByName(this.questionInputs[answerSheetIndex], 'answer_text').value
              if (!answerText) {
                this.$q.notify({
                  type: 'negative',
                  message: 'لطفا متن پاسخ را کامل کنید.'
                })
                return
              }
              const entityCreate = this.$refs['entityCreate_' + answerSheetIndex.toString()][0]
              entityCreate.entityLoading = true
              entityCreate.createEntity(false)
                .then(() => {
                  if (this.questionPanel < this.answerBook.answer_sheet_info.list.length) {
                    this.changeQuestion(this.questionPanel + 1)
                  } else if (this.questionPanel === this.answerBook.answer_sheet_info.list.length) {
                    this.confirmAnswers()
                  }
                  entityCreate.entityLoading = false
                })
                .catch(() => {
                  entityCreate.entityLoading = false
                })
            },
            col: 'col-12 flex justify-end'
          }
        ])
      })
    },
    confirmAnswers () {
      this.$bus.emit('event-confirmation-step-test-sent-answer-sending')
      APIGateway.answerBook.confirmAnswers(this.answerBook.id)
        .then(() => {
          this.$bus.emit('event-confirmation-step-test-sent-answer-success')
        })
        .catch(() => {
          this.$bus.emit('event-confirmation-step-test-sent-answer-failed')
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AllQuestions {
  .question-navigator {
    position: relative;
    :deep(.q-btn) {
      position: absolute;
      top: 0;
      z-index: 2;
      &.btn-next-question {
        right: 0;
      }
      &.btn-prev-question {
        left: 0;
      }
    }
  }
  .AllQuestionsForm {
    & > div {
      width: 100%;
    }
  }
}
</style>
