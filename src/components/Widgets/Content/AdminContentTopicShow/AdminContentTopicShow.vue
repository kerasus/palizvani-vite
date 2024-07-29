<template>
  <div class="AdminContentTopicShow"
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
                 title="مشخصات دسته بندی کلی"
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
import { ContentTopic } from 'src/models/ContentTopic.js'
import HashtagSelector from 'src/components/FormBuilderCustumComponents/Hashtags/HashtagSelector.vue'
import ContentCategorySelector from 'src/components/FormBuilderCustumComponents/ContentCategorySelector.vue'

const BtnControlComp = shallowRef(BtnControl)
const HashtagSelectorComp = shallowRef(HashtagSelector)
const ContentCategorySelectorComp = shallowRef(ContentCategorySelector)

export default {
  name: 'AdminContentTopicShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data () {
    return {
      listKey: Date.now(),
      replyText: null,
      mounted: false,
      entityLoading: true,
      contentTopicCategory: new ContentTopic(),
      api: APIGateway.contentTopic.APIAdresses.byId(this.$route.params.id),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.ContentTopic.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان فیش', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', value: null, placeholder: ' ', col: 'col-md-6 col-12' },
        { type: ContentCategorySelectorComp, name: 'category', responseKey: 'category_info', categoryType: 'contentTopic', col: 'col-12' },
        { type: HashtagSelectorComp, name: 'hashtags', responseKey: 'hashtags_info', col: 'col-12' },
        { type: 'inputEditor', name: 'text', responseKey: 'text', label: 'متن', placeholder: ' ', col: 'col-md-12 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ویرایش فیش', placeholder: ' ', atClick: this.edit, col: 'col-md-6' },
        { type: 'hidden', name: 'content', responseKey: 'content' },
        { type: 'hidden', name: 'id', responseKey: 'id', value: null }
      ]
    }
  },
  computed: {
    repliesInfo () {
      return this.inputs.find(input => input.name === 'replies_info').value
    }
  },
  created() {
    this.contentTopicCategory.loading = true
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    afterLoadInputData (data) {
      this.contentTopicCategory = new ContentTopic(data)
      this.contentTopicCategory.loading = false
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
    },
    onCreated () {
      this.listKey = Date.now()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminContentTopicShow {
}
</style>
