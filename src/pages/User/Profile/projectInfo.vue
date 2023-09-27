<template>
  <breadcrumbs style="margin-top: 29px; margin-bottom: 19px;" />
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <entity-show v-if="mounted"
               ref="projectEntityEdit"
               v-model:value="inputs"
               title="جزییات پروژه"
               :api="api"
               :show-index-button="false"
               :show-close-button="false"
               :show-edit-button="false"
               :show-expand-button="false"
               :show-save-button="false"
               :show-reload-button="false"
               :after-load-input-data="afterLoadProject">
    <template #after-form-builder>
      <q-separator class="q-my-lg" />
      <entity-create v-if="((!currentUserAttendanceSheet || currentUserAttendanceSheet.answer_status === 'NOT_SENT') && currentUserAttendanceSheet?.is_enabled_answering)"
                     ref="entityCreate"
                     v-model:value="attendanceSheetsInputs"
                     :api="attendanceSheetsApi"
                     :default-layout="false" />
<!--      {{ currentUserAttendanceSheet?.answer_attachment }}-->
      <entity-show v-else-if="currentUserAttendanceSheet && currentUserAttendanceSheet.answer_status !== 'NOT_SENT' && !currentUserAttendanceSheet?.is_enabled_answering"
                   v-model:value="attendanceSheetsShowInputs"
                   title="پاسخ کاربر"
                   :loaded-data="currentUserAttendanceSheet"
                   :default-layout="false"
                   :show-expand-button="false"
                   :show-edit-button="false"
                   :show-index-button="false"
                   :show-reload-button="false" />
    </template>
  </entity-show>
</template>

<script>
import { shallowRef } from 'vue'
import { Project } from 'src/models/Project.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { EntityShow, EntityCreate } from 'quasar-crud'
import BtnControl from 'src/components/Control/btn.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import ContentsSelector from 'src/components/FormBuilderCustumComponents/ContentsSelector/ContentsSelector.vue'
import { FormBuilderAssist } from 'quasar-form-builder'
import { ProjectAttendanceSheets } from 'src/models/ProjectAttendanceSheets'

const BtnControlComp = shallowRef(BtnControl)
const ContentsSelectorComp = shallowRef(ContentsSelector)

export default {
  name: 'UserPanel.Profile.ClassroomInfo',
  components: {
    Breadcrumbs,
    EntityShow,
    EntityCreate
  },
  data () {
    const projectId = parseInt(this.$route.params.project_id)
    return {
      mounted: false,
      projectLoaded: false,
      classroomLoaded: false,
      project: new Project(),
      projectAttendanceSheets: new ProjectAttendanceSheets(),
      classroom: new Classroom(),
      api: APIGateway.project.APIAdresses.projectAndCurrentUserAttendanceSheet(projectId),
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان پروژه', placeholder: ' ', col: 'col-md-6 col-12' },
        {
          type: 'select',
          name: 'type',
          responseKey: 'type',
          label: 'نوع پروژه',
          options: (new Project()).typeEnums,
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: 'dateTime', name: 'beginning_doing_period', responseKey: 'beginning_doing_period', label: 'زمان شروع', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_doing_period', responseKey: 'ending_doing_period', label: 'زمان پایان', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات پروژه', placeholder: ' ', col: 'col-12' },
        { type: ContentsSelectorComp, name: 'contents', responseKey: 'contents_info', showPageLink: false, showDownloadLink: true, col: 'col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id' },
        { type: 'hidden', name: 'classroom', responseKey: 'classroom' }
      ],

      attendanceSheetsApi: APIGateway.projectAttendanceSheets.APIAdresses.base,
      attendanceSheetsInputs: [
        { type: 'separator', name: 'space', label: 'انجام پروژه', className: 'custom-separator', col: 'col-12' },
        { type: 'inputEditor', name: 'answer_text', label: 'متن پاسخ', placeholder: ' ', col: 'col-12' },
        { type: 'file', name: 'answer_attachment', label: 'فای ضمیمه', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ارسال پروژه', placeholder: ' ', atClick: () => {}, col: 'col-12' },
        { type: 'hidden', name: 'project', value: projectId }
      ],

      attendanceSheetsShowInputs: [
        { type: 'separator', name: 'space', label: 'انجام پروژه', className: 'custom-separator', col: 'col-12' },
        { type: 'inputEditor', name: 'answer_text', responseKey: 'answer_text', label: 'متن پاسخ', placeholder: ' ', col: 'col-12' },
        { type: 'file', name: 'answer_attachment', responseKey: 'answer_attachment', label: 'فای ضمیمه', placeholder: ' ', col: 'col-md-4 col-12' }
      ]
    }
  },
  computed: {
    currentUserAttendanceSheet () {
      if (!this.projectAttendanceSheets?.project_attendance_sheets || this.projectAttendanceSheets.project_attendance_sheets.length === 0) {
        return null
      }

      return this.projectAttendanceSheets.project_attendance_sheets[0]
    },
    projectAndClassroomLoaded () {
      return this.projectLoaded && this.classroomLoaded
    }
  },
  watch: {
    projectAndClassroomLoaded (newValue) {
      if (!newValue) {
        return
      }
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'دوره های من',
            to: { name: 'UserPanel.Profile.AllClassrooms' }
          },
          {
            label: this.classroom.title,
            to: { name: 'UserPanel.Profile.ClassroomInfo', params: { id: this.classroom.id } }
          },
          {
            label: this.classroom.title,
            to: { name: 'UserPanel.Profile.ClassroomInfo', params: { classroom_id: this.classroom.id, project_id: this.project.id } }
          }
        ]
      })
    }
  },
  mounted () {
    this.mounted = true
    this.getClassroomInfo()
    FormBuilderAssist.setAttributeByName(this.attendanceSheetsInputs, 'btn', 'atClick', this.createAttendanceSheet)
  },
  methods: {
    createAttendanceSheet () {
      this.$refs.entityCreate.createEntity(false)
        .then(() => {
          this.reloadProject()
        })
        .catch(() => {
          this.reloadProject()
        })
    },
    getClassroomInfo () {
      const classroomId = this.$route.params.classroom_id
      this.classroom.loading = true
      APIGateway.classroom.get(classroomId)
        .then((classroom) => {
          this.classroom = new Classroom(classroom)
          this.classroom.loading = false
          this.classroomLoaded = true
        })
        .catch(() => {
          this.classroom.loading = false
        })
    },
    afterLoadProject (data) {
      this.project = new Project(data)
      this.projectAttendanceSheets = new ProjectAttendanceSheets(data)
      this.setAttendanceSheetsInputsValues()
      this.projectLoaded = true
    },
    setAttendanceSheetsInputsValues () {
      FormBuilderAssist.setAttributeByName(this.attendanceSheetsInputs, 'answer_text', 'value', this.currentUserAttendanceSheet.answer_text)
      FormBuilderAssist.setAttributeByName(this.attendanceSheetsInputs, 'answer_attachment', 'value', this.currentUserAttendanceSheet.answer_attachment)
    },
    reloadProject () {
      this.$refs.projectEntityEdit.getData()
    }
  }
}
</script>
