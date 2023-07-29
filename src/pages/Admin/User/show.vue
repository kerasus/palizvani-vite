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
        <entity-edit v-if="mounted"
                     ref="entityEdit"
                     v-model:value="inputs"
                     title="اطلاعات کاربری"
                     :api="api"
                     :after-load-input-data="afterLoadInputData"
                     :entity-id-key="entityIdKey"
                     :entity-param-key="entityParamKey"
                     :show-route-name="showRouteName"
                     :default-layout="false"
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
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'Admin.User.Show',
  components: { EntityEdit },
  data () {
    return {
      tab: 'userInfo',
      api: null,
      mounted: false,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.User.Show',
      inputs: [
        { type: 'separator', name: 'space', label: 'نقش و وضعیت ها', className: 'custom-separator', col: 'col-12' },
        {
          type: 'select',
          name: 'roles',
          responseKey: 'roles',
          options: Enums.groups,
          multiple: true,
          label: 'نقش',
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: 'separator', name: 'space', placeholder: ' ', label: 'اطلاعات ضروری', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'email', placeholder: ' ', label: 'ایمیل', responseKey: 'email', col: 'col-md-3 col-12' },
        { type: 'input', name: 'on_call_mobile_number', placeholder: ' ', label: 'تلفن همراه', responseKey: 'on_call_mobile_number', col: 'col-md-3 col-12' },
        { type: 'input', name: 'national_code', placeholder: ' ', label: 'کدملی/کد اتباع غیر ایرانی', responseKey: 'national_code', col: 'col-md-3 col-12' },
        { type: 'separator', name: 'space', label: 'اطلاعات پروفایل', className: 'custom-separator', col: 'col-12' },
        { type: 'file', name: 'picture', placeholder: ' ', label: 'عکس پروفایل', responseKey: 'picture', col: 'col-md-3 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-12' },
        { type: 'input', name: 'firstname', placeholder: ' ', label: 'نام', responseKey: 'firstname', col: 'col-md-3 col-12' },
        { type: 'input', name: 'lastname', placeholder: ' ', label: 'نام خانوادگی', responseKey: 'lastname', col: 'col-md-3 col-12' },
        {
          type: 'select',
          name: 'gender',
          responseKey: 'gender',
          options: Enums.genders,
          value: null,
          label: 'جنسیت',
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: 'date', name: 'birthdate', placeholder: ' ', label: 'تولد', responseKey: 'birthdate', col: 'col-md-3 col-12' },
        {
          type: 'select',
          name: 'marital_status',
          responseKey: 'marital_status',
          options: Enums.maritalStatuses,
          value: null,
          label: 'وضعیت تاهل',
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: 'input', name: 'on_call_mobile_number', placeholder: ' ', label: 'تلفن همراه جهت تماس', responseKey: 'on_call_mobile_number', col: 'col-md-3 col-12' },
        { type: 'input', name: 'on_social_network_mobile_number', placeholder: ' ', label: 'تلفن همراه جهت شبکه های اجتماعی', responseKey: 'on_social_network_mobile_number', col: 'col-md-3 col-12' },
        { type: 'input', name: 'phone_number', placeholder: ' ', label: 'تلفن منزل', responseKey: 'phone_number', col: 'col-md-3 col-12' },
        {
          type: 'select',
          name: 'last_academic_degree',
          responseKey: 'last_academic_degree',
          options: Enums.academicDegree,
          value: null,
          label: 'آخرین مقطع تحصیلی',
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: 'input', name: 'last_academic_degree_field', placeholder: ' ', label: 'رشته تحصیلی', responseKey: 'last_academic_degree_field', col: 'col-md-3 col-12' },
        { type: 'input', name: 'last_academy_name', placeholder: ' ', label: 'نام دانشگاه یا حوزه تحصیلی', responseKey: 'last_academy_name', col: 'col-md-3 col-12' },
        {
          type: 'select',
          name: 'educational_status',
          responseKey: 'educational_status',
          options: Enums.educationalStatus,
          value: null,
          label: 'وضعیت تحصیلی',
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: 'input', name: 'birth_country', placeholder: ' ', label: 'کشور محل تولد', responseKey: 'birth_country', col: 'col-md-4 col-12' },
        { type: 'input', name: 'birth_province', placeholder: ' ', label: 'استان محل تولد', responseKey: 'birth_province', col: 'col-md-4 col-12' },
        { type: 'input', name: 'birth_city', placeholder: ' ', label: 'شهر محل تولد', responseKey: 'birth_city', col: 'col-md-4 col-12' },
        { type: 'input', name: 'living_country', placeholder: ' ', label: 'کشور محل زندگی فعلی', responseKey: 'living_country', col: 'col-md-4 col-12' },
        { type: 'input', name: 'living_province', placeholder: ' ', label: 'استان محل زندگی فعلی', responseKey: 'living_province', col: 'col-md-4 col-12' },
        { type: 'input', name: 'living_city', placeholder: ' ', label: 'شهر محل زندگی فعلی', responseKey: 'living_city', col: 'col-md-4 col-12' },
        { type: 'input', name: 'living_postal_code', placeholder: ' ', label: 'کد پستی محل زندگی', responseKey: 'living_postal_code', col: 'col-md-3 col-12' },
        { type: 'input', name: 'living_address', placeholder: ' ', label: 'آدرس پستی محل زندگی', responseKey: 'living_address', col: 'col-md-6 col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-12' },
        { type: 'hidden', name: 'is_active', responseKey: 'is_active', label: 'is_active', col: 'col-12' }
      ]
    }
  },
  mounted () {
    this.api = APIGateway.user.APIAdresses.byId(this.$route.params.id)
    this.mounted = true
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
