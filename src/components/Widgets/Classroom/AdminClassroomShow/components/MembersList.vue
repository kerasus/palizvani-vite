<template>
  <entity-index v-if="mounted"
                ref="membersList"
                v-model:value="membersListInputs"
                title="لیست کاربران"
                :api="membersListApi"
                :table="membersListTable"
                :table-keys="membersListTableKeys"
                :show-search-button="false"
                :show-reload-button="false"
                :show-expand-button="false">
    <template #toolbar>
      <q-btn color="primary"
             :loading="exportReportLoading"
             @click="getMembersExcel">
        خروجی اکسل
      </q-btn>
    </template>
    <template #before-index-table>
      <div class="row before-index-table">
        <div class="right-side">
          <form-builder ref="formBuilder"
                        :key="enrollNewMembersInputsKey"
                        v-model:value="enrollNewMembersInputs"
                        :loading="enrollNewMembersLoading" />
        </div>
        <div class="left-side">
          <form-builder ref="formBuilder"
                        :key="registerNewMembersInputsKey"
                        v-model:value="registerNewMembersInputs"
                        :loading="registerNewMembersLoading" />
        </div>
      </div>
    </template>
    <template v-slot:entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'number'">
        {{ inputData.rowNumber }}
      </template>
      <template v-else-if="inputData.col.name === 'action'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 color="primary"
                 outline
                 class="q-mr-md"
                 :to="{ name: 'Admin.Classroom.UserClass', params: { classroom_id: classroomId, user_id: inputData.props.row.owner }}">
            سابقه آموزشی
          </q-btn>
          <q-btn v-if="inputData.props.row.status === 'DROPPED_FOR_CONDITION'"
                 color="primary"
                 class="q-mr-md"
                 :loading="revertDroppedForConditionLoading"
                 @click="revertDroppedForCondition(inputData.props.row.id)">
            بازگرداندن ثبت نام
          </q-btn>
          <q-btn v-if="inputData.props.row.status !== 'DROPPED_BY_ADMIN' && inputData.props.row.status !== 'DROPPED_BY_ITSELF'"
                 size="md"
                 color="red"
                 outline
                 label="انصراف"
                 :loading="dropClassroomByAdminLoading"
                 class="q-mr-md"
                 @click="dropClassroomByAdmin(inputData.props.row)" />
          <q-btn v-if="inputData.props.row.status === 'ENROLLED'"
                 size="md"
                 color="primary"
                 outline
                 label="ایجاد صورتحساب"
                 :loading="createInvoiceLoading"
                 class="q-mr-md"
                 @click="createInvoiceForClassroom(inputData.props.row)" />
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
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import Assist from 'src/assets/js/Assist.js'
import { Invoice } from 'src/models/Invoice.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { Registration } from 'src/models/Registration.js'
import { FormBuilder, FormBuilderAssist } from 'quasar-form-builder'
import EntityInput from 'quasar-crud/src/components/Entity/Attachment/EntityInput.vue'
import BtnControl from 'src/components/Control/btn.vue'

const EntityInputComp = shallowRef(EntityInput)
const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'MembersList',
  components: {
    EntityIndex,
    FormBuilder
  },
  props: {
    classroomId: {
      type: Number,
      default: null
    }
  },
  data () {
    const classroomId = this.classroomId
    return {
      mounted: false,

      enrollNewMembersLoading: false,
      enrollNewMembersInputsKey: Date.now(),
      enrollNewMembersInputs: [
        {
          type: EntityInputComp,
          name: 'enrollNewMembers',
          selectionMode: 'multiple',
          popUpButtonConfig: {
            label: 'پیش ثبت نام مستقیم',
            outline: true,
            buttonColor: 'deep-purple',
            buttonTextColor: 'white',
            buttonBadgeColor: 'pink'
          },
          dialogConfirmButtonConfig: {
            label: 'تایید',
            buttonColor: 'deep-purple',
            buttonTextColor: 'white',
            buttonBadgeColor: 'pink'
          },

          apiAddress: APIGateway.user.APIAdresses.unenrolledUsersInClassroom,
          tableTitle: 'لیست کل کاربران پیش ثبت نام نشده',
          showTableItemsRouteName: 'Admin.BlockManagement.Show',
          tableKeys: {
            data: 'results',
            total: 'count',
            currentPage: 'current',
            perPage: 'per_page',
            pageKey: 'page'
          },
          table: {
            columns: [
              {
                name: 'id',
                required: true,
                label: 'شناسه',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'fullname',
                required: true,
                label: 'نام و نام خانوادگی',
                align: 'left',
                field: row => row.firstname + ' ' + row.lastname
              },
              {
                name: 'national_code',
                required: true,
                label: 'کد ملی',
                align: 'left',
                field: row => row.national_code
              },
              {
                name: 'mobile_number',
                required: true,
                label: 'شماره همراه',
                align: 'left',
                field: row => row.mobile_number
              },
              {
                name: 'last_academy_name',
                required: true,
                label: 'دانشگاه',
                align: 'left',
                field: row => row.last_academy_name
              },
              {
                name: 'living_city',
                required: true,
                label: 'شهر',
                align: 'left',
                field: row => row.living_city
              }
            ]
          },
          inputs: [
            { type: 'input', name: 'id', value: null, label: 'شناسه', placeholder: ' ', col: 'col-md-4 col-12' },
            { type: 'input', name: 'national_code', value: null, label: 'کد ملی', placeholder: ' ', col: 'col-md-4 col-12' },
            { type: 'input', name: 'mobile_number', value: null, label: 'شماره همراه', placeholder: ' ', col: 'col-md-4 col-12' },
            { type: 'input', name: 'email', value: null, label: 'ایمیل', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'input', name: 'firstname', value: null, label: 'نام', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'input', name: 'lastname', value: null, label: 'نام خانوادگی', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'input', name: 'search', value: null, label: 'جست و جو', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'hidden', name: 'registered_classes__classroom__ne', value: classroomId }
          ],
          itemIndicatorKey: row => row.firstname + ' ' + row.lastname,
          // itemIndicatorKey: 'firstname',
          itemIdentifyKey: 'id',
          onConfirmed: this.onEnrollNewMembersConfirmedSelected,

          value: [],
          selected: [],
          col: 'col-md-12 col-12'
        }
      ],

      registerNewMembersLoading: false,
      registerNewMembersInputsKey: Date.now(),
      registerNewMembersInputs: [
        {
          type: EntityInputComp,
          name: 'registerNewMembers',
          selectionMode: 'multiple',
          popUpButtonConfig: {
            label: 'ثبت نام مستقیم',
            outline: true,
            buttonColor: 'deep-purple',
            buttonTextColor: 'white',
            buttonBadgeColor: 'pink'
          },
          dialogConfirmButtonConfig: {
            label: 'تایید',
            buttonColor: 'deep-purple',
            buttonTextColor: 'white',
            buttonBadgeColor: 'pink'
          },

          apiAddress: APIGateway.user.APIAdresses.unregisteredUsersInClassroom,
          tableTitle: 'لیست کل کاربران ثبت نام نشده',
          showTableItemsRouteName: 'Admin.BlockManagement.Show',
          tableKeys: {
            data: 'results',
            total: 'count',
            currentPage: 'current',
            perPage: 'per_page',
            pageKey: 'page'
          },
          table: {
            columns: [
              {
                name: 'id',
                required: true,
                label: 'شناسه',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'fullname',
                required: true,
                label: 'نام و نام خانوادگی',
                align: 'left',
                field: row => row.firstname + ' ' + row.lastname
              },
              {
                name: 'national_code',
                required: true,
                label: 'کد ملی',
                align: 'left',
                field: row => row.national_code
              },
              {
                name: 'mobile_number',
                required: true,
                label: 'شماره همراه',
                align: 'left',
                field: row => row.mobile_number
              },
              {
                name: 'last_academy_name',
                required: true,
                label: 'دانشگاه',
                align: 'left',
                field: row => row.last_academy_name
              },
              {
                name: 'living_city',
                required: true,
                label: 'شهر',
                align: 'left',
                field: row => row.living_city
              }
            ]
          },
          inputs: [
            { type: 'input', name: 'id', value: null, label: 'شناسه', placeholder: ' ', col: 'col-md-4 col-12' },
            { type: 'input', name: 'national_code', value: null, label: 'کد ملی', placeholder: ' ', col: 'col-md-4 col-12' },
            { type: 'input', name: 'mobile_number', value: null, label: 'شماره همراه', placeholder: ' ', col: 'col-md-4 col-12' },
            { type: 'input', name: 'email', value: null, label: 'ایمیل', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'input', name: 'firstname', value: null, label: 'نام', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'input', name: 'lastname', value: null, label: 'نام خانوادگی', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'input', name: 'search', value: null, label: 'جست و جو', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'hidden', name: 'registered_classes__classroom__ne', value: classroomId }
          ],
          itemIndicatorKey: row => row.firstname + ' ' + row.lastname,
          // itemIndicatorKey: 'firstname',
          itemIdentifyKey: 'id',
          onConfirmed: this.onRegisterNewMembersConfirmedSelected,

          value: [],
          selected: [],
          col: 'col-md-12 col-12'
        }
      ],

      createInvoiceLoading: false,
      classroom: new Classroom(),

      dropClassroomByAdminLoading: false,
      exportReportLoading: false,
      membersListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId },
        { type: 'input', name: 'owner__national_code', label: 'کد ملی', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'select', name: 'status', options: (new Registration()).statusEnums, label: 'وضعیت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'select', name: 'invoice__status', options: (new Invoice()).statusEnums, label: 'نوع صورتحساب', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
      ],
      membersListApi: APIGateway.classroom.APIAdresses.members,
      membersListTable: {
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
            name: 'owner_info.fullname',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'owner_info.national_code',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.owner_info.national_code
          },
          {
            name: 'owner_info.mobile_number',
            required: true,
            label: 'تلفن همراه',
            align: 'left',
            field: row => row.owner_info.mobile_number
          },
          {
            name: 'owner_info.email',
            required: true,
            label: 'ایمیل',
            align: 'left',
            field: row => row.owner_info.email
          },
          {
            name: 'UserRegisterStatus',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Registration(row)).status_info.label
          },
          {
            name: 'action',
            required: true,
            label: ' ',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      membersListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

      revertDroppedForConditionLoading: false
    }
  },
  mounted () {
    this.setMembersListActionBtn()
    this.mounted = true
  },
  methods: {
    revertDroppedForCondition (id) {
      this.revertDroppedForConditionLoading = true
      APIGateway.registration.revertDroppedForCondition(id)
        .then(() => {
          this.revertDroppedForConditionLoading = false
          this.searchMembersList()
        })
        .catch(() => {
          this.revertDroppedForConditionLoading = false
          this.searchMembersList()
        })
    },
    setMembersListActionBtn () {
      FormBuilderAssist.setAttributeByName(this.membersListInputs, 'btn', 'atClick', this.searchMembersList)
    },
    searchMembersList () {
      this.$refs.membersList.search()
    },
    getMembersExcel () {
      this.exportReportLoading = true
      const status = FormBuilderAssist.getInputsByName(this.membersListInputs, 'status').value ? FormBuilderAssist.getInputsByName(this.membersListInputs, 'status').value : null
      const ownerNationalCode = FormBuilderAssist.getInputsByName(this.membersListInputs, 'owner__national_code').value ? FormBuilderAssist.getInputsByName(this.membersListInputs, 'owner__national_code').value : null
      const invoiceStatus = FormBuilderAssist.getInputsByName(this.membersListInputs, 'invoice__status').value ? FormBuilderAssist.getInputsByName(this.membersListInputs, 'invoice__status').value : null
      APIGateway.registration.exportReport({
        classroom: this.$route.params.id,
        type: 'users',
        invoice__status: invoiceStatus,
        owner__national_code: ownerNationalCode,
        status
      })
        .then((xlsxData) => {
          Assist.saveXlsx(xlsxData, this.classroom.title)
          this.exportReportLoading = false
        })
        .catch((e) => {
          this.exportReportLoading = false
        })
    },
    onRegisterNewMembersConfirmedSelected (data) {
      const owners = data.map(item => item.id)
      this.registerNewMembersLoading = true
      APIGateway.classroom.registerNewMembers({ classroomId: this.classroomId, owners })
        .then(() => {
          this.$refs.membersList.search()
          this.registerNewMembersLoading = false
        })
        .catch(() => {
          this.registerNewMembersLoading = false
        })
    },
    onEnrollNewMembersConfirmedSelected (data) {
      const owners = data.map(item => item.id)
      this.enrollNewMembersLoading = true
      APIGateway.classroom.enrollNewMembers({ classroomId: this.classroomId, owners })
        .then(() => {
          this.$refs.membersList.search()
          this.enrollNewMembersInputsKey = Date.now()
          this.enrollNewMembersLoading = false
        })
        .catch(() => {
          this.enrollNewMembersLoading = false
        })
    },
    dropClassroomByAdmin (row) {
      const classroomId = row.classroom
      const userId = row.owner
      const message = 'آیا از انصراف (' + row.owner_info.firstname + ' ' + row.owner_info.lastname + ') اطمینان دارید؟'
      this.$q.dialog({
        title: 'توجه',
        message,
        html: true,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.dropClassroomByAdminLoading = true
        APIGateway.classroom.dropByAdmin(classroomId, userId)
          .then(() => {
            this.dropClassroomByAdminLoading = false
            this.searchMembersList()
          })
          .catch(() => {
            this.dropClassroomByAdminLoading = false
          })
      })
    },
    createInvoiceForClassroom (row) {
      const classroomId = row.classroom
      const userId = row.owner
      this.createInvoiceLoading = true
      APIGateway.classroom.createInvoiceByAdmin(classroomId, userId)
        .then((invoice) => {
          this.$router.push({ name: 'Admin.Invoice.Show', params: { id: invoice.id } })
          this.createInvoiceLoading = false
        })
        .catch(() => {
          this.createInvoiceLoading = false
        })
    }
  }
}
</script>
<style lang="scss">
.before-index-table {
  display: flex;
  justify-content: flex-end;
  margin-right: 8px;
  margin-bottom: 8px;
}
.right-side {
  margin-right: 4px;
}

.left-side {

}
</style>
