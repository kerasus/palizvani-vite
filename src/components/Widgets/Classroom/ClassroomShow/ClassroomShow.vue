<template>
  <breadcrumbs style="margin-top: 29px; margin-bottom: 19px;" />
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <q-card>
    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
      <q-tab v-if="canShowTabPageForClassroomType('classroomInfo')"
             name="classroomInfo"
             :label="` اطلاعات ${classroomTypeTitle}`" />
      <q-tab v-if="canShowOtherTabsOfClassroom && canShowTabPageForClassroomType('educations')"
             name="educations"
             :label="educationsTabTitle" />
      <q-tab v-if="canShowOtherTabsOfClassroom && canShowTabPageForClassroomType('team')"
             name="team"
             label="گروه" />
      <q-tab v-if="canShowOtherTabsOfClassroom && canShowTabPageForClassroomType('exams')"
             name="exams"
             label="آزمون" />
      <q-tab v-if="canShowOtherTabsOfClassroom && canShowTabPageForClassroomType('projects')"
             name="projects"
             label="پروژه" />
      <q-tab v-if="canShowOtherTabsOfClassroom && classroom.live_streaming_url && canShowTabPageForClassroomType('live_streaming_url')"
             name="live_streaming_url"
             label="بخش آنلاین" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="classroomInfo">
        <show-classroom-info v-if="mounted"
                             :options="{ profileMode: true }"
                             :classroom-type="localOptions.classroomType"
                             @onloadn="onloadnClassroom" />
      </q-tab-panel>

      <q-tab-panel name="educations"
                   class="q-pa-none">
        <entity-index v-if="mounted"
                      ref="entityIndex"
                      v-model:value="sessionsInputs"
                      :title="educationsListTitle"
                      :api="sessionsApi"
                      :table="sessionsTable"
                      :table-keys="sessionsTableKeys"
                      :table-grid-size="$q.screen.lt.sm"
                      :show-expand-button="false"
                      :show-reload-button="false"
                      :show-search-button="false">
          <template #entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'number'">
              {{ inputData.rowNumber }}
            </template>
            <template v-else-if="inputData.col.name === 'action'">
              <q-btn size="md"
                     color="primary"
                     label="جزییات"
                     :to="{name: 'UserPanel.Profile.SessionInfo', params: {id: inputData.props.row.id}}" />
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </template>
          <template #entity-index-table-item-cell="{inputData}">
            <entity-index-grid-item :input-data="inputData">
              <template #col="{col, row}">
                <template v-if="col.name === 'number'">
                  {{ inputData.rowNumber }}
                </template>
                <template v-else-if="col.name === 'action'">
                  <q-btn size="md"
                         color="primary"
                         label="جزییات"
                         :to="{name: 'UserPanel.Profile.SessionInfo', params: {id: row.id}}" />
                </template>
              </template>
            </entity-index-grid-item>
          </template>
        </entity-index>
      </q-tab-panel>

      <q-tab-panel name="team"
                   class="q-pa-none">
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
                       :flat="inputData.props.row.join_status !== 'ENABLED'"
                       :disable="inputData.props.row.join_status !== 'ENABLED'"
                       :label="getTeamJoinStatusLabel(inputData.props.row)"
                       class="q-mr-md"
                       :loading="joinTeamLoading"
                       @click="joinTeam(inputData.props.row)" />
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
      </q-tab-panel>

      <q-tab-panel name="exams">
        آزمون
      </q-tab-panel>

      <q-tab-panel name="projects"
                   class="q-pa-none">
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
          <template v-slot:entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'number'">
              {{ inputData.rowNumber }}
            </template>
            <template v-else-if="inputData.col.name === 'actions'">
              <div class="action-column-entity-index">
                <q-btn size="md"
                       color="primary"
                       label="جزییات"
                       :to="{name: 'UserPanel.Profile.Classroom.Project.Show', params: {classroom_id: $route.params.id, project_id: inputData.props.row.id}}"
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
      </q-tab-panel>
      <q-tab-panel v-if="classroom.live_streaming_url"
                   name="live_streaming_url">
        <q-btn class="full-width q-mb-lg"
               color="primary"
               @click="goToLiveStreamUrl">
          رفتن به کلاس
        </q-btn>
        <q-banner>
          <div class="q-mb-md">
            نام کاربری اسکای روم:
            {{ user.national_code }}
          </div>
          <div>
            کلمه عبور اسکای روم:
            1234
          </div>
        </q-banner>
        <iframe :src="classroom.live_streaming_url"
                title="W3Schools Free Online Web Tutorials"
                style="height: 80vh"
                class="full-width" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { Team } from 'src/models/Team.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { mixinAuth, mixinWidget } from 'src/mixin/Mixins.js'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'
import { Registration, RegistrationList } from 'src/models/Registration.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import { ProjectAttendanceSheets } from 'src/models/ProjectAttendanceSheets.js'
import { SessionAttendanceSheets } from 'src/models/SessionAttendanceSheets.js'
import ShowClassroomInfo from 'src/components/Widgets/Other/ShowClassroomInfo/ShowClassroomInfo.vue'

export default {
  name: 'ClassroomShow',
  components: {
    EntityIndex,
    Breadcrumbs,
    ShowClassroomInfo,
    EntityIndexGridItem
  },
  mixins: [mixinAuth, mixinWidget],
  data () {
    const classroomId = this.$route.params.id
    // const userId = this.$store.getters['Auth/user'].id
    return {
      mounted: false,
      tab: 'classroomInfo',
      inputs: [],
      sessionsInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId }
      ],
      defaultOptions: {
        classroomType: 'TRAINING'
      },
      api: APIGateway.classroom.get(classroomId),
      sessionsApi: APIGateway.session.APIAdresses.attendanceSheets,
      classroom: new Classroom(),
      table: {
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
            name: 'beginning_time',
            required: true,
            label: 'زمان شروع',
            align: 'left',
            field: row => row.beginning_time ? ShamsiDate.getDateTime(row.beginning_time) : '-'
          },
          {
            name: 'ending_time',
            required: true,
            label: 'زمان پایان',
            align: 'left',
            field: row => row.ending_time ? ShamsiDate.getDateTime(row.ending_time) : '-'
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: ''
          }
        ]
      },
      sessionsTable: {
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
            name: 'beginning_time',
            required: true,
            label: 'زمان شروع',
            align: 'left',
            field: row => row.beginning_time ? ShamsiDate.getDateTime(row.beginning_time) : '-'
          },
          {
            name: 'ending_time',
            required: true,
            label: 'زمان پایان',
            align: 'left',
            field: row => row.ending_time ? ShamsiDate.getDateTime(row.ending_time) : '-'
          },
          {
            name: 'assignment_status',
            required: true,
            label: 'وضعیت تکلیف',
            align: 'left',
            field: row => (new SessionAttendanceSheets(this.getCurrentUserAttendanceSheet(row))).assignment_status_info.label
          },
          {
            name: 'attendance_status',
            required: true,
            label: 'وضعیت حضور و غیاب',
            align: 'left',
            field: row => (new SessionAttendanceSheets(this.getCurrentUserAttendanceSheet(row))).attendance_status_info.label
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: ''
          }
        ]
      },
      sessionsTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      projectListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId }
        // { type: 'hidden', name: 'owner', value: userId }
      ],
      // projectListApi: APIGateway.projectAttendanceSheets.APIAdresses.base,
      projectListApi: APIGateway.project.APIAdresses.attendanceSheetsList,
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
            name: 'creation_time',
            required: true,
            label: 'زمان شروع',
            align: 'left',
            field: row => row?.beginning_doing_period ? ShamsiDate.getDateTime(row.beginning_doing_period) : '-'
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان پایان',
            align: 'left',
            field: row => row?.ending_doing_period ? ShamsiDate.getDateTime(row.ending_doing_period) : '-'
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new ProjectAttendanceSheets(this.getProjectAttendanceSheets(row))).answer_status_info.label
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
      },

      registrations: new RegistrationList(),
      classroomRegistration: new Registration(),

      joinTeamLoading: false,
      teamsListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId }
      ],
      teamsListApi: APIGateway.team.APIAdresses.classroomTeamsWithJoinStatus,
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
  computed: {
    classroomTypeTitle () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'دوره'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'رویداد'
      }
      return 'دوره'
    },
    listTitle () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'لیست دوره های آموزشی'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'لیست رویدادها'
      }
      return 'لیست دوره های آموزشی'
    },
    educationsListTitle () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'لیست جلسات'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'لیست برنامه ها'
      }
      return 'لیست جلسات'
    },
    educationsTabTitle () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'جدول آموزشی'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'لیست برنامه ها'
      }
      return 'جدول آموزشی'
    },
    canShowTabPageForClassroomType () {
      return (tabName) => {
        const tabs = {
          TRAINING: [
            'classroomInfo',
            'educations',
            'team',
            'exams',
            'projects',
            'live_streaming_url'
          ],
          EVENT: [
            'classroomInfo',
            'educations',
            'live_streaming_url'
          ]
        }

        return tabs[this.localOptions.classroomType].includes(tabName)
      }
    },
    classroomId () {
      return this.$route.params.id
    },
    canShowOtherTabsOfClassroom () {
      return !this.classroomRegistration.loading && (this.classroomRegistration.status === 'REGISTERED' || this.classroomRegistration.status === 'ENROLLED')
    }
  },
  mounted () {
    this.getRegistrationInfo()
    this.mounted = true
  },
  methods: {
    getTeamJoinStatusLabel (team) {
      if (team.join_status === 'ENABLED') {
        return 'عضو شوید'
      }
      return (new Team(team)).join_status_info.label
    },
    joinTeam (team) {
      this.joinTeamLoading = true
      APIGateway.team.register(team.id)
        .then(() => {
          this.joinTeamLoading = false
          this.$refs.teamsList.search()
        })
        .catch(() => {
          this.joinTeamLoading = false
          this.$refs.teamsList.search()
        })
    },
    getRegistrationInfo () {
      this.registrations.loading = true
      this.classroomRegistration.loading = true
      APIGateway.registration.index({ classroom: this.$route.params.id })
        .then(({ list }) => {
          this.registrations = new RegistrationList(list)
          if (this.registrations.list.length > 0) {
            this.classroomRegistration = this.registrations.list[0]
          }
          this.registrations.loading = false
          this.classroomRegistration.loading = false
        })
        .catch(() => {
          this.registrations.loading = false
          this.classroomRegistration.loading = false
        })
    },
    getCurrentUserAttendanceSheet (session) {
      if (!session?.session_attendance_sheets || session.session_attendance_sheets.length === 0) {
        return null
      }

      return session.session_attendance_sheets[0]
    },
    getProjectAttendanceSheets (project) {
      if (!project?.project_attendance_sheets || project.project_attendance_sheets.length === 0) {
        return null
      }

      return project.project_attendance_sheets[0]
    },
    goToLiveStreamUrl () {
      window.open(this.classroom.live_streaming_url, '_blank')
    },
    onloadnClassroom (classroom) {
      this.classroom = new Classroom(classroom)
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: this.classroomTypeTitle + 'های من',
            to: { name: this.localOptions.classroomType === 'TRAINING' ? 'UserPanel.Profile.AllClassrooms' : 'UserPanel.Profile.AllEvents' }
          },
          {
            label: this.classroom.title,
            to: { name: 'UserPanel.Profile.ClassroomInfo', params: { id: this.classroom.id } }
          }
        ]
      })
    }
  }
}
</script>
