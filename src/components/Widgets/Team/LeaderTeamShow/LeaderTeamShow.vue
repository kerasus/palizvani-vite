<template>
  <div class="LeaderTeamShow"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-show v-if="mounted"
                 ref="entityShow"
                 v-model:value="inputs"
                 title="اطلاعات گروه"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-save-button="false"
                 :show-reload-button="false"
                 :redirect-after-edit="false"
                 :show-index-button="false"
                 :after-load-input-data="afterLoadInputData" />

    <q-separator class="q-my-lg" />

    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="start">
      <q-tab name="teamRegistrationList"
             label="لیست اعضای گروه" />
      <q-tab name="sessionList"
             label="لیست جلسات" />
    </q-tabs>
    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="teamRegistrationList"
                   class="q-pa-none">
        <entity-index v-if="mounted"
                      ref="teamRegistrationList"
                      v-model:value="teamRegistrationListInputs"
                      title="لیست اعضای گروه"
                      :api="teamRegistrationListApi"
                      :table="teamRegistrationListTable"
                      :table-keys="teamRegistrationListTableKeys"
                      :show-search-button="false"
                      :show-reload-button="false"
                      :show-expand-button="false">
          <template v-slot:entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'number'">
              {{ inputData.rowNumber }}
            </template>
            <template v-else-if="inputData.col.name === 'actions'">
              <div class="action-column-entity-index">
                <!--            <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />-->
              </div>
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </template>
        </entity-index>
      </q-tab-panel>

      <q-tab-panel name="sessionList"
                   class="q-pa-none">
        <entity-index v-if="mounted && entityLoaded"
                      ref="sessionsList"
                      v-model:value="sessionsListInputs"
                      title="لیست جلسات"
                      :api="sessionsListApi"
                      :table="sessionsListTable"
                      :table-keys="sessionsListTableKeys"
                      :show-search-button="false"
                      :show-reload-button="false"
                      :show-expand-button="false">
          <template v-slot:entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'number'">
              {{ inputData.rowNumber }}
            </template>
            <template v-else-if="inputData.col.name === 'actions'">
              <div class="action-column-entity-index">
                <q-btn color="primary"
                       label="مشاهده حضور و غیاب"
                       @click="showSessionSheetsDialog(inputData.props.row.id)" />
                <!--            <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />-->
              </div>
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </template>
        </entity-index>

        <q-dialog v-model="sessionSheetsDialog">
          <entity-index v-if="mounted && entityLoaded"
                        ref="sessionAttendanceSheetList"
                        v-model:value="sessionAttendanceSheetListInputs"
                        style="width: 1024px; max-width: 90%;"
                        title="لیست حضور وغیاب"
                        :api="sessionAttendanceSheetListApi"
                        :table="sessionAttendanceSheetListTable"
                        :table-keys="sessionAttendanceSheetListTableKeys"
                        :show-search-button="false"
                        :show-reload-button="false"
                        :show-expand-button="false">
            <template v-slot:entity-index-table-cell="{inputData}">
              <template v-if="inputData.col.name === 'number'">
                {{ inputData.rowNumber }}
              </template>
              <template v-else>
                {{ inputData.col.value }}
              </template>
            </template>
          </entity-index>
        </q-dialog>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EntityShow, EntityIndex } from 'quasar-crud'
import { FormBuilderAssist } from 'quasar-form-builder'
import { SessionAttendanceSheets } from 'src/models/SessionAttendanceSheets'

export default {
  name: 'LeaderTeamShow',
  components: {
    EntityShow,
    EntityIndex
  },
  mixins: [mixinWidget],
  data () {
    const teamId = this.$route.params.team_id
    return {
      tab: 'teamRegistrationList',
      mounted: false,
      entityLoaded: false,
      entityLoading: true,
      api: APIGateway.team.APIAdresses.byId(teamId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان گروه', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', label: 'ظرفیت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'used_capacity', responseKey: 'used_capacity', label: 'ظرفیت استفاده شده', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-12' }
      ],

      teamRegistrationListInputs: [
        { type: 'hidden', name: 'team', value: teamId }
      ],
      teamRegistrationListApi: APIGateway.teamRegistrations.APIAdresses.base,
      teamRegistrationListTable: {
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
            field: row => row.registration_info.owner_info.id
          },
          {
            name: 'title',
            required: true,
            label: 'جنسیت',
            align: 'left',
            field: row => (row.registration_info.owner_info.gender === 1) ? 'مذکر' : ((row.registration_info.owner_info.gender === 2) ? 'مونث' : '-')
          },
          {
            name: 'creation_time',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.registration_info.owner_info.firstname + ' ' + row.registration_info.owner_info.lastname
          },
          {
            name: 'creation_time',
            required: true,
            label: 'کدملی',
            align: 'left',
            field: row => row.registration_info.owner_info.national_code
          },
          {
            name: 'creation_time',
            required: true,
            label: 'شماره تلفن',
            align: 'left',
            field: row => row.registration_info.owner_info.mobile_number
          },
          {
            name: 'creation_time',
            required: true,
            label: 'دانشگاه',
            align: 'left',
            field: row => row.registration_info.owner_info.last_academy_name
          },
          {
            name: 'creation_time',
            required: true,
            label: 'شهر',
            align: 'left',
            field: row => row.registration_info.owner_info.living_city
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
      teamRegistrationListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      sessionsListInputs: [
        { type: 'hidden', name: 'classroom', value: null }
      ],
      sessionsListApi: APIGateway.session.APIAdresses.base,
      sessionsListTable: {
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
            label: 'عنوان',
            align: 'left',
            field: row => row.title
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
      sessionsListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      sessionSheetsDialog: false,
      sessionAttendanceSheetListInputs: [
        { type: 'hidden', name: 'session', value: null },
        { type: 'hidden', name: 'registration__teams__id', value: teamId }
      ],
      sessionAttendanceSheetListApi: APIGateway.sessionAttendanceSheets.APIAdresses.sessionSheets,
      sessionAttendanceSheetListTable: {
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
            name: 'sender',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'sender',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.owner_info.national_code
          },
          {
            name: 'assignment_status',
            required: true,
            label: 'وضعیت تکلیف',
            align: 'left',
            field: row => (new SessionAttendanceSheets(row)).assignment_status_info.label
          },
          {
            name: 'attendance_status',
            required: true,
            label: 'وضعیت حضور و غیاب',
            align: 'left',
            field: row => (new SessionAttendanceSheets(row)).attendance_status_info.label
          }
        ]
      },
      sessionAttendanceSheetListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    onConfirmedSelectedRegistrations (data) {
      const registrations = data.map(item => item.id)
      this.addNewLeaderLoading = true
      APIGateway.team.appendRegistrations({ teamId: this.$route.params.team_id, registrations })
        .then(() => {
          this.$refs.teamRegistrationList.search()
          this.addNewLeaderLoading = false
        })
        .catch(() => {
          this.addNewLeaderLoading = false
        })
    },
    afterLoadInputData (responseData) {
      FormBuilderAssist.setAttributeByName(this.sessionsListInputs, 'classroom', 'value', responseData.classroom)
      this.entityLoaded = true
      this.entityLoading = false
    },
    showSessionSheetsDialog (sessionId) {
      FormBuilderAssist.setAttributeByName(this.sessionAttendanceSheetListInputs, 'session', 'value', sessionId)
      this.sessionSheetsDialog = true
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.registration_info.owner_info.firstname + ' ' + row.registration_info.owner_info.lastname + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped lang="scss">
.LeaderTeamShow {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    display: flex;
    flex-flow: row;
    position: relative;
    .static-title {

    }
    .dynamic-title {

    }
    .back-action {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  :deep(.form) {
    padding: 24px;
  }
}
</style>
