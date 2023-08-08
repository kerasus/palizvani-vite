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
      <q-tab name="movies3"
             label="کاربران" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-if="mounted"
                  v-model="tab"
                  animated>
      <q-tab-panel name="classroomInfo">
        <entity-edit ref="classroomEntityEdit"
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
            <div class="flex justify-end">
              <q-btn color="primary"
                     label="بروزرسانی اطلاعات"
                     @click="updateClassroom" />
            </div>
          </template>
        </entity-edit>
      </q-tab-panel>
      <q-tab-panel name="educations">
        <entity-index v-model:value="sessionListInputs"
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
      </q-tab-panel>

      <q-tab-panel name="movies1">
        پروژه‌ها
      </q-tab-panel>
      <q-tab-panel name="movies2">
        آزمون
      </q-tab-panel>
      <q-tab-panel name="movies3">
        کاربران
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import Enums from 'src/assets/Enums/Enums.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EntityEdit, EntityIndex } from 'quasar-crud'
import { FormBuilderAssist } from 'quasar-form-builder'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

export default {
  name: 'Admin.Classroom.Show',
  components: {
    EntityEdit,
    EntityIndex,
    DeleteBtn
  },
  data () {
    return {
      mounted: false,
      classroomEntityEditKey: Date.now(),
      tab: 'classroomInfo',
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Classroom.Show',
      inputs: [
        { type: 'separator', name: 'space', label: 'مشخصات دوره', className: 'custom-separator', col: 'col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'آپلود عکس دوره', col: 'col-md-3 col-12' },
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
        { type: 'select', name: 'audience_status_wwwww', responseKey: 'audience_status_wwwww', options: [], placeholder: ' ', label: 'وضعیت(؟)', col: 'col-md-3 col-12' },
        { type: 'select', name: 'category', responseKey: 'category', options: [], placeholder: ' ', label: 'مجموعه(؟)', col: 'col-md-3 col-12' },
        { type: 'select', name: 'audience_gender_type', responseKey: 'audience_gender_type', options: Enums.genders, placeholder: ' ', label: 'جنسیت', col: 'col-md-3 col-12' },
        { type: 'select', name: 'audience_bashgah_wwwww', responseKey: 'audience_bashgah_wwwww', options: [], placeholder: ' ', label: 'باشگاه(؟)', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'تنظیمات دوره', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', placeholder: ' ', label: 'ظرفیت گروه درسی', col: 'col-md-3 col-12' },
        { type: 'input', name: 'allowed_absence_count', responseKey: 'allowed_absence_count', placeholder: ' ', label: 'تعداد مجاز غیبت', col: 'col-md-3 col-12' },
        { type: 'input', name: 'effective_absence_coefficient', responseKey: 'effective_absence_coefficient', placeholder: ' ', label: 'ضریب نمره حضور و غیاب', col: 'col-md-3 col-12' },
        { type: 'input', name: 'mandatory_assignment_count', responseKey: 'mandatory_assignment_count', placeholder: ' ', label: 'تعداد تکالیف اجباری', col: 'col-md-3 col-12' },

        { type: 'input', name: 'special_passing_mark', responseKey: 'special_passing_mark', placeholder: ' ', label: 'نمره قبولی مشروطی ها', col: 'col-md-3 col-12' },
        { type: 'input', name: 'minimum_conditional_passing_mark', responseKey: 'minimum_conditional_passing_mark', placeholder: ' ', label: 'نمره قبولی مشروط', col: 'col-md-3 col-12' },
        { type: 'input', name: 'minimum_clean_passing_mark', responseKey: 'minimum_clean_passing_mark', placeholder: ' ', label: 'نمره قبولی', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'ثبت نام و حذف و اضافه', className: 'custom-separator', col: 'col-12' },
        { type: 'dateTime', name: 'beginning_enrollment_period', responseKey: 'beginning_enrollment_period', placeholder: ' ', label: 'تاریخ شروع پیش ثبت نام', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', placeholder: ' ', label: 'تاریخ پایان پیش ثبت نام', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'beginning_registration_period', responseKey: 'beginning_registration_period', placeholder: ' ', label: 'تاریخ شروع ثبت نام', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_registration_period', responseKey: 'ending_registration_period', placeholder: ' ', label: 'تاریخ پایان ثبت نام', col: 'col-md-6 col-12' },

        { type: 'input', name: 'registration_period_refund_percent', responseKey: 'registration_period_refund_percent', placeholder: ' ', label: 'درصد برگشت هزینه انصراف در بازه ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_drop_add_period', responseKey: 'allow_dropping_on_drop_add_period', label: 'امکان انصراف در بازه ثبت نام', col: 'col-md-9 col-12' },

        { type: 'dateTime', name: 'beginning_drop_add_period', responseKey: 'beginning_drop_add_period', placeholder: ' ', label: 'تاریخ شروع حذف و اضافه', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_drop_add_period', responseKey: 'ending_drop_add_period', placeholder: ' ', label: 'تاریخ پایان حذف و اضافه', col: 'col-md-6 col-12' },

        { type: 'input', name: 'drop_add_period_refund_percent', responseKey: 'drop_add_period_refund_percent', placeholder: ' ', label: 'درصد برگشت هزینه انصراف در بازه حذف و اضافه', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_drop_add_period', responseKey: 'allow_dropping_on_drop_add_period', label: 'امکان انصراف در بازه ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_drop_add_period', responseKey: 'allow_dropping_on_drop_add_period', label: 'امکان انصراف در بازه ثبت نام', col: 'col-md-6 col-12' },

        { type: 'dateTime', name: 'publish_time', responseKey: 'publish_time', placeholder: ' ', label: 'تاریخ انتشار', col: 'col-md-6 col-12' },

        { type: 'separator', name: 'space', label: 'قوانین', className: 'custom-separator', col: 'col-12' },
        { type: 'inputEditor', name: 'rules', responseKey: 'rules', label: 'قوانین دوره آموزشی', col: 'col-12' },
        // -----------------------------------------------------------------------------------------------------------

        { type: 'separator', name: 'space', label: 'موارد زیر در طرح نبودند', className: 'custom-separator', col: 'col-12' },
        { type: 'select', name: 'audience_role', responseKey: 'audience_role', options: Enums.groups, placeholder: ' ', label: 'نقش', col: 'col-md-4 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: '??توضیحات', col: 'col-12' },

        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-3 col-12' }
      ],

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
            field: row => row.starting_time ? ShamsiDate.getDateTime(row.starting_time) : '-'
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
    this.preLoadData()
      .then(() => {
        this.mounted = true
      })
      .catch(() => {
      })
  },
  methods: {
    afterLoadInputData () {
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
        const promise3 = this.getUnits(responseData.unit_info.category)
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
      return APIGateway.unitCategory.index({ per_page: 9999 })
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
      return APIGateway.unit.index({ per_page: 9999, category: selectedcategoryId })
        .then((units) => {
          this.setInputAttr('unit', 'options', units.list.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
        })
        .catch(() => {})
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
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
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
