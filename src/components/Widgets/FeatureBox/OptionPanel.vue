<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="input-container q-py-md">
          <div class="outsideLabel">image</div>
          <image-uploader v-model:file="localOptions.image" />
        </div>
        <div class="input-container q-py-md">
          <div class="outsideLabel">title</div>
          <q-input v-model="localOptions.title"
                   label="title" />
        </div>
        <div class="input-container q-py-md">
          <div class="outsideLabel">url</div>
          <q-input v-model="localOptions.url"
                   label="url" />
        </div>
        <div class="input-container q-py-md">
          <div class="outsideLabel">description</div>
          <editor v-model:value="localOptions.description" />
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import Editor from 'src/components/Utils/Editor.vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import ImageUploader from 'src/components/ImageUploader.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, ImageUploader, Editor },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      defaultOptions: {
        title: null,
        description: null,
        image: null,
        horizontal: true,
        cssHoverEffects: {
          boxShadows: [],
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: ''
          },
          transition: {
            time: 0
          },
          transform: {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            translateX: 0,
            translateY: 0
          }
        }
      }
    }
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  }
})
</script>
