<template>
  <entity-edit ref="entityEdit"
               v-model:value="inputs"
               title="اطلاعات کاربری"
               :api="api"
               :after-load-input-data="afterLoadInputData"
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
               label="تایید اطلاعات تکمیلی"
               @click="editEntity" />
      </div>
    </template>
  </entity-edit>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import Enums from 'src/assets/Enums/Enums.js'
import API_ADDRESS from 'src/api/Addresses.js'
import Warning from 'src/components/other/Warning.vue'
import VerifyEmail from 'src/components/other/VerifyEmail.vue'
import NationalCode from 'src/components/other/NationalCode.vue'
import VerifyMobileNumber from 'src/components/other/VerifyMobileNumber.vue'

const VerifyMobileNumberComp = shallowRef(VerifyMobileNumber)
const VerifyEmailComp = shallowRef(VerifyEmail)
const NationalCodeComp = shallowRef(NationalCode)
const WarningComp = shallowRef(Warning)

export default {
  name: 'UserPanel.Profile.UserInfo',
  components: { EntityEdit },
  data () {
    return {
      tab: 'userInfo',
      api: API_ADDRESS.user.current,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'UserPanel.Profile.UserInfo',
      inputs: [
        { type: 'separator', name: 'space', label: 'اطلاعات ضروری', col: 'col-md-12' },
        { type: WarningComp, label: 'بعد از تایید اطلاعات ضروری، امکان تغییر این اطلاعات وجود ندارد', col: 'col-md-12' },
        { type: VerifyEmailComp, name: 'email', label: 'ایمیل', responseKey: 'email', col: 'col-md-3' },
        { type: NationalCodeComp, name: 'national_code', value: '', label: 'کدملی/کد اتباع غیر ایرانی', responseKey: 'national_code', col: 'col-md-3' },
        // { type: 'input', name: 'on_call_mobile_number', label: 'تلفن همراه', responseKey: 'on_call_mobile_number', col: 'col-md-3' },
        { type: VerifyMobileNumberComp, name: 'on_call_mobile_number', label: 'تلفن همراه', responseKey: 'on_call_mobile_number', col: 'col-md-3' },
        { type: 'separator', name: 'space', label: 'اطلاعات پروفایل', col: 'col-md-12' },
        { type: 'file', name: 'avatar', label: 'عکس پروفایل', responseKey: 'data.avatar', col: 'col-md-3' },
        { type: 'separator', name: 'space', size: 0, col: 'col-md-12' },
        { type: 'input', name: 'firstname', label: 'نام', responseKey: 'firstname', col: 'col-md-3' },
        { type: 'input', name: 'lastname', label: 'نام خانوادگی', responseKey: 'lastname', col: 'col-md-3' },
        {
          type: 'select',
          name: 'gender',
          responseKey: 'gender',
          options: Enums.genders,
          value: null,
          label: 'جنسیت',
          col: 'col-md-3'
        },
        { type: 'date', name: 'birthdate', label: 'تولد', responseKey: 'birthdate', col: 'col-md-3' },
        {
          type: 'select',
          name: 'marital_status',
          responseKey: 'marital_status',
          options: Enums.maritalStatuses,
          value: null,
          label: 'وضعیت تاهل',
          col: 'col-md-3'
        },
        { type: 'input', name: 'on_call_mobile_number', label: 'تلفن همراه جهت تماس', responseKey: 'on_call_mobile_number', col: 'col-md-3' },
        { type: 'input', name: 'on_social_network_mobile_number', label: 'تلفن همراه جهت شبکه های اجتماعی', responseKey: 'on_social_network_mobile_number', col: 'col-md-3' },
        { type: 'input', name: 'phone_number', label: 'تلفن منزل', responseKey: 'phone_number', col: 'col-md-3' },
        {
          type: 'select',
          name: 'last_academic_degree',
          responseKey: 'last_academic_degree',
          options: Enums.academicDegree,
          value: null,
          label: 'آخرین مقطع تحصیلی',
          col: 'col-md-3'
        },
        { type: 'input', name: 'last_academic_degree_field', label: 'رشته تحصیلی', responseKey: 'last_academic_degree_field', col: 'col-md-3' },
        { type: 'input', name: 'last_academy_name', label: 'نام دانشگاه یا حوزه تحصیلی', responseKey: 'last_academy_name', col: 'col-md-3' },
        {
          type: 'select',
          name: 'educational_status',
          responseKey: 'educational_status',
          options: Enums.educationalStatus,
          value: null,
          label: 'وضعیت تحصیلی',
          col: 'col-md-3'
        },
        { type: 'input', name: 'birth_country', label: 'کشور محل تولد', responseKey: 'birth_country', col: 'col-md-4' },
        { type: 'input', name: 'birth_province', label: 'استان محل تولد', responseKey: 'birth_province', col: 'col-md-4' },
        { type: 'input', name: 'birth_city', label: 'شهر محل تولد', responseKey: 'birth_city', col: 'col-md-4' },
        { type: 'input', name: 'living_country', label: 'کشور محل زندگی فعلی', responseKey: 'living_country', col: 'col-md-4' },
        { type: 'input', name: 'living_province', label: 'استان محل زندگی فعلی', responseKey: 'living_province', col: 'col-md-4' },
        { type: 'input', name: 'living_city', label: 'شهر محل زندگی فعلی', responseKey: 'living_city', col: 'col-md-4' },
        { type: 'input', name: 'living_postal_code', label: 'کد پستی محل زندگی', responseKey: 'living_postal_code', col: 'col-md-3' },
        { type: 'input', name: 'living_address', label: 'آدرس پستی محل زندگی', responseKey: 'living_address', col: 'col-md-6' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-12' }
      ]
    }
  },
  methods: {
    afterLoadInputData (responseData, setNewInputData) {
      this.updateGender(responseData, setNewInputData)
      this.updateMaritalStatus(responseData, setNewInputData)
    },
    updateGender (responseData, setNewInputData) {
      // const gender = this.getInputValue('gender')
      const gender = responseData.gender
      if (gender !== 'UNKNOWN') {
        return
      }
      this.setInputValue('gender', null)
      setNewInputData(this.inputs)
    },
    updateMaritalStatus (responseData, setNewInputData) {
      // const gender = this.getInputValue('gender')
      const maritalStatus = responseData.marital_status
      if (maritalStatus !== 'UNKNOWN') {
        return
      }
      this.setInputValue('marital_status', null)
      setNewInputData(this.inputs)
    },
    setInputValue (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].value = value
    },
    getInputValue (name) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      return this.inputs[inputIndex].value
    },
    getRoleTitle (roleName) {
      const target = Enums.groups.find(item => item.value === roleName)
      if (!target) {
        return '-'
      }

      return target.label
    },
    editEntity () {
      this.$refs.entityEdit.editEntity()
    }
  }
}
</script>
