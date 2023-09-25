<template>
  <entity-index v-if="mounted"
                ref="projectList"
                v-model:value="projectListInputs"
                title="لیست پروژه ها"
                :api="projectListApi"
                :table="projectListTable"
                :table-keys="projectListTableKeys"
                :show-search-button="false"
                :show-reload-button="false"
                :show-expand-button="false">
    <template #toolbar>
      <q-btn color="primary"
             outline
             :loading="addNewProjectLoading"
             @click="addNewProject">
        افزودن پروژه جدید
      </q-btn>
    </template>
    <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
      <template v-if="inputData.col.name === 'number'">
        {{ inputData.rowNumber }}
      </template>
      <template v-else-if="inputData.col.name === 'actions'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 color="primary"
                 label="جزییات"
                 :to="{name: 'Admin.Classroom.Project.Show', params: {classroom_id: $route.params.id, project_id: inputData.props.row.id}}"
                 class="q-mr-md" />
          <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />
        </div>
      </template>
      <template v-else-if="inputData.col.name === 'members'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 color="primary"
                 outline
                 label="بررسی پروژه"
                 :to="{name: 'Admin.Classroom.Project.Members', params: {classroom_id: $route.params.id, project_id: inputData.props.row.id}}"
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
import { Project } from 'src/models/Project.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

export default {
  name: 'ProjectList',
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
      addNewProjectLoading: false,

      projectListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId }
      ],
      projectListApi: APIGateway.project.APIAdresses.base,
      projectListTable: {
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
            label: 'عنوان پروژه',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'type',
            required: true,
            label: 'نوع',
            align: 'left',
            field: row => (new Project(row)).type_info.label
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان شروع پروژه',
            align: 'left',
            field: row => row.beginning_doing_period ? ShamsiDate.getDateTime(row.beginning_doing_period) : '-'
          },
          {
            name: 'creation_time',
            required: true,
            label: 'مهلت ارسال پروژه',
            align: 'left',
            field: row => row.ending_doing_period ? ShamsiDate.getDateTime(row.ending_doing_period) : '-'
          },
          {
            name: 'members',
            required: true,
            label: 'بررسی',
            align: 'left',
            field: ''
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
      projectListTableKeys: {
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
    addNewProject () {
      this.$router.push({ name: 'Admin.Classroom.Project.Create', params: { classroom_id: this.classroomId } })
      // this.addNewProjectLoading = true
      // APIGateway.project.create({
      //   title: '-',
      //   classroom: this.classroomId
      // })
      //   .then(() => {
      //     this.$refs.projectList.search()
      //     this.addNewProjectLoading = false
      //   })
      //   .catch(() => {
      //     this.addNewProjectLoading = false
      //   })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>
