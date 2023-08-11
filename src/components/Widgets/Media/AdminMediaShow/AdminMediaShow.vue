<template>
  <div class="AdminMediaShow"
       :style="localOptions.style">
    <entity-edit v-if="mounted"
                 ref="entityEdit"
                 v-model:value="inputs"
                 title="اطلاعات کاربری"
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
import { Media } from 'src/models/Media.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)
export default {
  name: 'AdminMediaShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Content.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'select', name: 'type', responseKey: 'type', label: 'نوع', placeholder: ' ', options: (new Media()).typeEnums, col: 'col-md-4 col-12' },
        { type: 'file', name: 'file', responseKey: 'file', label: 'فایل', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'url', responseKey: 'url', label: 'url', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'iframe_code', responseKey: 'iframe_code', label: 'iframe_code', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'script_code', responseKey: 'script_code', label: 'script_code', placeholder: ' ', col: 'col-12' },
        { type: 'hidden', name: 'source_type', responseKey: 'source_type', value: 'CONTENT' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ویرایش مدیا', placeholder: ' ', atClick: () => {}, col: 'col-md-6' }
      ]
    }
  },
  computed: {
    repliesInfo () {
      return this.inputs.find(input => input.name === 'replies_info').value
    }
  },
  created() {
    this.api = APIGateway.media.APIAdresses.byId(this.$route.params.id)
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
.AdminMediaShow {
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
