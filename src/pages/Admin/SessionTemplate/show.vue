<template>
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <entity-edit ref="categoryEntityEdit"
               v-model:value="inputs"
               title="جزییات جلسه"
               :api="api"
               :entity-id-key="entityIdKey"
               :entity-param-key="entityParamKey"
               :show-route-name="showRouteName"
               :show-close-button="false"
               :show-edit-button="false"
               :show-expand-button="false"
               :show-save-button="false"
               :show-reload-button="false">
    <template #after-form-builder>
      <div class="flex justify-end">
        <q-btn color="primary"
               label="ذخیره جزییات"
               @click="updateSessionTemplates" />
      </div>
    </template>
  </entity-edit>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import ContentsSelector from 'src/components/FormBuilderCustumComponents/ContentsSelector/ContentsSelector.vue'

const ContentsSelectorComp = shallowRef(ContentsSelector)

export default {
  name: 'Admin.SessionTemplates.Index',
  components: {
    EntityEdit
  },
  data () {
    return {
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.SessionTemplate.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام جلسه', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'syllabus', responseKey: 'syllabus', label: 'مقرری', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: ContentsSelectorComp, name: 'contents', responseKey: 'contents_info', col: 'col-12' },
        { type: 'inputEditor', name: 'assignment_question', responseKey: 'assignment_question', label: 'تکلیف', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'assignment_answer', responseKey: 'assignment_answer', label: 'پاسخ تکلیف', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id' },
        { type: 'hidden', name: 'unit', responseKey: 'unit' }
      ]
    }
  },
  created () {
    this.api = APIGateway.sessionTemplate.APIAdresses.byId(this.$route.params.id)
  },
  methods: {
    updateSessionTemplates () {
      this.$refs.categoryEntityEdit.editEntity()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    },
    reloadUnits () {
      this.$refs.unitEntityIndex.reload()
    },
    createUnit () {
      this.newUnitLoading = true
      APIGateway.unit.create({
        title: this.newUnitName,
        category: this.$route.params.id,
        default_session_count: this.newUnitSessionCount
      })
        .then(() => {
          this.newUnitLoading = false
          this.reloadUnits()
        })
        .catch(() => {
          this.newUnitLoading = false
        })
    }
  }
}
</script>

<style>
.fit-to-card {
  margin: -16px;
}
</style>
