<template>
  <div class="MediaItem">
    <div class="title ellipsis">
      {{ media.title }}
    </div>
    <div class="actions">
      <q-btn class="viewBtn"
             color="primary"
             @click="onView">
        <template v-if="mediaType === 'video'">
          مشاهده
        </template>
        <template v-else>
          <q-icon name="file_download" />
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Media } from 'src/models/Media.js'

export default {
  name: 'MediaItem',
  props: {
    media: {
      type: Media,
      default: new Media()
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
    onView () {
      this.$emit('onView')
    },
    onDelete () {
      this.$emit('onDelete')
    }
  }
}
</script>

<style lang="scss" scoped>
.MediaItem {
  background: #F9F9F9;
  border: 1px solid #DFE1EC;
  border-radius: 10px;
  padding: 8px 4px 8px 4px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 15px;
    letter-spacing: 0;
    color: #212121;
  }
  .actions {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    .q-btn {
    }
  }
  @media screen and (min-width: 600px) {
    & {
      padding: 24px 48px 24px 48px;
    }
  }
}
</style>
