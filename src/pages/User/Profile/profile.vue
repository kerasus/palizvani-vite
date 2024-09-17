<template>
  <entity-edit v-if="mounted"
               ref="entityEdit"
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
      <div class="flex justify-end q-mt-md">
        <q-btn color="primary"
               label="تایید اطلاعات تکمیلی"
               @click="editEntity" />
      </div>
    </template>
  </entity-edit>
  <template v-else>
    کمی صبر کنید...
  </template>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { User } from 'src/models/User.js'
import Enums from 'src/assets/Enums/Enums.js'
import { APIGateway } from 'src/api/APIGateway.js'
import Warning from 'src/components/other/Warning.vue'
import VerifyEmail from 'src/components/other/VerifyEmail.vue'
import NationalCode from 'src/components/other/NationalCode.vue'
import VerifyMobileNumber from 'src/components/other/VerifyMobileNumber.vue'
import FormBuilderBarCode from 'src/components/FormBuilderCustumComponents/FormBuilderBarCode.vue'

const WarningComp = shallowRef(Warning)
const VerifyEmailComp = shallowRef(VerifyEmail)
const NationalCodeComp = shallowRef(NationalCode)
const VerifyMobileNumberComp = shallowRef(VerifyMobileNumber)
const FormBuilderBarCodeComp = shallowRef(FormBuilderBarCode)

export default {
  name: 'UserPanel.Profile.UserInfo',
  components: { EntityEdit },
  data () {
    return {
      mounted: false,
      tab: 'userInfo',
      api: APIGateway.user.APIAdresses.current,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'UserPanel.Profile.UserInfo',
      inputs: [
        { type: 'separator', name: 'space', placeholder: ' ', label: 'شناسه ورود به جلسه', className: 'custom-separator require', col: 'col-12' },
        { type: FormBuilderBarCodeComp, name: 'national_code', responseKey: 'national_code', label: '', ignoreValue: true, col: 'col-12' },
        { type: 'separator', name: 'space', placeholder: ' ', label: 'اطلاعات ضروری', className: 'custom-separator require', col: 'col-12' },
        { type: WarningComp, name: 'WarningComp', label: 'بعد از تایید اطلاعات ضروری، امکان تغییر این اطلاعات وجود ندارد', col: 'col-12' },
        { type: VerifyEmailComp, name: 'email', placeholder: ' ', label: 'ایمیل', responseKey: 'email', col: 'col-md-6 col-12' },
        { type: VerifyMobileNumberComp, name: 'mobile_number', placeholder: ' ', label: 'تلفن همراه', responseKey: 'mobile_number', col: 'col-md-6 col-12' },
        { type: 'optionGroupRadio', name: 'is_valid_national_code', responseKey: 'is_valid_national_code', label: 'اتباع خارجی', options: [{ label: 'نیستم', value: true }, { label: 'هستم', value: false }], value: true, className: 'require', col: 'col-md-6 col-12' },
        { type: NationalCodeComp, name: 'national_code', value: '', placeholder: ' ', label: 'کدملی/کد اتباع غیر ایرانی', responseKey: 'national_code', col: 'col-md-6 col-12' },
        { type: 'separator', name: 'space', label: 'اطلاعات پروفایل', className: 'custom-separator', col: 'col-12' },
        { type: 'file', name: 'picture', placeholder: ' ', label: 'عکس پروفایل', responseKey: 'picture', col: 'col-md-6 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-12' },
        { type: 'input', name: 'firstname', placeholder: ' ', label: 'نام', responseKey: 'firstname', className: 'require', col: 'col-md-6 col-12' },
        { type: 'input', name: 'lastname', placeholder: ' ', label: 'نام خانوادگی', responseKey: 'lastname', className: 'require', col: 'col-md-6 col-12' },
        {
          type: 'select',
          name: 'gender',
          responseKey: 'gender',
          options: Enums.genders,
          value: null,
          label: 'جنسیت',
          placeholder: ' ',
          className: 'require',
          col: 'col-md-6 col-12'
        },
        { type: 'date', name: 'birthdate', outsideLabel: 'تولد', responseKey: 'birthdate', className: 'require', col: 'col-md-6 col-12' },
        {
          type: 'select',
          name: 'marital_status',
          responseKey: 'marital_status',
          options: Enums.maritalStatuses,
          value: null,
          label: 'وضعیت تاهل',
          placeholder: ' ',
          className: 'require',
          col: 'col-md-6 col-12'
        },
        { type: 'input', name: 'on_call_mobile_number', placeholder: ' ', label: 'تلفن همراه جهت تماس', responseKey: 'on_call_mobile_number', className: 'require', col: 'col-md-6 col-12' },
        { type: 'input', name: 'on_social_network_mobile_number', placeholder: ' ', label: 'تلفن همراه جهت شبکه های اجتماعی', className: 'require', responseKey: 'on_social_network_mobile_number', col: 'col-md-6 col-12' },
        { type: 'input', name: 'phone_number', placeholder: 'با کد شهر وارد شود', label: 'تلفن منزل', responseKey: 'phone_number', className: 'require', col: 'col-md-6 col-12' },
        {
          type: 'select',
          name: 'last_academic_degree',
          responseKey: 'last_academic_degree',
          options: Enums.academicDegree,
          value: null,
          label: 'آخرین مقطع تحصیلی',
          placeholder: ' ',
          className: 'require',
          col: 'col-md-6 col-12'
        },
        { type: 'input', name: 'last_academic_degree_field', placeholder: ' ', label: 'رشته تحصیلی', responseKey: 'last_academic_degree_field', className: 'require', col: 'col-md-6 col-12' },
        { type: 'input', name: 'last_academy_name', placeholder: ' ', label: 'نام دانشگاه یا حوزه تحصیلی', responseKey: 'last_academy_name', className: 'require', col: 'col-md-6 col-12' },
        {
          type: 'select',
          name: 'educational_status',
          responseKey: 'educational_status',
          options: Enums.educationalStatus,
          value: null,
          label: 'وضعیت تحصیلی',
          placeholder: ' ',
          className: 'require',
          col: 'col-md-6 col-12'
        },
        { type: 'checkbox', name: 'is_abroad_birth_address', placeholder: ' ', label: 'محل تولد خارج از کشور است؟', responseKey: 'is_abroad_birth_address', className: 'require', col: 'col-12' },
        { type: 'input', name: 'birth_country', placeholder: ' ', label: 'کشور محل تولد', responseKey: 'birth_country', className: 'require', col: 'col-md-6 col-12' },
        { type: 'input', name: 'birth_province', placeholder: ' ', label: 'استان محل تولد', responseKey: 'birth_province', className: 'require', col: 'col-md-6 col-12' },
        { type: 'input', name: 'birth_city', placeholder: ' ', label: 'شهر محل تولد', responseKey: 'birth_city', className: 'require', col: 'col-md-6 col-12' },
        { type: 'checkbox', name: 'is_abroad_living_address', placeholder: ' ', label: 'محل زندگی فعلی خارج از کشور است؟', responseKey: 'is_abroad_living_address', className: 'require', col: 'col-12' },
        { type: 'input', name: 'living_country', placeholder: ' ', label: 'کشور محل زندگی فعلی', responseKey: 'living_country', className: 'require', col: 'col-md-6 col-12' },
        { type: 'input', name: 'living_province', placeholder: ' ', label: 'استان محل زندگی فعلی', responseKey: 'living_province', className: 'require', col: 'col-md-6 col-12' },
        { type: 'input', name: 'living_city', placeholder: ' ', label: 'شهر محل زندگی فعلی', responseKey: 'living_city', className: 'require', col: 'col-md-6 col-12' },
        { type: 'input', name: 'living_postal_code', placeholder: ' ', label: 'کد پستی محل زندگی', responseKey: 'living_postal_code', className: 'require', col: 'col-md-6 col-12' },
        { type: 'input', name: 'living_address', placeholder: ' ', label: 'آدرس پستی محل زندگی', responseKey: 'living_address', className: 'require', col: 'col-md-6 col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-12' }
      ]
    }
  },
  mounted() {
    this.mounted = true
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
      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.$q.notify({
            message: 'اطلاعات با موفقیت ویرایش شد',
            type: 'positive'
          })
          APIGateway.user.getCurrent()
            .then((user) => {
              this.$store.commit('Auth/updateUser', new User(user))
            })
            .catch(() => {
            })
        })
        .catch(() => {
        })
    }
  }
}
</script>
