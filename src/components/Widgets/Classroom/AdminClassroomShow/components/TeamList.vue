<template>
  <entity-index v-if="mounted"
                ref="teamsList"
                v-model:value="teamsListInputs"
                title="لیست گروه ها"
                :api="teamsListApi"
                :table="teamsListTable"
                :table-keys="teamsListTableKeys"
                :show-search-button="false"
                :show-reload-button="false"
                :show-expand-button="false">
    <template #toolbar>
      <q-btn color="primary"
             outline
             :loading="exportReportLoading"
             :to="{name: 'Admin.Classroom.Team.Create', params: {classroom_id: classroomId}}">
        ایجاد گروه جدید
      </q-btn>
    </template>
    <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
      <template v-if="inputData.col.name === 'number'">
        {{ inputData.rowNumber }}
      </template>
      <template v-else-if="inputData.col.name === 'action'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 color="primary"
                 label="جزییات"
                 :to="{name: 'Admin.Classroom.Team.Show', params: {classroom_id: classroomId, team_id:inputData.props.row.id}}"
                 :loading="createInvoiceLoading"
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
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

export default {
  name: 'TeamList',
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
      classroom: new Classroom(),

      dropClassroomByAdminLoading: false,
      exportReportLoading: false,
      teamsListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId }
      ],
      teamsListApi: APIGateway.team.APIAdresses.base,
      teamsListTable: {
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
            label: 'عنوان گروه',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'leader_info',
            required: true,
            label: 'سرگروه',
            align: 'left',
            field: row => row.leader_info?.firstname + ' ' + row.leader_info?.lastname
          },
          {
            name: 'used_capacity',
            required: true,
            label: 'ظرفیت استفاده شده',
            align: 'left',
            field: row => row.used_capacity
          },
          {
            name: 'capacity',
            required: true,
            label: 'ظرفیت',
            align: 'left',
            field: row => row.capacity
          },
          {
            name: 'action',
            required: true,
            label: ' ',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      teamsListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  mounted () {
    this.setMembersListActionBtn()
    this.mounted = true
  },
  methods: {
    setMembersListActionBtn () {
      FormBuilderAssist.setAttributeByName(this.teamsListInputs, 'btn', 'atClick', this.searchMembersList)
    },
    searchMembersList () {
      this.$refs.teamsList.search()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>
