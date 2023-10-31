<template>
  <entity-index v-if="mounted"
                ref="sessionList"
                v-model:value="sessionListInputs"
                :title="listTitle"
                :api="sessionListApi"
                :table="sessionListTable"
                :table-keys="sessionListTableKeys"
                :show-search-button="false"
                :show-reload-button="false"
                :show-expand-button="false">
    <template #toolbar>
      <q-btn color="primary"
             outline
             :loading="addNewSessionLoading"
             @click="addNewSession">
        {{ addBtnTitle }}
      </q-btn>
    </template>
    <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
      <template v-if="inputData.col.name === 'number'">
        {{ inputData.rowNumber }}
      </template>
      <template v-else-if="inputData.col.name === 'actions'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 outline
                 color="primary"
                 label="بررسی"
                 :to="{name: sessionAttendanceSheetList, params: {classroom_id: classroomId, session_id: inputData.props.row.id}}"
                 class="q-mr-md" />
          <q-btn size="md"
                 color="primary"
                 label="جزییات"
                 :to="{name: 'Admin.Session.Show', params: {id: inputData.props.row.id}}"
                 class="q-mr-md" />
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
import { EntityIndex } from 'quasar-crud'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

export default {
  name: 'SessionList',
  components: {
    DeleteBtn,
    EntityIndex
  },
  props: {
    classroomId: {
      type: Number,
      default: null
    },
    classroomType: {
      type: String,
      default: 'TRAINING'
    }
  },
  data () {
    const classroomId = this.classroomId
    return {
      mounted: false,
      listTitle: 'لیست جلسات',
      addBtnTitle: 'افزودن جلسه',
      addNewSessionLoading: false,

      sessionListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId, label: 'نام دوره', col: 'col-12' }
      ],
      sessionListApi: APIGateway.session.APIAdresses.base,
      sessionListTable: {
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
            name: 'title',
            required: true,
            label: 'عنوان جلسه',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'beginning_time',
            required: true,
            label: 'زمان شروع جلسه',
            align: 'left',
            field: row => row.beginning_time ? ShamsiDate.getDateTime(row.beginning_time) : '-'
          },
          {
            name: 'ending_time',
            required: true,
            label: 'زمان پایان جلسه',
            align: 'left',
            field: row => row.ending_time ? ShamsiDate.getDateTime(row.ending_time) : '-'
          },
          {
            name: 'actions',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: ''
          }
        ]
      },
      sessionListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  computed: {
    sessionAttendanceSheetList () {
      if (this.classroomType === 'TRAINING') {
        return 'Admin.Classroom.Session.AttendanceSheetList'
      }
      if (this.classroomType === 'EVENT') {
        return 'Admin.Event.Session.AttendanceSheetList'
      }
      return 'Admin.Classroom.Session.AttendanceSheetList'
    }
  },
  mounted () {
    this.setClassroomTypeOfInputs()
    this.mounted = true
  },
  methods: {
    setClassroomTypeOfInputs () {
      if (this.classroomType === 'TRAINING') {
        this.listTitle = 'لیست جلسات'
        this.addBtnTitle = 'افزودن جلسه'
      }
      if (this.classroomType === 'EVENT') {
        this.listTitle = 'لیست برنامه ها'
        this.addBtnTitle = 'افزودن برنامه'
        this.sessionListTable.columns.forEach(col => {
          if (col.name === 'title') {
            col.label = 'عنوان برنامه'
          }
          if (col.name === 'beginning_time') {
            col.label = 'زمان شروع برنامه'
          }
          if (col.name === 'ending_time') {
            col.label = 'زمان پایان برنامه'
          }
        })
      }
    },
    addNewSession () {
      this.addNewSessionLoading = true
      APIGateway.session.create({
        title: '-',
        classroom: this.classroomId
      })
        .then(() => {
          this.$refs.sessionList.search()
          this.addNewSessionLoading = false
        })
        .catch(() => {
          this.addNewSessionLoading = false
        })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>
