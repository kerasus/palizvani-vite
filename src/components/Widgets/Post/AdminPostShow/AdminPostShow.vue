<template>
  <div class="AdminPostShow"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-edit v-if="mounted"
                 ref="entityEdit"
                 v-model:value="inputs"
                 title="اطلاعات محتوا"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-route-name="showRouteName"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-save-button="false"
                 :show-reload-button="false"
                 :redirect-after-edit="false"
                 :after-load-input-data="afterLoadInputData" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import PostMixin from 'src/components/Widgets/Post/PostMixin.js'
import PostCategorySelector from 'src/components/FormBuilderCustumComponents/PostCategorySelector.vue'
import FormBuilderTiptapEditor from 'src/components/FormBuilderCustumComponents/FormBuilderTiptapEditor.vue'

const BtnControlComp = shallowRef(BtnControl)
const PostCategorySelectorComp = shallowRef(PostCategorySelector)
const FormBuilderTiptapEditorComp = shallowRef(FormBuilderTiptapEditor)

export default {
  name: 'AdminPostShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget, PostMixin],
  data () {
    const postId = this.$route.params.id
    const authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
    const uploadVideo = this.uploadVideo
    const uploadAudio = this.uploadAudio
    return {
      mounted: false,
      entityLoading: true,
      api: APIGateway.post.APIAdresses.byId(postId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Post.Show',
      indexRouteName: 'Admin.Post.List',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'order', responseKey: 'order', label: 'ترتیب', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: PostCategorySelectorComp, name: 'category', responseKey: 'category_info', col: 'col-md-12 col-12' },
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
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ویرایش پست', placeholder: ' ', ignoreValue: true, atClick: () => {}, col: 'col-md-6' }
      ]
    }
  },
  mounted() {
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      this.inputs.forEach((item, index) => {
        if (item.name === 'btn') {
          this.inputs[index].atClick = this.edit
        }
      })
    },
    afterLoadInputData () {
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminPostShow {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    display: flex;
    flex-flow: row;
    position: relative;
    .static-title {

    }
    .dynamic-title {

    }
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
