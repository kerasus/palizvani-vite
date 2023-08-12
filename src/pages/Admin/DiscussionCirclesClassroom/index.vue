<template>
  <div class="AdminClassroomIndex">
    <div class="add-new-action-row">
      <q-btn color="primary"
             :to="{name: 'Admin.Classroom.DiscussionCircles.Create'}">
        <svg data-name="Close Square"
             xmlns="http://www.w3.org/2000/svg"
             width="20"
             height="20"
             viewBox="0 0 20 20"
             class="q-mr-md">
          <path id="Combined_Shape"
                data-name="Combined Shape"
                d="M5.665,20C2.276,20,0,17.623,0,14.084V5.916C0,2.377,2.276,0,5.665,0h8.67C17.723,0,20,2.377,20,5.916v8.168C20,17.623,17.723,20,14.333,20ZM1.5,5.916v8.168c0,2.683,1.634,4.416,4.164,4.416h8.669c2.532,0,4.167-1.733,4.167-4.416V5.916c0-2.682-1.635-4.415-4.166-4.415H5.665C3.135,1.5,1.5,3.234,1.5,5.916Zm7.968,8a.747.747,0,0,1-.22-.53V10.741H6.611a.75.75,0,0,1-.75-.75.749.749,0,0,1,.75-.75H9.249V6.6a.75.75,0,1,1,1.5,0V9.241h2.639a.75.75,0,0,1,0,1.5H10.748v2.642a.75.75,0,0,1-1.28.53Z"
                fill="#fff" />
        </svg>
        ایجاد دوره آموزشی جدید
      </q-btn>
    </div>
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست دسته بندی ها"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :show-expand-button="false"
                  :show-reload-button="false"
                  :show-search-button="false">
      <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
        <template v-if="inputData.col.name === 'actions'">
          <div class="action-column-entity-index">
            <q-btn size="md"
                   color="primary"
                   label="جزییات"
                   :to="{name: 'Admin.Classroom.DiscussionCircles.Show', params: {id: inputData.props.row.id}}"
                   class="q-mr-md" />
            <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />
          </div>
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
import Enums from 'src/assets/Enums/Enums.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'Admin.Classroom.Index',
  components: {
    EntityIndex,
    DeleteBtn
  },
  data () {
    return {
      mounted: false,
      inputs: [
        { type: 'select', name: 'status', options: Enums.classroomStatuses, value: null, label: 'وضعیت دوره', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'select', name: 'unit', options: [], value: null, label: 'درس', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'hidden', name: 'type', value: 'DISCUSSION_CIRCLE' },
        { type: 'hidden', name: 'unit__category__type', value: 'DISCUSSION_CIRCLE' },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
      ],
      api: APIGateway.classroom.APIAdresses.base,
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
            label: 'نام دوره',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'audience_gender_type',
            required: true,
            label: 'جنسیت',
            align: 'left',
            field: row => (row.audience_gender_type === 'FEMALE') ? 'خواهران' : (row.audience_gender_type === 'MALE') ? 'برادران' : 'خواهران و برادران'
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => this.getClassroomStatusesTitle(row.status)
          },
          {
            name: 'title',
            required: true,
            label: 'نوع برگزاری',
            align: 'left',
            field: row => this.getClassroomHoldingTypeTitle(row.holding_type)
          },
          {
            name: 'title',
            required: true,
            label: 'هزینه(تومان)',
            align: 'left',
            field: row => row.price
          },
          {
            name: 'title',
            required: true,
            label: 'استاد مربوطه',
            align: 'left',
            field: row => row.professor
          },
          {
            name: 'title',
            required: true,
            label: 'تاریخ و زمان ثبت نام',
            align: 'left',
            field: row => ShamsiDate.getDateTime(row.beginning_registration_period)
          },
          {
            name: 'title',
            required: true,
            label: 'ترم برگزاری',
            align: 'left',
            field: row => (row.beginning_registration_period) ? ShamsiDate.getTerm(row.beginning_registration_period) : '-'
          },
          {
            name: 'actions',
            required: true,
            label: 'عملیات',
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
  mounted () {
    this.setActionBtn()
    this.mounted = true
    this.getUnits()
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
    getUnits () {
      APIGateway.unit.index({ per_page: 9999 })
        .then((units) => {
          this.loadSelectOptions('unit', this.getSelectOptions(units.list.list, 'id', 'title'))
        })
        .catch(() => {

        })
    },
    loadSelectOptions (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].options = value
    },
    getSelectOptions (result, value, label) {
      return result.map(item => {
        return {
          value: item[value],
          label: item[label]
        }
      })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    },
    getClassroomHoldingTypeTitle (type) {
      const target = Enums.classroomHoldingTypes.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    getClassroomStatusesTitle (type) {
      const target = Enums.classroomStatuses.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    }
  }
}
</script>

<style lang="scss" scoped>
.AdminClassroomIndex {
  .add-new-action-row {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 22px;
  }
  .action-column-entity-index {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
