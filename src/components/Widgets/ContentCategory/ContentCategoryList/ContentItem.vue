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
    <content-item-categories :content="content" />
    <q-btn color="primary"
           class="show-content-btn"
           :to="{name: 'Public.Content.Show', params: {id: content.id}}">
      مشاهده
    </q-btn>
  </q-card>
</template>

<script>
import { Content } from 'src/models/Content.js'
import ContentItemCategories from './ContentItemCategories.vue'

export default {
  name: 'ContentItem',
  components: { ContentItemCategories },
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
}
</style>
