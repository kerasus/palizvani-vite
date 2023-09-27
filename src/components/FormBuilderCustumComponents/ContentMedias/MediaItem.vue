<template>
  <div class="MediaItem">
    <div class="title ellipsis">
      {{ media.title }}
    </div>
    <div class="actions">
      <q-btn icon="visibility"
             outline
             class="viewBtn"
             color="primary"
             @click="onView" />
      <q-btn v-if="canDelete"
             class="deleteBtn"
             icon="delete"
             outline
             color="red"
             @click="onDelete" />
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
    canDelete: {
      type: Boolean,
      default: true
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
  padding: 10px 16px 10px 21px;
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
      width: 42px;
      height: 42px;
      &.viewBtn {
      }
      &.deleteBtn {
        margin-left: 16px;
      }
    }
  }
}
</style>
