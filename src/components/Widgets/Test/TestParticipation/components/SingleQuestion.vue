<template>
  <div class="SingleQuestion">
    <q-card-section>
      <div class="question-text">
        <span>سوال</span>
        <span>{{ questionNumber }}</span>
        <span>-</span>
        <span>
          <q-badge v-if="question"
                   class="q-mx-sm">
            {{ question.mark }}
            نمره
          </q-badge>
        </span>

        <span v-if="question.text"
              v-html="question.text" />
      </div>
      <q-separator class="q-my-lg" />
      <q-card-actions class="flex justify-end SingleQuestionForm">
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
    </q-card-section>
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
  name: 'SingleQuestion',
  components: { EntityCreate },
  props: {
    answerBook: {
      type: AnswerBook,
      default: new AnswerBook()
    },
    questionNumber: {
      type: Number,
      default: 1
    }
  },
  emits: ['sending', 'sentsuccess', 'sentfailed'],
  data () {
    return {
      mounted: false,
      api: APIGateway.answerSheet.APIAdresses.base,
      btnPrev: { type: BtnControlComp, name: 'btnPrev', label: 'سوال قبلی', placeholder: ' ', outline: true, atClick: () => {}, col: 'col-md-6 col-12' },
      btnNext: { type: BtnControlComp, name: 'btnNext', label: 'سوال بعدی', placeholder: ' ', atClick: () => {}, col: 'col-md-6 col-12 flex justify-end' },
      // btnFinal: { type: BtnControlComp, name: 'btnFinal', label: 'اتمام آزمون', placeholder: ' ', atClick: () => {}, col: 'col-md-6 col-12 flex justify-end' },
      inputs: [
        { type: 'input', name: 'answer_text', label: 'متن پاسخ', placeholder: ' ', inputType: 'textarea', col: 'col-12' },
        { type: 'file', name: 'answer_attachment', label: 'فایل پیوست', placeholder: ' ', sendNull: true, col: 'col-9' },
        { type: BtnControlComp, name: 'btnRemoveAnswerAttachment', label: 'حذف فایل پیوست', placeholder: ' ', atClick: () => {}, col: 'col-3 flex justify-center' },
        { type: BtnControlComp, name: 'btnSendAnswer', label: 'ثبت پاسخ این سوال', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-center' },
        { type: 'hidden', name: 'answer_book', value: this.answerBook.id },
        { type: 'hidden', name: 'test_question', value: null }
      ]
    }
  },
  computed: {
    hasNextQuestion () {
      return this.answerBook.test_info.test_questions_info.list.length > this.questionNumber
    },
    hasPrevQuestion () {
      return this.questionNumber > 1
    },
    isLastQuestion () {
      return this.answerBook.test_info.test_questions_info.list.length === this.questionNumber
    },
    testSetQuestion () {
      return this.answerBook.answer_sheet_info.list[this.questionNumber - 1].test_question_info
    },
    question () {
      return this.testSetQuestion.question_info
    }
  },
  mounted () {
    this.setInputs()
    this.mounted = true
    if (this.answerBook.test_info.test_questions_info.list.length < this.questionNumber || this.questionNumber < 1) {
      this.$router.push({ name: 'UserPanel.Test.AnswerBook.Participate.AllQuestions', params: this.$route.params })
    }
  },
  methods: {
    setInputs () {
      if (this.hasPrevQuestion) {
        this.inputs.push(this.btnPrev)
      }
      if (this.hasNextQuestion) {
        this.inputs.push(this.btnNext)
      }
      // if (this.isLastQuestion) {
      //   this.inputs.push(this.btnFinal)
      // }
      if (this.hasPrevQuestion && !this.hasNextQuestion) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'btnPrev', 'col', 'col-md-6 col-12 flex justify-start')
      }
      if (!this.hasPrevQuestion && this.hasNextQuestion) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'btnNext', 'col', 'col-12 flex justify-end')
      }

      const questionIndex = this.questionNumber - 1
      FormBuilderAssist.setAttributeByName(this.inputs, 'answer_text', 'value', this.answerBook.answer_sheet_info.list[questionIndex].answer_text)
      FormBuilderAssist.setAttributeByName(this.inputs, 'answer_attachment', 'value', this.answerBook.answer_sheet_info.list[questionIndex].answer_attachment)

      FormBuilderAssist.setAttributeByName(this.inputs, 'btnSendAnswer', 'atClick', () => { this.sendAnswer() })
      FormBuilderAssist.setAttributeByName(this.inputs, 'btnRemoveAnswerAttachment', 'atClick', () => { this.removeAnswerAttachment() })

      // FormBuilderAssist.setAttributeByName(this.inputs, 'btnFinal', 'atClick', () => { this.sendAnswer('final') })

      FormBuilderAssist.setAttributeByName(this.inputs, 'btnNext', 'atClick', () => { this.goToNextQuestion() })
      FormBuilderAssist.setAttributeByName(this.inputs, 'btnPrev', 'atClick', () => { this.goToPrevQuestion() })
      FormBuilderAssist.setAttributeByName(this.inputs, 'test_question', 'value', this.testSetQuestion?.id)
    },
    removeAnswerAttachment () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'answer_attachment', 'value', null)
    },
    goToNextQuestion () {
      this.goToQuestion(this.questionNumber + 1)
    },
    goToPrevQuestion () {
      this.goToQuestion(this.questionNumber - 1)
    },
    isFileSizeGtThan (targetSize) {
      const file = FormBuilderAssist.getInputsByName(this.inputs, 'answer_attachment').value
      const fileSizeinMb = file?.size ? file.size / 1000000 : 0
      return fileSizeinMb > targetSize
    },
    isImageFile () {
      const file = FormBuilderAssist.getInputsByName(this.inputs, 'answer_attachment').value
      const fileType = file?.type ? file.type : 'image/'
      return fileType.startsWith('image/')
    },
    sendAnswer () {
      if (this.isFileSizeGtThan(3)) {
        this.$q.notify({
          type: 'negative',
          message: 'حجم فایل نباید بیشتر از 10 مگابایت باشد.'
        })
        return
      }
      if (!this.isImageFile()) {
        this.$q.notify({
          type: 'negative',
          message: 'تنها امکان ارسال فایل تصویری وجود دارد.'
        })
        return
      }
      this.$emit('sending')
      this.$refs.entityCreate.createEntity(false)
        .then((response) => {
          const answerBook = this.answerBook
          const questionIndex = this.questionNumber - 1
          answerBook.answer_sheet_info.list[questionIndex].answer_text = response.data.answer_text
          answerBook.answer_sheet_info.list[questionIndex].answer_attachment = response.data.answer_attachment
          this.$store.commit('Test/updateAnswerBook', answerBook)
          this.$emit('sentsuccess')
          this.$bus.emit('test-participate-single-question-sent-success')
        })
        .catch((error) => {
          this.$emit('sentfailed')
          this.$bus.emit('test-participate-single-question-sent-failed')
          if (error.response && error.response.status === 422) {
            this.$router.push({ name: 'UserPanel.Profile.AllClassrooms' })
          }
        })
    },
    goToQuestion (questionNumber) {
      this.$router.push({
        name: 'UserPanel.Test.AnswerBook.Participate.SingleQuestion',
        params: {
          test_id: this.$route.params.test_id,
          answer_book_id: this.$route.params.answer_book_id,
          question_number: questionNumber
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.SingleQuestion {
  .q-badge {
    background: #ACBCAE 0 0 no-repeat padding-box;
    border-radius: 18px;
    height: 32px;
    padding: 4px 16px;
  }
  .SingleQuestionForm {
    & > div {
      width: 100%;
    }
  }
}
</style>
