<template>
  <div class="AdminEventCreate"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-create v-if="mounted"
                   ref="entityCreate"
                   v-model:value="inputs"
                   title="ایجاد پست"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import PostMixin from 'src/components/Widgets/Post/PostMixin.js'
import PostCategorySelector from 'src/components/FormBuilderCustumComponents/PostCategorySelector.vue'
import FormBuilderTiptapEditor from 'src/components/FormBuilderCustumComponents/FormBuilderTiptapEditor.vue'
// import { FormBuilderAssist } from 'quasar-form-builder'

const BtnControlComp = shallowRef(BtnControl)
const PostCategorySelectorComp = shallowRef(PostCategorySelector)
const FormBuilderTiptapEditorComp = shallowRef(FormBuilderTiptapEditor)

export default {
  name: 'AdminEventCreate',
  components: { EntityCreate },
  mixins: [mixinWidget, PostMixin],
  data () {
    const authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
    const uploadVideo = this.uploadVideo
    const uploadAudio = this.uploadAudio
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.post.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Post.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'order', responseKey: 'order', label: 'ترتیب', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: PostCategorySelectorComp, name: 'category', responseKey: 'category', col: 'col-12' },
        {
          // type: 'tiptap-editor',
          type: FormBuilderTiptapEditorComp,
          name: 'summary',
          responseKey: 'summary',
          label: 'خلاصه',
          options: {
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
          col: 'col-md-12 col-12'
        },
        {
          // type: 'tiptap-editor',
          type: FormBuilderTiptapEditorComp,
          name: 'text',
          responseKey: 'text',
          label: 'متن',
          options: {
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
          col: 'col-md-12 col-12'
        },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ایجاد محتوا', placeholder: ' ', atClick: () => {}, col: 'col-md-6' }
      ]
    }
  },
  mounted () {
    this.setActionBtn()
    // const options = FormBuilderAssist.getInputsByName(this.inputs, 'text').options
    // options.uploadVideo = this.uploadVideo
    // FormBuilderAssist.setAttributeByName(this.inputs, 'text', 'options', options)
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      this.inputs.forEach((item, index) => {
        if (item.name === 'btn') {
          this.inputs[index].atClick = this.onSubmit
        }
      })
    },
    onSubmit () {
      this.create()
    },
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity()
        .then(() => {
          this.entityLoading = false
        })
        .catch(() => {
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminEventCreate {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    position: relative;
    .back-action {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  :deep(.form) {
    padding: 24px;
  }
}
</style>
