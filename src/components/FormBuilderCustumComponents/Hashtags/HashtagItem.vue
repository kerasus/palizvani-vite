<template>
  <div class="HashtagItam">
    <div class="title ellipsis">
      {{ hashtag.title }}
    </div>
    <div class="actions">
      <q-btn v-if="canDelete"
             class="deleteBtn"
             icon="clear"
             outline
             dense
             round
             color="red"
             size="sm"
             @click="onDelete" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HashtagItam',
  props: {
    hashtag: {
      type: Object,
      default: () => {
        return {
          title: ''
        }
      }
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
.HashtagItam {
  background: #F9F9F9;
  border: 1px solid #DFE1EC;
  border-radius: 50px;
  padding: 8px 12px 8px 12px;
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
      width: 28px;
      height: 28px;
      border-radius: 100%;
      &.viewBtn {
      }
      &.deleteBtn {
        margin-left: 16px;
      }
    }
  }
}
</style>
