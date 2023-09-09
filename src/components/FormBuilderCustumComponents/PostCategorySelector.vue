<template>
  <div class="PostCategorySelector row q-col-gutter-md">
    <div class="col-md-4 col-12">
      <div>
        دسته بندی اصلی
      </div>
      <q-select v-model="mainCategory"
                :options="mainCategoryOptions"
                :loading="postCategories.laoding" />
    </div>
    <div class="col-md-4 col-12">
      <div>
        دسته بندی جزیی
      </div>
      <q-select v-model="subCategory"
                :options="subCategoryOptions"
                :loading="postCategories.laoding" />
    </div>
    <div class="col-md-4 col-12">
      <div>
        بخش
      </div>
      <q-select v-model="bakhshCategory"
                :options="bakhshCategoryOptions"
                :loading="postCategories.laoding" />
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { PostCategoryList } from 'src/models/PostCategory.js'

export default {
  name: 'PostCategorySelector',
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
      postCategories: new PostCategoryList()
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
      this.postCategories.laoding = true
      APIGateway.postCategory.index({ parent__isnull: 'true', per_page: 99999 })
        .then(postCategories => {
          this.postCategories = new PostCategoryList(postCategories.list)
          this.postCategories.laoding = false
          this.mainCategoryOptions = this.postCategories.list.map(item => {
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
          this.postCategories.laoding = false
        })
    }
  }

}
</script>

<style lang="scss" scoped>
.PostCategorySelector {
}
</style>
