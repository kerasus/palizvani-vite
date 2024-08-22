<template>
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <div class="AdminClassroomCreate">
    <q-linear-progress v-if="unitsLoading"
                       indeterminate />
    <entity-create v-if="mounted"
                   ref="classroomEntityCreate"
                   :key="classroomEntityCreateKey"
                   v-model:value="inputs"
                   :title="'مشخصات ' + classroomTypeTitle"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showPageRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false">
      <template #after-form-builder>
        <div class="flex justify-end q-mt-md">
          <q-btn color="primary"
                 :label="'ایجاد ' + classroomTypeTitle + ' جدید'"
                 @click="createClassroom" />
        </div>
      </template>
    </entity-create>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import Enums from 'src/assets/Enums/Enums.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { UnitCategory } from 'src/models/UnitCategory.js'
import FormBuilderInputEditor from 'src/components/FormBuilderCustumComponents/FormBuilderInputEditor.vue'

const FormBuilderInputEditorComp = shallowRef(FormBuilderInputEditor)

export default {
  name: 'Admin.Classroom.Create',
  components: {
    EntityCreate
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      unitsLoading: false,
      classroomEntityCreateKey: Date.now(),
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: APIGateway.classroom.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'separator', name: 'space1', label: 'مشخصات', className: 'custom-separator', col: 'col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'آپلود عکس', col: 'col-md-3 col-12' },
        { type: 'file', name: 'codes', responseKey: 'codes', label: 'آیین نامه', col: 'col-md-3 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        { type: 'select', name: 'category', responseKey: 'category', options: [], value: null, placeholder: ' ', label: 'دسته بندی', col: 'col-md-3 col-12' },
        { type: 'select', name: 'unit', responseKey: 'unit', options: [], value: null, placeholder: ' ', label: 'درس', col: 'col-md-3 col-12' },
        { type: 'select', name: 'holding_type', responseKey: 'holding_type', options: Enums.classroomHoldingTypes, value: null, placeholder: ' ', label: 'نوع برگزاری', col: 'col-md-3 col-12' },
        { type: 'input', name: 'price', responseKey: 'price', placeholder: ' ', label: 'هزینه برگزاری', col: 'col-md-3 col-12' },
        { type: 'input', name: 'live_streaming_url', responseKey: 'live_streaming_url', placeholder: ' ', label: 'لینک مکان مجازی', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'classroom_address', responseKey: 'classroom_address', placeholder: ' ', label: 'آدرس مکان فیزیکی', col: 'col-12' },
        {
          type: 'select',
          name: 'holding_year',
          responseKey: 'holding_year',
          options: [1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410],
          value: null,
          label: 'انتخاب سال',
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
          label: 'انتخاب ماه',
          placeholder: ' ',
          col: 'col-md-3'
        },
        { type: 'input', name: 'sessions_frequency', responseKey: 'sessions_frequency', placeholder: ' ', label: 'دوره تناوب', col: 'col-12' },
        { type: 'select', name: 'professor', responseKey: 'professor', options: [], value: null, placeholder: ' ', label: 'استاد', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'مشخصات اندیشه جو', className: 'custom-separator', col: 'col-12' },
        // { type: 'select', name: 'audience_status_wwwww', responseKey: 'audience_status_wwwww', options: [], placeholder: ' ', label: 'وضعیت(؟)', col: 'col-md-3 col-12' },
        // { type: 'select', name: 'category1', responseKey: 'category1', options: [], placeholder: ' ', label: 'مجموعه(؟)', col: 'col-md-3 col-12' },
        { type: 'select', name: 'audience_gender_type', responseKey: 'audience_gender_type', options: Enums.genders, placeholder: ' ', label: 'جنسیت', col: 'col-md-3 col-12' },
        // { type: 'select', name: 'audience_bashgah_wwwww', responseKey: 'audience_bashgah_wwwww', options: [], placeholder: ' ', label: 'باشگاه(؟)', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'تنظیمات', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', placeholder: ' ', label: 'ظرفیت گروه درسی', col: 'col-md-3 col-12' },

        { type: 'input', name: 'allowed_absence_count', responseKey: 'allowed_absence_count', placeholder: ' ', label: 'تعداد مجاز غیبت', col: 'col-md-3 col-12' },
        { type: 'input', name: 'effective_absence_coefficient', responseKey: 'effective_absence_coefficient', placeholder: ' ', label: 'وزن نمره حضور و غیاب ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'mandatory_assignment_count', responseKey: 'mandatory_assignment_count', placeholder: ' ', label: 'تعداد تکالیف اجباری', col: 'col-md-3 col-12' },

        { type: 'input', name: 'special_passing_mark', responseKey: 'special_passing_mark', placeholder: ' ', label: 'نمره قبولی مشروطی ها', col: 'col-md-3 col-12' },
        { type: 'input', name: 'minimum_conditional_passing_mark', responseKey: 'minimum_conditional_passing_mark', placeholder: ' ', label: 'نمره قبولی مشروط', col: 'col-md-3 col-12' },
        { type: 'input', name: 'minimum_clean_passing_mark', responseKey: 'minimum_clean_passing_mark', placeholder: ' ', label: 'نمره قبولی', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'ثبت نام و حذف و اضافه', className: 'custom-separator', col: 'col-12' },
        { type: 'dateTime', name: 'beginning_enrollment_period', responseKey: 'beginning_enrollment_period', outsideLabel: 'تاریخ شروع پیش ثبت نام', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', outsideLabel: 'تاریخ پایان پیش ثبت نام', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'beginning_registration_period', responseKey: 'beginning_registration_period', outsideLabel: 'تاریخ شروع ثبت نام', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_registration_period', responseKey: 'ending_registration_period', outsideLabel: 'تاریخ پایان ثبت نام', col: 'col-md-6 col-12' },

        { type: 'input', name: 'registration_period_refund_percent', responseKey: 'registration_period_refund_percent', placeholder: ' ', label: 'درصد برگشت هزینه انصراف در بازه ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_enrollment_period', responseKey: 'allow_dropping_on_enrollment_period', label: 'امکان حذف در بازه پیش ثبت نام', value: false, col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_adding_on_registration_period', responseKey: 'allow_adding_on_registration_period', label: 'امکان اضافه کردن در بازه ثبت نام', value: false, col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_registration_period', responseKey: 'allow_dropping_on_registration_period', label: 'امکان حذف ثبت نام در بازه ثبت نام', value: false, col: 'col-md-3 col-12' },

        { type: 'dateTime', name: 'beginning_drop_add_period', responseKey: 'beginning_drop_add_period', outsideLabel: 'تاریخ شروع حذف و اضافه', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_drop_add_period', responseKey: 'ending_drop_add_period', outsideLabel: 'تاریخ پایان حذف و اضافه', col: 'col-md-6 col-12' },

        { type: 'input', name: 'drop_add_period_refund_percent', responseKey: 'drop_add_period_refund_percent', placeholder: ' ', label: 'درصد برگشت هزینه انصراف در بازه حذف و اضافه', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_adding_on_drop_add_period', responseKey: 'allow_adding_on_drop_add_period', label: 'امکان اضافه شدن در بازه حذف و اضافه', value: false, col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_drop_add_period', responseKey: 'allow_dropping_on_drop_add_period', label: 'امکان حذف در بازه حذف و اضافه', value: false, col: 'col-md-3 col-12' },

        { type: 'dateTime', name: 'publish_time', responseKey: 'publish_time', outsideLabel: 'تاریخ انتشار', col: 'col-md-6 col-12' },

        { type: 'separator', name: 'space', label: 'قوانین', className: 'custom-separator', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'rules', responseKey: 'rules', label: 'قوانین', col: 'col-12' },

        { type: FormBuilderInputEditorComp, name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'specification', responseKey: 'specification', label: 'مشخصات', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'bulletin', responseKey: 'bulletin', label: 'تابلو اعلانات', col: 'col-12' },

        // -----------------------------------------------------------------------------------------------------------

        // { type: 'separator', name: 'space', label: 'موارد زیر در طرح نبودند', className: 'custom-separator', col: 'col-12' },
        // { type: 'select', name: 'audience_role', responseKey: 'audience_role', options: Enums.groups, placeholder: ' ', label: 'نقش', col: 'col-md-4 col-12' },

        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-3 col-12' }
      ]
    }
  },
  computed: {
    classroomTypeTitle () {
      const unitCategory = new UnitCategory({ type: this.localOptions.classroomType })
      return unitCategory.type_info.label
    },
    createPageRouteName () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'Admin.Classroom.Create'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'Admin.Event.Create'
      }
      return 'Admin.Classroom.Create'
    },
    showPageRouteName () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'Admin.Classroom.Show'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'Admin.Event.Show'
      }
      return 'Admin.Classroom.Show'
    },
    selectedCategoryId () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'category')?.value
    }
  },
  watch: {
    selectedCategoryId () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'space1', 'value', null)
      FormBuilderAssist.setAttributeByName(this.inputs, 'unit', 'options', [])
      this.getUnits(this.selectedCategoryId)
    }
  },
  mounted () {
    this.setClassroomTypeOfInputs()
    this.preLoadData()
      .then(() => {
        this.mounted = true
      })
      .catch(() => {
      })
  },
  methods: {
    setClassroomTypeOfInputs () {
      if (this.localOptions.classroomType === 'TRAINING') {
        FormBuilderAssist.setAttributeByName(this.inputs, 'professor', 'label', 'استاد')
      }
      if (this.localOptions.classroomType === 'EVENT') {
        FormBuilderAssist.setAttributeByName(this.inputs, 'professor', 'label', 'برگزار کننده')
        FormBuilderAssist.setAttributeByName(this.inputs, 'sessions_frequency', 'label', 'عنوان')
        FormBuilderAssist.setAttributeByName(this.inputs, 'unit', 'label', 'دسته')
        FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'type', 'hidden') // unit -> category__type filter
        FormBuilderAssist.setAttributeByName(this.inputs, 'allowed_absence_count', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'effective_absence_coefficient', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'mandatory_assignment_count', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'special_passing_mark', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'minimum_conditional_passing_mark', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'minimum_clean_passing_mark', 'type', 'hidden')
      }
    },
    setInputAttr (name, attr, value) {
      this.$refs.classroomEntityCreate.setInputAttributeByName(name, attr, value)
    },
    preLoadData () {
      return new Promise((resolve, reject) => {
        const promise1 = this.getProfessors()
        const promise2 = this.getCategories()
        const promise3 = (this.localOptions.classroomType === 'EVENT') ? this.getUnits(null, this.localOptions.classroomType) : (Promise.resolve())
        this.$nextTick(() => {
          Promise.all([promise1, promise2, promise3])
            .then(() => {
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
          FormBuilderAssist.setAttributeByName(this.inputs, 'professor', 'options', users.list.list.map(item => {
            return {
              value: item.id,
              label: this.getUserFullname(item)
            }
          }))
        })
        .catch(() => {})
    },
    getCategories () {
      return APIGateway.unitCategory.index({ per_page: 9999, type: this.localOptions.classroomType })
        .then((categories) => {
          FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'options', categories.list.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
        })
        .catch(() => {})
    },
    getUnits (selectedcategoryId = null, categoryType = null) {
      this.unitsLoading = true
      APIGateway.unit.index({ per_page: 9999, category: selectedcategoryId, category__type: categoryType })
        .then((units) => {
          FormBuilderAssist.setAttributeByName(this.inputs, 'unit', 'options', units.list.list.map(item => {
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
    createClassroom () {
      this.$refs.classroomEntityCreate.createEntity()
    }
  }
}
</script>
