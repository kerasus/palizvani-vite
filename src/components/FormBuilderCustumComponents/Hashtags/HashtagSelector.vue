<template>
  <div class="ContentMedias">
    <q-select v-model="selectedHashtags"
              use-input
              hide-selected
              map-options
              multiple
              option-value="id"
              option-label="title"
              input-debounce="300"
              label="کلیدواژه"
              :loading="fetchLoading"
              :options="filteredHashtags"
              @update:model-value="onChangeSelected"
              @filter="filterFn">
      <template #prepend>
        <q-btn icon="add"
               flat
               @click="addHashtag" />
        <q-icon name="search" />
      </template>
      <template v-slot:no-option>
        <span v-if="fetchLoading">
          کمی صبر کنید...
        </span>
        <span v-else>
          موردی یافت نشد
        </span>
      </template>
    </q-select>
    <div class="selected-hastags">
      <hashtag-item v-for="(hashtag, hashtagIndex) in selectedHashtags"
                    :key="hashtagIndex"
                    :hashtag="hashtag"
                    :can-delete="!readonly"
                    @onDelete="onDeleteHashtag(hashtagIndex)" />
    </div>
  </div>
</template>

<script>
import HashtagItem from './HashtagItem.vue'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'HashtagSelector',
  components: { HashtagItem },
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    disable: {
      default: false,
      type: Boolean
    },
    readonly: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:value'],
  data () {
    return {
      selectedHashtags: [],
      filteredHashtags: [],
      fetchLoading: false
    }
  },
  watch: {
    value: {
      handler () {
        if (this.value && this.value.length > 0 && this.value[0].id) {
          this.selectedHashtags = this.value
          this.emitUpdateValue()
        }
      },
      immediate: true
    }
  },
  methods: {
    addHashtag () {
      // this.fetchLoading = true
    },
    onChangeSelected () {
      this.emitUpdateValue()
    },
    getHashtags (search) {
      return new Promise((resolve, reject) => {
        APIGateway.mediaHashtag.index({ search })
          .then((hashtagList) => {
            resolve(hashtagList.list.list)
          })
          .catch(() => {
            reject()
          })
      })
    },
    filterFn (val, update) {
      if (!val) {
        this.filteredHashtags = []
        return
      }

      update(() => {
        this.fetchLoading = true
        this.getHashtags(val)
          .then((hashtagList) => {
            this.filteredHashtags = hashtagList
          })
          .catch(() => {
            this.filteredHashtags = []
          })
          .finally(() => {
            this.fetchLoading = false
          })
      })
    },
    onDeleteHashtag(hashtagIndex) {
      this.selectedHashtags.splice(hashtagIndex, 1)
      this.emitUpdateValue()
    },
    emitUpdateValue () {
      const selectedIds = this.selectedHashtags.map(item => item.id)
      console.log('selectedIds', selectedIds)
      this.$emit('update:value', selectedIds)
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentMedias {
  width: 100%;
  .selected-hastags {
    margin-top: 8px;
    display: flex;
    justify-content: flex-start;
    gap: 8px;
  }
}
</style>
