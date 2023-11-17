<template>
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <div class="AdminClassroomProjectMembers">
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست کاربران"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :show-expand-button="false"
                  :show-reload-button="false"
                  :show-search-button="false">
      <template v-slot:entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <div class="action-column-entity-index">
            <q-btn size="md"
                   color="primary"
                   :label="inputData.props.row.is_answer_verified === null ? 'بررسی پروژه' : 'ویرایش تصحیح'"
                   :to="{name: 'Admin.Classroom.projectAttendanceSheets.Show', params: { classroom_id: $route.params.classroom_id, project_id: $route.params.project_id, project_attendance_sheets_id: inputData.props.row.id}}"
                   class="q-mr-md" />
          </div>
        </template>
        <template v-else-if="inputData.col.name === 'status'">
          <div class="action-column-entity-index">
            <q-toggle v-model="inputData.props.row.is_active"
                      label="فعال/غیر فعال"
                      @update:model-value="changeUserActiveStatus(inputData.props.row)" />
          </div>
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
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { Registration } from 'src/models/Registration.js'
import { ProjectAttendanceSheets } from 'src/models/ProjectAttendanceSheets.js'

const BtnControlComp = shallowRef(BtnControl)

// const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'Admin.User.Index',
  components: {
    EntityIndex
  },
  data () {
    const projectId = this.$route.params.project_id
    return {
      mounted: false,
      exportReportLoading: false,
      inputs: [
        { type: 'hidden', name: 'project', value: projectId },
        { type: 'input', name: 'owner__national_code', label: 'کد ملی', placeholder: ' ', value: null, col: 'col-md-3 col-12' },
        { type: 'select', name: 'registration__status', label: 'وضعیت ثبت نام', placeholder: ' ', value: null, options: (new Registration()).statusEnums, col: 'col-md-3 col-12' },
        { type: 'select', name: 'answer_status', label: 'وضعیت انجام پروژه', placeholder: ' ', value: null, options: (new ProjectAttendanceSheets()).answer_statusEnums, col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-3 col-12' }
      ],
      api: APIGateway.projectAttendanceSheets.APIAdresses.project_sheets,
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
            name: 'fullname',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.owner_info?.firstname + ' ' + row.owner_info?.lastname
          },
          {
            name: 'national_code',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.owner_info?.national_code
          },
          {
            name: 'mobile_number',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => new ProjectAttendanceSheets(row).answer_status_info.label
          },
          {
            name: 'mobile_number',
            required: true,
            label: 'نتیجه',
            align: 'left',
            field: row => (row.is_answer_verified === null) ? '-' : ((row.is_answer_verified ? 'انجام شده' : 'انجام نشده'))
          },
          {
            name: 'action',
            required: true,
            label: '',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  mounted() {
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.search)
    },
    search () {
      this.$refs.entityIndex.search()
    },
    changeUserActiveStatus (user) {
      APIGateway.user.updateByAdmin(user)
        .then(() => {
          this.search()
        })
        .catch(() => {
          this.search()
        })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.firstname + row.lastname + ' اطمینان دارید؟'
    }
  }
}
</script>

<style lang="scss">
.AdminClassroomProjectMembers {
  .action-column-entity-index {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
