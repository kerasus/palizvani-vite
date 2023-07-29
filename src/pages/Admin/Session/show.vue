<template>
  <div class="AdminSessionShow">
    <entity-edit v-if="mounted"
                 ref="sessionEntityEdit"
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
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'Admin.Session.Show',
  components: {
    EntityEdit
  },
  data () {
    return {
      mounted: false,
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.SessionTemplate.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام جلسه', placeholder: ' ', col: 'col-md-9 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-12' },
        { type: 'dateTime', name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', label: 'زمان شروع جلسه', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', label: 'زمان پایان جلسه', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'syllabus', responseKey: 'syllabus', label: 'مقرری', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'assignment_description', responseKey: 'assignment_description', label: 'تکلیف جلسه', placeholder: ' ', col: 'col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-12' }
      ]
    }
  },
  mounted () {
    this.api = APIGateway.session.APIAdresses.byId(this.$route.params.id)
    this.mounted = true
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
