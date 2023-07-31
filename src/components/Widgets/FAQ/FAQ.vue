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
      <q-virtual-scroll v-slot="{ item, index }"
                        :items="localOptions.topics"
                        virtual-scroll-horizontal>
        <q-btn :key="index"
               color="primary"
               class="q-ma-md"
               @click="topicIndex=index">
          {{ item.title }}
        </q-btn>
      </q-virtual-scroll>

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
}
</style>
