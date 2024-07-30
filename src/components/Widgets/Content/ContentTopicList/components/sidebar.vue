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
    <q-linear-progress v-if="contentTopicCategories.loading"
                       indeterminate />
    <q-tree v-if="!contentTopicCategories.loading"
            v-model:ticked="filters.categories"
            class="col-12 col-sm-6"
            :nodes="contentTopicCategories.list"
            children-key="children"
            label-key="title"
            node-key="id"
            tick-strategy="leaf"
            @update:ticked="updateFilter" />
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import { ContentTopicCategoryList } from 'src/models/ContentTopicCategory.js'

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
      filters: {
        categories: [] // content_category
      },
      contentTopicCategories: new ContentTopicCategoryList(),
      mounted: false
    }
  },
  computed: {
    selectedFilters () {
      const tags = []

      if (this.filters.categories.length > 0) {
        this.filters.categories.map(categoryId => this.getCategory(categoryId)).filter(item => item).forEach(item => {
          tags.push({
            label: item.title,
            filterKey: 'contentTopicCategories',
            value: item
          })
        })
      }

      return tags
    }
  },
  mounted() {
    this.getStoreCategories()
  },
  methods: {
    updateFilter () {
      this.$emit('onChangeFilters', {
        category__in: this.filters.categories
      })
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
      return this.getCategoryById(this.contentTopicCategories.list, 'id', categoryId)
    },
    removeFilterTag (filterTagItem) {
      if (filterTagItem.filterKey === 'contentTopicCategories') {
        this.removeCategoryById(this.filters.categories, 'id', filterTagItem.value.id)
      }
      this.updateFilter()
    },
    clearFilters () {
      this.filters.categories = []
      this.updateFilter()
    },
    getStoreCategories () {
      this.contentTopicCategories.loading = true
      APIGateway.contentTopicCategory.index({ parent__isnull: 'true', per_page: 99999 })
        .then(({ list }) => {
          this.contentTopicCategories = list
        })
        .finally(() => {
          this.contentTopicCategories.loading = false
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
