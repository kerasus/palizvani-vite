<template>
  <div class="ContentCategorySelector row q-col-gutter-md">
    <div class="col-md-4 col-12">
      <div>
        دسته بندی اصلی
      </div>
      <q-select v-model="mainCategory"
                :options="mainCategoryOptions"
                :loading="contentCategories.laoding" />
    </div>
    <div class="col-md-4 col-12">
      <div>
        دسته بندی جزیی
      </div>
      <q-select v-model="subCategory"
                :options="subCategoryOptions"
                :loading="contentCategories.laoding" />
    </div>
    <div class="col-md-4 col-12">
      <div>
        بخش
      </div>
      <q-select v-model="bakhshCategory"
                :options="bakhshCategoryOptions"
                :loading="contentCategories.laoding"
                @update:model-value="onChangeBakhsh" />
    </div>
    <div class="col-12">
      <div>
        انتخاب منابع
      </div>
      <q-select v-model="localContents"
                :options="contentOptions.list"
                :option-label="'title'"
                :option-value="'id'"
                multiple
                :loading="contentOptions.loading" />
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { ContentList } from 'src/models/Content.js'
import { ContentCategoryList } from 'src/models/ContentCategory.js'

export default {
  name: 'SelectorComponent',
  props: {
    contents: {
      default: () => [],
      type: Array
    }
  },
  emits: ['update:contents'],
  data () {
    return {
      initialDataLoaded: false,
      contentOptions: new ContentList(),
      mainCategory: null,
      subCategory: null,
      bakhshCategory: null,
      mainCategoryOptions: [],
      subCategoryOptions: [],
      bakhshCategoryOptions: [],
      contentCategories: new ContentCategoryList()
    }
  },
  computed: {
    localContents: {
      get () {
        return this.contents
      },
      set (newValue) {
        if (newValue.length === 0) {
          console.trace()
        }
        this.$emit('update:contents', newValue)
      }
    }
  },
  watch: {
    contents: {
      handler () {
        this.setCategories()
      },
      immediate: true
    },
    mainCategory (newValue) {
      this.subCategory = null
      this.subCategoryOptions = []
      if (!newValue) {
        return
      }
      this.subCategoryOptions = newValue.item.children.map(item => {
        return {
          item,
          label: item.title,
          value: item.id
        }
      })
    },
    subCategory (newValue) {
      this.bakhshCategory = null
      this.bakhshCategoryOptions = []
      if (!newValue) {
        return
      }
      this.bakhshCategoryOptions = newValue.item.children.map(item => {
        return {
          item,
          label: item.title,
          value: item.id
        }
      })
    },
    bakhshCategory (newValue) {
      if (!newValue) {
        return
      }
      const categoryId = newValue ? newValue.value : null
      this.getContents(categoryId)
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    setMainCategory () {
      const firstContent = (this.localContents && this.localContents.length > 0) ? this.localContents[0] : null
      if (!firstContent?.category_info?.parent?.parent?.id) {
        return
      }
      this.mainCategory = this.mainCategoryOptions.find(item => item.value === firstContent?.category_info.parent.parent.id)
    },
    setSubCategory () {
      const firstContent = (this.localContents && this.localContents.length > 0) ? this.localContents[0] : null
      if (!firstContent?.category_info?.parent?.id) {
        return
      }
      this.subCategory = this.subCategoryOptions.find(item => item.value === firstContent?.category_info.parent.id)
    },
    setBakhshCategory () {
      const firstContent = (this.localContents && this.localContents.length > 0) ? this.localContents[0] : null
      if (!firstContent?.category_info?.id) {
        return
      }
      this.bakhshCategory = this.bakhshCategoryOptions.find(item => item.value === firstContent?.category_info.id)
    },
    setCategories () {
      this.$nextTick(() => {
        this.setMainCategory()
        this.$nextTick(() => {
          this.setSubCategory()
          this.$nextTick(() => {
            this.setBakhshCategory()
            this.$nextTick(() => {
              this.initialDataLoaded = true
            })
          })
        })
      })
    },
    getCategories () {
      this.contentCategories.laoding = true
      APIGateway.contentCategory.index({ parent__isnull: 'true', per_page: 99999 })
        .then(contentCategories => {
          this.contentCategories = new ContentCategoryList(contentCategories.list)
          this.contentCategories.laoding = false
          this.mainCategoryOptions = this.contentCategories.list.map(item => {
            return {
              item,
              label: item.title,
              value: item.id
            }
          })
        })
        .catch(() => {
          this.contentCategories.laoding = false
        })
    },
    getContents (categoryId) {
      this.contentOptions = new ContentList()
      this.contentOptions.loading = true
      APIGateway.content.index({ category: categoryId, per_page: 9999 })
        .then(contents => {
          this.contentOptions = new ContentList(contents.list)
          this.contentOptions.loading = false
        })
        .catch(() => {
          this.contentOptions.loading = false
        })
    },
    onChangeBakhsh () {
      this.localContents = []
    }
  }

}
</script>

<style lang="scss" scoped>
.ContentCategorySelector {
}
</style>
