<template>
  <q-card class="ContentCategoryItem"
          :class="listType"
          flat>
    <div class="thumbnail"
         @click="goToCategoryPageShow">
      <q-img :src="contentCategory.thumbnail" />
    </div>
    <div class="cation">
      <q-btn color="primary"
             :to="{name: showCategoryRouteName, params: {category_id: contentCategory.id}}">
        مشاهده جزییات
      </q-btn>
    </div>
    <div class="title ellipsis-2-lines">
      {{ contentCategory.title }}
    </div>
    <div class="description ellipsis-3-lines">
      {{ contentCategory.description }}
    </div>
  </q-card>
</template>

<script>
import { ContentCategory } from 'src/models/ContentCategory.js'

export default {
  name: 'ContentCategoryItem',
  props: {
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
  methods: {
    goToCategoryPageShow () {
      this.$router.push({ name: this.showCategoryRouteName, params: { category_id: this.contentCategory.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentCategoryItem {
  display: flex;
  flex-flow: column;
  position: relative;
  cursor: pointer;
  .thumbnail {
    .q-img {
      width: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
  .cation {
    .q-btn {
      width: 100%;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      height: 60px;
    }
  }
  .title {
    position: absolute;
    bottom: 136px;
    left: 21px;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
  }
  .description {
    position: absolute;
    left: 21px;
    color: #FFFFFF;
    font-size: 16px;
    display: none;
  }
  &:hover {
    .title {
      bottom: 225px;
    }
    .description {
      display: block;
      bottom: 114px;
    }
  }
}
</style>
