<template>
  <div class="AdminEventQuestionShow"
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
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminEventQuestionShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: true,
      api: APIGateway.question.APIAdresses.byId(this.$route.params.question_id),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Event.TestSet.Questions.Show',
      inputs: [
        { type: 'input', name: 'text', responseKey: 'text', label: 'سوال', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'correct_answer', responseKey: 'correct_answer', label: 'پاسخ', placeholder: ' ', col: 'col-12' },
        { type: BtnControlComp, name: 'btn', label: 'ویرایش سوال', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-end' },
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
      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminEventQuestionShow {
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
