<template>
  <entity-edit ref="sessionEntityEdit"
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
import { EntityEdit } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses.js'

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
      api: API_ADDRESS.session.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.SessionTemplate.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام جلسه', col: 'col-md-9' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        { type: 'dateTime', name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', label: 'زمان شروع جلسه', col: 'col-md-6' },
        { type: 'dateTime', name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', label: 'زمان پایان جلسه', col: 'col-md-6' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-md-6' },
        { type: 'inputEditor', name: 'syllabus', responseKey: 'syllabus', label: 'مقرری', col: 'col-md-6' },
        { type: 'inputEditor', name: 'assignment_description', responseKey: 'assignment_description', label: 'تکلیف جلسه', col: 'col-md-12' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-12' }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    updateSessionTemplates () {
      this.$refs.sessionEntityEdit.editEntity()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>

<style>
.fit-to-card {
  margin: -16px;
}
</style>
