<template>
  <div class="faq">
    <div class="faq-title">
      <div>
        <q-banner class="banner">
          سوالات متداول
        </q-banner>
      </div>
    </div>
    <div class="faq-content">
      <div class="faq-topics">
        <q-virtual-scroll v-slot="{ item, index }"
                          :items="localOptions.topics"
                          virtual-scroll-horizontal>
          <div :key="index"
               class="topic-item"
               :class="{'selected': topicIndex === index}"
               @click="topicIndex=index">
            <div class="icon">
              <q-img :src="item.imageSource"
                     width="40px" />
            </div>
            <div class="title ellipsis-2-lines">
              {{ item.title }}
            </div>
          </div>
        </q-virtual-scroll>
      </div>
      <q-tab-panels v-model="topicIndex"
                    animated>
        <q-tab-panel v-for="(topic, topicIndex) in localOptions.topics"
                     :key="topicIndex"
                     :name="topicIndex">
          <q-expansion-item v-for="(subTopic, subTopicIndex) in topic.subTopics"
                            :key="subTopicIndex"
                            expand-separator
                            :label="subTopic.question">
            <q-card>
              <q-card-section>
                {{ subTopic.answer }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'FAQWidget',
  mixins: [mixinWidget],
  data: () => ({
    topicIndex: 0,
    defaultOptions: {
      topics: []
    }
  })
}
</script>

<style scoped lang="scss">
.faq {
  padding: 60px 0;
  .faq-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
  }
  .faq-content {
    .faq-topics {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;
      :deep(.q-virtual-scroll__content) {
        padding-left: 5px;
        padding-bottom: 5px;
        .topic-item {
          background: #FBF4EA;
          box-shadow: 0 0 5px #00000029;
          border-radius: 54px 54px 0 54px;
          width: 200px;
          height: 174px;
          margin-right: 24px;
          border-top: solid 12px $primary;
          padding: 0 15px;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &:hover {
            box-shadow: 0 0 10px #00000029;
          }
          .icon {
            margin-top: 46px;
            color: $primary;
          }
          .title {
            margin-top: 19.3px;
          }
          &.selected {
            background: #FFFFFF;
          }
        }
      }
    }
    .q-tab-panels {
      $topSpace: 85px;
      background: #F6F6F6;
      border-radius: 20px;
      margin-top: -$topSpace;
      padding-top: $topSpace;
      position: relative;
      z-index: 1;
      .q-panel {
        .q-tab-panel {
          .q-expansion-item {
            background: white;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
