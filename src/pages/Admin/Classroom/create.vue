<template>
  <entity-create ref="classroomEntityCreate"
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
                 :show-reload-button="false">
    <template #after-form-builder>
      <div class="flex justify-end">
        <q-btn color="primary"
               label="ایجاد دوره آموزشی جدید"
               @click="createClassroom" />
      </div>
    </template>
  </entity-create>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import Enums from 'src/assets/Enums/Enums.js'
import API_ADDRESS from 'src/api/Addresses.js'

export default {
  name: 'Admin.Classroom.Create',
  components: {
    EntityCreate
  },
  data () {
    return {
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: API_ADDRESS.classroom.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Classroom.Show',
      inputs: [
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'آپلود عکس دوره', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام دوره', col: 'col-md-12' },
        {
          type: 'select',
          name: 'category',
          responseKey: 'category',
          options: [],
          value: null,
          label: 'دسته بندی',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'unit',
          responseKey: 'unit',
          options: [],
          value: null,
          label: 'درس',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'audience_gender_type',
          responseKey: 'audience_gender_type',
          options: Enums.genders,
          value: null,
          label: 'جنسیت',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'audience_role',
          responseKey: 'audience_role',
          options: Enums.groups,
          value: null,
          label: 'نقش',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'category',
          responseKey: 'category',
          options: [],
          value: null,
          label: 'مجموعه',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'professor',
          responseKey: 'professor',
          options: [],
          value: null,
          label: 'استاد دوره',
          col: 'col-md-3'
        },
        { type: 'input', name: 'price', responseKey: 'price', label: 'هزینه برگزاری', col: 'col-md-3' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', label: 'ظرفیت گروه درسی', col: 'col-md-3' },
        { type: 'input', name: 'allowed_absence_count', responseKey: 'allowed_absence_count', label: 'تعداد مجاز غیبت', col: 'col-md-3' },
        { type: 'input', name: 'effective_absence_coefficient', responseKey: 'effective_absence_coefficient', label: 'ضریب نمره حضور و غیاب', col: 'col-md-3' },
        { type: 'input', name: 'mandatory_assignment_count', responseKey: 'mandatory_assignment_count', label: 'تعداد تکالیف اجباری', col: 'col-md-3' },
        { type: 'input', name: 'maximum_failing_mark', responseKey: 'maximum_failing_mark', label: 'حداقل نمره قبولی', col: 'col-md-3' },
        { type: 'input', name: 'minimum_conditional_passing_mark', responseKey: 'minimum_conditional_passing_mark', label: 'حداقل نمره عدم مردودی', col: 'col-md-3' },
        { type: 'input', name: 'minimum_clean_passing_mark', responseKey: 'minimum_clean_passing_mark', label: 'حداقل نمره قبولی مشروط', col: 'col-md-3' },
        {
          type: 'select',
          name: 'holding_type',
          responseKey: 'holding_type',
          options: Enums.classroomHoldingTypes,
          value: null,
          label: 'نوع برگزاری',
          col: 'col-md-3'
        },
        { type: 'input', name: 'live_streaming_url', responseKey: 'live_streaming_url', label: 'لینک مکان برگزاری', col: 'col-md-12' },
        { type: 'inputEditor', name: 'classroom_address', responseKey: 'classroom_address', label: 'آدرس مکان برگزاری', col: 'col-md-12' },
        { type: 'dateTime', name: 'beginning_enrollment_period', responseKey: 'beginning_enrollment_period', label: 'تاریخ شروع پیش ثبت نام', col: 'col-md-6' },
        { type: 'dateTime', name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', label: 'تاریخ پایان پیش ثبت نام', col: 'col-md-6' },
        { type: 'dateTime', name: 'beginning_registration_period', responseKey: 'beginning_registration_period', label: 'تاریخ شروع ثبت نام', col: 'col-md-6' },
        { type: 'dateTime', name: 'ending_registration_period', responseKey: 'ending_registration_period', label: 'تاریخ پایان ثبت نام', col: 'col-md-6' },
        { type: 'inputEditor', name: 'rules', responseKey: 'rules', label: 'قوانین دوره آموزشی', col: 'col-md-12' },
        { type: 'dateTime', name: 'publish_time', responseKey: 'publish_time', label: 'تاریخ انتشار', col: 'col-md-6' }
      ]
    }
  },
  computed: {
    selectedCategoryId () {
      return this.getInputValue('category')
    }
  },
  watch: {
    selectedCategoryId () {
      this.setInputValue('unit', null)
      this.getUnits(this.selectedCategoryId)
    }
  },
  created () {
    this.beforeLoadInputData()
  },
  methods: {
    async beforeLoadInputData (responseData, setNewInputData) {
      this.getProfessors(setNewInputData)
      await this.getCategories(setNewInputData)
      await this.getUnits(responseData.unit_info.category, setNewInputData)
      this.$nextTick(() => {
        this.setInputValue('category', responseData.unit_info.category)
        this.setInputValue('unit', responseData.unit)
      })
    },
    async getProfessors (setNewInputData) {
      const response = await this.$axios.get(API_ADDRESS.user.base + '?per_page=9999&role=professor')
      this.loadSelectOptions('professor', response.data.results.map(item => {
        return {
          value: item.id,
          label: this.getUserFullname(item)
        }
      }), setNewInputData)
    },
    getUserFullname (user) {
      return user.firstname + ' ' + user.lastname
    },
    async getCategories (setNewInputData) {
      const response = await this.$axios.get(API_ADDRESS.category.base)
      this.loadSelectOptions('category', this.getSelectOptions(response.data.results, 'id', 'title'), setNewInputData)
    },
    async getUnits (selectedcategoryId, setNewInputData) {
      const response = await this.$axios.get(API_ADDRESS.unit.base + '?category=' + selectedcategoryId)
      this.loadSelectOptions('unit', this.getSelectOptions(response.data.results, 'id', 'title'), setNewInputData)
    },
    getSelectOptions (result, value, label) {
      return result.map(item => {
        return {
          value: item[value],
          label: item[label]
        }
      })
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
    createClassroom () {
      this.$refs.classroomEntityCreate.createEntity()
    },
    getInputValue (name) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      return this.inputs[inputIndex].value
    }
  }
}
</script>
