<template>
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
               title="جزییات پروژه"
               :api="api"
               :show-close-button="false"
               :show-edit-button="false"
               :show-expand-button="false"
               :show-save-button="false"
               :show-index-button="false"
               :show-reload-button="false"
               :after-load-input-data="afterLoadInputData">
    <template #after-form-builder>
      <div class="flex justify-end q-mt-md">
        <q-btn color="secondary"
               label="ثبت توضیحات"
               :loading="loading"
               class="q-mr-sm"
               @click="saveNotation" />
        <q-btn color="red"
               outline
               label="انجام نشده"
               :loading="loading"
               class="q-mr-sm"
               @click="notVerify" />
        <q-btn color="primary"
               label="انجام شده"
               :loading="loading"
               @click="verify" />
      </div>
    </template>
  </entity-edit>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { Project } from 'src/models/Project.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { ProjectAttendanceSheets } from 'src/models/ProjectAttendanceSheets.js'
import ContentsSelector from 'src/components/FormBuilderCustumComponents/ContentsSelector/ContentsSelector.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

const ContentsSelectorComp = shallowRef(ContentsSelector)

export default {
  name: 'AdminProjectAttendanceSheetShow',
  components: {
    EntityEdit
  },
  data () {
    // const projectId = this.$route.params.project_id
    const projectAttendanceSheetsId = this.$route.params.project_attendance_sheets_id
    return {
      mounted: false,
      loading: false,
      projectAttendanceSheet: new ProjectAttendanceSheets(),
      api: APIGateway.projectAttendanceSheets.APIAdresses.byId(projectAttendanceSheetsId),
      inputs: [
        { type: 'separator', name: 'space', label: 'مشخصات اندیشه جو', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'owner_info.firstname', responseKey: 'owner_info.firstname', label: 'نام', placeholder: ' ', col: 'col-md-6 col-12', readonly: true },
        { type: 'input', name: 'owner_info.lastname', responseKey: 'owner_info.lastname', label: 'نام خانوادگی', placeholder: ' ', col: 'col-md-6 col-12', readonly: true },

        { type: 'separator', name: 'space', label: 'مشخصات پروژه', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'project_info.title', responseKey: 'project_info.title', label: 'عنوان پروژه', placeholder: ' ', col: 'col-md-9 col-12', readonly: true },
        {
          type: 'select',
          name: 'project_info.type',
          responseKey: 'project_info.type',
          label: 'نوع پروژه',
          options: (new Project()).typeEnums,
          placeholder: ' ',
          col: 'col-md-3 col-12',
          readonly: true
        },
        { type: 'inputEditor', name: 'project_info.description', responseKey: 'project_info.description', label: 'توضیحات پروژه', placeholder: ' ', col: 'col-12', readonly: true },

        { type: 'separator', name: 'space', label: 'پاسخ اندیشه چو', className: 'custom-separator', col: 'col-12' },
        { type: 'inputEditor', name: 'answer_text', responseKey: 'answer_text', label: 'پاسخ کاربر', placeholder: ' ', col: 'col-12', readonly: true },
        { type: 'file', name: 'answer_attachment', responseKey: 'answer_attachment', label: 'فایل ضمیمه کاربر', placeholder: ' ', col: 'col-md-3 col-12', readonly: true },
        {
          type: 'select',
          name: 'answer_status',
          responseKey: 'answer_status',
          label: 'وضعیت',
          options: (new ProjectAttendanceSheets()).answer_statusEnums,
          placeholder: ' ',
          col: 'col-md-3 col-12',
          readonly: true
        },
        {
          type: 'select',
          name: 'is_answer_verified',
          responseKey: 'is_answer_verified',
          label: 'نتیجه',
          options: (new ProjectAttendanceSheets()).is_answer_verifiedEnums,
          placeholder: ' ',
          col: 'col-md-3 col-12',
          readonly: true
        },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },

        { type: ContentsSelectorComp, name: 'project_info.contents_info', responseKey: 'project_info.contents_info', col: 'col-12', readonly: true },
        { type: 'inputEditor', name: 'project_info.correct_answer', responseKey: 'project_info.correct_answer', label: 'پاسخ صحیح', placeholder: ' ', col: 'col-12', readonly: true },
        { type: 'inputEditor', name: 'notation', responseKey: 'notation', label: 'توضیحات تصحیح کننده', placeholder: ' ', col: 'col-12' }
      ]
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    afterLoadInputData (data) {
      this.projectAttendanceSheet = new ProjectAttendanceSheets(data)
    },
    reloadData () {
      this.$refs.entityShow.getData()
    },
    verify () {
      this.loading = true
      APIGateway.projectAttendanceSheets.verify(this.$route.params.project_attendance_sheets_id)
        .then(() => {
          this.loading = false
          // this.reloadData()
          this.$router.go(-1)
        })
        .catch(() => {
          this.loading = false
          this.reloadData()
        })
    },
    notVerify () {
      this.loading = true
      APIGateway.projectAttendanceSheets.notVerify(this.$route.params.project_attendance_sheets_id)
        .then(() => {
          this.loading = false
          // this.reloadData()
          this.$router.go(-1)
        })
        .catch(() => {
          this.loading = false
          this.reloadData()
        })
    },
    saveNotation () {
      this.loading = true
      const notation = FormBuilderAssist.getInputsByName(this.inputs, 'notation')?.value
      APIGateway.projectAttendanceSheets.saveNotation(this.$route.params.project_attendance_sheets_id, notation)
        .then(() => {
          this.loading = false
          this.reloadData()
          // this.$router.go(-1)
        })
        .catch(() => {
          this.loading = false
          this.reloadData()
        })
    }
  }
}
</script>
