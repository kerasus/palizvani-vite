<template>
  <div class="Medias">
    <media-category v-if="documentMedias.list.length > 0"
                    :medias="documentMedias"
                    icon="receipt_long"
                    title="فایل"
                    class="q-mt-lg"
                    @onView="onView" />
    <media-category v-if="soundMedias.list.length > 0"
                    :medias="soundMedias"
                    icon="mic_none"
                    title="صوت"
                    class="q-mt-lg"
                    @onView="onView" />
    <media-category v-if="videoMedias.list.length > 0"
                    :medias="videoMedias"
                    icon="play_circle_outline"
                    title="ویدیو"
                    class="q-mt-lg"
                    media-type="video"
                    @onView="onView" />
    <media-category v-if="imageMedias.list.length > 0"
                    :medias="imageMedias"
                    icon="visibility"
                    title="تصویر"
                    class="q-mt-lg"
                    @onView="onView" />
  </div>
</template>

<script>
import { MediaList } from 'src/models/Media.js'
import MediaCategory from './MediaCategory.vue'

export default {
  name: 'Medias',
  components: { MediaCategory },
  props: {
    medias: {
      type: MediaList,
      default: new MediaList()
    },
    sourceType: {
      type: String,
      default: 'CONTENT'
    }
  },
  emits: ['update:value'],
  data () {
    return {
      fetchLoading: false
    }
  },
  computed: {
    videoMedias () {
      return this.filterMediasByType('VIDEO')
    },
    soundMedias () {
      return this.filterMediasByType('SOUND')
    },
    imageMedias () {
      return this.filterMediasByType('IMAGE')
    },
    documentMedias () {
      return this.filterMediasByType('DOCUMENT')
    }
  },
  methods: {
    filterMediasByType (type) {
      if (typeof this.medias.getType !== 'function') {
        return new MediaList()
      }
      return new MediaList(this.medias.getType(type))
    },
    onView (media) {
      if (media.url) {
        window.open(media.url, '_blank')
      }
      if (media.file) {
        window.open(media.file, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Medias {
  width: 100%;
}
</style>
