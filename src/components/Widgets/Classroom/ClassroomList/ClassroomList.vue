<template>
  <breadcrumbs style="margin-top: 29px; margin-bottom: 19px;" />
  <entity-index v-if="mounted"
                ref="entityIndex"
                v-model:value="inputs"
                :title="listTitle"
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
               :to="{name: showPageRouteName, params: {id: inputData.props.row.classroom_info.id}}" />
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
                   :to="{name: showPageRouteName, params: {id: row.classroom_info.id}}" />
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
import { Classroom } from 'src/models/Classroom.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { Registration } from 'src/models/Registration.js'
import { mixinAuth, mixinWidget } from 'src/mixin/Mixins.js'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import { TranscriptSheet } from 'src/models/TranscriptSheet'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'UserPanel.Profile.AllClassrooms',
  components: {
    EntityIndex,
    Breadcrumbs,
    EntityIndexGridItem
  },
  mixins: [mixinAuth, mixinWidget],
  data () {
    return {
      mounted: false,
      inputs: [
        {
          type: 'select',
          name: 'status',
          options: Enums.classroomStatuses,
          value: null,
          label: 'مرحله دوره',
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
            field: row => row.classroom_info.id
          },
          {
            name: 'classroom_info.title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.classroom_info?.title
          },
          {
            name: 'audience_gender_type',
            required: true,
            label: 'جنسیت',
            align: 'left',
            field: row => (new Classroom(row.classroom_info)).audience_gender_type_info.label
          },
          {
            name: 'title',
            required: true,
            label: 'نوع برگزاری',
            align: 'left',
            field: row => this.getClassroomHoldingTypeTitle(row.classroom_info.holding_type)
          },
          {
            name: 'professor_info',
            required: true,
            label: 'استاد',
            align: 'left',
            field: row => row.classroom_info?.professor_info?.firstname + ' ' + row.classroom_info?.professor_info?.lastname
          },
          {
            name: 'sessions_info',
            required: true,
            label: 'تعداد جلسات',
            align: 'left',
            field: row => row.classroom_info?.sessions_count
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            // field: row => (new Registration(row)).status_info.label
            field: row => this.getRegistrationStatusTitle(row)
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
      defaultOptions: {
        classroomType: 'TRAINING'
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
    listTitle () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'لیست دوره های آموزشی'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'لیست رویدادها'
      }
      return 'لیست دوره های آموزشی'
    },
    showPageRouteName () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'UserPanel.Profile.ClassroomInfo'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'UserPanel.Profile.EventInfo'
      }
      return 'UserPanel.Profile.ClassroomInfo'
    },
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
    this.setClassroomTypeOfInputs()
    this.setOwner()
    this.setActionBtn()
    this.loadInputDataOptions()
    this.mounted = true
  },
  methods: {
    setClassroomTypeOfInputs () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'classroom__unit__category__type', 'value', this.localOptions.classroomType)

      // if (this.localOptions.classroomType === 'TRAINING') {
      // }
      if (this.localOptions.classroomType === 'EVENT') {
        FormBuilderAssist.setAttributeByName(this.inputs, 'classroom__unit__category__type', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'type', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'unit', 'label', 'دسته')
        FormBuilderAssist.setAttributeByName(this.inputs, 'status', 'label', 'مرحله رویداد')

        this.table.columns.forEach(col => {
          if (col.name === 'professor_info') {
            col.label = 'برگزار کننده'
          }
          if (col.name === 'sessions_info') {
            col.label = 'تعداد برنامه ها'
          }
        })
      }
    },
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
    getRegistrationStatusTitle (registration) {
      if (registration.status === 'REGISTERED' && registration.transcript_sheet_info) {
        return (new TranscriptSheet(registration.transcript_sheet_info)).status_info.label
      } else {
        return (new Registration(registration)).status_info.label
      }
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
      APIGateway.unitCategory.index({ per_page: 9999, type: this.localOptions.classroomType })
        .then((categories) => {
          FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'options', categories.list.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
        })
        .catch(() => {})
    },
    getUnits (selectedcategoryId) {
      APIGateway.unit.index({
        category: selectedcategoryId,
        category__type: this.localOptions.classroomType
      })
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
