<template>
  <div class="AllQuestions">
    <q-list separator>
      <!--      <q-item v-for="(question, questionIndex) in answerBook.test_info.test_set_info.test_set_questions"-->
      <q-item v-for="(answerSheet, answerSheetIndex) in answerBook.answer_sheet_info.list"
              :key="answerSheetIndex"
              clickable>
        <q-item-section>
          <q-item-label v-html="'<span>' + (answerSheetIndex + 1) + ' - </span>' + answerSheet.test_set_question_info.question_info.text" />
          <q-item-label>
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
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
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
  emits: ['sending', 'sentsuccess', 'sentfailed'],
  data () {
    return {
      mounted: false,
      questionInputs: [],
      singleQuestionSendAnswerApi: APIGateway.answerSheet.APIAdresses.base,
      api: APIGateway.answerBook.APIAdresses.submitOverallAnswer(this.$route.params.answer_book_id),
      inputs: [
        // { type: 'inputEditor', name: 'answer_text', label: 'متن پاسخ', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'answer_text', label: 'متن پاسخ', placeholder: ' ', inputType: 'textarea', col: 'col-12' },
        { type: 'file', name: 'answer_attachment', label: 'فایل جامع پاسخ سوالات', placeholder: ' ', col: 'col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ارسال پرسشنامه', placeholder: ' ', atClick: () => {}, col: 'col-12' }
      ]
    }
  },
  mounted () {
    this.setInputs()
    this.mounted = true
  },
  methods: {
    setInputs () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.sendAnswers)
      FormBuilderAssist.setAttributeByName(this.inputs, 'answer_text', 'value', this.answerBook.overall_answer_text)
      FormBuilderAssist.setAttributeByName(this.inputs, 'answer_attachment', 'value', this.answerBook.overall_answer_attachment)

      this.answerBook.answer_sheet_info.list.forEach((answerSheetItem, answerSheetIndex) => {
        this.questionInputs.push([
          { type: 'input', name: 'answer_text', label: 'متن پاسخ', placeholder: ' ', inputType: 'textarea', col: 'col-12' },
          { type: 'file', name: 'answer_attachment', label: 'فایل پیوست', placeholder: ' ', col: 'col-12' },
          { type: 'hidden', name: 'answer_book', value: this.answerBook.id },
          { type: 'hidden', name: 'test_set_question', value: answerSheetItem.test_set_question },
          {
            type: BtnControlComp,
            name: 'btn',
            responseKey: 'btn',
            label: 'ثبت پاسخ',
            placeholder: ' ',
            atClick: () => {
              const entityCreate = this.$refs['entityCreate_' + answerSheetIndex.toString()][0]
              entityCreate.entityLoading = true
              entityCreate.createEntity(false)
                .then(() => {
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
      this.$emit('sending')
      APIGateway.answerBook.confirmAnswers(this.answerBook.id)
        .then(() => {
          this.$emit('sentsuccess')
        })
        .catch(() => {
          debugger
          this.$emit('sentfailed')
        })
    },
    sendAnswers () {
      const answerText = FormBuilderAssist.getInputsByName(this.inputs, 'answer_text').value
      if (!answerText) {
        this.$q.notify({
          type: 'negative',
          message: 'لطفا متن پاسخ را کامل کنید.'
        })
        return
      }

      this.$emit('sending')
      this.$refs.entityCreate.createEntity(false)
        .then(() => {
          APIGateway.answerBook.confirmAnswers(this.answerBook.id)
            .then(() => {
              this.$emit('sentsuccess')
            })
            .catch(() => {
              this.$emit('sentfailed')
            })
        })
        .catch(() => {
          this.$emit('sentfailed')
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AllQuestions {
  :deep(.q-list) {
    .q-item {
      .q-item__section {
        display: inline-block;
      }
      .q-badge {
        background: #ACBCAE 0 0 no-repeat padding-box;
        border-radius: 18px;
        height: 32px;
        padding: 4px 16px;
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
