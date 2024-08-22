<template>
  <div class="AdminTicketList"
       :style="localOptions.style">
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست درخواست ها"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :to="getShowRoute(inputData.props.row.id)">
            مشاهده جزییات
          </q-btn>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import Assist from 'assets/js/Assist.js'
import { EntityIndex } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { TicketCategory, TicketCategoryList } from 'src/models/TicketCategory.js'
import FormBuilderDateTime from 'src/components/FormBuilderCustumComponents/FormBuilderDateTime.vue'

const BtnControlComp = shallowRef(BtnControl)
const FormBuilderDateTimeComp = shallowRef(FormBuilderDateTime)

export default {
  name: 'AdminTicketList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.ticket.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        {
          type: FormBuilderDateTimeComp,
          name: 'creation_time__gte',
          outsideLabel: 'از تاریخ',
          col: 'col-md-4 col-12'
        },
        {
          type: FormBuilderDateTimeComp,
          name: 'creation_time__lt',
          outsideLabel: 'تا تاریخ',
          col: 'col-md-4 col-12'
        },
        { type: 'input', name: 'owner__national_code', label: 'کدملی', placeholder: ' ', col: 'col-md-4 col-12' },

        // {
        //   type: 'select',
        //   name: 'source_type',
        //   responseKey: 'source_type',
        //   placeholder: ' ',
        //   options: [
        //     { label: ' ', value: null },
        //     { label: 'مالی', value: 'INVOICE' },
        //     { label: 'آموزش', value: 'TRAINING_CLASSROOM' },
        //     { label: 'حلقه های مباحثاتی', value: 'DISCUSSION_CIRCLE_CLASSROOM' },
        //     { label: 'محتوا', value: 'CONTENT' },
        //     { label: 'SESSION', value: 'SESSION' }
        //   ],
        //   label: 'مرجع',
        //   value: null,
        //   col: 'col-md-3 col-12'
        // },
        {
          type: 'select',
          name: 'category__type',
          responseKey: 'category__type',
          placeholder: ' ',
          options: (new TicketCategory()).typeEnums,
          label: 'معاونت',
          value: null,
          col: 'col-md-4 col-12'
        },
        { type: 'select', name: 'category', responseKey: 'category', placeholder: ' ', options: [], label: 'دسته', col: 'col-md-4 col-12' },
        { type: 'select', name: 'status', responseKey: 'status', placeholder: ' ', options: (new Ticket()).statusEnums, label: 'وضعیت', col: 'col-md-4 col-12' },

        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' },
        // { type: 'hidden', name: 'source_type', value: null },
        // { type: 'space', name: 'space', value: null, col: 'col-12' },
        { type: 'space', name: 'space', value: null, col: 'col-md-8 col-12' },
        { type: 'select', name: 'per_page', responseKey: 'per_page', placeholder: ' ', options: [10, 25, 50], value: 10, label: 'تعداد در صفحه', col: 'col-md-2 col-12' }
      ],
      table: {
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
            name: 'category_info__title',
            required: true,
            label: 'دسته',
            align: 'left',
            field: row => row.category_info.title
          },
          {
            name: 'title',
            required: true,
            label: 'موضوع پیام',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'sender',
            required: true,
            label: 'فرستنده',
            align: 'left',
            field: row => row.creator_info.firstname + ' ' + row.creator_info.lastname
          },
          {
            name: 'national_code',
            required: true,
            label: 'کد ملی فرستنده',
            align: 'left',
            field: row => row.creator_info.national_code
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Ticket(row)).status_info.label
          },
          {
            name: 'last_modification_time',
            required: true,
            label: 'زمان آخرین تغییرات',
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
      mounted: false,
      ticketCategoryList: new TicketCategoryList()
    }
  },
  computed: {
    selectedPerPage () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'per_page')?.value
    },
    selectedSourceType () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'category__type')?.value
    },
    selectedTicketCategoryType () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'category__type')?.value
    }
  },
  watch: {
    selectedPerPage () {
      this.search()
    },
    // selectedSourceType () {
    //   this.loadCategories()
    // },
    selectedTicketCategoryType () {
      this.loadCategories()
    }
  },
  mounted() {
    this.loadOptions()
    this.setActionBtn()
    this.checkSource()
    this.$nextTick(() => {
      this.mounted = true
    })
  },
  methods: {
    checkSource () {
      // if (this.localOptions.defaultSourceType) {
      //   // FormBuilderAssist.setAttributeByName(this.inputs, 'source_type', 'value', this.localOptions.defaultSourceType)
      //   FormBuilderAssist.setAttributeByName(this.inputs, 'category__type', 'value', this.getCategoryTypeFromSourceType())
      // }

      if (this.localOptions.defaultCategoryType) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'category__type', 'readonly', true)
        FormBuilderAssist.setAttributeByName(this.inputs, 'category__type', 'value', this.localOptions.defaultCategoryType)
      } else {
        FormBuilderAssist.setAttributeByName(this.inputs, 'category__type', 'type', 'select')
        FormBuilderAssist.setAttributeByName(this.inputs, 'category__type', 'label', 'معاونت')
        FormBuilderAssist.setAttributeByName(this.inputs, 'category__type', 'placeholder', ' ')
        FormBuilderAssist.setAttributeByName(this.inputs, 'category__type', 'options', (new TicketCategory()).typeEnums)
      }
    },
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.search)
    },
    loadOptions () {
      return this.loadCategories()
    },
    getShowRoute (ticketId) {
      const defaultSourceType = this.localOptions.defaultSourceType
      if (!defaultSourceType) {
        return { name: 'Admin.Ticket.Show', params: { id: ticketId } }
      }

      if (defaultSourceType === 'INVOICE') {
        return { name: 'Admin.Invoice.Ticket.Show', params: { id: ticketId } }
      } else if (defaultSourceType === 'TRAINING_CLASSROOM') {
        return { name: 'Admin.Ticket.Show', params: { id: ticketId } }
      } else if (defaultSourceType === 'DISCUSSION_CIRCLE_CLASSROOM') {
        return { name: 'Admin.Ticket.Show', params: { id: ticketId } }
      } else if (defaultSourceType === 'CONTENT') {
        return { name: 'Admin.Ticket.Show', params: { id: ticketId } }
      } else {
        return { name: 'Admin.Ticket.Show', params: { id: ticketId } }
      }
    },
    getCategoryTypeFromSourceType () {
      const defaultSourceType = this.localOptions.defaultSourceType
      return (new TicketCategory()).getCategoryTypeFromSourceType(defaultSourceType)
    },
    loadCategories () {
      return new Promise((resolve, reject) => {
        // const type = this.localOptions.defaultCategoryType ? this.localOptions.defaultCategoryType : (new TicketCategory()).getCategoryTypeFromSourceType(this.selectedSourceType)
        const type = this.selectedTicketCategoryType

        APIGateway.ticketCategory.index({ type })
          .then(({ list }) => {
            FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'options', list.list.map(item => {
              return {
                value: item.id,
                label: item.title
              }
            }))
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    search () {
      this.$refs.entityIndex.search()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminTicketList {
}
</style>
