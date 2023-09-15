<template>
  <entity-index v-if="mounted"
                ref="sessionList"
                v-model:value="sessionListInputs"
                title="لیست جلسات"
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
        افزودن جلسه
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
                 :to="{name: 'Admin.Classroom.Session.AttendanceSheetList', params: {classroom_id: classroomId, session_id: inputData.props.row.id}}"
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
    }
  },
  data () {
    const classroomId = this.classroomId
    return {
      mounted: false,
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
            name: 'creation_time',
            required: true,
            label: 'زمان شروع جلسه',
            align: 'left',
            field: row => row.beginning_time ? ShamsiDate.getDateTime(row.beginning_time) : '-'
          },
          {
            name: 'last_modification_time',
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
  mounted () {
    this.mounted = true
  },
  methods: {
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
