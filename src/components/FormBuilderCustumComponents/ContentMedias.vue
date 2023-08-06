<template>
  <q-card class="ContentMedias">
    <q-card-section>
      <q-list bordered
              separator
              class="q-mb-md">
        <q-item class="media-item">
          <q-item-label>
            لیست چند رسانه ای های تعریف شده
          </q-item-label>
        </q-item>
        <q-item v-for="(media, mediaIndex) in medias.list"
                :key="media.id"
                class="media-item">
          <q-item-section>
            <q-item-label>
              <q-btn icon="isax:trash"
                     round
                     color="red"
                     @click="removeMedia(mediaIndex)" />
              {{ media.title }}
            </q-item-label>
            <q-item-label caption>{{ media.type_info?.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <entity-create ref="entityCreate"
                     v-model:value="inputs"
                     title="تعریف چند رسانه ای"
                     :api="api"
                     :entity-id-key="entityIdKey"
                     :entity-param-key="entityParamKey"
                     :show-close-button="false"
                     :show-edit-button="false"
                     :show-expand-button="false"
                     :show-save-button="false"
                     :show-reload-button="false" />
      <q-btn color="primary"
             class="full-width q-mt-md"
             :loading="entityCreateLoading"
             @click="entityCreate">
        افزودن چند رسانه ای
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { Media, MediaList } from 'src/models/Media.js'

export default {
  name: 'ContentMedias',
  components: { EntityCreate },
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    disable: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:value'],
  data () {
    return {
      medias: new MediaList(),
      api: APIGateway.media.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'select', name: 'type', responseKey: 'type', label: 'نوع', placeholder: ' ', options: (new Media()).typeEnums, col: 'col-md-4 col-12' },
        { type: 'file', name: 'file', responseKey: 'file', label: 'فایل', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'url', responseKey: 'url', label: 'url', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'iframe_code', responseKey: 'iframe_code', label: 'iframe_code', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'script_code', responseKey: 'script_code', label: 'script_code', placeholder: ' ', col: 'col-12' },
        { type: 'hidden', name: 'source_type', responseKey: 'source_type', value: 'CONTENT' }
      ],
      entityCreateLoading: false
    }
  },
  watch: {
    value () {
      this.inputData = this.value
      if (this.value.length > 0 && this.value[0].id) {
        this.medias = new MediaList(this.value)
        this.$emit('update:value', this.medias.list.map(item => item.id))
      }
    }
  },
  created () {
    this.inputData = this.value
  },
  methods: {
    removeMedia (mediaIndex) {
      this.medias.list.splice(mediaIndex, 1)
      this.$emit('update:value', this.medias.list.map(item => item.id))
    },
    entityCreate () {
      this.entityCreateLoading = true
      this.$refs.entityCreate.createEntity(false)
        .then(response => {
          this.medias.list.push(new Media(response.data))
          this.entityCreateLoading = false
          this.$emit('update:value', this.medias.list.map(item => item.id))
        })
        .catch(() => {
          this.entityCreateLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentMedias {
  :deep(.media-item) {
    display: block;
  }
}
</style>
