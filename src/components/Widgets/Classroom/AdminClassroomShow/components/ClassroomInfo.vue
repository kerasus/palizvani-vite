<template>
  <entity-edit v-if="mounted"
               ref="classroomEntityEdit"
               :key="classroomEntityEditKey"
               v-model:value="inputs"
               :title="'مشخصات ' + classroomTypeTitle"
               :api="api"
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
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import Enums from 'src/assets/Enums/Enums.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { UnitCategory } from 'src/models/UnitCategory.js'
import FormBuilderInputEditor from 'src/components/FormBuilderCustumComponents/FormBuilderInputEditor.vue'

const FormBuilderInputEditorComp = shallowRef(FormBuilderInputEditor)

export default {
  name: 'ClassroomInfo',
  components: {
    EntityEdit
  },
  props: {
    classroomId: {
      type: Number,
      default: null
    },
    classroomType: {
      type: String,
      default: 'TRAINING'
    },
    classroom: {
      type: Classroom,
      default: new Classroom()
    }
  },
  data () {
    const classroomId = this.classroomId
    return {
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
        { type: FormBuilderInputEditorComp, name: 'classroom_address', responseKey: 'classroom_address', placeholder: ' ', label: 'آدرس مکان فیزیکی دوره', col: 'col-12' },
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
        { type: 'select', name: 'audience_gender_type', responseKey: 'audience_gender_type', options: Enums.classroomGenders, placeholder: ' ', label: 'جنسیت', col: 'col-md-3 col-12' },
        { type: 'select', name: 'audience_bashgah_wwwww', responseKey: 'audience_bashgah_wwwww', options: [], placeholder: ' ', label: 'باشگاه(؟)', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'تنظیمات دوره', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', placeholder: ' ', label: 'ظرفیت گروه درسی', col: 'col-md-3 col-12' },
        { type: 'input', name: 'allowed_absence_count', responseKey: 'allowed_absence_count', placeholder: ' ', label: 'تعداد مجاز غیبت', col: 'col-md-3 col-12' },
        { type: 'input', name: 'effective_absence_coefficient', responseKey: 'effective_absence_coefficient', placeholder: ' ', label: 'وزن نمره حضور و غیاب ', col: 'col-md-3 col-12' },
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
        { type: 'checkbox', name: 'allow_dropping_on_enrollment_period', responseKey: 'allow_dropping_on_enrollment_period', label: 'امکان حذف در بازه پیش ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_adding_on_registration_period', responseKey: 'allow_adding_on_registration_period', label: 'امکان اضافه کردن در بازه ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_registration_period', responseKey: 'allow_dropping_on_registration_period', label: 'امکان حذف ثبت نام در بازه ثبت نام', col: 'col-md-3 col-12' },

        { type: 'dateTime', name: 'beginning_drop_add_period', responseKey: 'beginning_drop_add_period', placeholder: ' ', label: 'تاریخ شروع حذف و اضافه', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_drop_add_period', responseKey: 'ending_drop_add_period', placeholder: ' ', label: 'تاریخ پایان حذف و اضافه', col: 'col-md-6 col-12' },

        { type: 'input', name: 'drop_add_period_refund_percent', responseKey: 'drop_add_period_refund_percent', placeholder: ' ', label: 'درصد برگشت هزینه انصراف در بازه حذف و اضافه', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_adding_on_drop_add_period', responseKey: 'allow_adding_on_drop_add_period', label: 'امکان اضافه شدن در بازه حذف و اضافه', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_drop_add_period', responseKey: 'allow_dropping_on_drop_add_period', label: 'امکان حذف در بازه حذف و اضافه', col: 'col-md-3 col-12' },

        { type: 'dateTime', name: 'publish_time', responseKey: 'publish_time', placeholder: ' ', label: 'تاریخ انتشار', col: 'col-md-6 col-12' },

        { type: 'separator', name: 'space', label: 'قوانین', className: 'custom-separator', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'rules', responseKey: 'rules', label: 'قوانین دوره آموزشی', col: 'col-12' },

        { type: FormBuilderInputEditorComp, name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'specification', responseKey: 'specification', label: 'مشخصات', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'bulletin', responseKey: 'bulletin', label: 'تابلو اعلانات', col: 'col-12' },

        // -----------------------------------------------------------------------------------------------------------

        { type: 'separator', name: 'space', label: 'موارد زیر در طرح نبودند', className: 'custom-separator', col: 'col-12' },
        { type: 'select', name: 'audience_role', responseKey: 'audience_role', options: Enums.groups, placeholder: ' ', label: 'نقش', col: 'col-md-4 col-12' },

        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-3 col-12' }
      ],
      mounted: false,
      classroomEntityEditKey: Date.now(),
      api: APIGateway.classroom.APIAdresses.byId(classroomId)
    }
  },
  computed: {
    selectedCategoryId () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'category').value
    },
    classroomTypeTitle () {
      const unitCategory = new UnitCategory({ type: this.classroomType })
      return unitCategory.type_info.label
    },
    localClassroom: {
      get () {
        return this.classroom
      },
      set (newValue) {
        this.$emit('update:classroom', newValue)
      }
    }
  },
  watch: {
    selectedCategoryId () {
      if (!this.mounted) {
        return
      }
      if (this.classroomType === 'TRAINING') {
        FormBuilderAssist.setAttributeByName(this.inputs, 'unit', 'value', null)
      }
      this.getUnits(this.selectedCategoryId)
    }
  },
  mounted () {
    this.setClassroomTypeOfInputs()
    this.localClassroom.loading = true
    this.preLoadData()
      .then(() => {
        this.mounted = true
      })
      .catch(() => {
        this.mounted = true
      })
  },
  methods: {
    setClassroomTypeOfInputs () {
      if (this.classroomType === 'TRAINING') {
        FormBuilderAssist.setAttributeByName(this.inputs, 'professor', 'label', 'استاد')
      }
      if (this.classroomType === 'EVENT') {
        FormBuilderAssist.setAttributeByName(this.inputs, 'professor', 'label', 'برگزار کننده')
        FormBuilderAssist.setAttributeByName(this.inputs, 'unit', 'label', 'دسته')
        FormBuilderAssist.setAttributeByName(this.inputs, 'sessions_frequency', 'label', 'عنوان')
        FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'allowed_absence_count', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'effective_absence_coefficient', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'mandatory_assignment_count', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'special_passing_mark', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'minimum_conditional_passing_mark', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'minimum_clean_passing_mark', 'type', 'hidden')
      }
    },
    afterLoadInputData (data) {
      this.localClassroom = new Classroom(data)
      this.localClassroom.loading = false
      // const gg = data.beginning_enrollment_period.replace('T', ' ')
      // this.setInputAttr('beginning_enrollment_period', 'value', gg)
    },
    setInputAttr (name, attr, value) {
      FormBuilderAssist.setAttributeByName(this.inputs, name, attr, value)
    },
    preLoadData () {
      return new Promise((resolve, reject) => {
        APIGateway.classroom.get(this.classroomId)
          .then((classroom) => {
            this.beforeLoadInputData(classroom, () => {
              this.$nextTick(() => {
                if (this.classroomType === 'TRAINING') {
                  this.setInputAttr('category', 'value', classroom.unit_info.category_info.id)
                }
                this.setInputAttr('unit', 'value', classroom.unit)
              })
            })
              .then((classroom) => {
                resolve(classroom)
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
    beforeLoadInputData (responseData, callback) {
      return new Promise((resolve, reject) => {
        const selectedCategoryId = responseData.unit_info.category_info.id || null
        const promise1 = this.getProfessors()
        const promise2 = this.getCategories()
        const promise3 = this.getUnits(selectedCategoryId, this.classroomType)
        this.$nextTick(() => {
          Promise.all([promise1, promise2, promise3])
            .then(() => {
              // this.setInputAttr('category', 'value', responseData.unit_info.category)
              // this.setInputAttr('unit', 'value', responseData.unit)
              this.classroomEntityEditKey = Date.now()
              callback()
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
      return APIGateway.unitCategory.index({
        type: this.classroomType,
        per_page: 9999
      })
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
    getUnits (selectedCategoryId = null, categoryType = null) {
      return APIGateway.unit.index({ per_page: 9999, category: selectedCategoryId, category__type: categoryType })
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
    updateClassroom () {
      this.$refs.classroomEntityEdit.editEntity()
    }
  }
}
</script>
