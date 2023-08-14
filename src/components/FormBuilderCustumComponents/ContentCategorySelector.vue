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
                :loading="contentCategories.laoding" />
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
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
      contentCategories: new ContentCategoryList()
    }
  },
  watch: {
    value () {
      if (this.value.id) {
        this.getCategories()
      } else {
        this.inputData = this.value
      }
    },
    mainCategory (newValue) {
      this.subCategory = null
      this.subCategoryOptions = []
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
          this.contentCategories.laoding = false
        })
    }
  }

}
</script>

<style lang="scss" scoped>
.ContentCategorySelector {
}
</style>
