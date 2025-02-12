<template>
  <div class="AdminTestCreate"
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
                   title="مشخصات تاریخچه نمره"
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

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminTranscriptSheetHistoryCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data () {
    const unitId = this.$route.params.unit_id
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.transcriptSheetHistory.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Unit.TranscriptSheetHistory.Show',
      inputs: [
        { type: 'input', name: 'national_code', responseKey: 'national_code', label: 'کد ملی', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'input', name: 'score', responseKey: 'score', label: 'نمره', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'hidden', name: 'unit', responseKey: 'unit', value: unitId },
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
    },
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity()
        .then((response) => {
          this.$router.push({ name: 'Admin.Unit.TranscriptSheetHistory.Show', params: { unit_id: this.$route.params.unit_id, id: response.data.id } })
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
.AdminTestCreate {
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
