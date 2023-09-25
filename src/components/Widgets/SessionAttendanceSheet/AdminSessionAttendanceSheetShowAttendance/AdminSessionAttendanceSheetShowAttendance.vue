<template>
  <div class="AdminContentList"
       :style="localOptions.style">
    <breadcrumbs class="q-mb-xl"
                 style="margin-top: 29px; margin-bottom: 19px;" />
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <q-inner-loading :showing="loading">
      <q-spinner-ball color="primary"
                      size="50px" />
    </q-inner-loading>
    <entity-create v-if="mounted"
                   ref="entityCreateSubmitAttendanceStatus"
                   v-model:value="submitAttendanceStatusInputs"
                   :api="submitAttendanceStatusApi"
                   :default-layout="false"
                   :show-expand-button="false"
                   :show-edit-button="false"
                   :show-index-button="false"
                   :show-reload-button="false" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { Session } from 'src/models/Session.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import { SessionAttendanceSheets } from 'src/models/SessionAttendanceSheets.js'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminSessionAttendanceSheetList',
  components: { EntityCreate, Breadcrumbs },
  mixins: [mixinWidget],
  data () {
    const sessionId = parseInt(this.$route.params.session_id)
    return {
      classroom: new Classroom(),
      session: new Session(),
      sessionAttendanceSheets: new SessionAttendanceSheets(),
      loading: false,
      submitAttendanceStatusInputsReadPart: {
        type: 'formBuilder',
        name: 'is_read_part',
        value: [
          { type: 'separator', name: 'space', label: 'مطالعه', className: 'custom-separator', col: 'col-12' },
          { type: 'checkbox', name: 'is_read_part1', responseKey: 'is_read_part1', value: false, label: 'نیمه اول را مطالعه کردم', col: 'col-md-12' },
          { type: 'checkbox', name: 'is_read_part2', responseKey: 'is_read_part2', value: false, label: 'نیمه دوم را مطالعه کردم', col: 'col-md-12' }
        ],
        col: 'col-md-4 col-12'
      },
      submitAttendanceStatusInputs: [
        {
          type: 'formBuilder',
          name: 'is_present_listen_part',
          value: [
            { type: 'separator', name: 'space', label: 'حضور', className: 'custom-separator', col: 'col-12' },
            { type: 'checkbox', name: 'is_present_listen_part1', responseKey: 'is_present_listen_part1', value: false, label: 'حضور نیمه اول', col: 'col-md-12' },
            { type: 'checkbox', name: 'is_present_listen_part2', responseKey: 'is_present_listen_part2', value: false, label: 'حضور نیمه دوم', col: 'col-md-12' }
          ],
          col: 'col-md-4 col-12'
        },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ثبت حضور و غیاب', placeholder: ' ', customClass: 'flex justify-end', atClick: this.submitAttendanceStatus, col: 'col-12' },
        { type: 'hidden', name: 'session', responseKey: 'session', value: sessionId },
        { type: 'hidden', name: 'owner', responseKey: 'owner', value: null }
      ],
      submitAttendanceStatusApi: APIGateway.sessionAttendanceSheets.APIAdresses.base,
      mounted: false
    }
  },
  mounted() {
    this.getClassroomAndSession()
  },
  methods: {
    getClassroomAndSession () {
      const sessionId = parseInt(this.$route.params.session_id)
      const classroomId = parseInt(this.$route.params.classroom_id)
      const sessionAttendanceSheetsId = parseInt(this.$route.params.session_attendance_sheet_id)
      this.loading = true
      Promise.all([this.getClassInfo(classroomId), this.getSessionInfo(sessionId), this.getSessionAttendanceSheetsInfo(sessionAttendanceSheetsId)])
        .then(() => {
          this.updateBreadcrumbs()
          this.updateAttendanceInputs()
          this.mounted = true
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    updateAttendanceInputs () {
      const isDefinedSyllabus = this.session.is_defined_syllabus
      const classroomHoldingType = this.classroom.holding_type
      FormBuilderAssist.setAttributeByName(this.submitAttendanceStatusInputs, 'owner', 'value', this.sessionAttendanceSheets.owner_info.id)
      this.updateAttendancePresentInputs(classroomHoldingType)
      this.updateAttendanceReadInputs(isDefinedSyllabus)
    },
    updateAttendanceReadInputs (isDefinedSyllabus) {
      if (isDefinedSyllabus) {
        this.submitAttendanceStatusInputs.unshift(this.submitAttendanceStatusInputsReadPart)
      } else {
        this.submitAttendanceStatusInputs.unshift({ type: 'hidden', name: 'is_read_part1', value: null })
        this.submitAttendanceStatusInputs.unshift({ type: 'hidden', name: 'is_read_part2', value: null })
      }
    },
    updateAttendancePresentInputs (classroomHoldingType) {
      if (classroomHoldingType === 'OFFLINE') {
        FormBuilderAssist.setAttributeByName(this.submitAttendanceStatusInputs, 'is_present_listen_part1', 'label', 'صوت نیمه اول')
        FormBuilderAssist.setAttributeByName(this.submitAttendanceStatusInputs, 'is_present_listen_part2', 'label', 'صوت نیمه دوم')
      }
    },
    submitAttendanceStatus () {
      this.loading = true
      this.$refs.entityCreateSubmitAttendanceStatus.createEntity(false)
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'دوره های آموزشی',
            to: { name: 'Admin.Classroom.Index' }
          },
          {
            label: this.classroom.title,
            to: { name: 'Admin.Classroom.Show', params: { id: this.$route.params.classroom_id } }
          },
          {
            label: 'لیست حضور و غیاب',
            to: { name: 'Admin.Classroom.Session.AttendanceSheetList', params: { classroom_id: this.$route.params.classroom_id, session_id: this.$route.params.session_id } }
          },
          {
            label: 'حضور و غیاب',
            to: { name: 'Admin.Classroom.Session.AttendanceSheet.Attendance', params: { classroom_id: this.$route.params.classroom_id, session_id: this.$route.params.session_id, session_attendance_sheet_id: this.$route.params.session_attendance_sheet_id } }
          }
        ]
      })
    },
    getClassInfo (classroomId) {
      return new Promise((resolve, reject) => {
        this.classroom.loading = true
        APIGateway.classroom.get(classroomId)
          .then(classroom => {
            this.classroom = new Classroom(classroom)
            this.classroom.loading = false
            resolve(this.classroom)
          })
          .catch(() => {
            this.classroom.loading = false
            reject()
          })
      })
    },
    getSessionInfo (sessionId) {
      return new Promise((resolve, reject) => {
        this.session.loading = true
        APIGateway.session.get(sessionId)
          .then(session => {
            this.session = new Session(session)
            this.session.loading = false
            resolve(this.session)
          })
          .catch(() => {
            this.session.loading = false
            reject()
          })
      })
    },
    getSessionAttendanceSheetsInfo (sessionAttendanceSheetsId) {
      return new Promise((resolve, reject) => {
        this.sessionAttendanceSheets.loading = true
        APIGateway.sessionAttendanceSheets.get(sessionAttendanceSheetsId)
          .then(sessionAttendanceSheets => {
            this.sessionAttendanceSheets = new SessionAttendanceSheets(sessionAttendanceSheets)
            this.sessionAttendanceSheets.loading = false
            resolve(this.sessionAttendanceSheets)
          })
          .catch(() => {
            this.sessionAttendanceSheets.loading = false
            reject()
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminContentList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
