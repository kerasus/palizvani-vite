<template>
  <div class="ContentMedias">
    <q-linear-progress v-if="fetchLoading"
                       indeterminate />
    <div v-if="canAddMedia && !readonly"
         class="q-mb-md">
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
                     :show-reload-button="false">
        <template #after-form-builder>
          <q-btn color="primary"
                 class="full-width q-mt-md"
                 :loading="entityCreateLoading"
                 @click="entityCreate">
            افزودن چند رسانه ای
          </q-btn>
        </template>
      </entity-create>
    </div>
    <media-category v-if="imageMedias.list.length > 0"
                    :medias="imageMedias"
                    icon="visibility"
                    title="تصویر"
                    class="q-mt-lg"
                    :can-delete="canDelete"
                    @onView="onView"
                    @onDelete="onDelete" />
    <media-category v-if="soundMedias.list.length > 0"
                    :medias="soundMedias"
                    icon="mic_none"
                    title="صوت"
                    class="q-mt-lg"
                    :can-delete="canDelete"
                    @onView="onView"
                    @onDelete="onDelete" />
    <media-category v-if="videoMedias.list.length > 0"
                    :medias="videoMedias"
                    icon="play_circle_outline"
                    title="ویدیو"
                    class="q-mt-lg"
                    :can-delete="canDelete"
                    @onView="onView"
                    @onDelete="onDelete" />
    <media-category v-if="documentMedias.list.length > 0"
                    :medias="documentMedias"
                    icon="receipt_long"
                    title="سند"
                    class="q-mt-lg"
                    :can-delete="canDelete"
                    @onView="onView"
                    @onDelete="onDelete" />
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { Media, MediaList } from 'src/models/Media.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import MediaCategory from 'src/components/FormBuilderCustumComponents/ContentMedias/MediaCategory.vue'

export default {
  name: 'ContentMedias',
  components: { MediaCategory, EntityCreate },
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    disable: {
      default: false,
      type: Boolean
    },
    canDelete: {
      type: Boolean,
      default: true
    },
    canAddMedia: {
      type: Boolean,
      default: true
    },
    sourceType: {
      type: String,
      default: 'CONTENT'
    },
    readonly: {
      default: false,
      type: Boolean
    },
    showPageLink: {
      default: true,
      type: Boolean
    },
    showDownloadLink: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:value'],
  data () {
    return {
      fetchLoading: false,
      medias: new MediaList(),
      api: APIGateway.media.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'file', name: 'file', responseKey: 'file', label: 'فایل', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'select', name: 'type', responseKey: 'type', label: 'نوع', placeholder: ' ', options: (new Media()).typeEnums, col: 'col-md-4 col-12' },
        { type: 'input', name: 'url', responseKey: 'url', label: 'url', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'iframe_code', responseKey: 'iframe_code', label: 'iframe_code', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'script_code', responseKey: 'script_code', label: 'script_code', placeholder: ' ', col: 'col-12' },
        { type: 'hidden', name: 'source_type', responseKey: 'source_type', value: 'CONTENT' }
      ],
      entityCreateLoading: false
    }
  },
  computed: {
    videoMedias () {
      return new MediaList(this.medias.getType('VIDEO'))
    },
    soundMedias () {
      return new MediaList(this.medias.getType('SOUND'))
    },
    imageMedias () {
      return new MediaList(this.medias.getType('IMAGE'))
    },
    documentMedias () {
      return new MediaList(this.medias.getType('DOCUMENT'))
    }
  },
  watch: {
    value: {
      handler () {
        this.inputData = this.value
        if (this.value && this.value.length > 0 && this.value[0].id) {
          this.medias = new MediaList(this.value)
          this.$emit('update:value', this.medias.list.map(item => item.id))
        }
      },
      immediate: true
    }
  },
  created () {
    FormBuilderAssist.setAttributeByName(this.inputs, 'source_type', 'value', this.sourceType)
    this.inputData = this.value
    this.medias = new MediaList(this.value)
  },
  methods: {
    onView (media) {
      if (this.showPageLink) {
        const routeData = this.$router.resolve({ name: 'Admin.Media.Show', params: { id: media.id } })
        window.open(routeData.href, '_blank')
        return
      }
      if (this.showDownloadLink) {
        if (media.url) {
          window.open(media.url, '_blank')
        }

        const source = media.file
        if (!source) {
          return
        }
        window.open(source, '_blank')

        // const fileName = (source.match(/(?<=\/)[^/?#]+(?=[^/]*$)/gm) || [media.title])[0]
        // this.fetchLoading = true
        // fetch(source)
        //   .then(response => response.blob())
        //   .then(blob => {
        //     const link = document.createElement('a')
        //     link.href = URL.createObjectURL(blob)
        //     link.download = fileName
        //     link.click()
        //     this.fetchLoading = false
        //   })
        //   .catch(() => {
        //     this.fetchLoading = false
        //   })
      }
    },
    onDelete (media) {
      this.removeMedia(media.id)
    },
    removeMedia (mediaId) {
      const mediaIndex = this.medias.list.findIndex(item => item.id === mediaId)
      if (mediaIndex === -1) {
        return
      }
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
  width: 100%;
}
</style>
