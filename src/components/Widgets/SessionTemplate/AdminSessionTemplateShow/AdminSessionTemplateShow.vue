<template>
  <div class="AdminSessionTemplateShow"
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
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminSessionTemplateShow',
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
      indexRouteName: 'Admin.Content.List',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام جلسه', placeholder: ' ', col: 'col-md-9 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-12' },
        { type: 'dateTime', name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', outsideLabel: 'زمان شروع جلسه', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', outsideLabel: 'زمان پایان جلسه', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'syllabus', responseKey: 'syllabus', label: 'مقرری', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'assignment_description', responseKey: 'assignment_description', label: 'تکلیف جلسه', placeholder: ' ', col: 'col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-12' }
      ]
    }
  },
  created() {
    this.api = APIGateway.sessionTemplate.APIAdresses.byId(this.$route.params.id)
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
.AdminSessionTemplateShow {
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
