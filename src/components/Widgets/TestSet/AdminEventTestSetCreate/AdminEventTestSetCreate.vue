<template>
  <div class="AdminEventTestSetCreate"
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
                   ref="entityCreate"
                   v-model:value="inputs"
                   title="مشخصات پرسشنامه"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
// import QuestionsSelector from 'src/components/FormBuilderCustumComponents/QuestionsSelector/QuestionsSelector.vue'

const BtnControlComp = shallowRef(BtnControl)
// const QuestionsSelectorComp = shallowRef(QuestionsSelector)

export default {
  name: 'AdminEventTestSetCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.testSet.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Unit.TestSet.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان پرسشنامه', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات پرسشنامه', col: 'col-md-12 col-12' },
        { type: 'hidden', name: 'type', responseKey: 'type', value: 'QUESTIONNAIRE' },
        // { type: BtnControlComp, name: 'btnCreateQuestion', responseKey: 'btnCreateQuestion', label: 'تعریف سوال جدید', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-end' },
        // { type: QuestionsSelectorComp, name: 'test_set_questions', responseKey: 'test_set_questions', unitId: false, questionType: 'EVENT', col: 'col-md-12 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تایید نهایی', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-end' }
      ]
    }
  },
  mounted() {
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.create)
      // FormBuilderAssist.setAttributeByName(this.inputs, 'btnCreateQuestion', 'atClick', this.goToCreateQuestionPage)
    },
    goToCreateQuestionPage () {
      this.$router.push({ name: 'Admin.Event.TestSet.Questions.Create', params: { test_set_id: this.$route.params.test_set_id } })
    },
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity(false)
        .then((response) => {
          this.$router.push({ name: 'Admin.Event.TestSet.Show', params: { test_set_id: response.data.id } })
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
.AdminEventTestSetCreate {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    position: relative;
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
