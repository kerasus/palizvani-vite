<template>
  <div class="ContentItemCategories">
    <template v-if="content?.category_info?.parent?.parent?.id">
      <q-btn v-if="content?.category_info?.parent?.parent?.id"
             flat
             :to="{ name: 'Public.ContentCategoryParentParent.Show', params: { category_id: content.category_info.parent.parent.id } }"
             class="category-btn">
        <div class="category-btn-title q-px-sm">
          {{ content.category_info.parent.parent.title }}
        </div>
      </q-btn>
      <q-btn v-if="content?.category_info?.parent?.id"
             flat
             :to="{ name: 'Public.ContentCategoryParent.Show', params: { category_id: content.category_info.parent.id } }"
             class="category-btn">
        <div class="category-btn-title q-px-sm">
          {{ content.category_info.parent.title }}
        </div>
      </q-btn>
      <q-btn v-if="content?.category_info?.id"
             flat
             :to="{ name: 'Public.ContentCategory.Show', params: { category_id: content.category_info.id } }"
             class="category-btn">
        <div class="category-btn-title q-px-sm">
          {{ content.category_info.title }}
        </div>
      </q-btn>
    </template>
    <template v-else-if="content?.category_info?.parent?.id">
      <q-btn flat
             :to="{ name: 'Public.ContentCategoryParentParent.Show', params: { category_id: content.category_info.parent.id } }"
             class="category-btn">
        <div class="category-btn-title q-px-sm">
          {{ content.category_info.parent.title }}
        </div>
      </q-btn>
      <q-btn v-if="content?.category_info?.id"
             flat
             :to="{ name: 'Public.ContentCategoryParent.Show', params: { category_id: content.category_info.id } }"
             class="category-btn">
        <div class="category-btn-title q-px-sm">
          {{ content.category_info.title }}
        </div>
      </q-btn>
    </template>
    <template v-else-if="content?.category_info?.id">
      <q-btn flat
             :to="{ name: 'Public.ContentCategoryParentParent.Show', params: { category_id: content.category_info.id } }"
             class="category-btn">
        <div class="category-btn-title q-px-sm">
          {{ content.category_info.title }}
        </div>
      </q-btn>
    </template>
  </div>
</template>

<script>
import { Content } from 'src/models/Content.js'

export default {
  name: 'ContentItemCategories',
  props: {
    content: {
      type: Content,
      default: new Content()
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentItemCategories {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
  height: 76px;
  .category-btn {
    border: 1px solid #000000;
    border-radius: 20px;
    padding: 4px;
    display: flex;
    justify-content: space-between;
    gap: 4px;
    height: 36px;
    align-items: center;
    background: transparent;
    .category-btn-title {
      font-size: 12px;
      color: #212121;
    }
    &.category-btn__selected {
      background: #444444;
      .category-btn-title {
        color: white;
      }
    }
  }
}
</style>
