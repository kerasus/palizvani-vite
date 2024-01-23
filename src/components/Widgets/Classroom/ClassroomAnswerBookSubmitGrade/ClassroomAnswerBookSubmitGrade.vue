<template>
  <div class="ClassroomAnswerBookList">
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  :title="'لیست ' + classroomTypeTitle"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :show-expand-button="false"
                  :show-reload-button="false"
                  :show-search-button="false">
      <template v-slot:entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <div class="action-column-entity-index">
            <q-btn size="md"
                   color="primary"
                   label="جزییات"
                   :to="{name: 'UserPanel.Classroom.MyAsGraderClassroom.AnswerBooks', params: {classroom_id: inputData.props.row.id}}"
                   class="q-mr-md" />
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
import { EntityIndex } from 'quasar-crud'
import Enums from 'src/assets/Enums/Enums.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { UnitCategory } from 'src/models/UnitCategory.js'

export default {
  name: 'ClassroomAnswerBookList',
  components: {
    EntityIndex
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      inputs: [],
      defaultOptions: {
        classroomType: 'TRAINING'
      },
      api: APIGateway.classroom.APIAdresses.myAsGraderClassrooms,
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
            name: 'title',
            required: true,
            label: 'عنوان',
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
            name: 'holding_type',
            required: true,
            label: 'نوع برگزاری',
            align: 'left',
            field: row => this.getClassroomHoldingTypeTitle(row.holding_type)
          },
          {
            name: 'price',
            required: true,
            label: 'هزینه(ریال)',
            align: 'left',
            field: row => row.price
          },
          {
            name: 'professor_info',
            required: true,
            label: 'استاد مربوطه',
            align: 'left',
            field: row => row.professor_info?.firstname + ' ' + row.professor_info?.lastname
          },
          {
            name: 'beginning_registration_period',
            required: true,
            label: 'تاریخ و زمان ثبت نام',
            align: 'left',
            field: row => row.beginning_registration_period ? ShamsiDate.getDateTime(row.beginning_registration_period) : '-'
          },
          {
            name: 'beginning_registration_period',
            required: true,
            label: 'ترم برگزاری',
            align: 'left',
            field: row => (row.beginning_registration_period) ? ShamsiDate.getTerm(row.beginning_registration_period) : '-'
          },
          {
            name: 'action',
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
  computed: {
    classroomTypeTitle () {
      const unitCategory = new UnitCategory({ type: this.localOptions.classroomType })
      return unitCategory.type_info.label
    },
    createPageRouteName () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'Admin.Classroom.Create'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'Admin.Event.Create'
      }
      return 'Admin.Classroom.Create'
    },
    showPageRouteName () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'Admin.Classroom.Show'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'Admin.Event.Show'
      }
      return 'Admin.Classroom.Show'
    }
  },
  mounted () {
    this.setClassroomTypeOfInputs()
    this.mounted = true
  },
  methods: {
    setClassroomTypeOfInputs () {
      this.table.columns.forEach(col => {
        if (col.name === 'title') {
          col.label = 'نام ' + this.classroomTypeTitle
        }
        if (col.name === 'professor_info') {
          col.label = (this.localOptions.classroomType === 'TRAINING') ? 'استاد مربوطه' : 'برگزار کننده'
        }
      })
    },
    search () {
      this.$refs.entityIndex.search()
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
.ClassroomAnswerBookList {
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
