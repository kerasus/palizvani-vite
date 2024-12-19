<template>
  <div class="col-md-4 col-sm-6 col-12">
    <q-card flat
            class="PostItem">
      <div class="content">
        <div class="title-and-body">
          <div class="title ellipsis-2-lines">
            <router-link :to="{name: 'Public.Post.Show', params: {id: post.id}}">
              {{post.title}}
            </router-link>
          </div>
          <div class="body"
               v-html="post.text" />
        </div>
        <div class="meta-and-action">
          <div class="date-time">
            <q-icon name="calendar_month"
                    size="20px" />
            <span class="date-time-value">
              {{ getDateTime(post.creation_time) }}
            </span>
          </div>
          <q-btn color="primary"
                 outline
                 class="btn-show-post"
                 :to="{name: 'Public.Post.Show', params: {id: post.id}}">
            مشاهده جزئیات
          </q-btn>
        </div>
      </div>
      <div class="thumbnail">
        <router-link :to="{name: 'Public.Post.Show', params: {id: post.id}}">
          <q-img :src="post.thumbnail" />
        </router-link>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Post } from 'src/models/Post.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'

export default defineComponent({
  name: 'PostItem',
  props: {
    post: {
      type: Post,
      default: new Post()
    }
  },
  methods: {
    getDateTime (dateTime) {
      return ShamsiDate.getTitledDateTime(dateTime, 'a hh:mm - jYYYY/jMM/jDD')
    }
  }
})
</script>

<style lang="scss" scoped>
.PostItem {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  padding: 0;
  margin: 0;
  .thumbnail {
    width: 45%;
    .q-img {
      border-radius: 20px 8px 8px 20px;
    }
  }
  .content {
    width: 55%;
    padding: 52px 80px 52px 40px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .title-and-body {
      margin-bottom: 28px;
      .title {
        font-size: 18px;
        letter-spacing: 0;
        margin-bottom: 26px;
        a {
          color: #212121;
        }
      }
      .body {
        font-size: 16px;
        letter-spacing: 0;
        color: #212121;
        height: 220px;
        overflow: hidden;
      }
    }
    .meta-and-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .date-time {
        color: #929292;
        .date-time-value {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
