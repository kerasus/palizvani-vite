<template>
  <div class="ContentsSelector">
    <div class="ContentCategorySelector">
      <selector-component v-model:contents="selectedContents"
                          @update:contents="onSelectContent" />
    </div>
    <div class="content-list q-mt-lg">
      <content-item v-for="(selectedContent, selectedContentIndex) in selectedContents"
                    :key="selectedContentIndex"
                    :content="selectedContent"
                    @onView="onView"
                    @onDelete="onDelete" />
    </div>
  </div>
</template>

<script>
import { ContentList } from 'src/models/Content.js'
import ContentItem from 'src/components/FormBuilderCustumComponents/ContentsSelector/ContentItem.vue'
import SelectorComponent from 'src/components/FormBuilderCustumComponents/ContentsSelector/SelectorComponent.vue'

export default {
  name: 'ContentsSelector',
  components: {
    ContentItem,
    SelectorComponent
  },
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    disable: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:value'],
  data () {
    return {
      selectedContents: []
    }
  },
  watch: {
    value: {
      handler (newValue) {
        if (newValue.length > 0 && newValue[0].id) {
          this.selectedContents = (new ContentList(JSON.parse(JSON.stringify(newValue)))).list
        }
      },
      immediate: true
    }
  },
  methods: {
    onSelectContent () {
      this.$emit('update:value', this.selectedContents.map(item => item.id))
    },
    onView (content) {
      const routeData = this.$router.resolve({ name: 'Admin.Content.Show', params: { id: content.id } })
      window.open(routeData.href, '_blank')
    },
    onDelete (content) {
      this.removeContent(content.id)
    },
    removeContent (mediaId) {
      const contentIndex = this.selectedContents.findIndex(item => item.id === mediaId)
      if (contentIndex === -1) {
        return
      }
      this.selectedContents.splice(contentIndex, 1)
      this.$emit('update:value', this.selectedContents.map(item => item.id))
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentsSelector {
}
</style>
