<template>
  <div class="post">
    <q-banner v-if="!post.post"
              class="banner post-banner">
      {{post.title}}
    </q-banner>
    <q-card v-if="!post.post"
            flat>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-md-2 col-sm-4 col-12 post-thumbnail">
            <q-img :src="post.thumbnail" />
          </div>
          <div class="col-md-10 col-sm-8 col-12 post-summary"
               v-html="post.summary" />
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <div class="post-text"
             v-html="post.text" />
      </q-card-section>
    </q-card>

    <q-skeleton v-if="post.post"
                type="circle"
                size="100px"
                class="q-mt-md" />
    <q-skeleton v-if="post.post"
                width="150px"
                class="q-mt-md" />
    <q-skeleton v-if="post.post"
                height="150px"
                class="q-mt-md" />

  </div>
</template>

<script>
import { Post } from 'src/models/Post.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'ShowClassroomInfo',
  mixins: [mixinWidget, mixinPrefetchServerData],
  emits: ['onloadn'],
  data: () => ({
    defaultOptions: {
      profileMode: false
    },
    post: new Post()
  }),
  methods: {
    prefetchServerDataPromise () {
      return this.getPost()
    },
    prefetchServerDataPromiseThen (post) {
      this.post = new Post(post)
      this.post.post = false
      this.$emit('onloadn', this.post)
    },
    prefetchServerDataPromiseCatch () {
      this.post.post = false
    },

    getTitledDateTime (dateTime) {
      return ShamsiDate.getTitledDateTime(dateTime)
    },
    getTime (time) {
      return ShamsiDate.getDateTime(time)
    },
    getPost () {
      this.post.post = true
      return APIGateway.post.get(this.$route.params.id)
    }
  }
}
</script>

<style scoped lang="scss">
.post {
  .post-banner {
    margin-top: 52px;
    margin-bottom: 42px;
  }
}
</style>
