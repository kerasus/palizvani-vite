<template>
  <q-card flat
          class="PostItem col-md-3 col-sm-6 col-12">
    <q-card-section class="thumbnail">
      <router-link :to="{name: 'Public.Post.Show', params: {id: post.id}}">
        <q-img class="q-ma-xs"
               :src="post.thumbnail" />
      </router-link>
    </q-card-section>
    <q-card-section class="title">
      <router-link :to="{name: 'Public.Post.Show', params: {id: post.id}}">
        {{post.title}}
      </router-link>
    </q-card-section>
    <q-card-actions class="action-section">
      <q-btn color="primary"
             class="btn-show-post"
             :to="{name: 'Public.Post.Show', params: {id: post.id}}">
        مشاهده
        <svg xmlns="http://www.w3.org/2000/svg"
             width="18.387"
             height="11.502"
             viewBox="0 0 18.387 11.502">
          <path id="Combined_Shape"
                data-name="Combined Shape"
                d="M-9.338,11.408a.748.748,0,0,0,.388-.656V6.5h8.2A.751.751,0,0,0,0,5.75.75.75,0,0,0-.75,5h-8.2V.75A.751.751,0,0,0-9.338.093.769.769,0,0,0-9.7,0a.735.735,0,0,0-.4.115l-7.938,5a.747.747,0,0,0-.35.635.742.742,0,0,0,.35.634l7.938,5a.751.751,0,0,0,.4.116A.746.746,0,0,0-9.338,11.408ZM-10.45,9.392l-5.78-3.641,5.78-3.642Z"
                transform="translate(18.387)"
                fill="#fff" />
        </svg>
      </q-btn>
    </q-card-actions>
  </q-card>
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
  background-color: #F6F6F6;
  border-radius: 8px;
  .thumbnail {
    padding: 17px 22px 26px;

    .RegisteredSign {
      display: none;
    }
    :deep(img) {
      border-radius: 10px;
    }
  }
  .title {
    text-align: left;
    padding: 0 46px 33px;
  }
  .action-section {
    padding: 0;
    .btn-show-post {
      width: 100%;
      height: 60px;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
  }
}
</style>
