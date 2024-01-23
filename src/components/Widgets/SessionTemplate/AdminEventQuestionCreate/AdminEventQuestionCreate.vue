<template>
  <div class="AdminEventQuestionCreate"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-create v-if="mounted"
                   ref="entityEdit"
                   v-model:value="inputs"
                   title="ایجاد سوال جدید"
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
                   :after-load-input-data="afterLoadInputData" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { Question } from 'src/models/Question.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'
import QuestionChoices from 'src/components/FormBuilderCustumComponents/QuestionChoices/QuestionChoices.vue'

const BtnControlComp = shallowRef(BtnControl)
const QuestionChoicesComp = shallowRef(QuestionChoices)

export default {
  name: 'AdminEventQuestionCreate',
  components: {
    EntityCreate
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: true,
      api: APIGateway.question.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Event.TestSet.Questions.Show',
      loadedData: new Question(),
      inputs: [
        { type: 'input', name: 'text', responseKey: 'text', label: 'سوال', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'correct_answer', responseKey: 'correct_answer', label: 'پاسخ', placeholder: ' ', col: 'col-12' },
        { type: QuestionChoicesComp, name: 'choices', placeholder: ' ', col: 'col-12 flex justify-end' },
        { type: BtnControlComp, name: 'btn', label: 'ذخیره سوال', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-end' },
        { type: 'hidden', name: 'type', responseKey: 'type', value: 'EVENT' }
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
      this.$refs.entityEdit.createEntity(false)
        .then((response) => {
          this.$router.push({ name: 'Admin.Event.TestSet.Questions.Show', params: { question_id: response.data.id } })
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
.AdminEventQuestionCreate {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    display: flex;
    flex-flow: row;
    position: relative;
    .static-title {

    }
    .dynamic-title {

    }
    .back-action {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  :deep(.form) {
    padding: 24px;
  }
}
</style>
