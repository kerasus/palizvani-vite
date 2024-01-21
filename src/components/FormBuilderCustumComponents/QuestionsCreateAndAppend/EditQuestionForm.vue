<template>
  <div class="EditQuestionForm">
    <entity-edit v-if="mounted"
                 ref="entityEdit"
                 v-model:value="inputs"
                 title="ویرایش سوال"
                 :api="api"
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

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'EditQuestionForm',
  components: {
    EntityEdit
  },
  props: {
    questionId: {
      type: Number,
      default: null
    }
  },
  emits: ['onQuestionEdited'],
  data () {
    return {
      mounted: false,
      entityLoading: true,
      api: APIGateway.question.APIAdresses.byId(this.questionId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Unit.Questions.Show',
      inputs: [
        { type: 'input', name: 'text', responseKey: 'text', label: 'سوال', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'correct_answer', responseKey: 'correct_answer', label: 'پاسخ', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'mark', responseKey: 'mark', label: 'بارم پیشنهادی سوال', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'select', name: 'level', responseKey: 'level', label: 'سطح سوال', placeholder: ' ', options: (new Question()).levelEnums, col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', label: 'ذخیره سوال', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-end' },
        { type: 'hidden', name: 'type', responseKey: 'type', value: 'QUESTION_BANK' }
      ]
    }
  },
  mounted() {
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.edit)
    },
    afterLoadInputData () {
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity(false)
        .then((response) => {
          this.$emit('onQuestionEdited', response.data)
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
.EditQuestionForm {
  .entity-edit {
    height: 100vh;
  }
}
</style>
