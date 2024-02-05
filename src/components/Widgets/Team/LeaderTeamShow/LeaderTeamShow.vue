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
            class="text-grey bg-white"
            active-color="primary"
            indicator-color="primary"
            align="left">
      <q-tab name="teamRegistrationList"
             label="لیست اعضای گروه" />
      <q-tab name="sessionList"
             label="لیست جلسات" />
      <q-tab name="answer_books"
             label="پاسخ نامه ها" />
      <q-tab name="transcript_sheets"
             label="کارنامه ها" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-if="mounted && entityLoaded"
                  v-model="tab"
                  animated>
      <q-tab-panel name="teamRegistrationList"
                   class="q-pa-none">
        <entity-index ref="teamRegistrationList"
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
        <entity-index ref="sessionsList"
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

      <q-tab-panel name="answer_books"
                   class="q-pa-none">
        <entity-index ref="answerBooksList"
                      v-model:value="answerBooksListInputs"
                      title="پاسخ نامه ها"
                      :api="answerBooksListApi"
                      :table="answerBooksListTable"
                      :table-keys="answerBooksListTableKeys"
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
                       :to="{
                         name: 'UserPanel.Classroom.MyAsGraderClassroom.AnswerBooks.ShowGrade',
                         params: {classroom_id: team.classroom, answer_book_id: inputData.props.row.id},
                         query: {read_only: 1}
                       }"
                       class="q-mr-md" />
              </div>
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </template>
        </entity-index>
      </q-tab-panel>

      <q-tab-panel name="transcript_sheets"
                   class="q-pa-none">
        <entity-index ref="transcriptSheetsList"
                      v-model:value="transcriptSheetsListInputs"
                      title="کارنامه ها"
                      :api="transcriptSheetsListApi"
                      :table="transcriptSheetsListTable"
                      :table-keys="transcriptSheetsListTableKeys"
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
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { Test } from 'src/models/Test.js'
import { Team } from 'src/models/Team.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { AnswerBook } from 'src/models/AnswerBook.js'
import { EntityShow, EntityIndex } from 'quasar-crud'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { TranscriptSheet } from 'src/models/TranscriptSheet.js'
import { SessionAttendanceSheets } from 'src/models/SessionAttendanceSheets'

const BtnControlComp = shallowRef(BtnControl)

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
      team: new Team(),

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
      },

      answerBooksListInputs: [
        {
          type: 'select',
          name: 'status',
          clearable: false,
          options: [
            { label: 'جاری', value: 'WAITING_FOR_GRADING' },
            { label: 'در حال تصحیح', value: 'GRADING' },
            { label: 'تصحیح شده', value: 'GRADED' },
            {
              label: 'حذف شده',
              value: 'DELETED'
            },
            {
              label: 'نیاز به رفع مشکل',
              value: 'UNGRADABLE'
            },
            {
              label: 'اعتراض شده',
              value: 'OBJECTED'
            }
          ],
          label: 'وضعیت',
          placeholder: ' ',
          value: 'WAITING_FOR_GRADING',
          col: 'col-md-4 col-12'
        },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' },
        { type: 'hidden', name: 'registration__teams__id', value: null }
      ],
      answerBooksListApi: APIGateway.answerBook.APIAdresses.base,
      answerBooksListTable: {
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
            name: 'owner_info.fullname',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'owner_info.mobile_number',
            required: true,
            label: 'موبایل',
            align: 'left',
            field: row => row.owner_info.mobile_number
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان آزمون',
            align: 'left',
            field: row => row.test_info.title
          },
          {
            name: 'test_questions_length',
            required: true,
            label: 'تعداد سوالات',
            align: 'left',
            field: row => row.test_info.test_questions_length
          },
          // {
          //   name: 'level',
          //   required: true,
          //   label: 'درچه سختی',
          //   align: 'left',
          //   field: row => (new Test(row.test_set_info)).level_info.label
          // },
          {
            name: 'test_info_status_info',
            required: true,
            label: 'وضعیت آزمون',
            align: 'left',
            field: row => (new Test(row.test_info)).status_info.label
          },
          {
            name: 'status_info',
            required: true,
            label: 'وضعیت تصحیح',
            align: 'left',
            field: row => (new AnswerBook(row)).status_info.label
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
      answerBooksListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      transcriptSheetsListInputs: [
        { type: 'hidden', name: 'registration__teams__id', value: null }
      ],
      transcriptSheetsListApi: APIGateway.transcriptSheet.APIAdresses.base,
      transcriptSheetsListTable: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'owner_info.fullname',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.registration_info.owner_info.firstname + ' ' + row.registration_info.owner_info.lastname
          },
          {
            name: 'owner_info.national_code',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.registration_info.owner_info.national_code
          },
          {
            name: 'attendance_score',
            required: true,
            label: 'نمره حضور و غیاب',
            align: 'left',
            field: row => row.attendance_score
          },
          {
            name: 'highest_test_score',
            required: true,
            label: 'نمره آزمون',
            align: 'left',
            field: row => row.highest_test_score
          },
          {
            name: 'final_score',
            required: true,
            label: 'نمره نهایی',
            align: 'left',
            field: row => row.final_score
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت نهایی',
            align: 'left',
            field: row => new TranscriptSheet(row).status_info.label
          }
        ]
      },
      transcriptSheetsListTableKeys: {
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
    FormBuilderAssist.setAttributeByName(this.answerBooksListInputs, 'btn', 'atClick', () => {
      this.$refs.answerBooksList.search()
    })
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
      this.team = new Team(responseData)
      FormBuilderAssist.setAttributeByName(this.sessionsListInputs, 'classroom', 'value', responseData.classroom)
      FormBuilderAssist.setAttributeByName(this.answerBooksListInputs, 'registration__teams__id', 'value', responseData.id)
      FormBuilderAssist.setAttributeByName(this.transcriptSheetsListInputs, 'registration__teams__id', 'value', responseData.id)
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
