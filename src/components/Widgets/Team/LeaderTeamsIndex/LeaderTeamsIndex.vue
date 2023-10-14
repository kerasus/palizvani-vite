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
    <template v-slot:entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'number'">
        {{ inputData.rowNumber }}
      </template>
      <template v-else-if="inputData.col.name === 'action'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 color="primary"
                 label="جزییات"
                 :to="{name: 'UserPanel.Leader.Teams.Show', params: {team_id:inputData.props.row.id}}"
                 :loading="createInvoiceLoading"
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
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { mixinAuthData } from 'src/mixin/Mixins.js'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'LeaderTeamsShow',
  components: {
    EntityIndex
  },
  mixins: [mixinAuthData],
  data () {
    return {
      mounted: false,
      createInvoiceLoading: false,
      classroom: new Classroom(),

      dropClassroomByAdminLoading: false,
      exportReportLoading: false,
      teamsListInputs: [
        { type: 'hidden', name: 'leader', value: null }
      ],
      teamsListApi: APIGateway.team.APIAdresses.myLeadingTeams,
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
            label: 'ظرفیت باقی مانده',
            align: 'left',
            field: row => row.capacity - row.used_capacity
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
    FormBuilderAssist.setAttributeByName(this.teamsListInputs, 'leader', 'value', this.user.id)
    this.mounted = true
  },
  methods: {
    setMembersListActionBtn () {
      FormBuilderAssist.setAttributeByName(this.teamsListInputs, 'btn', 'atClick', this.searchMembersList)
    },
    searchMembersList () {
      this.$refs.teamsList.search()
    }
  }
}
</script>
