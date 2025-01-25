<template>
  <div class="AllQuestions">
    <q-list separator>
      <q-item v-for="(answerSheet, answerSheetIndex) in answerBook.answer_sheet_info.list"
              :key="answerSheetIndex"
              clickable>
        <div class="full-width">
          <div class="flex justify-end">
            <q-badge>
              {{ answerSheet.test_question_info.question_info.mark }}
              نمره
            </q-badge>
          </div>
          <div v-html="'<span>' + (answerSheetIndex + 1) + ' - </span>' + answerSheet.test_question_info.question_info.text" />
        </div>
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
import FormBuilderFile from 'src/components/FormBuilderCustumComponents/FormBuilderFile.vue'

const BtnControlComp = shallowRef(BtnControl)
const FormBuilderFileComp = shallowRef(FormBuilderFile)

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
        // { type: 'input', name: 'answer_text', label: 'متن پاسخ', placeholder: ' ', inputType: 'textarea', col: 'col-12' },
        { type: FormBuilderFileComp, name: 'answer_attachment', label: 'فایل جامع پاسخ سوالات', placeholder: ' ', sendNull: true, col: 'col-9' },
        { type: BtnControlComp, name: 'btnRemoveAnswerAttachment', label: 'حذف فایل پیوست', placeholder: ' ', atClick: this.removeAnswerAttachment, col: 'col-3 flex justify-center' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ثبت پاسخ جامع', placeholder: ' ', atClick: this.sendAnswers, col: 'col-12' }
      ]
    }
  },
  mounted () {
    this.setInputs()
    this.mounted = true
  },
  methods: {
    setInputs () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'answer_text', 'value', this.answerBook.overall_answer_text)
      FormBuilderAssist.setAttributeByName(this.inputs, 'answer_attachment', 'value', this.answerBook.overall_answer_attachment)
    },
    removeAnswerAttachment () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'answer_attachment', 'value', null)
    },
    isFileSizeGtThan (targetSize) {
      const file = FormBuilderAssist.getInputsByName(this.inputs, 'answer_attachment').value
      const fileSizeinMb = file?.size ? file.size / 1000000 : 0
      return fileSizeinMb > targetSize
    },
    isPdfFile () {
      const file = FormBuilderAssist.getInputsByName(this.inputs, 'answer_attachment').value
      return file?.type ? file.type === 'application/pdf' : true
    },
    sendAnswers () {
      if (this.isFileSizeGtThan(10)) {
        this.$q.notify({
          type: 'negative',
          message: 'حجم فایل نباید بیشتر از 10 مگابایت باشد.'
        })
        return
      }
      if (!this.isPdfFile()) {
        this.$q.notify({
          type: 'negative',
          message: 'تنها امکان ارسال فایل pdf وجود دارد.'
        })
        return
      }

      this.$emit('sending')
      this.$refs.entityCreate.createEntity(false)
        .then((response) => {
          const answerBook = new AnswerBook(response.data)
          this.$store.commit('Test/updateAnswerBook', answerBook)
          FormBuilderAssist.setAttributeByName(this.inputs, 'answer_text', 'value', answerBook.overall_answer_text)
          FormBuilderAssist.setAttributeByName(this.inputs, 'answer_attachment', 'value', answerBook.overall_answer_attachment)
          this.$emit('sentsuccess')
          this.$bus.emit('test-participate-all-question-sent-success')
        })
        .catch((error) => {
          this.$emit('sentfailed')
          this.$bus.emit('test-participate-all-question-sent-failed')
          if (error.response && error.response.status === 422) {
            this.$router.push({ name: 'UserPanel.Profile.AllClassrooms' })
          }
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
