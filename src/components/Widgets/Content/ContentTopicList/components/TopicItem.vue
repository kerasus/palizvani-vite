<template>
  <div class="topic-item-wrapper">
    <div class="topic-item-side">
      <div class="topic-item-side__line" />
      <div class="topic-item-side__dot" />
      <div class="topic-item-side__arrow" />
    </div>
    <div class="topic-item">
      <div class="topic-item__title">
        {{ topic.title }}
      </div>
      <div class="topic-item__text"
           v-html="topic.text" />
      <div class="topic-item__content">
        <div class="topic-item__content-label">
          <q-icon name="description"
                  size="20px"
                  color="primary" />
          محتوا:
        </div>
        <div class="topic-item__content-title">
          <q-btn flat
                 color="primary"
                 :to="{name: 'Public.Content.Show', params: { id: topic.content_info.id }}">
            {{ topic.content_info.title }}
          </q-btn>
        </div>
      </div>
      <div class="topic-item__hashtags">
        <div class="topic-item__hashtags-label">
          <q-icon name="layers"
                  size="20px"
                  color="primary" />
          برچسب ها:
        </div>
        <div class="topic-item__hashtags-items">
          <div v-for="(hashtag, hashtagIndex) in topic.hashtags_info"
               :key="hashtagIndex"
               class="topic-item__hashtags-item">
            {{ hashtag.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentTopic } from 'src/models/ContentTopic.js'

export default {
  name: 'TopicItem',
  props: {
    topic: {
      type: Object,
      default: new ContentTopic()
    }
  },
  data () {
    return {
      addToCartLoading: false
    }
  }
}
</script>

<style scoped lang="scss">
.topic-item-wrapper {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  $side-width: 32px;
  .topic-item-side {
    width: $side-width;
    position: relative;
    .topic-item-side__line {
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: $primary;
    }
    .topic-item-side__dot {
      width: 16px;
      height: 16px;
      background: white;
      position: absolute;
      top: 32px;
      left: 0;
      transform: translateX(calc( -50% + 2px ));
      &:after {
        content: ' ';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background: $primary;
        transform: translateX(-50%) translateY(-50%);
      }
    }
    .topic-item-side__arrow {
      width: 16px;
      height: 16px;
      background: white;
      position: absolute;
      top: 24px;
      right: 0;
      border-left: solid 1px $primary;
      border-bottom: solid 1px $primary;
      transform: rotate( 45deg ) translateX(12px);
    }
  }
  .topic-item {
    width: calc( 100% - #{$side-width} );
    border: 1px solid $primary;
    border-radius: 8px;
    padding: 16px;
    margin: 8px 0;
    .topic-item__title {
      color: $primary;
      margin-bottom: 16px;
    }
    .topic-item__text {
      margin-bottom: 32px;
    }
    .topic-item__content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .topic-item__hashtags {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .topic-item__hashtags-label {
        margin-right: 8px;
      }
      .topic-item__hashtags-items {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        .topic-item__hashtags-item {
          padding: 6px 10px;
          border: solid 1px #b9b9b9;
          border-radius: 50px;
        }
      }
    }
  }
}
</style>
