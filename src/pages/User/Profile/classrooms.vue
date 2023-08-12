<template>
  <entity-index ref="entityIndex"
                v-model:value="inputs"
                title="لیست دوره ها"
                :api="api"
                :table="table"
                :table-keys="tableKeys"
                :table-grid-size="$q.screen.lt.sm"
                :show-expand-button="false"
                :show-reload-button="false"
                :show-search-button="false">
    <template v-slot:entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'actions'">
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
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'UserPanel.Profile.AllClassrooms',
  components: {
    EntityIndex,
    EntityIndexGridItem
  },
  data () {
    return {
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
            label: 'تاریخ شروع',
            align: 'left',
            field: row => ShamsiDate.getDateTime(row.classroom_info.beginning_registration_period)
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
            field: row => ShamsiDate.getDateTime(row.classroom_info.beginning_registration_period)
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت مالی',
            align: 'left',
            field: row => row.invoice_info ? this.getInvoiceStatusTitle(row.invoice_info) : 'نام مشخص'
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
  created () {
    this.setActionBtn()
    this.loadInputDataOptions()
  },
  methods: {
    setActionBtn () {
      this.inputs.forEach((item, index) => {
        if (item.name === 'btn') {
          this.inputs[index].atClick = this.search
        }
      })
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
