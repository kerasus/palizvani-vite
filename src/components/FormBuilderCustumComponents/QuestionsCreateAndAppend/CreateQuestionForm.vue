<template>
  <div class="CreateQuestionForm">
    <entity-edit v-if="mounted"
                 ref="entityEdit"
                 v-model:value="inputs"
                 title="ایجاد سوال جدید"
                 :api="api"
                 :loaded-data="loadedData"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-route-name="showRouteName"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-save-button="false"
                 :show-reload-button="false"
                 :redirect-after-edit="false"
                 :after-load-input-data="afterLoadInputData">
      <template #toolbar>
        <q-btn v-close-popup
               icon="close"
               flat />
      </template>
    </entity-edit>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { Question } from 'src/models/Question.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'
import QuestionChoices from 'src/components/FormBuilderCustumComponents/QuestionChoices/QuestionChoices.vue'

const BtnControlComp = shallowRef(BtnControl)
const QuestionChoicesComp = shallowRef(QuestionChoices)

export default {
  name: 'CreateQuestionForm',
  components: {
    EntityEdit
  },
  props: {
    testId: {
      type: [Number, String, Boolean],
      default: null
    },
    testSetId: {
      type: [Number, String, Boolean],
      default: null
    },
    questionType: {
      default: 'QUESTION_BANK',
      type: String
    }
  },
  emits: ['onQuestionCreated'],
  data () {
    return {
      mounted: false,
      entityLoading: true,
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Unit.Questions.Show',
      loadedData: new Question(),
      inputs: [
        { type: 'input', name: 'text', responseKey: 'text', label: 'سوال', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'correct_answer', responseKey: 'correct_answer', label: 'پاسخ', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'mark', responseKey: 'mark', label: 'بارم پیشنهادی سوال', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'select', name: 'level', responseKey: 'level', label: 'سطح سوال', placeholder: ' ', options: (new Question()).levelEnums, col: 'col-md-3 col-12' },
        { type: QuestionChoicesComp, name: 'choices', responseKey: 'choices_info', correctChoiceIndex: 0, col: 'col-12 flex justify-end' },
        { type: BtnControlComp, name: 'btn', label: 'ذخیره سوال', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-end' },
        { type: 'hidden', name: 'correct_choice_index', responseKey: 'correct_choice_index' },
        { type: 'hidden', name: 'type', responseKey: 'type', value: 'QUESTION_BANK' }
      ]
    }
  },
  watch: {
    questionType: {
      handler (newValue) {
        console.log(newValue)
        FormBuilderAssist.setAttributeByName(this.inputs, 'type', 'value', newValue)
      },
      immediate: true
    }
  },
  created() {
    if (this.testId) {
      this.api = APIGateway.test.APIAdresses.appendQuestion(this.testId)
    } else if (this.testSetId) {
      this.api = APIGateway.testSet.APIAdresses.appendQuestion(this.testSetId)
    }
  },
  mounted() {
    this.setInputs()
    this.mounted = true
    this.$bus.on('onChangeCorrectChoiceIndexInQuestionChoicesInput', (correctChoiceIndex) => {
      FormBuilderAssist.setAttributeByName(this.inputs, 'correct_choice_index', 'value', correctChoiceIndex)
    })
  },
  methods: {
    setInputs () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.edit)
      if (this.questionType === 'QUESTION_BANK') {
        FormBuilderAssist.setAttributeByName(this.inputs, 'choices', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'choices', 'ignoreValue', true)
      }
      if (this.questionType === 'EVENT') {
        FormBuilderAssist.setAttributeByName(this.inputs, 'mark', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'mark', 'ignoreValue', true)
        FormBuilderAssist.setAttributeByName(this.inputs, 'level', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'level', 'ignoreValue', true)
      }
    },
    afterLoadInputData () {
      this.entityLoading = false
    },
    edit() {
      // console.log(this.$refs.entityEdit.getFormData())
      FormBuilderAssist.setAttributeByName(this.inputs, 'type', 'value', this.questionType)
      // console.log(this.$refs.entityEdit.getFormData())
      this.entityLoading = true
      this.$refs.entityEdit.editEntity(false)
        .then((response) => {
          this.$emit('onQuestionCreated', response.data)
          this.entityLoading = false
        })
        .catch(() => {
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.CreateQuestionForm {
  .entity-edit {
    height: 100vh;
    overflow: auto;
  }
}
</style>
