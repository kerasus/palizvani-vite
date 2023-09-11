<template>
  <q-card class="ImageUploader">
    <q-card-section>
      <div class="address">
        <q-input v-model="displayAddress"
                 readonly />
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
      <q-separator class="q-my-md" />
      <div>
        <div>
          آدرس عکس دلخواه
          <br>
          (در صورتی که قبلا عکس را آپلود کرده اید می توانید به جای آپلود مجدد، آدرس عکس را در این قسمت قرار دهید)
        </div>
        <q-input v-model="customUrl" />
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
      customUrl: null,
      entityLoading: false,
      api: APIGateway.media.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'AdminPanel.Service.Show',
      indexRouteName: 'AdminPanel.Service.List',
      inputs: [
        { type: 'file', name: 'file', responseKey: 'file', label: 'فایل تصویر', col: 'col-12' },
        { type: 'hidden', name: 'source_type', value: 'SETTING' },
        { type: 'hidden', name: 'type', value: 'VIDEO' }
      ]
    }
  },
  computed: {
    displayAddress: {
      get () {
        return this.value || this.file
      }
    }
  },
  watch: {
    customUrl (newValue) {
      if (!newValue) {
        return
      }

      this.$emit('update:file', newValue)
      this.$emit('update:value', "url('" + newValue + "')")
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

<style scoped lang="scss">
.ImageUploader {
  .address {
    max-width: 100%;
  }
}
</style>
