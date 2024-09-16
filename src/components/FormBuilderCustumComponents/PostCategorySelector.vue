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
      type: [Array, String, Number, Boolean, Object]
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
      if (this.value?.id) {
        this.getCategories()
      } else if (this.value) {
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
      if (!newValue?.item?.children) {
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
      const categoryId = newValue ? newValue.value : null
      this.$emit('update:value', categoryId)
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    setMainCategory (category) {
      if (!category?.parent?.parent?.id) {
        return
      }
      this.mainCategory = this.mainCategoryOptions.find(item => item.value === category.parent.parent.id)
    },
    setSubCategory (category) {
      if (!category?.parent?.id) {
        return
      }
      this.subCategory = this.subCategoryOptions.find(item => item.value === category.parent.id)
    },
    setBakhshCategory (category) {
      if (!category?.id) {
        return
      }
      this.bakhshCategory = this.bakhshCategoryOptions.find(item => item.value === category.id)
    },
    getCategories () {
      this.postCategories.laoding = true
      const args = { parent__isnull: 'true', per_page: 99999 }
      const apiGateway = APIGateway.postCategory.index(args)
      apiGateway
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

          if (this.value?.parent?.parent?.id && this.value?.id) {
            const category = this.value
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
