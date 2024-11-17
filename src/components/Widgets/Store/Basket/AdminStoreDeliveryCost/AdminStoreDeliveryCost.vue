<template>
  <div class="AdminPostCreate"
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
                   title="هزینه ارسال"
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
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'
import PostMixin from 'src/components/Widgets/Post/PostMixin.js'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminPostCreate',
  components: { EntityCreate },
  mixins: [mixinWidget, PostMixin],
  data () {
    return {
      mounted: false,
      entityLoading: false,
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: null,
      inputs: [
        {
          type: 'input',
          name: 'text',
          responseKey: 'text',
          label: 'هزینه ارسال با پست پیشتاز',
          col: 'col-md-12 col-12'
        },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ثبت', placeholder: ' ', atClick: this.onSubmit, col: 'col-md-6' }
      ]
    }
  },
  mounted () {
    this.getPurchaseRegulations()
  },
  methods: {
    getPurchaseRegulations () {
      this.purchaseRegulationsLoading = true
      APIGateway.appSetting.get('DeliveryCost-post-pishtaz')
        .then((purchaseRegulations) => {
          FormBuilderAssist.setAttributeByName(this.inputs, 'text', 'value', purchaseRegulations.value)
          this.mounted = true
        })
        .finally(() => {
          this.purchaseRegulationsLoading = false
        })
    },
    onSubmit () {
      const formData = FormBuilderAssist.getFormData(this.inputs)
      this.purchaseRegulationsLoading = true
      APIGateway.appSetting.update({ key: 'DeliveryCost-post-pishtaz', value: formData.text })
        .then((purchaseRegulations) => {
          this.purchaseRegulations = purchaseRegulations
        })
        .finally(() => {
          this.purchaseRegulationsLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminPostCreate {
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
