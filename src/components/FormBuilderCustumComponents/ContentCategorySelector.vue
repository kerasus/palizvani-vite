<template>
  <q-card>
    <q-card-section>
      <span v-if="categoryType === 'content'">
        انتخاب دسته محتوا
      </span>
      <span v-if="categoryType === 'contentTopic'">
        انتخاب دسته موضوع
      </span>
      <span v-else-if="categoryType === 'store'">
        انتخاب دسته فروشگاه
      </span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="ContentCategorySelector row q-col-gutter-md">
        <div class="col-md-4 col-12">
          <div>
            دسته بندی اصلی
          </div>
          <q-select v-model="mainCategory"
                    :options="mainCategoryOptions"
                    :loading="categories.laoding"
                    clearable />
        </div>
        <div class="col-md-4 col-12">
          <div>
            دسته بندی جزیی
          </div>
          <q-select v-model="subCategory"
                    :options="subCategoryOptions"
                    :loading="categories.laoding"
                    clearable />
        </div>
        <div class="col-md-4 col-12">
          <div>
            بخش
          </div>
          <q-select v-model="bakhshCategory"
                    :options="bakhshCategoryOptions"
                    :loading="categories.laoding"
                    clearable />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { StoreCategoryList } from 'src/models/StoreCategory.js'
import { ContentCategoryList } from 'src/models/ContentCategory.js'
import { ContentTopicCategoryList } from 'src/models/ContentTopicCategory.js'

export default {
  name: 'ContentCategorySelector',
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean, Object]
    },
    disable: {
      default: false,
      type: Boolean
    },
    categoryType: {
      type: String,
      default: 'content' // 'content', 'contentTopic', 'store'
    }
  },
  emits: ['update:value'],
  data () {
    let categories = new ContentCategoryList()
    if (this.categoryType === 'store') {
      categories = new StoreCategoryList()
    }
    if (this.categoryType === 'contentTopic') {
      categories = new ContentTopicCategoryList()
    }
    return {
      mainCategory: null,
      subCategory: null,
      bakhshCategory: null,
      mainCategoryOptions: [],
      subCategoryOptions: [],
      bakhshCategoryOptions: [],
      categories
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (newValue && oldValue && newValue.toString() === oldValue.toString()) {
        return
      }
      if (this.value?.id) {
        this.getCategories()
        // this.$emit('update:value', this.value.id)
      } else if (this.value) {
        this.inputData = this.value
      }
    },
    mainCategory (newValue) {
      this.subCategory = null
      this.subCategoryOptions = []
      if (this.categoryType === 'content') {
        const selectedCategoryId = newValue?.value ? newValue?.value : null
        this.$emit('update:value', selectedCategoryId)
        return
      } else if (!newValue.item.children) {
        this.$emit('update:value', newValue.value)
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
      if (this.categoryType === 'content') {
        let selectedCategoryId = newValue?.value ? newValue?.value : null
        if (this.mainCategory.value) {
          selectedCategoryId = this.mainCategory.value
        }
        if (newValue?.value) {
          selectedCategoryId = this.subCategory.value
        }
        this.$emit('update:value', selectedCategoryId)
        return
      } else if (!newValue?.item?.children) {
        this.$emit('update:value', null)
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
      let selectedCategoryId = null
      const categoryId = newValue ? newValue.value : null
      if (this.categoryType === 'content') {
        if (this.mainCategory.value) {
          selectedCategoryId = this.mainCategory.value
        }
        if (this.subCategory.value) {
          selectedCategoryId = this.subCategory.value
        }
        if (categoryId) {
          selectedCategoryId = categoryId
        }
      } else {
        selectedCategoryId = categoryId
      }
      this.$emit('update:value', selectedCategoryId)
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    setMainCategory (category, categoryType = 'bakhshCategory') {
      if (categoryType === 'bakhshCategory' && !category?.parent?.parent?.id) {
        return
      }
      if (categoryType === 'subCategory' && !category?.parent?.id) {
        return
      }
      if (categoryType === 'mainCategory' && !category?.id) {
        return
      }
      this.mainCategory = this.mainCategoryOptions.find(item => (
        (categoryType === 'bakhshCategory' && item.value === category.parent.parent.id) ||
        (categoryType === 'subCategory' && item.value === category.parent.id) ||
        (categoryType === 'mainCategory' && item.value === category.id)
      ))
    },
    setSubCategory (category, categoryType = 'bakhshCategory') {
      if (categoryType === 'bakhshCategory' && !category?.parent?.id) {
        return
      }
      if (categoryType === 'subCategory' && !category?.id) {
        return
      }
      this.subCategory = this.subCategoryOptions.find(item => (
        (categoryType === 'bakhshCategory' && item.value === category.parent.id) ||
        (categoryType === 'subCategory' && item.value === category.id)
      ))
    },
    setBakhshCategory (category) {
      if (!category?.id) {
        return
      }
      this.bakhshCategory = this.bakhshCategoryOptions.find(item => item.value === category.id)
    },
    setMainAndSubAndBakshCategory (category) {
      this.$nextTick(() => {
        this.setMainCategory(category)
        this.$nextTick(() => {
          this.setSubCategory(category)
          this.$nextTick(() => {
            this.setBakhshCategory(category)
            this.$emit('update:value', category.id)
          })
        })
      })
    },
    setMainAndSubCategory (category) {
      this.$nextTick(() => {
        this.setMainCategory(category, 'subCategory')
        this.$nextTick(() => {
          this.setSubCategory(category, 'subCategory')
          this.$emit('update:value', category.id)
        })
      })
    },
    getCategories () {
      this.categories.laoding = true
      const args = { parent__isnull: 'true', per_page: 99999 }

      let apiGateway = APIGateway.contentCategory.index(args)
      if (this.categoryType === 'store') {
        apiGateway = APIGateway.storeCategory.index(args)
      }
      if (this.categoryType === 'contentTopic') {
        apiGateway = APIGateway.contentTopicCategory.index(args)
      }

      apiGateway
        .then(categories => {
          if (this.categoryType === 'content') {
            this.categories = new ContentCategoryList(categories.list)
          } else if (this.categoryType === 'contentTopic') {
            this.categories = new ContentTopicCategoryList(categories.list)
          } else if (this.categoryType === 'store') {
            this.categories = new StoreCategoryList(categories.list)
          }

          this.categories.laoding = false
          this.mainCategoryOptions = this.categories.list.map(item => {
            return {
              item,
              label: item.title,
              value: item.id
            }
          })

          if (this.value?.parent?.parent?.id && this.value?.id) {
            this.setMainAndSubAndBakshCategory(this.value)
          }

          if (this.categoryType === 'content') {
            if (!this.value?.parent?.parent?.id && this.value?.parent?.id && this.value?.id) {
              this.setMainAndSubCategory(this.value)
            } else if (!this.value?.parent?.parent?.id && !this.value?.parent?.id && this.value?.id) {
              this.setMainCategory(this.value, 'mainCategory')
            }
          }
        })
        .catch(() => {
          this.categories.laoding = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentCategorySelector {
}
</style>
