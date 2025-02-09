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
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'MembersList',
  components: {
    EntityIndex
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
