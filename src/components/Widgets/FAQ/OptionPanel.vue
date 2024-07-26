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
                   @click="increaseOrder($event, topicIndex)" />
            <q-btn icon="expand_more"
                   color="info"
                   dense
                   size="sm"
                   outline
                   class="q-mr-xl"
                   @click="decreaseOrder($event, topicIndex)" />
            <q-btn icon="delete"
                   color="red"
                   dense
                   size="sm"
                   outline
                   class="q-mr-md"
                   @click="removeTopic(topicIndex)" />
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
    increaseOrder(event, index) {
      event.stopPropagation()
      if (index <= 0) {
        return
      }

      // Swap the item with the previous item
      const temp = this.localOptions.topics[index - 1]
      this.localOptions.topics[index - 1] = this.localOptions.topics[index]
      this.localOptions.topics[index] = temp
    },
    decreaseOrder(event, index) {
      event.stopPropagation()
      if (index >= this.localOptions.topics.length - 1) {
        return
      }
      // Swap the item with the next item
      const temp = this.localOptions.topics[index + 1]
      this.localOptions.topics[index + 1] = this.localOptions.topics[index]
      this.localOptions.topics[index] = temp
    },
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
