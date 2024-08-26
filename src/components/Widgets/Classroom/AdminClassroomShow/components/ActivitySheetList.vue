<template>
  <entity-index v-if="mounted"
                ref="activitySheetList"
                v-model:value="activitySheetListInputs"
                title="فعالیت کلاسی"
                :api="activitySheetListApi"
                :table="activitySheetListTable"
                :table-keys="activitySheetListTableKeys"
                :show-search-button="false"
                :show-reload-button="false"
                :show-expand-button="false">
    <template #toolbar>
      <q-btn color="primary"
             :loading="exportReportLoading"
             @click="getActivitySheetExcel">
        خروجی اکسل
      </q-btn>
    </template>
    <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
      <template v-if="inputData.col.name === 'is_project_done'">
        <q-badge rounded
                 :color="inputData.col.value ? 'green' : 'red'">
          <q-icon :name="inputData.col.value ? 'check' : 'close'"
                  size="20px" />
        </q-badge>
      </template>
      <template v-else-if="inputData.col.name === 'is_passed_assignment_condition'">
        <q-badge rounded
                 :color="inputData.col.value ? 'green' : 'red'">
          <q-icon :name="inputData.col.value ? 'check' : 'close'"
                  size="20px" />
        </q-badge>
      </template>
      <template v-else-if="inputData.col.name === 'is_allowed_absence_count'">
        <q-badge rounded
                 :color="inputData.col.value ? 'green' : 'red'">
          <q-icon :name="inputData.col.value ? 'check' : 'close'"
                  size="20px" />
        </q-badge>
      </template>
      <template v-else-if="inputData.col.name === 'actions'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 color="primary"
                 outline
                 class="q-mr-md"
                 :to="{ name: 'Admin.Classroom.UserClass', params: { classroom_id: classroomId, user_id: inputData.props.row.owner }}">
            سابقه آموزشی
          </q-btn>
          <!--                :to="{name: 'Admin.Session.Show', params: {id: inputData.props.row.id}}"-->
          <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />
        </div>
      </template>
      <template v-else>
        {{ inputData.col.value }}
      </template>
    </template>
  </entity-index>
  <q-skeleton v-else
              type="rect"
              height="200px" />
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'
import Assist from 'assets/js/Assist'
import { Classroom } from 'src/models/Classroom'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'ActivitySheetList',
  components: {
    DeleteBtn,
    EntityIndex
  },
  props: {
    classroomId: {
      type: Number,
      default: null
    },
    classroom: {
      type: Classroom,
      default: new Classroom()
    }
  },
  data () {
    const classroomId = this.classroomId
    return {
      mounted: false,
      createInvoiceLoading: false,

      exportReportLoading: false,
      activitySheetListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId },
        { type: 'input', name: 'owner__national_code', value: null, label: 'کد ملی', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: this.searchActivitySheetList, col: 'col-md-2 col-12' }
      ],
      activitySheetListApi: APIGateway.classroom.APIAdresses.activitySheet,
      activitySheetListTable: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'owner_info.fullname',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'owner_info.fullname',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.owner_info.national_code
          },
          {
            name: 'is_allowed_absence_count',
            required: true,
            label: 'حضور و غیاب',
            align: 'left',
            field: row => row.is_passed_attendance_condition
          },
          {
            name: 'is_project_done',
            required: true,
            label: 'پروژه',
            align: 'left',
            field: row => row.is_passed_project_condition
          },
          {
            name: 'is_passed_assignment_condition',
            required: true,
            label: 'تکالیف',
            align: 'left',
            field: row => row.is_passed_assignment_condition
          },
          {
            name: 'done_assignment_count',
            required: true,
            label: 'تکالیف انجام شده',
            align: 'left',
            field: row => row.done_assignment_count
          },
          // {
          //   name: 'attendance_score',
          //   required: true,
          //   label: 'نمره حضور و غیاب',
          //   align: 'left',
          //   field: row => row.attendance_score
          // },
          // {
          //   name: 'final_test',
          //   required: true,
          //   label: 'آزمون',
          //   align: 'left',
          //   field: row => row.final_test // number - null
          // },
          // {
          //   name: 'final_status',
          //   required: true,
          //   label: 'وضعیت نهایی',
          //   align: 'left',
          //   field: row => row.final_status
          // },
          {
            name: 'actions',
            required: true,
            label: 'سابقه آموزشی',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      activitySheetListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    searchActivitySheetList () {
      this.$refs.activitySheetList.search()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.owner_info.firstname + ' ' + row.owner_info.lastname + ' اطمینان دارید؟'
    },
    getActivitySheetExcel () {
      this.exportReportLoading = true
      const status = null
      APIGateway.classroom.exportActivitySheetReport({
        classroom: this.$route.params.id,
        type: 'activity_sheet_export',
        status
      })
        .then((xlsxData) => {
          Assist.saveXlsx(xlsxData, this.classroom.title)
          this.exportReportLoading = false
        })
        .catch((e) => {
          this.exportReportLoading = false
        })
    }
  }
}
</script>
