<template>
  <entity-index v-if="classroomLoaded"
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
import { Classroom } from 'src/models/Classroom.js'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'TestList',
  components: {
    DeleteBtn,
    EntityIndex
  },
  props: {
    classroom: {
      type: Classroom,
      default: new Classroom()
    },
    classroomType: {
      type: String,
      default: 'TRAINING'
    }
  },
  data () {
    return {
      classroomLoaded: false,
      listTitle: 'لیست آزمون ها',
      addBtnTitle: 'افزودن آزمون',
      addNewSessionLoading: false,

      testListInputs: [
        { type: 'hidden', name: 'unit', value: null }
      ],
      testListApi: APIGateway.session.APIAdresses.base,
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
            name: 'beginning_time',
            required: true,
            label: 'زمان شروع آزمون',
            align: 'left',
            field: row => row.beginning_time ? ShamsiDate.getDateTime(row.beginning_time) : '-'
          },
          {
            name: 'ending_time',
            required: true,
            label: 'زمان پایان آزمون',
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
    classroomId () {
      return this.classroom.id
    },
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
  watch: {
    classroomId (newValue) {
      if (!newValue) {
        return
      }

      const unitId = newValue.unit || newValue.unit_info.id
      FormBuilderAssist.setAttributeByName(this.testListInputs, 'unit', 'value', unitId)
      this.classroomLoaded = true
    }
  },
  mounted () {
    this.setClassroomTypeOfInputs()
  },
  methods: {
    setClassroomTypeOfInputs () {
      if (this.classroomType === 'TRAINING') {
        this.listTitle = 'لیست آزمون ها'
        this.addBtnTitle = 'افزودن آزمون'
      }
      if (this.classroomType === 'EVENT') {
        this.listTitle = 'لیست برنامه ها'
        this.addBtnTitle = 'افزودن برنامه'
        this.testListTable.columns.forEach(col => {
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
