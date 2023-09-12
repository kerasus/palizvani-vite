<template>
  <div class="col-md-4 col-sm-6 col-12">
    <q-card flat
            class="PostItem">
      <div class="thumbnail">
        <router-link :to="{name: 'Public.Post.Show', params: {id: post.id}}">
          <q-img :src="post.thumbnail" />
        </router-link>
      </div>
      <div class="title">
        <router-link :to="{name: 'Public.Post.Show', params: {id: post.id}}">
          {{post.title}}
        </router-link>
      </div>
      <q-card-actions class="action-section">
        <q-btn color="primary"
               class="btn-show-post"
               :to="{name: 'Public.Post.Show', params: {id: post.id}}">
          مشاهده جزئیات
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Post } from 'src/models/Post.js'

export default defineComponent({
  name: 'PostItem',
  props: {
    post: {
      type: Post,
      default: new Post()
    }
  }
})
</script>

<style lang="scss" scoped>
.PostItem {
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
    margin-bottom: 31px;
    a {
      color: #475F4A;
    }
  }
  .action-section {
    .btn-show-post {
      width: 100%;
      height: 48px;
      max-width: 252px;
      margin: auto;
    }
  }
}
</style>
