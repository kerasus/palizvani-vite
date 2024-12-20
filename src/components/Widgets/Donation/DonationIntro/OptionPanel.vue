<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div>
        <div>
          متن:
        </div>
        <form-builder-tiptap-editor v-model:value="localOptions.text"
                                    :options="editorOptions" />
      </div>
      <q-separator class="q-my-lg" />
      <div class="row">
        <div class="col-12">
          <q-btn color="primary"
                 class="full-width"
                 @click="addSlide">
            افزودن تصویر آپلود شده
          </q-btn>
        </div>
        <div class="col-12">
          <div class="input-container col-12 q-mt-md">
            <div class="outsideLabel">آدرس عکس</div>
            <image-uploader v-model:file="newSlide" />
          </div>
        </div>
      </div>
      <div class="slides">
        <div v-for="(slide, slideIndex) in localOptions.slides"
             :key="slideIndex"
             class="slide-item">
          <q-btn color="red"
                 @click="removeSlide(slideIndex)">
            <q-icon name="close" />
          </q-btn>
          <q-img :src="slide" />
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import ImageUploader from 'src/components/ImageUploader.vue'
import PostMixin from 'src/components/Widgets/Post/PostMixin.js'
import FormBuilderTiptapEditor from 'src/components/FormBuilderCustumComponents/FormBuilderTiptapEditor.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    FormBuilderTiptapEditor,
    OptionPanelTabs,
    ImageUploader
  },
  mixins: [mixinOptionPanel, PostMixin],
  data () {
    const authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
    const uploadVideo = this.uploadVideo
    const uploadAudio = this.uploadAudio
    return {
      newSlide: null,
      editorOptions: {
        bubbleMenu: false,
        floatingMenu: false,
        poem: false,
        reading: false,
        loadBareHtml: true,
        persianKeyboard: true,
        mathliveOptions: { smartFence: false },
        uploadServer: {
          url: '/api' + APIGateway.media.APIAdresses.base,
          instantUpload: true,
          responseKey: 'file',
          headers: { Authorization: authorization }
        },
        uploadVideo,
        uploadAudio
      },
      defaultOptions: {
        text: null,
        slides: []
      }
    }
  },
  methods: {
    addSlide () {
      if (!this.newSlide) {
        return
      }
      this.localOptions.slides.push(JSON.parse(JSON.stringify(this.newSlide)))
    },
    removeSlide(slideIndex) {
      this.localOptions.slides.splice(slideIndex, 1)
    }
  }
})
</script>
