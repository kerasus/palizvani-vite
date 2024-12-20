<template>
  <q-card class="ContentTopicItem"
          flat>
    <div class="thumbnail">
      <router-link :to="{name: 'Public.Content.Show', params: {id: contentTopic.content}}">
        <q-img :src="contentTopic.thumbnail" />
      </router-link>
    </div>
    <div class="texts">
      <div class="title ellipsis-2-lines">
        <router-link :to="{name: 'Public.Content.Show', params: {id: contentTopic.content}}">
          {{ contentTopic.title }}
        </router-link>
      </div>
      <div v-if="contentTopic.content_info"
           class="content"
           v-html="contentTopic.content_info.description" />
    </div>
  </q-card>
</template>

<script>
import Assist from 'src/assets/js/Assist.js'
import { ContentTopic } from 'src/models/ContentTopic.js'

export default {
  name: 'ContentTopicItem',
  props: {
    contentTopic: {
      type: ContentTopic,
      default: new ContentTopic()
    }
  },
  methods: {
    miladiToShamsi (date) {
      return Assist.miladiToShamsi(date, 'jDD jMMM jYYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentTopicItem {
  display: flex;
  flex-flow: row;
  gap: 24px;
  justify-content: flex-start;
  border-radius: 20px;
  padding: 32px 28px;
  background: #FBF4EA;
  $thumbnail-width: 250px;
  .thumbnail {
    width: $thumbnail-width;
    border-radius: 10px;
    .q-img {
      width: 100%;
      border-radius: 10px;
    }
  }
  .texts {
    width: calc(100% - #{$thumbnail-width});
    padding-top: 24px;
    .title {
      color: #212121;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 28px;
    }
    .content {
      color: #212121;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 600px) {
    flex-flow: column;
    .thumbnail {
      width: 100%;
    }
    .texts {
      width: 100%;
    }
  }
}
</style>
