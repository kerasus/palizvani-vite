<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-expansion-item v-for="(topic, topicIndex) in localOptions.topics"
                        :key="topicIndex"
                        expand-separator>
        <template #header>
          <div class="full-width">
            <q-btn icon="expand_less"
                   color="info"
                   dense
                   size="sm"
                   outline
                   class="q-ml-md"
                   @click="increaseOrder($event, localOptions.topics, topicIndex)" />
            <q-btn icon="expand_more"
                   color="info"
                   dense
                   size="sm"
                   outline
                   class="q-mr-xl"
                   @click="decreaseOrder($event, localOptions.topics, topicIndex)" />
            <q-btn icon="delete"
                   color="red"
                   dense
                   size="sm"
                   outline
                   class="q-mr-md"
                   @click="removeItem($event, localOptions.topics, topicIndex)" />
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
              <div class="outsideLabel">عکس موضوع</div>
              <image-uploader v-model:file="localOptions.topics[topicIndex].imageSource" />
            </div>

            <q-separator />
            <div v-for="(subTopic, subTopicIndex) in topic.subTopics"
                 :key="subTopicIndex"
                 class="q-mt-md bg-green-1 q-pa-md">
              <div class="flex justify-between">
                <div>
                  <q-btn icon="expand_less"
                         color="info"
                         dense
                         size="sm"
                         outline
                         class="q-ml-md"
                         @click="increaseOrder($event, localOptions.topics[topicIndex].subTopics, subTopicIndex)" />
                  <q-btn icon="expand_more"
                         color="info"
                         dense
                         size="sm"
                         outline
                         class="q-mr-xl"
                         @click="decreaseOrder($event, localOptions.topics[topicIndex].subTopics, subTopicIndex)" />
                </div>
                <q-btn icon="delete"
                       color="red"
                       dense
                       size="sm"
                       outline
                       class="q-mr-md"
                       @click="removeItem($event, localOptions.topics[topicIndex].subTopics, subTopicIndex)" />
              </div>
              <q-separator class="q-my-md" />
              <div>
                سوال
              </div>
              <q-input v-model="localOptions.topics[topicIndex].subTopics[subTopicIndex].question" />
              <div class="q-mt-sm">
                پاسخ
              </div>
              <q-input v-model="localOptions.topics[topicIndex].subTopics[subTopicIndex].answer" />
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
import ImageUploader from 'src/components/ImageUploader.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, ImageUploader },
  mixins: [mixinOptionPanel],
  data() {
    return {
      defaultOptions: {
        topics: []
      }
    }
  },
  methods: {
    increaseOrder(event, list, index) {
      event.stopPropagation()
      if (index <= 0) {
        return
      }

      // Swap the item with the previous item
      const temp = list[index - 1]
      list[index - 1] = list[index]
      list[index] = temp
    },
    decreaseOrder(event, list, index) {
      event.stopPropagation()
      if (index >= list.length - 1) {
        return
      }
      // Swap the item with the next item
      const temp = list[index + 1]
      list[index + 1] = list[index]
      list[index] = temp
    },
    removeItem (event, list, index) {
      event.stopPropagation()
      list.splice(index, 1)
    },
    addTopic () {
      this.localOptions.topics.push({
        title: '',
        icon: '',
        subTopics: []
      })
    },
    addSubTopic (subTopics) {
      subTopics.push({
        question: '',
        answer: ''
      })
    }
  }
})
</script>
