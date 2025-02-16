<template>
  <q-card class="ContentItem"
          flat>
    <div class="thumbnail"
         @click="goToContentPageShow">
      <q-img :src="content.thumbnail" />
    </div>
    <div class="title ellipsis-2-lines"
         @click="goToContentPageShow">
      {{ content.title }}
    </div>
    <div class="categories">
      <q-btn v-if="content?.category_info?.id"
             flat
             class="category-btn">
        <div class="category-btn-title q-px-sm">
          {{ content.category_info.title }}
        </div>
      </q-btn>
      <q-btn v-if="content?.category_info?.parent?.id"
             flat
             class="category-btn">
        <div class="category-btn-title q-px-sm">
          {{ content.category_info.parent.title }}
        </div>
      </q-btn>
      <q-btn v-if="content?.category_info?.parent?.parent?.id"
             flat
             class="category-btn">
        <div class="category-btn-title q-px-sm">
          {{ content.category_info.parent.parent.title }}
        </div>
      </q-btn>
    </div>
    <q-btn color="primary"
           class="show-content-btn"
           :to="{name: 'Public.Content.Show', params: {id: content.id}}">
      مشاهده
    </q-btn>
  </q-card>
</template>

<script>
import { Content } from 'src/models/Content.js'

export default {
  name: 'ContentItem',
  props: {
    content: {
      type: Content,
      default: new Content()
    }
  },
  methods: {
    goToContentPageShow () {
      this.$router.push({ name: 'Public.Content.Show', params: { id: this.content.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentItem {
  background-color: #f6f6f6;
  display: flex;
  flex-flow: column;
  position: relative;
  cursor: pointer;
  padding: 16px;
  margin: 8px;
  border-radius: 16px;
  .thumbnail {
    margin-bottom: 16px;
    .q-img {
      width: 100%;
      border-radius: 8px;
    }
  }
  .title {
    text-align: center;
    margin-bottom: 16px;
    font-size: 16px;
  }
  .description {
    position: absolute;
    left: 21px;
    color: #FFFFFF;
    font-size: 16px;
    display: none;
  }
  .show-content-btn {
    width: 100%;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    height: 60px;
  }
  .categories {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 16px;
    .category-btn {
      border: 1px solid #000000;
      border-radius: 20px;
      padding: 4px;
      display: flex;
      justify-content: space-between;
      gap: 4px;
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
}
</style>
