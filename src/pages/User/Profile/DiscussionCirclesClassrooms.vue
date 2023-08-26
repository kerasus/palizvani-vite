<template>
  <breadcrumbs style="margin-top: 29px; margin-bottom: 19px;" />
  <entity-index v-if="mounted"
                ref="entityIndex"
                v-model:value="inputs"
                title="لیست مباحثات"
                :api="api"
                :table="table"
                :table-keys="tableKeys"
                :table-grid-size="$q.screen.lt.sm"
                :show-expand-button="false"
                :show-reload-button="false"
                :show-search-button="false">
    <template #entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'action'">
        <q-btn size="md"
               color="primary"
               label="جزییات"
               :to="{name: 'UserPanel.Profile.ClassroomInfo', params: {id: inputData.props.row.classroom_info.id}}" />
      </template>
      <template v-else>
        {{ inputData.col.value }}
      </template>
    </template>
    <template #entity-index-table-item-cell="{inputData}">
      <entity-index-grid-item :input-data="inputData">
        <template #col="{col, row}">
          <template v-if="col.name === 'action'">
            <q-btn size="md"
                   color="primary"
                   label="جزییات"
                   :to="{name: 'UserPanel.Profile.ClassroomInfo', params: {id: row.classroom_info.id}}" />
          </template>
        </template>
      </entity-index-grid-item>
    </template>
  </entity-index>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import Enums from 'src/assets/Enums/Enums.js'
import { Invoice } from 'src/models/Invoice.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'DiscussionCirclesClassrooms',
  components: {
    EntityIndex,
    Breadcrumbs,
    EntityIndexGridItem
  },
  data () {
    return {
      mounted: false,
      inputs: [
        {
          type: 'select',
          name: 'status',
          options: Enums.classroomStatuses,
          value: null,
          label: 'وضعیت دوره',
          placeholder: ' ',
          col: 'col-md-2 col-12'
        },
        {
          type: 'select',
          name: 'category',
          options: [],
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
        { type: 'hidden', name: 'type', value: 'DISCUSSION_CIRCLE' },
        { type: 'hidden', name: 'unit__category__type', value: 'DISCUSSION_CIRCLE' },
        { type: 'input', name: 'search', label: 'جستجو', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
      ],
      api: APIGateway.registration.APIAdresses.base,
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'title',
            required: true,
            label: 'نام درس',
            align: 'left',
            field: row => row.classroom_info.unit_info.title
          },
          {
            name: 'audience_gender_type',
            required: true,
            label: 'جنسیت',
            align: 'left',
            field: row => (row.classroom_info.audience_gender_type === 'FEMALE') ? 'خواهران' : (row.classroom_info.audience_gender_type === 'MALE') ? 'برادران' : 'خواهران و برادران'
          },
          {
            name: 'title',
            required: true,
            label: 'نوع برگزاری',
            align: 'left',
            field: row => this.getClassroomHoldingTypeTitle(row.classroom_info.holding_type)
          },
          {
            name: 'title',
            required: true,
            label: 'استاد',
            align: 'left',
            field: row => row.classroom_info.professor
          },
          {
            name: 'status',
            required: true,
            label: 'تعداد جلسات',
            align: 'left',
            field: row => row.classroom_info.sessions_info.length
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => this.getClassroomStatusTitle(row.classroom_info.status)
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
            // field: row => row.invoice_info ? this.getInvoiceStatusTitle(row.invoice_info) : 'نام مشخص'
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
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  computed: {
    selectedCategoryId () {
      return this.getInputValue('category')
    }
  },
  watch: {
    selectedCategoryId () {
      this.setInputValue('unit', null)
      this.getUnits(this.selectedCategoryId)
    }
  },
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
    getClassroomHoldingTypeTitle (type) {
      const target = Enums.classroomHoldingTypes.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    getClassroomStatusTitle (type) {
      const target = Enums.classroomStatuses.find(item => item.value === type)
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
      this.getCategories()
      this.getUnits()
    },
    getCategories () {
      APIGateway.classroom.index({ per_page: 9999 })
        .then(classroomList => {
          this.loadSelectOptions('category', this.getSelectOptions(classroomList.list.list, 'id', 'title'))
        })
        .catch(() => {
        })
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
