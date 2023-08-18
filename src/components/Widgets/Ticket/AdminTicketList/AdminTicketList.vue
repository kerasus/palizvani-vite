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
        <template v-if="inputData.col.name === 'action'">
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
import { EntityIndex } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { TicketCategoryList } from 'src/models/TicketCategory.js'

const BtnControlComp = shallowRef(BtnControl)

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
        { type: 'select', name: 'category', responseKey: 'category', placeholder: ' ', options: [], label: 'دسته', col: 'col-md-4 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' },
        { type: 'hidden', name: 'source_type', value: null }
      ],
      table: {
        columns: [
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
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Ticket(row)).status_info.label
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
      if (this.localOptions.defaultSourceType) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'source_type', 'value', this.localOptions.defaultSourceType)
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
        return { name: 'AdminPanel.Ticket.Show', params: { id: ticketId } }
      }

      if (defaultSourceType === 'INVOICE') {
        return { name: 'Admin.Invoice.Ticket.Show', params: { id: ticketId } }
      } else if (defaultSourceType === 'TRAINING_CLASSROOM') {
        return { name: 'AdminPanel.Ticket.Show', params: { id: ticketId } }
      } else if (defaultSourceType === 'DISCUSSION_CIRCLE_CLASSROOM') {
        return { name: 'AdminPanel.Ticket.Show', params: { id: ticketId } }
      } else {
        return { name: 'AdminPanel.Ticket.Show', params: { id: ticketId } }
      }
    },
    getCategoryTypeFromSourceType () {
      const defaultSourceType = this.localOptions.defaultSourceType
      if (!defaultSourceType) {
        return null
      }

      if (defaultSourceType === 'INVOICE') {
        return 'FINANCIAL'
      }
      if (defaultSourceType === 'TRAINING_CLASSROOM' || defaultSourceType === 'DISCUSSION_CIRCLE_CLASSROOM') {
        return 'EDUCATIONAL'
      } else {
        return 'GENERAL'
      }
    },
    loadCategories () {
      return new Promise((resolve, reject) => {
        const type = this.getCategoryTypeFromSourceType()
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
