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
    <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
      <template v-if="inputData.col.name === 'actions'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 color="primary"
                 outline
                 label="سابقه آموزشی"
                 class="q-mr-md" />
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
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

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
    }
  },
  data () {
    const classroomId = this.classroomId
    return {
      mounted: false,
      createInvoiceLoading: false,

      activitySheetListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId },
        { type: 'select', name: 'status', value: null, label: 'وضعیت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
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
            name: 'is_project_done',
            required: true,
            label: 'پروژه',
            align: 'left',
            field: row => row.is_passed_project_condition ? '1' : '0'
          },
          {
            name: 'done_assignment_count',
            required: true,
            label: 'تکالیف',
            align: 'left',
            field: row => row.is_passed_assignment_condition ? '1' : '0'
          },
          {
            name: 'done_assignment_count',
            required: true,
            label: 'تکالیف انجام شده',
            align: 'left',
            field: row => row.done_assignment_count
          },
          {
            name: 'is_allowed_absence_count',
            required: true,
            label: 'حضور و غیاب',
            align: 'left',
            field: row => row.is_passed_attendance_condition ? '1' : '0'
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
    this.setActivitySheetListActionBtn()
    this.mounted = true
  },
  methods: {
    setActivitySheetListActionBtn () {
      FormBuilderAssist.setAttributeByName(this.activitySheetListInputs, 'btn', 'atClick', this.searchActivitySheetList)
    },
    searchActivitySheetList () {
      this.$refs.activitySheet.search()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>
