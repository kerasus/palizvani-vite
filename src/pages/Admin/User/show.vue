<template>
  <q-card>
    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
      <q-tab name="userInfo"
             label="اطلاعات کاربری" />
      <q-tab name="educations"
             label="سوابق آموزشی" />
      <q-tab name="movies1"
             label="سوابق مالی" />
      <q-tab name="movies2"
             label="سوابق دوره های مباحثاتی" />
      <q-tab name="movies3"
             label="سوابق رویدادها" />
      <q-tab name="movies4"
             label="سوابق باشگاه اندیشه جویان" />
      <q-tab name="movies5"
             label="درخواست مدرک و گواهی" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="userInfo">
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
                     label="بروزرسانی اطلاعات"
                     @click="editEntity" />
            </div>
          </template>
        </entity-edit>
      </q-tab-panel>

      <q-tab-panel name="educations">
        سوابق آموزشی
      </q-tab-panel>

      <q-tab-panel name="movies1">
        سوابق مالی
      </q-tab-panel>
      <q-tab-panel name="movies2">
        سوابق باشگاه اندیشه جویان
      </q-tab-panel>
      <q-tab-panel name="movies3">
        سوابق رویدادها
      </q-tab-panel>
      <q-tab-panel name="movies4">
        سوابق باشگاه اندیشه جویان
      </q-tab-panel>
      <q-tab-panel name="movies5">
        درخواست مدرک و گواهی
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import Enums from 'src/assets/Enums/Enums.js'
import API_ADDRESS from 'src/api/Addresses.js'

export default {
  name: 'Admin.User.Show',
  components: { EntityEdit },
  data () {
    return {
      tab: 'userInfo',
      api: API_ADDRESS.user.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.User.Show',
      inputs: [
        { type: 'separator', name: 'space', label: 'نقش و وضعیت ها', col: 'col-md-12' },
        {
          type: 'select',
          name: 'roles',
          responseKey: 'roles',
          options: Enums.groups,
          multiple: true,
          label: 'نقش',
          col: 'col-md-3'
        },
        { type: 'separator', name: 'space', label: 'اطلاعات ضروری', col: 'col-md-12' },
        { type: 'input', name: 'email', label: 'ایمیل', responseKey: 'email', col: 'col-md-3' },
        { type: 'input', name: 'on_call_mobile_number', label: 'تلفن همراه', responseKey: 'on_call_mobile_number', col: 'col-md-3' },
        { type: 'input', name: 'national_code', label: 'کدملی/کد اتباع غیر ایرانی', responseKey: 'national_code', col: 'col-md-3' },
        { type: 'separator', name: 'space', label: 'اطلاعات پروفایل', col: 'col-md-12' },
        { type: 'file', name: 'picture', label: 'عکس پروفایل', responseKey: 'data.picture', col: 'col-md-3' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        { type: 'input', name: 'firstname', label: 'نام', responseKey: 'firstname', col: 'col-md-3' },
        { type: 'input', name: 'lastname', label: 'نام خانوادگی', responseKey: 'lastname', col: 'col-md-3' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-12' },
        { type: 'hidden', name: 'is_active', responseKey: 'is_active', label: 'is_active', col: 'col-md-12' },
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
        { type: 'input', name: 'living_address', label: 'آدرس پستی محل زندگی', responseKey: 'living_address', col: 'col-md-6' }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    afterLoadInputData (responseData, setNewInputData) {
      // const roles = responseData.roles.map(role => {
      //   return {
      //     label: this.getRoleTitle(role),
      //     value: role
      //   }
      // }).filter(role => role.value)
      // console.log('roles', roles)
      // this.setInputValue('roles', roles)
      // setNewInputData(this.inputs)
    },
    setInputValue (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].value = value
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

<style scoped>

</style>
