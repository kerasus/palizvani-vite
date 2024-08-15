<template>
  <div class="col-md-4 col-sm-6 col-12">
    <q-card flat
            class="ContentItem">
      <div class="thumbnail">
        <router-link :to="{name: 'Public.Content.Show', params: {id: content.id}}">
          <q-img :src="content.thumbnail" />
        </router-link>
      </div>
      <div class="title ellipsis-2-lines">
        <router-link :to="{name: 'Public.Content.Show', params: {id: content.id}}">
          {{content.title}}
        </router-link>
      </div>
      <div class="child-category ellipsis-2-lines">
        <router-link :to="{name: 'Public.ContentCategory.Show', params: {category_id: content.category }}">
          <q-icon name="account_tree" />
          دسته:
          {{content.category_info?.title}}
        </router-link>
      </div>
      <q-card-actions class="action-section">
        <q-btn color="primary"
               class="btn-show-content"
               :to="{name: 'Public.Content.Show', params: {id: content.id}}">
          مشاهده جزئیات
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Content } from 'src/models/Content.js'

export default defineComponent({
  name: 'ContentItem',
  props: {
    content: {
      type: Content,
      default: new Content()
    }
  }
})
</script>

<style lang="scss" scoped>
.ContentItem {
  background-color: #f6f6f6;
  border-radius: 54px 0 54px 54px;
  padding: 20px 20px 30px;
  margin: 8px;
  .thumbnail {
    margin-bottom: 43px;
    .q-img {
      border-radius: 54px 0 54px 54px;
    }
  }
  .title {
    font-size: 17px;
    letter-spacing: 0;
    padding-right: 26px;
    padding-left: 26px;
    margin-bottom: 16px;
    a {
      color: #475F4A;
    }
  }
  .child-category {
    font-size: 17px;
    letter-spacing: 0;
    padding-right: 26px;
    padding-left: 26px;
    margin-bottom: 31px;
    a {
      color: #475F4A;
    }
  }
  .action-section {
    .btn-show-content {
      width: 100%;
      height: 48px;
      max-width: 252px;
      margin: auto;
    }
  }
}
</style>
