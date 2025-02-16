<template>
  <div class="filters">
    <div class="main-filters">
      <div class="contentCategories">
        <q-btn v-if="contentCategories.list.length > 0"
               flat
               class="filter-btn contentCategory filter-btn__selected">
          <div class="filter-btn-title">
            همه
          </div>
        </q-btn>
        <q-btn v-for="(contentCategory, contentCategoryIndex) in contentCategories.list"
               :key="contentCategoryIndex"
               flat
               :to="{name: showCategoryRouteName, params: {category_id: contentCategory.id}}"
               class="filter-btn contentCategory">
          <div class="filter-btn-title">
            {{ contentCategory.title }}
          </div>
        </q-btn>
      </div>
      <div class="content-type-filters">
        <q-btn v-if="screenGtMd"
               flat
               class="filter-btn"
               :class="{'filter-btn__selected': subFilterExpanded}"
               @click="subFilterExpanded = !subFilterExpanded">
          <div class="filter-btn-title q-px-sm">
            <q-icon name="filter_alt" />
          </div>
        </q-btn>
      </div>
    </div>
    <div class="sub-filters">
      <q-expansion-item v-model="subFilterExpanded"
                        :header-style="'display: none;'">
        <q-card class="sub-filters-card">
          <div class="media-types">
            <q-btn v-for="(mediaType, mediaTypeIndex) in mediaTypes"
                   :key="mediaTypeIndex"
                   flat
                   class="filter-btn contentCategory"
                   :class="{'filter-btn__selected': selectedMediaType === mediaType.value}"
                   @click="filterMediaType(mediaType.value)">
              <div class="filter-btn-title">
                {{ mediaType.label }}
              </div>
            </q-btn>
          </div>
          <div class="search-input">
            <q-input v-model="searchText"
                     debounce="500">
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { Media } from 'src/models/Media.js'
import { ContentCategory, ContentCategoryList } from 'src/models/ContentCategory.js'

export default {
  name: 'ContentCategoryItem',
  props: {
    contentCategories: {
      type: ContentCategoryList,
      default: new ContentCategoryList()
    },
    contentCategory: {
      type: ContentCategory,
      default: new ContentCategory()
    },
    showCategoryRouteName: {
      type: String,
      default: 'Public.ContentCategory.Show'
    },
    listType: {
      type: String,
      default: 'category_parent_parent'
    }
  },
  emits: ['filter'],
  data () {
    return {
      media: new Media(),
      searchText: null,
      selectedMediaType: null,
      subFilterExpanded: false
    }
  },
  computed: {
    mediaTypes () {
      return [{
        label: 'همه',
        value: null
      }].concat(this.media.typeEnums)
    },
    screenGtMd () {
      if (typeof window === 'undefined') {
        return true
      }
      return this.$q.screen.gt.md
    }
  },
  watch: {
    searchText () {
      this.emitFilters()
    },
    screenGtMd: {
      handler (newValue) {
        if (!newValue) {
          this.$nextTick(() => {
            this.subFilterExpanded = true
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    filterMediaType (mediaType) {
      this.selectedMediaType = mediaType
      this.emitFilters()
    },
    emitFilters () {
      this.$emit('filter', this.getFilterObject())
    },
    getFilterObject () {
      return {
        medias__type: this.selectedMediaType,
        search: this.searchText
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  .main-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: space-between;

    .contentCategories {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .content-type-filters {

    }
  }
  .sub-filters {
    .sub-filters-card {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding-top: 12px;
      .media-types {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: 42.63px;
      }
    }
  }
  .filter-btn {
    border: 1px solid #000000;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
    height: 43px;
    padding: 0 8px;
    .filter-btn-title {
      font-size: 14px;
      color: #212121;
    }
    &.filter-btn__selected {
      background: #444444;
      .filter-btn-title {
        color: white;
      }
    }
  }
}
</style>
