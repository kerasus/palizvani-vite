<template>
  <q-card>
    <q-card-section>
      <div>
        ({{ value || file }})
      </div>
      <entity-create ref="entityCreate"
                     v-model:value="inputs"
                     title="آپلود تصویر"
                     :api="api"
                     :default-layout="false"
                     :entity-id-key-in-response="entityIdKeyInResponse"
                     :show-route-param-key="showRouteParamKey"
                     :index-route-name="indexRouteName"
                     :show-route-name="showRouteName"
                     :after-send-data="afterSendData" />
      <div class="action">
        <div class="row q-mt-lg justify-end">
          <div class="col-md-4 col-12">
            <q-btn color="primary"
                   class="full-width"
                   :loading="entityLoading"
                   @click="create">
              آپلود
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'ImageUploader',
  components: { EntityCreate },
  props: {
    value: {
      type: String,
      default: null
    },
    file: {
      type: String,
      default: null
    }
  },
  data: () => {
    return {
      entityLoading: false,
      api: APIGateway.media.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.Service.Show',
      indexRouteName: 'AdminPanel.Service.List',
      inputs: [
        { type: 'file', name: 'file', responseKey: 'file', label: 'فایل تصویر', col: 'col-md-6 col-12' },
        { type: 'hidden', name: 'source_type', value: 'SETTING' },
        { type: 'hidden', name: 'type', value: 'VIDEO' }
      ]
    }
  },
  methods: {
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity(false)
        .then(() => {
          this.entityLoading = false
        })
        .catch(() => {
          this.entityLoading = false
        })
    },
    afterSendData (response) {
      this.$emit('update:file', response.data.file)
      this.$emit('update:value', "url('" + response.data.file + "')")
    }
  }
}
</script>

<style scoped>

</style>
