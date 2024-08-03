<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar__header-title">
        فیلترها
      </div>
      <q-btn flat
             class="sidebar__header-remove-filters"
             @click="clearFilters">
        <q-icon name="delete_outline" />
        حذف فیلترها
      </q-btn>
    </div>
    <div class="sidebar__selected-filters">
      <div v-for="(tag, tagIndex) in selectedFilters"
           :key="tagIndex"
           class="sidebar__selected-filter">
        <div class="sidebar__selected-filter-title">
          {{ tag.label }}
        </div>
        <q-btn class="sidebar__selected-filter-btn-remove"
               flat
               icon="close"
               @click="removeFilterTag(tag)" />
      </div>
    </div>
    <q-separator />
    <div class="sidebar__price-filter">
      <q-range v-model="filters.price"
               :min="minPrice"
               :step="100"
               :max="maxPrice"
               @update:model-value="updateFilter" />
      <div class="sidebar__price-label">
        <div class="sidebar__price-label-min">
          از
          {{ parseInt(filters.price.min.toString()).toLocaleString('fa') }}
          تومان
        </div>
        <div class="sidebar__price-label-max">
          تا
          {{ parseInt(filters.price.max.toString()).toLocaleString('fa') }}
          تومان
        </div>
      </div>
    </div>
    <q-separator />
    <div class="sidebar__exist-filter">
      <div class="sidebar__exist-label">
        فقط محصولات موجود
      </div>
      <q-toggle v-model="filters.exist"
                @update:model-value="updateFilter" />
    </div>
    <template v-if="type === 'product'">
      <q-separator />
      <div class="sidebar__category-filter">
        <q-expansion-item expand-separator
                          label="دسته بندی ها">
          <q-linear-progress v-if="storeCategories.loading"
                             indeterminate />
          <q-tree v-if="!storeCategories.loading"
                  v-model:ticked="filters.categories"
                  class="col-12 col-sm-6"
                  :nodes="storeCategories.list"
                  children-key="children"
                  label-key="title"
                  node-key="id"
                  tick-strategy="leaf"
                  @update:ticked="updateFilter" />
        </q-expansion-item>
      </div>
      <q-separator />
      <div class="sidebar__type-filter">
        <q-expansion-item expand-separator
                          label="نوع">
          <q-tree v-model:ticked="filters.types"
                  class="col-12 col-sm-6"
                  :nodes="types"
                  children-key="children"
                  label-key="label"
                  node-key="value"
                  tick-strategy="leaf"
                  @update:ticked="updateFilter" />
        </q-expansion-item>
      </div>
    </template>
  </div>
</template>

<script>
import { Media } from 'src/models/Media.js'
import { APIGateway } from 'src/api/APIGateway'
import { StoreCategoryList } from 'src/models/StoreCategory.js'
import { Product } from 'src/models/Product.js'

export default {
  name: 'sidebar',
  props: {
    type: {
      type: String,
      default: 'product'
    }
  },
  emits: ['onChangeFilters'],
  data () {
    return {
      searchTab: 'product',
      filters: {
        exist: false,
        categories: [], // content_category
        types: [],
        price: {
          min: 100, // unit_price__gte
          max: 1000000 // unit_price__lt
        }
      },
      minPrice: 0,
      maxPrice: 1500000,
      types: [
        {
          label: 'مجازی',
          value: 'virtual',
          children: (new Media()).typeEnums
        },
        {
          label: 'فیزیکی',
          value: 'physical',
          children: (new Product()).physical_typeEnums
        }
      ],
      api: APIGateway.product.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [],
      storeCategories: new StoreCategoryList(),
      table: {
        columns: []
      },
      mounted: false,
      createRouteName: ''
    }
  },
  computed: {
    selectedFilters () {
      const tags = []

      if (this.filters.exist) {
        tags.push({
          label: 'کالاهای موجود',
          filterKey: 'exist'
        })
      }

      if (this.filters.categories.length > 0) {
        this.filters.categories.map(categoryId => this.getCategory(categoryId)).filter(item => item).forEach(item => {
          tags.push({
            label: item.title,
            filterKey: 'storeCategories',
            value: item
          })
        })
      }

      if (this.filters.types.length > 0) {
        this.filters.types.map(typeValue => this.getType(typeValue)).filter(item => item).forEach(item => {
          tags.push({
            label: item.label,
            filterKey: 'types',
            value: item
          })
        })
      }

      return tags
    },
    virtualTypes () {
      return (new Media()).typeEnums.map(obj => (obj.value))
    },
    physicalTypes() {
      return (new Product()).physical_typeEnums.map(obj => (obj.value))
    }
  },
  mounted() {
    this.getStoreCategories()
  },
  methods: {
    updateFilter () {
      const productFilters = {
        unit_price__lt: this.filters.price.max,
        unit_price__gte: this.filters.price.min,
        inventory__gte: this.filters.exist ? 1 : null,
        category__in: this.filters.categories,
        physical_type__in: this.filters.types.filter(tp => this.physicalTypes.includes(tp)),
        medias__type__in: this.filters.types.filter(tp => this.virtualTypes.includes(tp))
      }

      const filters = this.type === 'product' ? productFilters : null

      this.$emit('onChangeFilters', filters)
    },
    removeCategoryById(categories, idKey, categoryValue) {
      const targetIndex = categories.findIndex(item => item[idKey] === categoryValue)
      categories.splice(targetIndex, 1)
    },
    getCategoryById(categories, idKey, categoryValue) {
      for (const category of categories) {
        if (category[idKey] === categoryValue) {
          return category
        }
        if (category.children && category.children.length > 0) {
          const result = this.getCategoryById(category.children, idKey, categoryValue)
          if (result) {
            return result
          }
        }
      }
      return null // Return null if category with given id is not found
    },
    getCategory (categoryId) {
      return this.getCategoryById(this.storeCategories.list, 'id', categoryId)
    },
    getType (typeEnum) {
      return this.getCategoryById(this.types, 'value', typeEnum)
    },
    removeFilterTag (filterTagItem) {
      if (filterTagItem.filterKey === 'exist') {
        this.filters.exist = false
      }
      if (filterTagItem.filterKey === 'storeCategories') {
        this.removeCategoryById(this.filters.categories, 'id', filterTagItem.value.id)
      }
      if (filterTagItem.filterKey === 'types') {
        this.removeCategoryById(this.filters.types, 'value', filterTagItem.value.value)
      }
      this.updateFilter()
    },
    clearFilters () {
      this.filters.price.min = this.minPrice
      this.filters.price.max = this.maxPrice
      this.filters.exist = false
      this.filters.categories = []
      this.filters.types = []
      this.updateFilter()
    },
    getStoreCategories () {
      this.storeCategories.loading = true
      APIGateway.storeCategory.index({ parent__isnull: 'true', per_page: 99999 })
        .then(({ list }) => {
          this.storeCategories = list
        })
        .finally(() => {
          this.storeCategories.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  background: #F6F6F6;
  border-radius: 20px;
  padding: 24px;
  .sidebar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .sidebar__header-title {
      font: normal normal medium 16px/21px AzarMehr;
      letter-spacing: 0;
    }
    .sidebar__header-remove-filters {
      color: #FF3D3D;
    }
  }
  .sidebar__selected-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-start;
    .sidebar__selected-filter {
      border: 1px solid #ABABAB;
      border-radius: 20px;
      padding: 8px;
      display: flex;
      justify-content: space-between;
      gap: 8px;
      align-items: center;
      background: #FFFFFF;
      .sidebar__selected-filter-title {
        font-size: 14px;
        color: #212121;
      }
      :deep(.sidebar__selected-filter-btn-remove) {
        @mixin set-btn-min-max () {
          $btn-size: 20px;
          max-height: $btn-size;
          max-width: $btn-size;
          min-width: $btn-size;
          min-height: $btn-size;
        }
        padding: 1px;
        @include set-btn-min-max;
        .q-focus-helper {
          @include set-btn-min-max;
        }
        .q-btn__content {
          @include set-btn-min-max;
          .q-icon {
            font-size: 18px;
          }
        }
      }
    }
  }
  .q-separator {
    margin: 18px 0;
  }
  .sidebar__price-filter {
    .sidebar__price-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #212121;
      .sidebar__price-label-min {}
      .sidebar__price-label-max {}
    }
  }
  .sidebar__exist-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
