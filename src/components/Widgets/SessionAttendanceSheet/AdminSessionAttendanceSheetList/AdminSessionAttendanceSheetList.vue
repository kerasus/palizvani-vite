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
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست حضور و غیاب"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 outline
                 class="q-mr-md"
                 :to="{name: 'Admin.Classroom.Session.AttendanceSheet.Attendance', params: {classroom_id: $route.params.classroom_id, session_id: $route.params.session_id, session_attendance_sheet_id: inputData.props.row.id}}">
            حضور و غیاب
          </q-btn>
          <q-btn color="primary"
                 :outline="inputData.props.row.assignment_status !== 'NOT_SENT'"
                 :to="{name: 'Admin.Classroom.Session.AttendanceSheet.Assignment', params: {classroom_id: $route.params.classroom_id, session_id: $route.params.session_id, session_attendance_sheet_id: inputData.props.row.id}}">
            <template v-if="inputData.props.row.assignment_status !== 'NOT_SENT'">
              ویرایش تصحیح
            </template>
            <template v-else>
              بررسی تکلیف
            </template>
          </q-btn>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { Registration } from 'src/models/Registration.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import { SessionAttendanceSheets } from 'src/models/SessionAttendanceSheets.js'
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminSessionAttendanceSheetList',
  components: { EntityIndex, Breadcrumbs },
  mixins: [mixinWidget],
  data () {
    const sessionId = this.$route.params.session_id
    return {
      classroom: new Classroom(),
      api: APIGateway.sessionAttendanceSheets.APIAdresses.sessionSheets,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'session', value: sessionId },
        { type: 'select', name: 'registration__status', label: 'وضعیت ثبت نام', placeholder: ' ', value: null, options: (new Registration()).statusEnums, col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-3 col-12' }
      ],
      table: {
        columns: [
          {
            name: 'number',
            required: true,
            label: 'شماره',
            align: 'left',
            field: () => ''
          },
          {
            name: 'id',
            required: true,
            label: 'شناسه',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'sender',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'sender',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.owner_info.national_code
          },
          {
            name: 'assignment_status',
            required: true,
            label: 'وضعیت تکلیف',
            align: 'left',
            field: row => (new SessionAttendanceSheets(row)).assignment_status_info.label
          },
          {
            name: 'attendance_status',
            required: true,
            label: 'وضعیت حضور و غیاب',
            align: 'left',
            field: row => (new SessionAttendanceSheets(row)).attendance_status_info.label
          },
          {
            name: 'action',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: row => ''
          }
        ]
      },
      mounted: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.mounted = true
    this.setActionBtn()
    this.getClassroom()
      .then(classroom => {
        this.updateBreadcrumbs(classroom)
      })
  },
  methods: {
    updateBreadcrumbs (classroom) {
      this.classroom = new Classroom(classroom)
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
          }
        ]
      })
    },
    search () {
      this.$refs.entityIndex.search()
    },
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.search)
    },
    getClassroom () {
      return APIGateway.classroom.get(this.$route.params.classroom_id)
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
