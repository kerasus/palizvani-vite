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
              @new-value="addHashtag"
              @update:model-value="onChangeSelected"
              @filter="filterFn">
      <template #prepend>
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
      selectInput: null,
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
    addHashtag (val, done) {
      this.fetchLoading = true
      APIGateway.hashtag.create(val)
        .then((hashtag) => {
          done(hashtag)
        })
        .finally(() => {
          this.fetchLoading = false
        })
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
      this.selectInput = val
      if (!val) {
        this.filteredHashtags = []
        return
      }

      this.fetchLoading = true
      this.getHashtags(val)
        .then((hashtagList) => {
          update(() => {
            this.filteredHashtags = hashtagList
          })
        })
        .catch(() => {
          update(() => {
            this.filteredHashtags = []
          })
        })
        .finally(() => {
          this.fetchLoading = false
        })
    },
    onDeleteHashtag(hashtagIndex) {
      this.selectedHashtags.splice(hashtagIndex, 1)
      this.emitUpdateValue()
    },
    emitUpdateValue () {
      const selectedIds = this.selectedHashtags.map(item => item.id)
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
