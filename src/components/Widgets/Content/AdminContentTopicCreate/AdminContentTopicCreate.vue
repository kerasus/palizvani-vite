<template>
  <div class="AdminContentTopicCreate"
       :style="localOptions.style">
    <entity-create v-if="mounted"
                   ref="entityCreate"
                   v-model:value="inputs"
                   title="ایجاد فیش"
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
import { FormBuilderAssist } from 'quasar-form-builder'
import HashtagSelector from 'src/components/FormBuilderCustumComponents/Hashtags/HashtagSelector.vue'
import ContentCategorySelector from 'src/components/FormBuilderCustumComponents/ContentCategorySelector.vue'

const BtnControlComp = shallowRef(BtnControl)
const HashtagSelectorComp = shallowRef(HashtagSelector)
const ContentCategorySelectorComp = shallowRef(ContentCategorySelector)

export default {
  name: 'AdminContentCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  props: {
    content: {
      type: Number,
      default: null
    },
    redirect: {
      type: Boolean,
      default: true
    }
  },
  emits: ['created'],
  data () {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.contentTopic.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.ContentTopicCategory.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان فیش', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', value: null, placeholder: ' ', col: 'col-md-6 col-12' },
        { type: ContentCategorySelectorComp, name: 'category', responseKey: 'category_info', categoryType: 'contentTopic', col: 'col-12' },
        { type: HashtagSelectorComp, name: 'hashtags', responseKey: 'hashtags_info', col: 'col-12' },
        { type: 'inputEditor', name: 'text', responseKey: 'text', label: 'متن', placeholder: ' ', col: 'col-md-12 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ایجاد فیش', placeholder: ' ', atClick: this.create, col: 'col-md-6' },
        { type: 'hidden', name: 'content', responseKey: 'content' }
      ]
    }
  },
  created() {
    FormBuilderAssist.setAttributeByName(this.inputs, 'content', 'value', this.content)
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity(this.redirect)
        .then(() => {
          this.$emit('created')
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
.AdminContentTopicCreate {
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
