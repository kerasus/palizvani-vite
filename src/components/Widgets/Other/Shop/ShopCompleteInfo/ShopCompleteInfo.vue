<template>
  <div class="complete-info">
    <q-banner class="banner complete-info-top-banner">
      ثبت نام در دوره آموزشی
    </q-banner>
    <q-card class="complete-info-steps-card">
      <div class="complete-info-step">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="17.053"
             height="19.866"
             viewBox="0 0 17.053 19.866">
          <g id="Paper"
             transform="translate(0 0)">
            <path id="Combined_Shape"
                  data-name="Combined Shape"
                  d="M4.475,19.866A4.585,4.585,0,0,1,0,15.188V4.491A4.606,4.606,0,0,1,4.57.012h6.271a.758.758,0,0,1,.265,0h.131a.755.755,0,0,1,.541.23l5.065,5.277a.753.753,0,0,1,.209.519V15.2A4.615,4.615,0,0,1,12.6,19.865H4.475ZM1.5,4.509V15.2a3.091,3.091,0,0,0,3.009,3.162h8.064a3.109,3.109,0,0,0,2.979-3.155V6.984h-2.01a3.332,3.332,0,0,1-3.318-3.325V1.512H4.572A3.089,3.089,0,0,0,1.5,4.509Zm10.224-.85a1.828,1.828,0,0,0,1.82,1.824H14.73L11.724,2.353ZM5.387,14.108a.75.75,0,0,1,0-1.5h5.4a.75.75,0,0,1,0,1.5Zm0-3.752a.75.75,0,0,1,0-1.5H8.743a.75.75,0,0,1,0,1.5Z"
                  transform="translate(0.001 0)"
                  fill="#5b7a5f" />
          </g>
        </svg>
        <span class="title">
          مشاهده جزییات و قوانین دوره
          <svg xmlns="http://www.w3.org/2000/svg"
               width="15"
               height="15"
               viewBox="0 0 15 15">
            <g id="Group_11510"
               data-name="Group 11510"
               transform="translate(-1215 -335)">
              <circle id="Ellipse_819"
                      data-name="Ellipse 819"
                      cx="7.5"
                      cy="7.5"
                      r="7.5"
                      transform="translate(1215 335)"
                      fill="#19cb99" />
              <path id="Path"
                    d="M8.615,1.5l-4.75,4.75a.881.881,0,0,1-1.23,0L.255,3.875A.877.877,0,0,1,1.5,2.635l1.75,1.75L7.375.255A.877.877,0,0,1,8.615,1.5"
                    transform="translate(1218 339)"
                    fill="#f6f6f6" />
            </g>
          </svg>
        </span>
      </div>
      <div class="complete-info-step">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="15.84"
             height="19.87"
             viewBox="0 0 15.84 19.87">
          <g id="Profile"
             transform="translate(0 0)">
            <path id="Combined_Shape"
                  data-name="Combined Shape"
                  d="M0,16.174c0-3.3,4.521-3.677,7.921-3.677,1.958,0,7.919,0,7.919,3.7,0,3.295-4.52,3.677-7.919,3.677C5.962,19.87,0,19.87,0,16.174Zm1.5,0c0,1.458,2.16,2.2,6.421,2.2s6.419-.733,6.419-2.177S12.18,14,7.921,14,1.5,14.729,1.5,16.174Zm6.389-5.555A5.31,5.31,0,0,1,7.921,0a5.31,5.31,0,0,1,0,10.619ZM4.038,5.31A3.873,3.873,0,0,0,7.892,9.192l.029.715V9.192A3.882,3.882,0,1,0,4.038,5.31Z"
                  transform="translate(0 0)"
                  fill="#212121" />
          </g>
        </svg>
        <span class="title">
          تکمیل اطلاعات
        </span>
      </div>
      <div class="complete-info-step">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="20.639"
             height="19.173"
             viewBox="0 0 20.639 19.173">
          <g id="Wallet"
             transform="translate(0)">
            <path id="Combined_Shape"
                  data-name="Combined Shape"
                  d="M6,19.173a6,6,0,0,1-6-6V6A6,6,0,0,1,6,0h8.645a6,6,0,0,1,6,6v7.178a6,6,0,0,1-6,6ZM1.5,6v7.178a4.5,4.5,0,0,0,4.5,4.5h8.645a4.5,4.5,0,0,0,4.5-4.5V12.9h-3.3a3.441,3.441,0,1,1,0-6.881h3.3V6a4.5,4.5,0,0,0-4.5-4.5H6A4.5,4.5,0,0,0,1.5,6ZM13.9,9.455a1.945,1.945,0,0,0,1.942,1.94h3.3V7.513h-3.3A1.946,1.946,0,0,0,13.9,9.455Zm2.088.688a.75.75,0,0,1,0-1.5H16.3a.75.75,0,0,1,0,1.5ZM5.286,6.038a.75.75,0,0,1,0-1.5h5.4a.75.75,0,1,1,0,1.5Z"
                  transform="translate(0 0)"
                  fill="#bcbcbc" />
          </g>
        </svg>
        <span class="title">
          پرداخت
        </span>
      </div>
    </q-card>

    <q-banner class="banner complete-info-form-banner">
      تکمیل اطلاعات
    </q-banner>
    <q-card class="complete-info-form-card">
      <entity-edit v-if="mounted"
                   ref="entityEdit"
                   v-model:value="inputs"
                   title="اطلاعات کاربری"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false"
                   :redirect-after-edit="false"
                   :after-load-input-data="afterLoadInputData" />
    </q-card>

    <div class="flex justify-end section-edit-btn">
      <q-btn color="primary"
             @click="editEntity">
        تایید و ادامه
        <svg xmlns="http://www.w3.org/2000/svg"
             width="18.387"
             height="11.502"
             viewBox="0 0 18.387 11.502">
          <path id="Combined_Shape"
                data-name="Combined Shape"
                d="M-9.338,11.408a.748.748,0,0,0,.388-.656V6.5h8.2A.751.751,0,0,0,0,5.75.75.75,0,0,0-.75,5h-8.2V.75A.751.751,0,0,0-9.338.093.769.769,0,0,0-9.7,0a.735.735,0,0,0-.4.115l-7.938,5a.747.747,0,0,0-.35.635.742.742,0,0,0,.35.634l7.938,5a.751.751,0,0,0,.4.116A.746.746,0,0,0-9.338,11.408ZM-10.45,9.392l-5.78-3.641,5.78-3.642Z"
                transform="translate(18.387)"
                fill="#fff" />
        </svg>
      </q-btn>
    </div>

  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import Enums from 'src/assets/Enums/Enums.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'ShopCompleteInfo',
  components: { EntityEdit },
  data: () => ({
    mounted: false,
    step: false,
    rulesAccept: false,
    rulesDialog: false,
    loading: true,
    classroom: new Classroom(),

    api: APIGateway.user.APIAdresses.current,
    entityIdKey: 'id',
    entityParamKey: 'id',
    showRouteName: 'UserPanel.ShopPaymentFromWallet',
    inputs: [
      { type: 'separator', name: 'space', label: 'اطلاعات ضروری', col: 'col-12' },
      { type: 'input', name: 'email', label: 'ایمیل', responseKey: 'email', placeholder: ' ', disable: true, col: ' col-md-3 col-12' },
      { type: 'input', name: 'mobile_number', label: 'تلفن همراه', responseKey: 'mobile_number', placeholder: ' ', disable: true, col: ' col-md-3 col-12' },
      { type: 'optionGroupRadio', name: 'is_valid_national_code', label: 'اتباع خارجی', options: [{ label: 'نیستم', value: true }, { label: 'هستم', value: false }], value: true, col: 'col-md-3 col-12' },
      { type: 'input', name: 'national_code', label: 'کدملی/کد اتباع غیر ایرانی', responseKey: 'national_code', placeholder: ' ', col: ' col-md-3 col-12' },
      { type: 'separator', name: 'space', label: 'اطلاعات پروفایل', col: 'col-12' },
      { type: 'file', name: 'picture', label: 'عکس پروفایل', responseKey: 'picture', placeholder: ' ', col: ' col-md-3 col-12' },
      { type: 'separator', name: 'space', size: '0', col: 'col-12' },
      { type: 'input', name: 'firstname', label: 'نام', responseKey: 'firstname', placeholder: ' ', col: ' col-md-3 col-12' },
      { type: 'input', name: 'lastname', label: 'نام خانوادگی', responseKey: 'lastname', placeholder: ' ', col: ' col-md-3 col-12' },
      {
        type: 'select',
        name: 'gender',
        responseKey: 'gender',
        placeholder: ' ',
        options: Enums.genders,
        value: null,
        label: 'جنسیت',
        col: ' col-md-3 col-12'
      },
      { type: 'date', name: 'birthdate', label: 'تولد', responseKey: 'birthdate', placeholder: ' ', col: ' col-md-3 col-12' },
      {
        type: 'select',
        name: 'marital_status',
        responseKey: 'marital_status',
        placeholder: ' ',
        options: Enums.maritalStatuses,
        value: null,
        label: 'وضعیت تاهل',
        col: ' col-md-3 col-12'
      },
      { type: 'input', name: 'on_call_mobile_number', label: 'تلفن همراه جهت تماس', responseKey: 'on_call_mobile_number', placeholder: ' ', col: ' col-md-3 col-12' },
      { type: 'input', name: 'on_social_network_mobile_number', label: 'تلفن همراه جهت شبکه های اجتماعی', responseKey: 'on_social_network_mobile_number', placeholder: ' ', col: ' col-md-3 col-12' },
      { type: 'input', name: 'phone_number', label: 'تلفن منزل', responseKey: 'phone_number', placeholder: 'با کد شهر وارد شود', col: ' col-md-3 col-12' },
      {
        type: 'select',
        name: 'last_academic_degree',
        responseKey: 'last_academic_degree',
        placeholder: ' ',
        options: Enums.academicDegree,
        value: null,
        label: 'آخرین مقطع تحصیلی',
        col: ' col-md-3 col-12'
      },
      { type: 'input', name: 'last_academic_degree_field', label: 'رشته تحصیلی', responseKey: 'last_academic_degree_field', placeholder: ' ', col: ' col-md-3 col-12' },
      { type: 'input', name: 'last_academy_name', label: 'نام دانشگاه یا حوزه تحصیلی', responseKey: 'last_academy_name', placeholder: ' ', col: ' col-md-3 col-12' },
      {
        type: 'select',
        name: 'educational_status',
        responseKey: 'educational_status',
        placeholder: ' ',
        options: Enums.educationalStatus,
        value: null,
        label: 'وضعیت تحصیلی',
        col: ' col-md-3 col-12'
      },
      { type: 'input', name: 'birth_country', label: 'کشور محل تولد', responseKey: 'birth_country', placeholder: ' ', col: 'col-md-4 col-12' },
      { type: 'input', name: 'birth_province', label: 'استان محل تولد', responseKey: 'birth_province', placeholder: ' ', col: 'col-md-4 col-12' },
      { type: 'input', name: 'birth_city', label: 'شهر محل تولد', responseKey: 'birth_city', placeholder: ' ', col: 'col-md-4 col-12' },
      { type: 'input', name: 'living_country', label: 'کشور محل زندگی فعلی', responseKey: 'living_country', placeholder: ' ', col: 'col-md-4 col-12' },
      { type: 'input', name: 'living_abroad_province', label: 'استان محل زندگی فعلی', responseKey: 'living_province', placeholder: ' ', col: 'col-md-4 col-12' },
      { type: 'input', name: 'living_abroad_city', label: 'شهر محل زندگی فعلی', responseKey: 'living_city', placeholder: ' ', col: 'col-md-4 col-12' },
      { type: 'input', name: 'living_postal_code', label: 'کد پستی محل زندگی', responseKey: 'living_postal_code', placeholder: ' ', col: ' col-md-3 col-12' },
      { type: 'input', name: 'living_address', label: 'آدرس پستی محل زندگی', responseKey: 'living_address', placeholder: ' ', col: 'col-md-9 col-12' },
      { type: 'hidden', name: 'id', responseKey: 'id' }
    ]
  }),
  mounted () {
    this.mounted = true
  },
  methods: {
    editEntity () {
      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.$router.push({ name: 'UserPanel.ShopPaymentFromWallet' })
        })
        .catch(() => {})
    },
    afterLoadInputData () {
      this.checkNationalCode()
    },
    checkNationalCode () {
      if (FormBuilderAssist.getInputsByName(this.inputs, 'national_code')?.value) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'national_code', 'disable', true)
      }
    },
    openRulesDialog () {
      this.rulesDialog = true
    },
    getHoldingType (type) {
      const target = Enums.classroomHoldingTypes.find(item => item.value === type)
      if (target) {
        return target.label
      }
      return '-'
    },
    getAudienceGenderType (type) {
      const target = Enums.genders.find(item => item.value === type)
      if (target) {
        return target.label
      }
      return '-'
    },
    getTime (time) {
      return ShamsiDate.getDateTime(time)
    },
    getTerm (classroom) {
      if (!classroom.beginning_registration_period) {
        return '-'
      }
      return ShamsiDate.getTerm(classroom.beginning_registration_period)
    },
    getClassrooms () {
      this.loading = true
      APIGateway.classroom.get(this.$route.params.id)
        .then(classroom => {
          this.classroom = new Classroom(classroom)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.complete-info {
  .complete-info-top-banner {
    margin-top: 50px;
    margin-bottom: 42px;
  }
  .complete-info-steps-card {
    background-color: #F5F5F5;
    padding: 35px 0;
    border-radius: 8px;
    display: flex;
    flex-flow: row;
    justify-content: center;
    margin-bottom: 44px;
    .complete-info-step {
      display: flex;
      flex-flow: row;
      position: relative;
      width: 20%;
      &:first-child {
        .title {
          color: #5B7A5F;
        }
      }
      &:after {
        content: ' ';
        position: absolute;
        left: 0;
        top: 10px;
        width: 95%;
        border-top: dotted 2px #5B7A5F;
        z-index: 1;
      }
      &:last-child {
        &:after {
          width: 0;
        }
        .title {
          color: #BCBCBC;
        }
      }
      .title {
        position: relative;
        background-color: #F5F5F5;
        z-index: 2;
        padding-right: 24px;
      }
      svg {
        width: 17px;
        position: relative;
        background-color: #F5F5F5;
        z-index: 2;
        padding-right: 8px;
      }
    }
  }
  .complete-info-form-banner {
    margin-bottom: 26px;
  }
  .complete-info-form-card {
    background-color: #F5F5F5;
    padding: 50px 30px;
    border-radius: 8px;
    &:deep {
      .q-card.entity-edit {
        background: transparent;
        .q-toolbar,
        & > .q-separator {
          display: none;
        }
      }
    }
  }
  .section-edit-btn {
    margin-top: 50px;
    margin-bottom: 77px;
  }
}
</style>
