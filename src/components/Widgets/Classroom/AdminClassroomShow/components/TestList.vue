<template>
  <entity-index v-if="mounted"
                ref="testList"
                v-model:value="testListInputs"
                :title="listTitle"
                :api="testListApi"
                :table="testListTable"
                :table-keys="testListTableKeys"
                :show-search-button="false"
                :show-reload-button="false"
                :show-expand-button="false">
    <template #toolbar>
      <q-btn color="primary"
             outline
             :loading="addNewSessionLoading"
             :to="{name: 'Admin.Classroom.TestSet.Index', params: {classroom_id: classroomId, unit_id: classroom.unit}}">
        {{ addBtnTitle }}
      </q-btn>
    </template>
    <template v-slot:entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'number'">
        {{ inputData.rowNumber }}
      </template>
      <template v-else-if="inputData.col.name === 'answer'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 outline
                 color="grey"
                 label="تصحیح"
                 :to="{name: 'Admin.Classroom.Test.AnswerBooks.Index', params: {classroom_id: classroomId, test_id: inputData.props.row.id}}" />
        </div>
      </template>
      <template v-else-if="inputData.col.name === 'actions'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 color="primary"
                 label="جزییات"
                 :to="{name: 'Admin.Classroom.TestSet.Test.Show', params: {classroom_id: classroomId, test_set_id: inputData.props.row.test_set_info.id, id: inputData.props.row.id}}"
                 class="q-mr-md" />
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
import { Test } from 'src/models/Test.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom'

export default {
  name: 'TestList',
  components: {
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
    },
    classroom: {
      type: Classroom,
      default: new Classroom()
    }
  },
  data () {
    return {
      mounted: false,
      listTitle: 'لیست آزمون ها',
      addBtnTitle: 'افزودن آزمون',
      addNewSessionLoading: false,

      testListInputs: [
        { type: 'hidden', name: 'classroom', value: this.classroomId }
      ],
      testListApi: APIGateway.test.APIAdresses.base,
      testListTable: {
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
            label: 'عنوان آزمون',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'test_set_questions_length',
            required: true,
            label: 'تعداد سوالات',
            align: 'left',
            field: row => row.test_set_info?.test_set_questions ? row.test_set_info.test_set_questions.length : '-'
          },
          {
            name: 'level',
            required: true,
            label: 'درچه سختی',
            align: 'left',
            field: row => (new Test(row.test_set_info)).level_info.label
          },
          {
            name: 'title',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Test(row)).status_info.label
          },
          {
            name: 'answer',
            required: true,
            label: 'تصحییح',
            align: 'left',
            field: row => ''
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
      testListTableKeys: {
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
        this.listTitle = 'لیست آزمون ها'
        this.addBtnTitle = 'افزودن آزمون'
      }
      if (this.classroomType === 'EVENT') {
        this.listTitle = 'لیست پرسشنامه ها'
        this.addBtnTitle = 'افزودن پرسشنامه'
        this.testListTable.columns.forEach(col => {
          if (col.name === 'title') {
            col.label = 'عنوان پرسشنامه'
          }
          if (col.name === 'beginning_time') {
            col.label = 'زمان شروع پرسشنامه'
          }
          if (col.name === 'ending_time') {
            col.label = 'زمان پایان پرسشنامه'
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
          this.$refs.testList.search()
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
