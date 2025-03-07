<template>
  <div class="ClassroomAnswerBookList">
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست نتایج"
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
        <template v-else-if="inputData.col.name === 'actions'">
          <div class="action-column-entity-index">
            <q-btn size="md"
                   color="primary"
                   label="جزییات"
                   :to="{name: 'UserPanel.Classroom.MyAsGraderClassroom.AnswerBooks.ShowGrade', params: {classroom_id: $route.params.classroom_id, answer_book_id: inputData.props.row.id}}"
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
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import { Test } from 'src/models/Test.js'
import Enums from 'src/assets/Enums/Enums.js'
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
// import ShamsiDate from 'src/assets/ShamsiDate.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { UnitCategory } from 'src/models/UnitCategory.js'
import { AnswerBook } from 'src/models/AnswerBook'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'ClassroomAnswerBookList',
  components: {
    EntityIndex
  },
  mixins: [mixinWidget, mixinAuth],
  data () {
    return {
      mounted: false,
      defaultOptions: {
        classroomType: 'TRAINING'
      },
      api: APIGateway.answerBook.APIAdresses.base,
      inputs: [
        {
          type: 'select',
          name: 'status',
          clearable: false,
          options: [
            { label: 'در انتظار تصحیح', value: 'WAITING_FOR_GRADING' },
            { label: 'در حال تصحیح', value: 'GRADING' },
            { label: 'تصحیح شده', value: 'GRADED' },
            {
              label: 'حذف شده',
              value: 'DELETED'
            },
            {
              label: 'نیاز به رفع مشکل',
              value: 'UNGRADABLE'
            },
            {
              label: 'اعتراض شده',
              value: 'OBJECTED'
            },
            {
              label: 'پاسخ اعتراض',
              value: 'OBJECTION_RESPONDED'
            }
          ],
          label: 'وضعیت',
          placeholder: ' ',
          value: 'WAITING_FOR_GRADING',
          col: 'col-md-4 col-12'
        },
        { type: 'hidden', name: 'test__classroom', value: this.$route.params.classroom_id },
        { type: 'hidden', name: 'grader', value: null },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
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
            name: 'owner_info.fullname',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'owner_info.mobile_number',
            required: true,
            label: 'موبایل',
            align: 'left',
            field: row => row.owner_info.mobile_number
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان آزمون',
            align: 'left',
            field: row => row.test_info.title
          },
          {
            name: 'test_questions_length',
            required: true,
            label: 'تعداد سوالات',
            align: 'left',
            field: row => row.test_info.test_questions_length
          },
          // {
          //   name: 'level',
          //   required: true,
          //   label: 'درچه سختی',
          //   align: 'left',
          //   field: row => (new Test(row.test_set_info)).level_info.label
          // },
          {
            name: 'test_info_status_info',
            required: true,
            label: 'وضعیت آزمون',
            align: 'left',
            field: row => (new Test(row.test_info)).status_info.label
          },
          {
            name: 'status_info',
            required: true,
            label: 'وضعیت تصحیح',
            align: 'left',
            field: row => (new AnswerBook(row)).status_info.label
          },
          {
            name: 'actions',
            required: true,
            label: 'عملیات',
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
  computed: {
    selectedStatus () {
      const target = FormBuilderAssist.getInputsByName(this.inputs, 'status')
      return target?.value
    },
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
  watch: {
    selectedStatus (newValue) {
      let grader = this.user.id
      if (newValue === 'WAITING_FOR_GRADING') {
        grader = null
      }

      FormBuilderAssist.setAttributeByName(this.inputs, 'grader', 'value', grader)
    }
  },
  mounted () {
    this.setActionBtn()
    // this.setClassroomTypeOfInputs() // for what?
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.search)
    },
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
