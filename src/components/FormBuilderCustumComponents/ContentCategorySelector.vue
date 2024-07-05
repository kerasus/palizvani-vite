<template>
  <q-card>
    <q-card-section>
      <span v-if="categoryType === 'content'">
        انتخاب دسته محتوا
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
                    :loading="categories.laoding" />
        </div>
        <div class="col-md-4 col-12">
          <div>
            دسته بندی جزیی
          </div>
          <q-select v-model="subCategory"
                    :options="subCategoryOptions"
                    :loading="categories.laoding" />
        </div>
        <div class="col-md-4 col-12">
          <div>
            بخش
          </div>
          <q-select v-model="bakhshCategory"
                    :options="bakhshCategoryOptions"
                    :loading="categories.laoding" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { StoreCategoryList } from 'src/models/StoreCategory.js'
import { ContentCategoryList } from 'src/models/ContentCategory.js'

export default {
  name: 'ContentCategorySelector',
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    disable: {
      default: false,
      type: Boolean
    },
    categoryType: {
      type: String,
      default: 'content'
    }
  },
  emits: ['update:value'],
  data () {
    return {
      mainCategory: null,
      subCategory: null,
      bakhshCategory: null,
      mainCategoryOptions: [],
      subCategoryOptions: [],
      bakhshCategoryOptions: [],
      categories: this.categoryType === 'content' ? new ContentCategoryList() : new StoreCategoryList()
    }
  },
  watch: {
    value () {
      if (this.value?.id) {
        this.getCategories()
      } else {
        this.inputData = this.value
      }
    },
    mainCategory (newValue) {
      this.subCategory = null
      this.subCategoryOptions = []
      if (!newValue.item.children) {
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
      if (!newValue.item.children) {
        this.$emit('update:value', newValue.value)
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
      const categoryId = newValue ? newValue.value : null
      this.$emit('update:value', categoryId)
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    setMainCategory () {
      if (!this.value?.parent?.parent?.id) {
        return
      }
      this.mainCategory = this.mainCategoryOptions.find(item => item.value === this.value.parent.parent.id)
    },
    setSubCategory () {
      if (!this.value?.parent?.id) {
        return
      }
      this.subCategory = this.subCategoryOptions.find(item => item.value === this.value.parent.id)
    },
    setBakhshCategory () {
      if (!this.value?.id) {
        return
      }
      this.bakhshCategory = this.bakhshCategoryOptions.find(item => item.value === this.value.id)
    },
    getCategories () {
      this.categories.laoding = true
      const apiGateway = this.categoryType === 'content' ? APIGateway.contentCategory.index({ parent__isnull: 'true', per_page: 99999 })
        : APIGateway.storeCategory.index({ parent__isnull: 'true', per_page: 99999 })

      apiGateway
        .then(categories => {
          if (this.categoryType === 'content') {
            this.categories = new ContentCategoryList(categories.list)
          } else {
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

          if (this.value?.parent?.parent?.id && this.value.id) {
            this.$nextTick(() => {
              this.setMainCategory()
              this.$nextTick(() => {
                this.setSubCategory()
                this.$nextTick(() => {
                  this.setBakhshCategory()
                  this.$emit('update:value', this.value.id)
                })
              })
            })
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
