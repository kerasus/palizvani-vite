<template>
  <q-card class="AdminClassroomShow">
    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
      <q-tab name="classroomInfo"
             label="مشخصات" />
      <q-tab name="educations"
             label="لیست جلسات" />
      <q-tab name="movies1"
             label="پروژه‌ها" />
      <q-tab name="movies2"
             label="آزمون" />
      <q-tab name="members"
             label="اندیشه جویان" />
      <q-tab name="activity_sheet"
             label="فعالیت کلاسی" />
      <q-tab name="live_streaming_url"
             label="بخش آنلاین" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="classroomInfo"
                   class="q-pa-none">
        <q-linear-progress v-if="unitsLoading"
                           indeterminate />
        <entity-edit v-if="mounted"
                     ref="classroomEntityEdit"
                     :key="classroomEntityEditKey"
                     v-model:value="inputs"
                     title="مشخصات دوره آموزشی"
                     :api="api"
                     :entity-id-key="entityIdKey"
                     :entity-param-key="entityParamKey"
                     :show-route-name="showRouteName"
                     :show-close-button="false"
                     :show-edit-button="false"
                     :show-expand-button="false"
                     :show-save-button="false"
                     :show-reload-button="false"
                     :after-load-input-data="afterLoadInputData">
          <template #after-form-builder>
            <div class="flex justify-end q-mt-md">
              <q-btn color="primary"
                     label="بروزرسانی اطلاعات"
                     @click="updateClassroom" />
            </div>
          </template>
        </entity-edit>
        <q-skeleton v-else
                    type="rect"
                    height="200px" />
      </q-tab-panel>
      <q-tab-panel name="educations"
                   class="q-pa-none">
        <entity-index v-if="mounted"
                      v-model:value="sessionListInputs"
                      title="لیست جلسات"
                      :api="sessionListApi"
                      :table="sessionListTable"
                      :table-keys="sessionListTableKeys"
                      :show-search-button="false"
                      :show-reload-button="false"
                      :show-expand-button="false">
          <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
            <template v-if="inputData.col.name === 'actions'">
              <div class="action-column-entity-index">
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
      </q-tab-panel>

      <q-tab-panel name="movies1">
        پروژه‌ها
      </q-tab-panel>
      <q-tab-panel name="movies2">
        آزمون
      </q-tab-panel>
      <q-tab-panel name="members"
                   class="q-pa-none">
        <entity-index v-if="mounted"
                      ref="membersList"
                      v-model:value="membersListInputs"
                      title="لیست کاربران"
                      :api="membersListApi"
                      :table="membersListTable"
                      :table-keys="membersListTableKeys"
                      :show-search-button="false"
                      :show-reload-button="false"
                      :show-expand-button="false">
          <template #toolbar>
            <q-btn color="primary"
                   :loading="exportReportLoading"
                   @click="getMembersExcel">
              خروجی اکسل
            </q-btn>
          </template>
          <template v-slot:entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'number'">
              {{ inputData.rowNumber }}
            </template>
            <template v-else-if="inputData.col.name === 'action'">
              <div class="action-column-entity-index">
                <q-btn v-if="inputData.props.row.status !== 'DROPPED_BY_ADMIN'"
                       size="md"
                       color="red"
                       outline
                       label="انصراف"
                       :loading="dropClassroomByAdminLoading"
                       class="q-mr-md"
                       @click="dropClassroomByAdmin(inputData.props.row)" />
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
      <q-tab-panel name="activity_sheet"
                   class="q-pa-none">
        <entity-index v-if="mounted"
                      ref="activitySheetList"
                      v-model:value="activitySheetListInputs"
                      title="فعالیت کلاسی"
                      :api="activitySheetListApi"
                      :table="activitySheetListTable"
                      :table-keys="activitySheetListTableKeys"
                      :show-search-button="false"
                      :show-reload-button="false"
                      :show-expand-button="false">
          <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
            <template v-if="inputData.col.name === 'actions'">
              <div class="action-column-entity-index">
                <q-btn size="md"
                       color="primary"
                       outline
                       label="سابقه آموزشی"
                       class="q-mr-md" />
                <!--                :to="{name: 'Admin.Session.Show', params: {id: inputData.props.row.id}}"-->
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
      </q-tab-panel>
      <q-tab-panel name="live_streaming_url">
        <q-btn class="full-width q-mb-lg"
               color="primary"
               @click="goToLiveStreamUrl">
          رفتن به کلاس
        </q-btn>
        <iframe :src="classroom.live_streaming_url"
                title="W3Schools Free Online Web Tutorials"
                style="height: 80vh"
                class="full-width" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { shallowRef } from 'vue'
import Assist from 'assets/js/Assist.js'
import Enums from 'src/assets/Enums/Enums.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { EntityEdit, EntityIndex } from 'quasar-crud'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'
import FormBuilderDateTime from 'src/components/FormBuilderCustumComponents/FormBuilderDateTime.vue'

const BtnControlComp = shallowRef(BtnControl)
const FormBuilderDateTimeComp = shallowRef(FormBuilderDateTime)

export default {
  name: 'Admin.Classroom.Show',
  components: {
    EntityEdit,
    EntityIndex,
    DeleteBtn
  },
  data () {
    const classroomId = this.$route.params.id
    return {
      mounted: false,
      unitsLoading: false,
      classroomEntityEditKey: Date.now(),
      tab: 'classroomInfo',
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Classroom.Show',
      inputs: [
        { type: 'separator', name: 'space', label: 'مشخصات دوره', className: 'custom-separator', col: 'col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'آپلود عکس دوره', col: 'col-md-3 col-12' },
        { type: 'file', name: 'codes', responseKey: 'codes', label: 'آیین نامه دوره', col: 'col-md-3 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        { type: 'select', name: 'category', responseKey: 'unit_info.category_info.id', options: [], value: null, placeholder: ' ', label: 'دسته بندی', col: 'col-md-3 col-12' },
        { type: 'select', name: 'unit', responseKey: 'unit', options: [], value: null, placeholder: ' ', label: 'درس', col: 'col-md-3 col-12' },
        { type: 'select', name: 'holding_type', responseKey: 'holding_type', options: Enums.classroomHoldingTypes, value: null, placeholder: ' ', label: 'نوع برگزاری', col: 'col-md-3 col-12' },
        { type: 'input', name: 'price', responseKey: 'price', placeholder: ' ', label: 'هزینه برگزاری', col: 'col-md-3 col-12' },
        { type: 'input', name: 'live_streaming_url', responseKey: 'live_streaming_url', placeholder: ' ', label: 'لینک مکان مجازی دوره', col: 'col-12' },
        { type: 'inputEditor', name: 'classroom_address', responseKey: 'classroom_address', placeholder: ' ', label: 'آدرس مکان فیزیکی دوره', col: 'col-12' },
        {
          type: 'select',
          name: 'holding_year',
          responseKey: 'holding_year',
          options: [1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410],
          value: null,
          label: 'انتخاب سال دوره',
          placeholder: ' ',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'holding_month',
          responseKey: 'holding_month',
          options: [
            'فروردین',
            'اردیبهشت',
            'خرداد',
            'تیر',
            'مرداد',
            'شهریور',
            'مهر',
            'آبان',
            'آذر',
            'دی',
            'بهمن',
            'اسفند'
          ],
          value: null,
          label: 'انتخاب ماه دوره',
          placeholder: ' ',
          col: 'col-md-3'
        },
        { type: 'input', name: 'sessions_frequency', responseKey: 'sessions_frequency', placeholder: ' ', label: 'دوره تناوب', col: 'col-12' },
        { type: 'select', name: 'professor', responseKey: 'professor', options: [], value: null, placeholder: ' ', label: 'استاد دوره', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'مشخصات اندیشه جو', className: 'custom-separator', col: 'col-12' },
        // { type: 'select', name: 'audience_status_wwwww', responseKey: 'audience_status_wwwww', options: [], placeholder: ' ', label: 'وضعیت(؟)', col: 'col-md-3 col-12' },
        // { type: 'select', name: 'category', responseKey: 'category', options: [], placeholder: ' ', label: 'مجموعه(؟)', col: 'col-md-3 col-12' },
        { type: 'select', name: 'audience_gender_type', responseKey: 'audience_gender_type', options: Enums.classroomGenders, placeholder: ' ', label: 'جنسیت', col: 'col-md-3 col-12' },
        // { type: 'select', name: 'audience_bashgah_wwwww', responseKey: 'audience_bashgah_wwwww', options: [], placeholder: ' ', label: 'باشگاه(؟)', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'تنظیمات دوره', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', placeholder: ' ', label: 'ظرفیت گروه درسی', col: 'col-md-3 col-12' },
        { type: 'input', name: 'allowed_absence_count', responseKey: 'allowed_absence_count', placeholder: ' ', label: 'تعداد مجاز غیبت', col: 'col-md-3 col-12' },
        { type: 'input', name: 'effective_absence_coefficient', responseKey: 'effective_absence_coefficient', placeholder: ' ', label: 'وزن نمره حضور و غیاب ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'mandatory_assignment_count', responseKey: 'mandatory_assignment_count', placeholder: ' ', label: 'تعداد تکالیف اجباری', col: 'col-md-3 col-12' },

        { type: 'input', name: 'special_passing_mark', responseKey: 'special_passing_mark', placeholder: ' ', label: 'نمره قبولی مشروطی ها', col: 'col-md-3 col-12' },
        { type: 'input', name: 'minimum_conditional_passing_mark', responseKey: 'minimum_conditional_passing_mark', placeholder: ' ', label: 'نمره قبولی مشروط', col: 'col-md-3 col-12' },
        { type: 'input', name: 'minimum_clean_passing_mark', responseKey: 'minimum_clean_passing_mark', placeholder: ' ', label: 'نمره قبولی', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'ثبت نام و حذف و اضافه', className: 'custom-separator', col: 'col-12' },
        { type: FormBuilderDateTimeComp, name: 'beginning_enrollment_period', responseKey: 'beginning_enrollment_period', outsideLabel: 'تاریخ شروع پیش ثبت نام', col: 'col-md-6 col-12' },
        { type: FormBuilderDateTimeComp, name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', outsideLabel: 'تاریخ پایان پیش ثبت نام', col: 'col-md-6 col-12' },
        { type: FormBuilderDateTimeComp, name: 'beginning_registration_period', responseKey: 'beginning_registration_period', outsideLabel: 'تاریخ شروع ثبت نام', col: 'col-md-6 col-12' },
        { type: FormBuilderDateTimeComp, name: 'ending_registration_period', responseKey: 'ending_registration_period', outsideLabel: 'تاریخ پایان ثبت نام', col: 'col-md-6 col-12' },

        { type: 'input', name: 'registration_period_refund_percent', responseKey: 'registration_period_refund_percent', placeholder: ' ', label: 'درصد برگشت هزینه انصراف در بازه ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_enrollment_period', responseKey: 'allow_dropping_on_enrollment_period', label: 'امکان حذف در بازه پیش ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_adding_on_registration_period', responseKey: 'allow_adding_on_registration_period', label: 'امکان اضافه کردن در بازه ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_registration_period', responseKey: 'allow_dropping_on_registration_period', label: 'امکان حذف ثبت نام در بازه ثبت نام', col: 'col-md-3 col-12' },

        { type: FormBuilderDateTimeComp, name: 'beginning_drop_add_period', responseKey: 'beginning_drop_add_period', outsideLabel: 'تاریخ شروع حذف و اضافه', col: 'col-md-6 col-12' },
        { type: FormBuilderDateTimeComp, name: 'ending_drop_add_period', responseKey: 'ending_drop_add_period', outsideLabel: 'تاریخ پایان حذف و اضافه', col: 'col-md-6 col-12' },

        { type: 'input', name: 'drop_add_period_refund_percent', responseKey: 'drop_add_period_refund_percent', placeholder: ' ', label: 'درصد برگشت هزینه انصراف در بازه حذف و اضافه', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_adding_on_drop_add_period', responseKey: 'allow_adding_on_drop_add_period', label: 'امکان اضافه شدن در بازه حذف و اضافه', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_drop_add_period', responseKey: 'allow_dropping_on_drop_add_period', label: 'امکان حذف در بازه حذف و اضافه', col: 'col-md-3 col-12' },

        { type: FormBuilderDateTimeComp, name: 'publish_time', responseKey: 'publish_time', outsideLabel: 'تاریخ انتشار', col: 'col-md-6 col-12' },

        { type: 'separator', name: 'space', label: 'قوانین', className: 'custom-separator', col: 'col-12' },
        { type: 'inputEditor', name: 'rules', responseKey: 'rules', label: 'قوانین دوره آموزشی', col: 'col-12' },

        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-12' },
        { type: 'inputEditor', name: 'specification', responseKey: 'specification', label: 'مشخصات', col: 'col-12' },
        { type: 'inputEditor', name: 'bulletin', responseKey: 'bulletin', label: 'تابلو اعلانات', col: 'col-12' },
        // -----------------------------------------------------------------------------------------------------------

        // { type: 'separator', name: 'space', label: 'موارد زیر در طرح نبودند', className: 'custom-separator', col: 'col-12' },
        // { type: 'select', name: 'audience_role', responseKey: 'audience_role', options: Enums.groups, placeholder: ' ', label: 'نقش', col: 'col-md-4 col-12' },

        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-3 col-12' }
      ],
      classroom: new Classroom(),

      sessionListInputs: [
        { type: 'hidden', name: 'classroom', value: this.$route.params.id, label: 'نام دوره', col: 'col-12' }
      ],
      sessionListApi: APIGateway.session.APIAdresses.base,
      sessionListTable: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره',
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
        ],
        data: []
      },
      sessionListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      dropClassroomByAdminLoading: false,
      exportReportLoading: false,
      membersListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId },
        { type: 'select', name: 'status', options: [{ label: 'پیش ثبت نام شده', value: 'ENROLLED' }, { label: 'ثبت نام شده', value: 'REGISTERED' }, { label: 'حذف توسط اندیشه جو', value: 'DROPPED_BY_ITSELF' }, { label: 'حذف توسط ادمین', value: 'DROPPED_BY_ADMIN' }, { label: 'حذف سیستمی (شرایط غیر مجاز)', value: 'DROPPED_FOR_CONDITION' }, { label: 'حذف به دلیل عدم نهایی سازی', value: 'DROPPED_FOR_NOT_FINALIZING' }], label: 'وضعیت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
      ],
      membersListApi: APIGateway.classroom.APIAdresses.members,
      membersListTable: {
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
            name: 'owner_info.national_code',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.owner_info.national_code
          },
          {
            name: 'owner_info.mobile_number',
            required: true,
            label: 'تلفن همراه',
            align: 'left',
            field: row => row.owner_info.mobile_number
          },
          {
            name: 'owner_info.email',
            required: true,
            label: 'ایمیل',
            align: 'left',
            field: row => row.owner_info.email
          },
          {
            name: 'owner_info.email',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Classroom()).getUserRegisterInfoLabel(row.status)
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
      membersListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      activitySheetListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId },
        { type: 'select', name: 'status', value: null, label: 'وضعیت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
      ],
      activitySheetListApi: APIGateway.classroom.APIAdresses.activitySheet,
      activitySheetListTable: {
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
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'owner_info.fullname',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.owner_info.national_code
          },
          {
            name: 'is_project_done',
            required: true,
            label: 'پروژه',
            align: 'left',
            field: row => row.is_project_done
          },
          {
            name: 'done_assignment_count',
            required: true,
            label: 'تکالیف انجام شده',
            align: 'left',
            field: row => row.done_assignment_count
          },
          {
            name: 'is_allowed_absence_count',
            required: true,
            label: 'حضور و غیاب',
            align: 'left',
            field: row => row.is_allowed_absence_count // bool
          },
          {
            name: 'attendance_score',
            required: true,
            label: 'نمره حضور و غیاب',
            align: 'left',
            field: row => row.attendance_score
          },
          {
            name: 'final_test',
            required: true,
            label: 'آزمون',
            align: 'left',
            field: row => row.final_test // number - null
          },
          {
            name: 'final_status',
            required: true,
            label: 'وضعیت نهایی',
            align: 'left',
            field: row => row.final_status
          },
          {
            name: 'actions',
            required: true,
            label: 'سابقه آموزشی',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      activitySheetListTableKeys: {
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
      return this.getInputValue('category')
    }
  },
  watch: {
    selectedCategoryId () {
      if (!this.mounted) {
        return
      }
      this.setInputValue('unit', null)
      this.getUnits(this.selectedCategoryId)
    }
  },
  mounted () {
    this.api = APIGateway.classroom.APIAdresses.byId(this.$route.params.id)
    this.setMembersListActionBtn()
    this.setActivitySheetListActionBtn()
    this.preLoadData()
      .then(() => {
        this.mounted = true
      })
      .catch(() => {
        this.mounted = true
      })
  },
  methods: {
    setMembersListActionBtn () {
      FormBuilderAssist.setAttributeByName(this.membersListInputs, 'btn', 'atClick', this.searchMembersList)
    },
    setActivitySheetListActionBtn () {
      FormBuilderAssist.setAttributeByName(this.activitySheetListInputs, 'btn', 'atClick', this.searchActivitySheetList)
    },
    searchMembersList () {
      this.$refs.membersList.search()
    },
    searchActivitySheetList () {
      this.$refs.activitySheet.search()
    },
    goToLiveStreamUrl () {
      window.open(this.classroom.live_streaming_url, '_blank')
    },
    afterLoadInputData (data) {
      this.classroom = new Classroom(data)
      // const gg = data.beginning_enrollment_period.replace('T', ' ')
      // this.setInputAttr('beginning_enrollment_period', 'value', gg)
    },
    setInputAttr (name, attr, value) {
      FormBuilderAssist.setAttributeByName(this.inputs, name, attr, value)
      // this.$refs.classroomEntityEdit.setInputAttributeByName(name, attr, value)
    },
    preLoadData () {
      return new Promise((resolve, reject) => {
        APIGateway.classroom.get(this.$route.params.id)
          .then((classroom) => {
            this.setInputAttr('category', 'value', classroom.unit_info.category_info.id)
            this.setInputAttr('unit', 'value', classroom.unit)
            this.beforeLoadInputData(classroom)
              .then((classroom) => {
                resolve()
              })
              .catch(() => {
                reject()
              })
          })
          .catch(() => {
            reject()
          })
      })
    },
    beforeLoadInputData (responseData) {
      return new Promise((resolve, reject) => {
        const promise1 = this.getProfessors()
        const promise2 = this.getCategories()
        const promise3 = this.getUnits(responseData.unit_info.category_info.id)
        this.$nextTick(() => {
          Promise.all([promise1, promise2, promise3])
            .then(() => {
            // this.setInputAttr('category', 'value', responseData.unit_info.category)
            // this.setInputAttr('unit', 'value', responseData.unit)
              this.classroomEntityEditKey = Date.now()
              resolve()
            })
            .catch(() => {
              reject()
            })
        })
      })
    },
    getProfessors () {
      return APIGateway.user.index({ per_page: 9999, role: 'professor' })
        .then((users) => {
          this.setInputAttr('professor', 'options', users.list.list.map(item => {
            return {
              value: item.id,
              label: this.getUserFullname(item)
            }
          }))
        })
        .catch(() => {})
    },
    getCategories () {
      return APIGateway.unitCategory.index({ per_page: 9999, type: 'DISCUSSION_CIRCLE' })
        .then((categories) => {
          this.setInputAttr('category', 'options', categories.list.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
        })
        .catch(() => {})
    },
    getUnits (selectedcategoryId) {
      if (!selectedcategoryId) {
        this.setInputAttr('unit', 'options', [])
        return
      }
      this.unitsLoading = true
      return APIGateway.unit.index({ per_page: 9999, category: selectedcategoryId })
        .then((units) => {
          this.setInputAttr('unit', 'options', units.list.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
          this.unitsLoading = false
        })
        .catch(() => {
          this.unitsLoading = false
        })
    },
    getUserFullname (user) {
      return user.firstname + ' ' + user.lastname
    },
    getSelectOptions (result, value, label) {
      return result.map(item => {
        return {
          value: item[value],
          label: item[label]
        }
      })
    },
    getInputValue (name) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      return this.inputs[inputIndex].value
    },
    setInputValue (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].value = value
    },
    loadSelectOptions (name, value, setNewInputData) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].options = value
      if (typeof setNewInputData === 'function') {
        setNewInputData(this.inputs)
      }
    },
    updateClassroom () {
      this.$refs.classroomEntityEdit.editEntity()
    },
    getMembersExcel () {
      this.exportReportLoading = true
      const status = FormBuilderAssist.getInputsByName(this.membersListInputs, 'status').value ? FormBuilderAssist.getInputsByName(this.membersListInputs, 'status').value : null
      APIGateway.registration.exportReport({
        classroom: this.$route.params.id,
        type: 'users',
        status
      })
        .then((xlsxData) => {
          Assist.saveXlsx(xlsxData, this.classroom.title)
          this.exportReportLoading = false
        })
        .catch(() => {
          this.exportReportLoading = false
        })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    },
    dropClassroomByAdmin (row) {
      const classroomId = row.classroom
      const userId = row.owner
      const message = 'آیا از انصراف (' + row.owner_info.firstname + ' ' + row.owner_info.lastname + ') اطمینان دارید؟'
      this.$q.dialog({
        title: 'توجه',
        message,
        html: true,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.dropClassroomByAdminLoading = true
        APIGateway.classroom.dropByAdmin(classroomId, userId)
          .then(() => {
            this.dropClassroomByAdminLoading = false
            this.searchMembersList()
          })
          .catch(() => {
            this.dropClassroomByAdminLoading = false
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.AdminClassroomShow {
  .action-column-entity-index {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
