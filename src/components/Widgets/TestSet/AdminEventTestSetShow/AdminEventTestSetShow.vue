<template>
  <div class="AdminEventTestSetShow"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-edit v-if="mounted"
                 ref="entityEdit"
                 v-model:value="inputs"
                 title="مشخصات پرسشنامه"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-save-button="false"
                 :show-reload-button="false"
                 :redirect-after-edit="false" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import FormBuilderInputEditor from 'src/components/FormBuilderCustumComponents/FormBuilderInputEditor.vue'
import QuestionsCreateAndAppend from 'src/components/FormBuilderCustumComponents/QuestionsCreateAndAppend/QuestionsCreateAndAppend.vue'

const BtnControlComp = shallowRef(BtnControl)
const FormBuilderInputEditorComp = shallowRef(FormBuilderInputEditor)
const QuestionsCreateAndAppendComp = shallowRef(QuestionsCreateAndAppend)

export default {
  name: 'AdminEventTestSetShow',
  components: { EntityEdit },
  mixins: [mixinWidget],
  data () {
    const testSetId = this.$route.params.test_set_id
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.testSet.APIAdresses.byId(testSetId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان پرسشنامه', placeholder: ' ', col: 'col-md-12 col-12' },
        { type: FormBuilderInputEditorComp, name: 'description', responseKey: 'description', label: 'توضیحات پرسشنامه', col: 'col-md-12 col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id' },
        { type: 'hidden', name: 'type', responseKey: 'type', value: 'QUESTIONNAIRE' },
        { type: QuestionsCreateAndAppendComp, name: 'test_set_questions', responseKey: 'test_set_questions', testSetId, questionType: 'EVENT', ignoreValue: true, col: 'col-md-12 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تایید نهایی', placeholder: ' ', atClick: this.edit, col: 'col-12 flex justify-end' }
      ]
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    goToCreateQuestionPage () {
      this.$router.push({ name: 'Admin.Event.TestSet.Questions.Create', params: { test_set_id: this.$route.params.test_set_id } })
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity()
        .then(() => {
          this.$refs.entityEdit.getData()
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
.AdminEventTestSetShow {
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
