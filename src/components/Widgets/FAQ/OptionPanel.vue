<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-expansion-item v-for="(topic, topicIndex) in localOptions.topics"
                        :key="topicIndex"
                        expand-separator>
        <template #header>
          <div class="full-width">
            <q-btn icon="remove"
                   flat
                   @click="removeTopic(topicIndex)">
              حذف موضوع
            </q-btn>
            (
            <q-icon :name="localOptions.topics[topicIndex].icon"
                    size="30px" />
            {{ topic.title }}
            )
          </div>
        </template>
        <q-card class="bg-grey-3">
          <q-card-section>
            <div>
              عنوان موضوع
            </div>
            <q-input v-model="localOptions.topics[topicIndex].title" />
            <div>
              آیکون موضوع
            </div>
            <div>
              <icon-sax v-model:icon="localOptions.topics[topicIndex].icon"
                        :select-type="'emit'" />
            </div>

            <q-separator />
            <div v-for="(subTopic, subTopicIndex) in topic.subTopics"
                 :key="subTopicIndex"
                 class="q-mt-md bg-green-1 q-pa-md">
              <div>
                سوال
              </div>
              <q-input v-model="localOptions.topics[topicIndex].subTopics[subTopicIndex].question" />
              <div class="q-mt-sm">
                پاسخ
              </div>
              <q-input v-model="localOptions.topics[topicIndex].subTopics[subTopicIndex].answer" />
              <q-btn class="full-width"
                     @click="removeSubTopic(localOptions.topics[topicIndex].subTopics, subTopicIndex)">
                حذف سوال و جواب
              </q-btn>
            </div>

            <q-btn class="q-mt-md full-width"
                   icon="add"
                   @click="addSubTopic(localOptions.topics[topicIndex].subTopics)">
              افزودن سوال و جواب
            </q-btn>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-btn class="q-mt-md full-width"
             icon="add"
             @click="addTopic">
        افزودن موضوع
      </q-btn>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import IconSax from 'src/pages/Document/IconSax.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, IconSax },
  mixins: [mixinOptionPanel],
  data() {
    return {
      defaultOptions: {
        topics: []
      }
    }
  },
  methods: {
    addTopic () {
      this.localOptions.topics.push({
        title: '',
        icon: '',
        subTopics: []
      })
    },
    removeTopic (index) {
      this.localOptions.topics.splice(index, 1)
    },
    addSubTopic (subTopics) {
      subTopics.push({
        question: '',
        answer: ''
      })
    },
    removeSubTopic (subTopics, index) {
      subTopics.splice(index, 1)
    }
  }
})
</script>
