<template>
  <div class="AdminClassroomAnswerBookList">
    <q-skeleton v-if="!classroom.id"
                type="text"
                width="200px" />
    <breadcrumbs v-else
                 style="margin-top: 29px; margin-bottom: 19px;" />
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  :title="'لیست ' + classroomTypeTitle"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :show-expand-button="false"
                  :show-reload-button="false"
                  :show-search-button="false"
                  @onPageChanged="onPageChanged">
      <template v-slot:entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'actions'">
          <div class="action-column-entity-index">
            <q-btn size="md"
                   color="primary"
                   :label="inputData.props.row.grader ? 'ویرایش تصحیح' : 'تصحیح آزمون'"
                   :to="{name: 'Admin.Classroom.Test.AnswerBooks.ShowGrade', params: {classroom_id: $route.params.classroom_id, test_id: $route.params.test_id, answer_book_id: inputData.props.row.id}}"
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
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { AnswerBook } from 'src/models/AnswerBook.js'
// import ShamsiDate from 'src/assets/ShamsiDate.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { UnitCategory } from 'src/models/UnitCategory.js'
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import Assist from 'assets/js/Assist'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminClassroomAnswerBookList',
  components: {
    EntityIndex,
    Breadcrumbs
  },
  mixins: [mixinWidget, mixinAuth],
  data () {
    return {
      mounted: false,
      entityLoading: true,
      test: new Test(),
      classroom: new Classroom(),
      defaultOptions: {
        classroomType: 'TRAINING'
      },
      api: APIGateway.answerBook.APIAdresses.base,
      inputs: [
        {
          type: 'select',
          name: 'status',
          options: [
            { label: 'جاری', value: 'WAITING_FOR_GRADING' },
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
            }
          ],
          label: 'وضعیت',
          placeholder: ' ',
          value: null,
          col: 'col-md-3 col-12'
        },
        { type: 'input', name: 'owner__national_code', label: 'کدملی', placeholder: ' ', col: ' col-md-3 col-12' },
        { type: 'hidden', name: 'test', value: this.$route.params.test_id },
        { type: 'hidden', name: 'test__classroom', value: this.$route.params.classroom_id },
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
            name: 'owner_info.national_code',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.owner_info.national_code
          },
          {
            name: 'attending_start_time',
            required: true,
            label: 'زمان شروع',
            align: 'left',
            field: row => row.attending_start_time ? this.toShamsi(row.attending_start_time) : '-'
          },
          {
            name: 'attending_start_time',
            required: true,
            label: 'زمان پایان',
            align: 'left',
            field: row => row.attending_end_time ? this.toShamsi(row.attending_end_time) : '-'
          },
          {
            name: 'grader_info',
            required: true,
            label: 'مصحح',
            align: 'left',
            field: row => row.grader_info ? row.grader_info.firstname + ' ' + row.grader_info.lastname : '-'
          },
          // {
          //   name: 'last_modification_time',
          //   required: true,
          //   label: 'زمان آخرین ویرایش تصحیح',
          //   align: 'left',
          //   field: row => row.last_modification_time ? this.toShamsi(row.last_modification_time) : '-'
          // },
          // {
          //   name: 'title',
          //   required: true,
          //   label: 'عنوان آزمون',
          //   align: 'left',
          //   field: row => row.test_info.title
          // },
          // {
          //   name: 'test_questions_length',
          //   required: true,
          //   label: 'تعداد سوالات',
          //   align: 'left',
          //   field: row => row.test_info.test_questions_length
          // },
          {
            name: 'status_info',
            required: true,
            label: 'وضعیت تصحیح',
            align: 'left',
            field: row => (new AnswerBook(row)).status_info.label
          },
          {
            name: 'test_info_status_info',
            required: true,
            label: 'وضعیت آزمون',
            align: 'left',
            field: row => (new Test(row.test_info)).status_info.label
          },
          {
            name: 'total_score',
            required: true,
            label: 'نمره آزمون',
            align: 'left',
            field: row => row.total_score
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
    this.setActionBtn()
    this.setClassroomTypeOfInputs()
    this.mounted = true
  },
  methods: {
    toShamsi (miladi) {
      return Assist.miladiToShamsi(miladi)
    },
    onPageChanged () {
      if (!this.classroom.id) {
        this.getClassroom()
      }
    },
    getClassroom () {
      this.classroom.loading = true
      APIGateway.classroom.get(this.$route.params.classroom_id)
        .then((classroom) => {
          this.classroom = new Classroom(classroom)
          this.classroom.loading = false
          this.updateBreadcrumbs()
        })
        .catch(() => {
          this.classroom.loading = false
        })
    },
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'لیست ' + this.classroomTypeTitle,
            to: { name: this.indexPageRouteName }
          },
          {
            label: this.classroom.title,
            to: { name: this.showPageRouteName, params: { id: this.$route.params.classroom_id } }
          },
          {
            label: 'تصحیح آزمون'
          },
          {
            label: 'لیست شرکت کنندگان'
          }
        ]
      })
    },
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
.AdminClassroomAnswerBookList {
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
