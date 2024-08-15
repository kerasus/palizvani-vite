<template>
  <div class="MediaCategory">
    <div class="title">
      <q-icon :name="icon"
              size="19px" />
      {{ title }}
    </div>
    <div class="media-list row q-col-gutter-md">
      <div v-for="media in medias.list"
           :key="media.id"
           class="media-item col-md-3 col-sm-6 col-12">
        <media-item :media="media"
                    :media-type="mediaType"
                    @onView="onView(media)" />
      </div>
    </div>
  </div>
</template>

<script>
import { MediaList } from 'src/models/Media.js'
import MediaItem from './MediaItem.vue'

export default {
  name: 'MediaCategory',
  components: { MediaItem },
  props: {
    medias: {
      type: MediaList,
      default: new MediaList()
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    mediaType: {
      type: String,
      default: null
    }
  },
  emits: ['update:value', 'onView', 'onDelete'],
  data () {
    return {
      entityCreateLoading: false
    }
  },
  methods: {
    onView (media) {
      this.$emit('onView', media)
    }
  }
}
</script>

<style lang="scss" scoped>
.MediaCategory {
  .title {
    font-size: 16px;
    letter-spacing: 0;
    color: #212121;
    margin-bottom: 26px;
    .q-icon {
      margin-left: 9px;
    }
  }
}
</style>
