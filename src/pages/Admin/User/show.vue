<template>
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
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
      <q-tab name="financial"
             label="سوابق مالی" />
      <!--      <q-tab name="movies2"-->
      <!--             label="سوابق دوره های مباحثاتی" />-->
      <q-tab name="events"
             label="سوابق رویدادها" />
      <!--      <q-tab name="movies4"-->
      <!--             label="سوابق باشگاه اندیشه جویان" />-->
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
        <entity-index v-if="mounted"
                      ref="registrationsList"
                      v-model:value="registrationsListInputs"
                      title="لیست دوره ها"
                      :api="registrationsListApi"
                      :table="registrationsListTable"
                      :table-keys="registrationsListTableKeys"
                      :show-search-button="false"
                      :show-reload-button="false"
                      :show-expand-button="false">
          <template v-slot:entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'number'">
              {{ inputData.rowNumber }}
            </template>
            <template v-else-if="inputData.col.name === 'action'">
              <div class="action-column-entity-index">
                <q-btn color="primary"
                       :to="{name: 'Admin.Classroom.UserClass', params: {user_id: $route.params.id, classroom_id: inputData.props.row.classroom_info.id}}"
                       label="جزییات" />
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

      <q-tab-panel name="financial"
                   class="q-pa-none">
        <q-tabs v-model="financialTab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator>
          <q-tab name="invoiceList"
                 label="صورتحساب ها" />
          <q-tab name="paymentList"
                 label="پرداخت ها" />
          <q-tab name="transactionList"
                 label="تراکنش ها" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="financialTab"
                      animated>
          <q-tab-panel name="invoiceList"
                       class="q-pa-none">
            <entity-index v-if="mounted"
                          ref="invoiceList"
                          v-model:value="invoiceListInputs"
                          title="لیست صورتحساب ها"
                          :api="invoiceListApi"
                          :table="invoiceListTable"
                          :table-keys="invoiceListTableKeys"
                          :show-search-button="false"
                          :show-reload-button="false"
                          :show-expand-button="false">
              <template v-slot:entity-index-table-cell="{inputData}">
                <template v-if="inputData.col.name === 'number'">
                  {{ inputData.rowNumber }}
                </template>
                <template v-else-if="inputData.col.name === 'action'">
                  <div class="action-column-entity-index">
                    <q-btn color="primary"
                           label="جزییات"
                           :to="{name: 'Admin.Invoice.Show', params: {id: inputData.props.row.id}}" />
                  </div>
                </template>
                <template v-else>
                  {{ inputData.col.value }}
                </template>
              </template>
            </entity-index>
          </q-tab-panel>
          <q-tab-panel name="paymentList"
                       class="q-pa-none">
            <entity-index v-if="mounted"
                          ref="paymentList"
                          v-model:value="paymentListInputs"
                          title="لیست پرداخت ها"
                          :api="paymentListApi"
                          :table="paymentListTable"
                          :table-keys="paymentListTableKeys"
                          :show-search-button="false"
                          :show-reload-button="false"
                          :show-expand-button="false">
              <template v-slot:entity-index-table-cell="{inputData}">
                <template v-if="inputData.col.name === 'number'">
                  {{ inputData.rowNumber }}
                </template>
                <template v-else-if="inputData.col.name === 'action'">
                  <div class="action-column-entity-index">
                    <q-btn color="primary"
                           :to="{ name: 'Admin.Payment.Show', params: { id: inputData.props.row.id } }"
                           label="جزییات" />
                  </div>
                </template>
                <template v-else>
                  {{ inputData.col.value }}
                </template>
              </template>
            </entity-index>
          </q-tab-panel>
          <q-tab-panel name="transactionList"
                       class="q-pa-none">
            <entity-index v-if="mounted"
                          ref="transactionList"
                          v-model:value="transactionListInputs"
                          title="لیست تراکنش ها"
                          :api="transactionListApi"
                          :table="transactionListTable"
                          :table-keys="transactionListTableKeys"
                          :show-search-button="false"
                          :show-reload-button="false"
                          :show-expand-button="false">
              <template v-slot:entity-index-table-cell="{inputData}">
                <template v-if="inputData.col.name === 'number'">
                  {{ inputData.rowNumber }}
                </template>
                <template v-else-if="inputData.col.name === 'action'">
                  <div class="action-column-entity-index">
                    <q-btn color="primary"
                           :to="{ name: 'Admin.Transaction.Show', params: { id: inputData.props.row.id } }"
                           label="جزییات" />
                  </div>
                </template>
                <template v-else>
                  {{ inputData.col.value }}
                </template>
              </template>
            </entity-index>
          </q-tab-panel>
        </q-tab-panels>
      </q-tab-panel>
      <!--      <q-tab-panel name="movies2">-->
      <!--        سوابق باشگاه اندیشه جویان-->
      <!--      </q-tab-panel>-->
      <q-tab-panel name="events">
        <entity-index v-if="mounted"
                      ref="eventRegistrationsList"
                      v-model:value="eventRegistrationsListInputs"
                      title="لیست رویداد ها"
                      :api="eventRegistrationsListApi"
                      :table="eventRegistrationsListTable"
                      :table-keys="eventRegistrationsListTableKeys"
                      :show-search-button="false"
                      :show-reload-button="false"
                      :show-expand-button="false">
          <template v-slot:entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'number'">
              {{ inputData.rowNumber }}
            </template>
            <template v-else-if="inputData.col.name === 'action'">
              <div class="action-column-entity-index">
                <q-btn color="primary"
                       :to="{name: 'Admin.Classroom.UserClass', params: {user_id: $route.params.id, classroom_id: inputData.props.row.classroom_info.id}}"
                       label="جزییات" />
              </div>
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </template>
        </entity-index>
      </q-tab-panel>
      <!--      <q-tab-panel name="movies4">-->
      <!--        سوابق باشگاه اندیشه جویان-->
      <!--      </q-tab-panel>-->
      <q-tab-panel name="movies5">
        درخواست مدرک و گواهی
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import Assist from 'assets/js/Assist.js'
import Enums from 'src/assets/Enums/Enums.js'
import { Invoice } from 'src/models/Invoice.js'
import { Payment } from 'src/models/Payment.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { EntityEdit, EntityIndex } from 'quasar-crud'
import { Transaction } from 'src/models/Transaction.js'
import { Registration } from 'src/models/Registration.js'
import { Provinces, Cities, getCitiesOfProvince } from 'src/assets/js/IranianCities.js'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'Admin.User.Show',
  components: { EntityEdit, EntityIndex },
  data () {
    const userId = this.$route.params.id
    return {
      tab: 'userInfo',
      financialTab: 'invoiceList',
      inputDataLoaded: false,
      api: APIGateway.user.APIAdresses.byId(userId),
      mounted: false,
      entityIdKey: 'id',
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
        { type: 'input', name: 'mobile_number', placeholder: ' ', label: 'تلفن همراه', responseKey: 'mobile_number', col: 'col-md-3 col-12' },
        { type: 'optionGroupRadio', name: 'is_valid_national_code', responseKey: 'is_valid_national_code', label: 'اتباع خارجی', options: [{ label: 'نیست', value: true }, { label: 'هست', value: false }], value: true, col: 'col-md-3 col-12' },
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
        { type: 'date', name: 'birthdate', outsideLabel: 'تولد', responseKey: 'birthdate', col: 'col-md-3 col-12' },
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

        { type: 'checkbox', name: 'is_abroad_birth_address', placeholder: ' ', label: 'محل تولد خارج از کشور است؟', responseKey: 'is_abroad_birth_address', className: 'require', col: 'col-12' },
        { type: 'input', name: 'birth_country', placeholder: ' ', label: 'کشور محل تولد', responseKey: 'birth_country', col: 'col-md-4 col-12' },
        {
          type: 'select',
          name: 'birth_province',
          options: Provinces,
          optionLabel: 'name',
          optionValue: 'name',
          createNewValue: true,
          newValueMode: 'add-unique',
          placeholder: ' ',
          label: 'استان محل تولد',
          responseKey: 'birth_province',
          col: 'col-md-4 col-12'
        },
        {
          type: 'select',
          name: 'birth_city',
          options: Cities,
          optionLabel: 'name',
          optionValue: 'name',
          createNewValue: true,
          newValueMode: 'add-unique',
          placeholder: ' ',
          label: 'شهر محل تولد',
          responseKey: 'birth_city',
          col: 'col-md-4 col-12'
        },

        { type: 'checkbox', name: 'is_abroad_living_address', placeholder: ' ', label: 'محل زندگی فعلی خارج از کشور است؟', responseKey: 'is_abroad_living_address', className: 'require', col: 'col-12' },
        { type: 'input', name: 'living_country', placeholder: ' ', label: 'کشور محل زندگی فعلی', responseKey: 'living_country', col: 'col-md-4 col-12' },
        {
          type: 'select',
          name: 'living_province',
          options: Provinces,
          optionLabel: 'name',
          optionValue: 'name',
          createNewValue: true,
          newValueMode: 'add-unique',
          placeholder: ' ',
          label: 'استان محل زندگی فعلی',
          responseKey: 'living_province',
          col: 'col-md-4 col-12'
        },
        {
          type: 'select',
          name: 'living_city',
          options: Cities,
          optionLabel: 'name',
          optionValue: 'name',
          createNewValue: true,
          newValueMode: 'add-unique',
          placeholder: ' ',
          label: 'شهر محل زندگی فعلی',
          responseKey: 'living_city',
          col: 'col-md-4 col-12'
        },
        { type: 'input', name: 'living_postal_code', placeholder: ' ', label: 'کد پستی محل زندگی', responseKey: 'living_postal_code', col: 'col-md-3 col-12' },
        { type: 'input', name: 'living_address', placeholder: ' ', label: 'آدرس پستی محل زندگی', responseKey: 'living_address', col: 'col-md-6 col-12' },

        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-12' },
        { type: 'hidden', name: 'is_active', responseKey: 'is_active', label: 'is_active', col: 'col-12' }
      ],

      registrationsListInputs: [
        { type: 'hidden', name: 'owner', value: userId },
        { type: 'hidden', name: 'classroom__unit__category__type', value: 'TRAINING' }
      ],
      registrationsListApi: APIGateway.registration.APIAdresses.base,
      registrationsListTable: {
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
            name: 'classroom_info.unit_info.title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.classroom_info.title
          },
          {
            name: 'classroom_info.holding_type_info.label',
            required: true,
            label: 'نوع برگزاری',
            align: 'left',
            field: row => (new Classroom(row.classroom_info)).holding_type_info.label
          },
          {
            name: 'classroom_info.professor_info',
            required: true,
            label: 'استاد',
            align: 'left',
            field: row => row.classroom_info.professor_info.firstname + ' ' + row.classroom_info.professor_info.lastname
          },
          {
            name: 'classroom_info.sessions_info.length',
            required: true,
            label: 'تعداد جلسات',
            align: 'left',
            field: row => row.classroom_info?.sessions_info?.length
          },
          {
            name: 'id',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Registration(row)).status_info.label
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان ثبت نام',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'id',
            required: true,
            label: 'وضعیت مالی',
            align: 'left',
            field: row => (new Invoice(row.invoice_info)).status_info.label
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      registrationsListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      eventRegistrationsListInputs: [
        { type: 'hidden', name: 'owner', value: userId },
        { type: 'hidden', name: 'classroom__unit__category__type', value: 'EVENT' }
      ],
      eventRegistrationsListApi: APIGateway.registration.APIAdresses.base,
      eventRegistrationsListTable: {
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
            name: 'classroom_info.unit_info.title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.classroom_info.title
          },
          {
            name: 'classroom_info.professor_info',
            required: true,
            label: 'استاد',
            align: 'left',
            field: row => row.classroom_info.professor_info.firstname + ' ' + row.classroom_info.professor_info.lastname
          },
          {
            name: 'classroom_info.sessions_info.length',
            required: true,
            label: 'تعداد جلسات',
            align: 'left',
            field: row => row.classroom_info?.sessions_info?.length
          },
          {
            name: 'id',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Registration(row)).status_info.label
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان ثبت نام',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'id',
            required: true,
            label: 'وضعیت مالی',
            align: 'left',
            field: row => (new Invoice(row.invoice_info)).status_info.label
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      eventRegistrationsListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      registrationsActivitySheetListInputs: [
        { type: 'hidden', name: 'owner', value: userId }
      ],
      registrationsActivitySheetListApi: APIGateway.classroom.APIAdresses.activitySheet,
      registrationsActivitySheetListTable: {
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
            name: 'classroom_info.item_type_info',
            required: true,
            label: 'نوع',
            align: 'left',
            field: row => (new Classroom(row.classroom_info)).item_type_info.label
          },
          {
            name: 'classroom_info.unit_info.title',
            required: true,
            label: 'نام درس',
            align: 'left',
            field: row => row.classroom_info?.unit_info?.title
          },
          {
            name: 'classroom_infoaudience_gender_type_info',
            required: true,
            label: 'جنسیت',
            align: 'left',
            field: row => (new Classroom(row.classroom_info)).audience_gender_type_info.label
          },
          {
            name: 'holding_time',
            required: true,
            label: 'تاریخ شروع',
            align: 'left',
            field: row => row.classroom_info?.holding_month + ' ' + row.classroom_info?.holding_year
          },
          {
            name: 'classroom_info.holding_type_info.label',
            required: true,
            label: 'نوع برگزاری',
            align: 'left',
            field: row => (new Classroom(row.classroom_info)).holding_type_info.label
          },
          {
            name: 'classroom_info.professor_info',
            required: true,
            label: 'استاد',
            align: 'left',
            field: row => row.classroom_info?.professor_info?.firstname + ' ' + row.classroom_info?.professor_info?.lastname
          },
          {
            name: 'classroom_info.sessions_info.length',
            required: true,
            label: 'تعداد جلسات',
            align: 'left',
            field: row => row.classroom_info?.sessions_info ? row.classroom_info.sessions_info.length : '-'
          },
          {
            name: 'id',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Registration(row)).status_info.label
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان ثبت نام',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'id',
            required: true,
            label: 'وضعیت مالی',
            align: 'left',
            field: row => (new Invoice(row.invoice_info)).status_info.label
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      registrationsActivitySheetListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      invoiceListInputs: [
        { type: 'hidden', name: 'owner', value: userId }
      ],
      invoiceListApi: APIGateway.invoice.APIAdresses.base,
      invoiceListTable: {
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
            name: 'id',
            required: true,
            label: 'سفارش دهنده',
            align: 'left',
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'id',
            required: true,
            label: 'کدملی سفارش دهنده',
            align: 'left',
            field: row => row.owner_info.national_code
          },
          {
            name: 'id',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'amount',
            required: true,
            label: 'مبلغ تراکنش(ریال)',
            align: 'left',
            field: row => row.amount.toLocaleString('fa')
          },
          {
            name: 'id',
            required: true,
            label: 'وضعیت تراکنش',
            align: 'left',
            field: row => (new Invoice(row)).status_info.label
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان ثبت',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'last_modification_time',
            required: true,
            label: 'زمان آخرین بروز رسانی',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.last_modification_time)
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: row => ''
          }
        ]
      },
      invoiceListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      paymentListInputs: [
        { type: 'hidden', name: 'owner', value: userId }
      ],
      paymentListApi: APIGateway.payment.APIAdresses.base,
      paymentListTable: {
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
            name: 'invoice_info.title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.invoice_info?.title
          },
          {
            name: 'type',
            required: true,
            label: 'نوع تراکنش',
            align: 'left',
            field: row => (new Payment(row)).type_info.label
          },
          {
            name: 'invoice_info.status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Invoice(row.invoice_info)).status_info.label
          },
          {
            name: 'amount',
            required: true,
            label: 'مبلغ تراکنش (ریال)',
            align: 'left',
            field: row => row.amount.toLocaleString('fa')
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: row => ''
          }
        ]
      },
      paymentListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      transactionListInputs: [
        { type: 'hidden', name: 'owner', value: userId }
      ],
      transactionListApi: APIGateway.transaction.APIAdresses.base,
      transactionListTable: {
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
            name: 'amount',
            required: true,
            label: 'مبلغ تراکنش (ریال)',
            align: 'left',
            field: row => row.amount.toLocaleString('fa')
          },
          {
            name: 'description',
            required: true,
            label: 'توضیحات',
            align: 'left',
            field: row => row.description
          },
          {
            name: 'reference_code',
            required: true,
            label: 'کد مرجع',
            align: 'left',
            field: row => row.reference_code
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Transaction(row)).status_info.label
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: row => ''
          }
        ]
      },
      transactionListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  computed: {
    isAbroadBirthAddress () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'is_abroad_birth_address').value
    },
    isAbroadLivingAddress () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'is_abroad_living_address').value
    },
    selectedBirthProvince () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'birth_province').value
    },
    selectedLivingProvince () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'living_province').value
    }
  },
  watch: {
    isAbroadBirthAddress (newValue) {
      if (!newValue) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'birth_country', 'value', 'ایران')
        FormBuilderAssist.setAttributeByName(this.inputs, 'birth_country', 'disable', true)
        if (this.inputDataLoaded) {
          // province
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_province', 'type', 'select')
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_province', 'disable', false)
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_province', 'value', null)
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_province', 'options', Provinces)

          // city
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'type', 'select')
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'disable', true)
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'value', null)
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'options', [])
        }
      } else {
        FormBuilderAssist.setAttributeByName(this.inputs, 'birth_country', 'value', null)
        FormBuilderAssist.setAttributeByName(this.inputs, 'birth_country', 'disable', false)

        if (this.inputDataLoaded) {
          // province
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_province', 'type', 'input')
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_province', 'disable', false)
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_province', 'value', null)

          // city
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'type', 'input')
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'disable', false)
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'value', null)
        }
      }
    },
    isAbroadLivingAddress (newValue) {
      if (!newValue) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'living_country', 'value', 'ایران')
        FormBuilderAssist.setAttributeByName(this.inputs, 'living_country', 'disable', true)
        if (this.inputDataLoaded) {
          // province
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_province', 'type', 'select')
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_province', 'disable', false)
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_province', 'value', null)
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_province', 'options', Provinces)

          // city
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'type', 'select')
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'disable', true)
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'value', null)
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'options', [])
        }
      } else {
        FormBuilderAssist.setAttributeByName(this.inputs, 'living_country', 'value', null)
        FormBuilderAssist.setAttributeByName(this.inputs, 'living_country', 'disable', false)
        if (this.inputDataLoaded) {
          // province
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_province', 'type', 'input')
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_province', 'disable', false)
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_province', 'value', null)

          // city
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'type', 'input')
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'disable', false)
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'value', null)
        }
      }
    },
    selectedBirthProvince (newValue) {
      if (this.isAbroadBirthAddress) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'type', 'input')
        FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'disable', false)
        return
      }

      if (!newValue) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'disable', true)
        if (this.inputDataLoaded) {
          FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'value', null)
        }
        return
      }

      const filteredCities = getCitiesOfProvince(this.selectedBirthProvince)

      FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'options', filteredCities)
      FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'disable', false)
      if (this.inputDataLoaded) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'birth_city', 'value', null)
      }
    },
    selectedLivingProvince (newValue) {
      if (this.isAbroadBirthAddress) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'type', 'input')
        FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'disable', false)
        return
      }

      if (!newValue) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'disable', true)
        if (this.inputDataLoaded) {
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'value', null)
        }
        return
      }

      const filteredCities = getCitiesOfProvince(this.selectedLivingProvince)

      FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'options', filteredCities)
      FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'disable', false)
      if (this.inputDataLoaded) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'value', null)
      }
    }
  },
  mounted () {
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
      this.$nextTick(() => {
        this.inputDataLoaded = true
      })
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
