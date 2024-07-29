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
          <q-btn v-if="inputData.props.row.status !== 'DROPPED_BY_ADMIN' && inputData.props.row.status !== 'DROPPED_BY_ITSELF'"
                 size="md"
                 color="red"
                 outline
                 label="انصراف"
                 :loading="dropEventByAdminLoading"
                 class="q-mr-md"
                 @click="dropEventByAdmin(inputData.props.row)" />
          <q-btn v-if="inputData.props.row.status === 'ENROLLED'"
                 size="md"
                 color="primary"
                 outline
                 label="ایجاد صورتحساب"
                 :loading="createInvoiceLoading"
                 class="q-mr-md"
                 @click="createInvoiceForEvent(inputData.props.row)" />
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
import { Event } from 'src/models/Event.js'
import Assist from 'src/assets/js/Assist.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'MembersList',
  components: {
    EntityIndex
  },
  props: {
    eventId: {
      type: Number,
      default: null
    }
  },
  data () {
    const eventId = this.eventId
    return {
      mounted: false,
      createInvoiceLoading: false,
      event: new Event(),

      dropEventByAdminLoading: false,
      exportReportLoading: false,
      membersListInputs: [
        { type: 'hidden', name: 'event', value: eventId },
        { type: 'select', name: 'status', options: [{ label: 'پیش ثبت نام شده', value: 'ENROLLED' }, { label: 'ثبت نام شده', value: 'REGISTERED' }, { label: 'حذف توسط اندیشه جو', value: 'DROPPED_BY_ITSELF' }, { label: 'حذف توسط ادمین', value: 'DROPPED_BY_ADMIN' } , { label: 'حذف سیستمی (شرایط غیر مجاز)', value: 'DROPPED_FOR_CONDITION' }, { label: 'حذف به دلیل عدم نهایی سازی', value: 'DROPPED_FOR_NOT_FINALIZING' }], label: 'وضعیت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'select', name: 'invoice__status', options: [{ label: 'پرداخت کامل', value: 'PAID_FULL' }, { label: 'پرداخت قسطی', value: 'PAYING_IN_INSTALMENT' }], label: 'نوع صورتحساب', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
      ],
      membersListApi: APIGateway.event.APIAdresses.members,
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
            name: 'owner_info.email',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Event()).getUserRegisterInfoLabel(row.status)
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
      }
    }
  },
  mounted () {
    this.setMembersListActionBtn()
    this.mounted = true
  },
  methods: {
    setMembersListActionBtn () {
      FormBuilderAssist.setAttributeByName(this.membersListInputs, 'btn', 'atClick', this.searchMembersList)
    },
    searchMembersList () {
      this.$refs.membersList.search()
    },
    getMembersExcel () {
      this.exportReportLoading = true
      const status = FormBuilderAssist.getInputsByName(this.membersListInputs, 'status').value ? FormBuilderAssist.getInputsByName(this.membersListInputs, 'status').value : null
      APIGateway.eventRegistration.exportReport({
        event: this.$route.params.id,
        type: 'users',
        status
      })
        .then((xlsxData) => {
          Assist.saveXlsx(xlsxData, this.event.title)
          this.exportReportLoading = false
        })
        .catch((e) => {
          this.exportReportLoading = false
        })
    },
    dropEventByAdmin (row) {
      const eventId = row.event
      const userId = row.owner
      const message = 'آیا از انصراف (' + row.owner_info.firstname + ' ' + row.owner_info.lastname + ') اطمینان دارید؟'
      this.$q.dialog({
        title: 'توجه',
        message,
        html: true,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.dropEventByAdminLoading = true
        APIGateway.event.dropByAdmin(eventId, userId)
          .then(() => {
            this.dropEventByAdminLoading = false
            this.searchMembersList()
          })
          .catch(() => {
            this.dropEventByAdminLoading = false
          })
      })
    },
    createInvoiceForEvent (row) {
      const eventId = row.event
      const userId = row.owner
      this.createInvoiceLoading = true
      APIGateway.event.createInvoiceByAdmin(eventId, userId)
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
