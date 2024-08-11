<template>
  <div class="AdminPostCreate"
       :style="localOptions.style">
    <div class="title">
      نوشته جدید
      <div class="back-action">
        <q-btn flat
               :to="{name: 'AdminPanel.Post.List'}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <q-card class="form"
            flat>
      <entity-create v-if="mounted"
                     ref="entityCreate"
                     v-model:value="inputs"
                     title=""
                     :api="api"
                     :entity-id-key="entityIdKey"
                     :entity-param-key="entityParamKey"
                     :show-route-name="showRouteName"
                     :default-layout="false"
                     :show-close-button="false"
                     :show-edit-button="false"
                     :show-expand-button="false"
                     :show-save-button="false"
                     :show-reload-button="false" />
      <div class="action">
        <div class="row q-mt-lg justify-end">
          <div class="col-md-4 col-12">
            <q-btn color="primary"
                   class="full-width"
                   :loading="entityLoading"
                   @click="create">
              انتشار
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import PostMixin from 'src/components/Widgets/Post/PostMixin.js'
import PostCategorySelector from 'src/components/FormBuilderCustumComponents/PostCategorySelector.vue'
import FormBuilderTiptapEditor from 'src/components/FormBuilderCustumComponents/FormBuilderTiptapEditor.vue'
// import { FormBuilderAssist } from 'quasar-form-builder'

const PostCategorySelectorComp = shallowRef(PostCategorySelector)
const FormBuilderTiptapEditorComp = shallowRef(FormBuilderTiptapEditor)

export default {
  name: 'AdminPostCreate',
  components: { EntityCreate },
  mixins: [mixinWidget, PostMixin],
  data () {
    const authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
    const uploadVideo = this.uploadVideo
    const uploadAudio = this.uploadAudio
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.content.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Post.Show',
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
        }
      ]
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
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
.AdminPostCreate {
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
