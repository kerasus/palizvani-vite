<template>
  <div class="AdminNoticeCreate"
       :style="localOptions.style">
    <entity-create v-if="mounted"
                   ref="entityCreate"
                   v-model:value="inputs"
                   title="ارسال اعلان"
                   :api="api"
                   :entity-id-key-in-response="entityIdKeyInResponse"
                   :show-route-param-key="showRouteParamKey"
                   :index-route-name="indexRouteName"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-save-button="false"
                   :show-expand-button="false" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminNoticeCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.notice.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.Notice.Show',
      indexRouteName: 'AdminPanel.Notice.List',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'url', responseKey: 'url', label: 'لینک', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'body', responseKey: 'body', label: 'متن', placeholder: ' ', col: 'col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ارسال', placeholder: ' ', atClick: this.create, col: 'col-md-6' }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = true
    })
  },
  methods: {
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity()
        .then(() => {
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
.AdminNoticeCreate {
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
