<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-mt-sm">
          <div class="col-md-12">
            <form-builder-tiptap-editor v-model:value="localOptions.text"
                                        :options="editorOptions" />
          </div>
          <editor-options v-model:options="localOptions" />
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import EditorOptions from 'components/EditorOptions.vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import PostMixin from 'src/components/Widgets/Post/PostMixin.js'
import FormBuilderTiptapEditor from 'src/components/FormBuilderCustumComponents/FormBuilderTiptapEditor.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
// import Editor from 'components/Utils/Editor2.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, EditorOptions, FormBuilderTiptapEditor },
  mixins: [mixinOptionPanel, PostMixin],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
    const uploadVideo = this.uploadVideo
    const uploadAudio = this.uploadAudio

    return {
      fontStyle: ['inherit', 'normal', 'italic'],
      foreColor: '#000000',
      token: null,
      responsiveOpts: ['xs', 'sm', 'md', 'lg', 'xl'],
      responsive: 'xs',
      defaultOptions: {
        fontFamily: null,
        color: null,
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        xs: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        sm: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        md: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        lg: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        xl: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        }
      },
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
  },
  mounted() {
    const windowWidth = window.innerWidth
    if (windowWidth > 1920) {
      this.responsive = 'xl'
    } else if (windowWidth > 1440 < 1920) {
      this.responsive = 'lg'
    } else if (windowWidth > 1024 < 1440) {
      this.responsive = 'md'
    } else if (windowWidth > 600 < 1024) {
      this.responsive = 'sm'
    } else if (windowWidth < 600) {
      this.responsive = 'xs'
    }
  },
  methods: {
    color(cmd, name) {
      const edit = this.$refs.editor
      this.$refs.token.hide()
      edit.caret.restore()
      edit.runCmd(cmd, name)
      edit.focus()
    }
  }
})
</script>
