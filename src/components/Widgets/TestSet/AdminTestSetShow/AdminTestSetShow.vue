<template>
  <div class="AdminTestShow"
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
                 title="مشخصات آزمون"
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
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import QuestionsSelector from 'src/components/FormBuilderCustumComponents/QuestionsSelector/QuestionsSelector.vue'

const BtnControlComp = shallowRef(BtnControl)
const QuestionsSelectorComp = shallowRef(QuestionsSelector)

export default {
  name: 'AdminTestShow',
  components: { EntityEdit },
  mixins: [mixinWidget],
  data () {
    const unitId = this.$route.params.unit_id
    const testSetId = this.$route.params.id
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.testSet.APIAdresses.byId(testSetId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان آزمون', placeholder: ' ', col: 'col-md-12 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات آزمون', col: 'col-md-12 col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id' },
        { type: 'hidden', name: 'unit', responseKey: 'unit' },
        { type: QuestionsSelectorComp, name: 'test_set_questions', responseKey: 'test_set_questions', unitId, col: 'col-md-12 col-12' },
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
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.edit)
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
.AdminTestShow {
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
