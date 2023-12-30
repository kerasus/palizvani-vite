<template>
  <div class="AllQuestions">
    <q-list separator>
      <!--      <q-item v-for="(question, questionIndex) in answerBook.test_info.test_set_info.test_questions"-->
      <q-item v-for="(answerSheet, answerSheetIndex) in answerBook.answer_sheet_info.list"
              :key="answerSheetIndex"
              clickable>
        <q-item-section v-html="'<span>' + (answerSheetIndex + 1) + ' - </span>' + answerSheet.test_question_info.question_info.text" />
        <q-item-section side>
          <q-badge>
            {{ answerSheet.test_question_info.question_info.mark }}
            نمره
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator class="q-my-lg" />
    <q-card-actions class="flex justify-end AllQuestionsForm">
      <entity-create v-if="mounted"
                     ref="entityCreate"
                     v-model:value="inputs"
                     :api="api"
                     :default-layout="false"
                     :show-close-button="false"
                     :show-edit-button="false"
                     :show-expand-button="false"
                     :show-save-button="false"
                     :show-reload-button="false" />
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
      api: APIGateway.answerBook.APIAdresses.submitOverallAnswer(this.$route.params.answer_book_id),
      inputs: [
        // { type: 'inputEditor', name: 'answer_text', label: 'متن پاسخ', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'answer_text', label: 'متن پاسخ', placeholder: ' ', inputType: 'textarea', col: 'col-12' },
        { type: 'file', name: 'answer_attachment', label: 'فایل جامع پاسخ سوالات', placeholder: ' ', col: 'col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'اتمام آزمون', placeholder: ' ', atClick: () => {}, col: 'col-12' }
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
              this.$router.push({
                name: 'UserPanel.Test.AnswerBook.Participate.SingleQuestion',
                params: {
                  test_id: this.$route.params.test_id,
                  answer_book_id: this.$route.params.answer_book_id,
                  question_number: 'complete'
                }
              })
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
