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
      <q-tab name="classroomInfo"
             label="اطلاعات دوره آموزشی" />
      <q-tab name="educations"
             label="جدول آموزشی" />
      <q-tab name="movies1"
             label="آزمون" />
      <q-tab name="projects"
             label="پروژه" />
      <q-tab v-if="classroom.live_streaming_url"
             name="live_streaming_url"
             label="بخش آنلاین" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="classroomInfo">
        <show-classroom-info v-if="mounted"
                             :options="{ profileMode: true }"
                             @onloadn="onloadnClassroom" />
      </q-tab-panel>

      <q-tab-panel name="educations"
                   class="q-pa-none">
        <entity-index v-if="mounted"
                      ref="entityIndex"
                      v-model:value="sessionsInputs"
                      title="لیست جلسات"
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
                <template v-if="inputData.col.name === 'number'">
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

      <q-tab-panel name="movies1">
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
import Enums from 'src/assets/Enums/Enums.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import { Classroom } from 'src/models/Classroom.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import { ProjectAttendanceSheets } from 'src/models/ProjectAttendanceSheets.js'
import ShowClassroomInfo from 'src/components/Widgets/Other/ShowClassroomInfo/ShowClassroomInfo.vue'
import { SessionAttendanceSheets } from 'src/models/SessionAttendanceSheets'

export default {
  name: 'UserPanel.Profile.ClassroomInfo',
  components: {
    EntityIndex,
    Breadcrumbs,
    ShowClassroomInfo,
    EntityIndexGridItem
  },
  mixins: [mixinAuth],
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
            name: 'title',
            required: true,
            label: 'زمان شروع',
            align: 'left',
            field: row => row.beginning_time ? ShamsiDate.getDateTime(row.beginning_time) : '-'
          },
          {
            name: 'title',
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
            name: 'title',
            required: true,
            label: 'زمان شروع',
            align: 'left',
            field: row => row.beginning_time ? ShamsiDate.getDateTime(row.beginning_time) : '-'
          },
          {
            name: 'title',
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
      }
    }
  },
  computed: {
    selectedCategoryId () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'category')?.value
    }
  },
  watch: {
    selectedCategoryId () {
      this.setInputValue('unit', null)
      this.getUnits(this.selectedCategoryId)
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
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
            label: 'دوره های من',
            to: { name: 'UserPanel.Profile.AllClassrooms' }
          },
          {
            label: this.classroom.title,
            to: { name: 'UserPanel.Profile.ClassroomInfo', params: { id: this.classroom.id } }
          }
        ]
      })
    },
    search () {
      this.$refs.entityIndex.search()
    },
    getClassroomHoldingTypeTitle (type) {
      const target = Enums.classroomHoldingTypes.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    getClassroomStatusTitle (type) {
      const target = Enums.classroomStatuses.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    getInvoiceStatusTitle (type) {
      const target = Enums.invoiceStatus.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    loadInputDataOptions () {
      this.getCategories()
      this.getUnits()
    },
    setInputValue (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].value = value
    },
    getSelectOptions (result, value, label) {
      return result.map(item => {
        return {
          value: item[value],
          label: item[label]
        }
      })
    },
    loadSelectOptions (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].options = value
    }
  }
}
</script>
