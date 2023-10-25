<template>
  <breadcrumbs style="margin-top: 29px; margin-bottom: 19px;" />
  <entity-index v-if="mounted"
                ref="entityIndex"
                v-model:value="inputs"
                title="لیست رویداد ها"
                :api="api"
                :table="table"
                :table-keys="tableKeys"
                :table-grid-size="$q.screen.lt.sm"
                :show-expand-button="false"
                :show-reload-button="false"
                :show-search-button="false">
    <template #entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'number'">
        {{ inputData.rowNumber }}
      </template>
      <template v-else-if="inputData.col.name === 'action'">
        <q-btn size="md"
               color="primary"
               label="جزییات"
               :to="{name: 'UserPanel.Profile.EventInfo', params: {id: inputData.props.row.event_info.id}}" />
      </template>
      <template v-else>
        {{ inputData.col.value }}
      </template>
    </template>
    <template #entity-index-table-item-cell="{inputData}">
      <entity-index-grid-item :input-data="inputData">
        <template #col="{col, row}">
          <template v-if="col.name === 'number'">
            {{ inputData.rowNumber }}
          </template>
          <template v-else-if="col.name === 'action'">
            <q-btn size="md"
                   color="primary"
                   label="جزییات"
                   :to="{name: 'UserPanel.Profile.EventInfo', params: {id: row.event_info.id}}" />
          </template>
        </template>
      </entity-index-grid-item>
    </template>
  </entity-index>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import { Event } from 'src/models/Event.js'
import Enums from 'src/assets/Enums/Enums.js'
import { Invoice } from 'src/models/Invoice.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { Registration } from 'src/models/Registration.js'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'UserPanel.Profile.AllEvents',
  components: {
    EntityIndex,
    Breadcrumbs,
    EntityIndexGridItem
  },
  mixins: [mixinAuth],
  data () {
    return {
      mounted: false,
      inputs: [
        {
          type: 'select',
          name: 'status',
          options: (new Event()).statusEnums,
          value: null,
          label: 'وضعیت رویداد',
          placeholder: ' ',
          col: 'col-md-2 col-12'
        },
        {
          type: 'select',
          name: 'category',
          options: (new Event()).categoryEnums,
          value: null,
          label: 'گروه آموزشی',
          placeholder: ' ',
          col: 'col-md-2 col-12'
        },
        {
          type: 'select',
          name: 'unit',
          responseKey: 'unit',
          options: [],
          value: null,
          label: 'درس',
          placeholder: ' ',
          col: 'col-md-2 col-12'
        },
        { type: 'hidden', name: 'owner', value: null },
        { type: 'input', name: 'search', label: 'جستجو', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
      ],
      api: APIGateway.registration.APIAdresses.base,
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
            field: row => row.event_info.id
          },
          {
            name: 'event_info.title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.event_info?.title
          },
          // {
          //   name: 'title',
          //   required: true,
          //   label: 'نام درس',
          //   align: 'left',
          //   field: row => row.event_info.unit_info.title
          // },
          {
            name: 'audience_gender_type',
            required: true,
            label: 'جنسیت',
            align: 'left',
            field: row => (new Event(row.event_info)).audience_gender_type_info.label
          },
          {
            name: 'title',
            required: true,
            label: 'نوع برگزاری',
            align: 'left',
            field: row => this.getEventHoldingTypeTitle(row.event_info.holding_type)
          },
          {
            name: 'title',
            required: true,
            label: 'استاد',
            align: 'left',
            field: row => row.event_info?.professor_info?.firstname + ' ' + row.event_info?.professor_info?.lastname
          },
          {
            name: 'status',
            required: true,
            label: 'تعداد جلسات',
            align: 'left',
            field: row => row.event_info?.sessions_info?.length
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Registration(row)).status_info.label
            // field: row => this.getEventStatusTitle(row.event_info.status)
          },
          {
            name: 'title',
            required: true,
            label: 'زمان ثبت نام',
            align: 'left',
            field: row => ShamsiDate.getDateTime(row.creation_time)
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت مالی',
            align: 'left',
            field: row => (new Invoice(row.invoice_info)).status_info.label ? (new Invoice(row.invoice_info)).status_info.label : '-'
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: ''
          }
        ]
      },
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  // computed: {
  //   selectedCategoryId () {
  //     return this.getInputValue('category')
  //   }
  // },
  // watch: {
  //   selectedCategoryId () {
  //     this.setInputValue('unit', null)
  //     this.getUnits(this.selectedCategoryId)
  //   }
  // },
  mounted () {
    this.setOwner()
    this.setActionBtn()
    this.loadInputDataOptions()
    this.mounted = true
  },
  methods: {
    setOwner () {
      const user = this.$store.getters['Auth/user']
      FormBuilderAssist.setAttributeByName(this.inputs, 'owner', 'value', user.id)
    },
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.search)
    },
    search () {
      this.$refs.entityIndex.search()
    },
    getEventHoldingTypeTitle (type) {
      const target = (new Event()).holding_typeEnums.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    getEventStatusTitle (type) {
      const target = (new Event()).statusEnums.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    getInvoiceStatusTitle (type) {
      const target = Enums.invoiceStatus.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    loadInputDataOptions () {
      this.getUnits()
    },
    getUnits (selectedcategoryId) {
      APIGateway.unit.index({ category: selectedcategoryId })
        .then(unitList => {
          this.loadSelectOptions('unit', this.getSelectOptions(unitList.list.list, 'id', 'title'))
        })
        .catch(() => {
        })
    },
    getInputValue (name) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      return this.inputs[inputIndex].value
    },
    setInputValue (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].value = value
    },
    getSelectOptions (result, value, label) {
      return result.map(item => {
        return {
          value: item[value],
          label: item[label]
        }
      })
    },
    loadSelectOptions (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].options = value
    }
  }
}
</script>
