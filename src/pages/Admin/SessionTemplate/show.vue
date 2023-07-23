<template>
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
      api: API_ADDRESS.sessionTemplates.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.SessionTemplate.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام جلسه', col: 'col-md-6' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-md-6' },
        { type: 'inputEditor', name: 'syllabus', responseKey: 'syllabus', label: 'مقرری', col: 'col-md-6' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-12' },
        { type: 'hidden', name: 'unit', responseKey: 'unit', label: 'unit', col: 'col-md-12' }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
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
      this.$axios.post(API_ADDRESS.unit.base, {
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
