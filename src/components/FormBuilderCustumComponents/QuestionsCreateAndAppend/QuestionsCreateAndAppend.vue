<template>
  <div class="ContentsSelector q-mt-md">
    <q-table :rows="testQuestionList"
             :columns="table.columns"
             row-key="name">
      <template #top>
        <q-banner class="full-width">
          <div class="flex justify-between items-center">
            <span>
              سوالات
            </span>
            <q-btn color="primary"
                   class="q-mr-md"
                   outline
                   :loading="test.loading"
                   @click="openDialogCreateNewQuestion">
              سوال جدید
            </q-btn>
          </div>
        </q-banner>
      </template>
      <template #bottom />
      <template #body-cell-number="props">
        <q-td>
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>
      <template #body-cell-mark="props">
        <q-td auto-width>
          <q-input v-model="props.row.mark"
                   style="width: 80px;"
                   :loading="test.loading" />
        </q-td>
      </template>
      <template #body-cell-is_extra_mark="props">
        <q-td auto-width>
          <q-toggle v-model="props.row.is_extra_mark"
                    :loading="test.loading" />
        </q-td>
      </template>
      <template #body-cell-action="props">
        <q-td auto-width>
          <q-btn color="primary"
                 class="q-mr-md"
                 size="sm"
                 outline
                 :loading="test.loading"
                 @click="openDialogEditQuestion(props.row.question_info.id)">
            ویرایش سوال
          </q-btn>
          <q-btn v-if="questionType === 'QUESTION_BANK'"
                 color="primary"
                 class="q-mr-lg"
                 size="sm"
                 outline
                 @click="editTestQuestion(props.row)">
            ویرایش نمره و حالت امتیازی سوال
          </q-btn>
          <q-btn color="red"
                 class="q-mr-md"
                 size="sm"
                 :loading="test.loading"
                 @click="deleteQuestion(props.row.question_info.id)">
            حذف سوال
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <div class="q-mt-lg">
      <template v-if="questionType === 'QUESTION_BANK'">
        <div class="row">
          <div class="col-md-4 col-12">
            تعداد سوالات اجباری:
            {{ countOfForceQuestions }}
          </div>
          <div class="col-md-4 col-12">
            مجموع بارم‌ها:
            {{ sumOfTotalMarks }}
          </div>
          <div class="col-12" />
          <div class="col-md-4 col-12">
            تعداد سوالات اختیاری:
            {{ countOfExtraQuestions }}
          </div>
          <div class="col-md-4 col-12">
            مجموع بارم سوالات اختیاری:
            {{ sumOfExtraMarks }}
          </div>
        </div>
      </template>
      <template v-else-if="questionType === 'EVENT' && localValue">
        <div class="row">
          <div class="col-md-4 col-12">
            تعداد سوالات انتخاب شده:
            {{ localValue.length }}
          </div>
        </div>
      </template>
    </div>
    <q-dialog v-model="editQuestionDialog"
              maximized
              transition-show="slide-up"
              transition-hide="slide-down">
      <edit-question-form :question-id="selectedQuestionIdForEdit"
                          :question-type="questionType"
                          @onQuestionEdited="onQuestionEdited" />
    </q-dialog>
    <q-dialog v-model="createNewQuestionDialog"
              maximized
              transition-show="slide-up"
              transition-hide="slide-down">
      <create-question-form :test-id="testId"
                            :test-set-id="testSetId"
                            :question-type="questionType"
                            @onQuestionCreated="onQuestionCreated" />
    </q-dialog>
  </div>
</template>

<script>
import { Test } from 'src/models/Test.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import EditQuestionForm from './EditQuestionForm.vue'
import CreateQuestionForm from './CreateQuestionForm.vue'
import NormalizeNumber from 'src/assets/js/NormalizeNumber.js'
import { Question, QuestionList } from 'src/models/Question.js'
import { SessionTemplateList } from 'src/models/SessionTemplate.js'

export default {
  name: 'QuestionsSelector',
  components: {
    EditQuestionForm,
    CreateQuestionForm
  },
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    readonly: {
      default: false,
      type: Boolean
    },
    showPageLink: {
      default: true,
      type: Boolean
    },
    showDownloadLink: {
      default: false,
      type: Boolean
    },
    questionType: {
      default: 'QUESTION_BANK',
      type: String
    },
    testId: {
      default: null,
      type: [Number, String, Boolean]
    },
    testSetId: {
      type: [Number, String, Boolean],
      default: null
    },
    unitId: {
      default: null,
      type: [Number, String, Boolean]
    }
  },
  emits: ['update:value'],
  data () {
    return {
      mounted: false,
      selectedQuestionIdForEdit: null,
      editQuestionDialog: false,
      createNewQuestionDialog: false,
      selectedSession: null,
      test: new Test(),
      testQuestionList: [],
      sessions: new SessionTemplateList(),
      sessionQuestions: new QuestionList(),
      loadedQuestions: {},

      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'type', value: this.questionType },
        { type: 'hidden', name: 'session_template_questions__session_template', value: null }
        // { type: 'hidden', name: 'session_template_questions__session_template__unit', value: this.unitId }
      ],
      table: {
        columns: []
      }
    }
  },
  computed: {
    selectedSessionTitle () {
      if (!this.selectedSession?.title) {
        return ''
      }
      return this.selectedSession?.title
    },
    countOfForceQuestions () {
      return this.testQuestionList.filter(item => !item.is_extra_mark).length
    },
    countOfExtraQuestions () {
      return this.testQuestionList.filter(item => item.is_extra_mark).length
    },
    sumOfExtraMarks () {
      let sum = 0
      this.testQuestionList.filter(item => item.is_extra_mark).forEach(item => {
        sum += parseInt(NormalizeNumber.toEnglish(item.mark.toString()))
      })

      return sum
    },
    sumOfTotalMarks () {
      let sum = 0
      this.testQuestionList.forEach(item => {
        sum += parseInt(NormalizeNumber.toEnglish(item.mark.toString()))
      })

      return sum
    },
    localValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('update:value', newValue)
      }
    },
    sessionOptions () {
      return this.sessions.list.map(item => {
        return {
          value: item,
          label: item.title
        }
      })
    },
    selectedSessionId () {
      if (!this.selectedSession) {
        return null
      }
      return this.selectedSession.id
    }
  },
  watch: {
    value (newValue) {
      this.reFreshTestQuestionList()
    }
  },
  created () {
    if (this.questionType === 'QUESTION_BANK') {
      this.table.columns = [
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
          field: row => row.question_info.id
        },
        {
          name: 'text',
          required: true,
          label: 'عنوان سوال',
          align: 'left',
          field: row => row.question_info.text
        },
        {
          name: 'level',
          required: true,
          label: 'سطح سوال',
          align: 'left',
          field: row => new Question(row.question_info).level_info.label
        },
        {
          name: 'mark',
          required: true,
          label: 'بارم',
          align: 'left',
          field: row => row.question_info.mark
        },
        {
          name: 'is_extra_mark',
          required: true,
          label: 'سوال امتیازی',
          align: 'left',
          field: row => ''
        },
        {
          name: 'action',
          required: true,
          label: 'عملیات',
          align: 'left',
          field: row => ''
        }
      ]
    } else if (this.questionType === 'EVENT') {
      this.table.columns = [
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
          field: row => row.question_info.id
        },
        {
          name: 'text',
          required: true,
          label: 'عنوان سوال',
          align: 'left',
          field: row => row.question_info.text
        },
        {
          name: 'action',
          required: true,
          label: 'عملیات',
          align: 'left',
          field: row => ''
        }
      ]
    }
    this.reFreshTestQuestionList()
  },
  mounted () {
    if (this.questionType === 'QUESTION_BANK') {
      this.getSessions()
    } else {
      this.mounted = true
    }
  },
  methods: {
    onQuestionEdited () {
      this.editQuestionDialog = false
      this.refreshTestQuestions()
    },
    onQuestionCreated () {
      this.createNewQuestionDialog = false
      this.refreshTestQuestions()
    },
    openDialogEditQuestion (questionId) {
      this.selectedQuestionIdForEdit = questionId
      this.editQuestionDialog = true
    },
    openDialogCreateNewQuestion () {
      this.createNewQuestionDialog = true
    },
    getShowQuestionRoute (questionId, unitId, selectedSessionId) {
      if (this.questionType === 'QUESTION_BANK') {
        return { name: 'Admin.Unit.Questions.Show', params: { unit_id: unitId, session_template_id: selectedSessionId, id: questionId } }
      } else if (this.questionType === 'EVENT') {
        return { name: 'Admin.Event.TestSet.Questions.Show', params: { question_id: questionId } }
      }
    },
    emitValues () {

    },
    reFreshTestQuestionList () {
      if (!this.localValue || !Array.isArray(this.localValue)) {
        return
      }
      this.testQuestionList = JSON.parse(JSON.stringify(this.localValue))
    },
    editTestQuestion (testQuestion) {
      this.test.loading = true
      APIGateway.test.editTestQuestion(testQuestion)
        .then(() => {
          this.test.loading = false
          this.refreshTestQuestions()
        })
        .catch(() => {
          this.test.loading = false
        })
    },
    deleteQuestion (questionId) {
      this.$q.dialog({
        title: 'حذف سوال',
        message: 'آیا از حذف سوال اطمینان دارید؟',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.test.loading = true
        APIGateway.question.delete({ data: { id: questionId } })
          .then(() => {
            this.test.loading = false
            this.refreshTestQuestions()
          })
          .catch(() => {
            this.test.loading = false
          })
      }).onCancel(() => {})
    },
    refreshTestQuestions () {
      this.test.loading = true
      if (this.testId) {
        APIGateway.test.get(this.testId)
          .then((test) => {
            this.test.loading = false
            this.localValue = test.inputData.test_questions_info
            this.reFreshTestQuestionList()
          })
          .catch(() => {
            this.test.loading = false
          })
      } else if (this.testSetId) {
        APIGateway.testSet.get(this.testSetId)
          .then((testSet) => {
            this.test.loading = false
            this.localValue = testSet.inputData.test_set_questions
            this.reFreshTestQuestionList()
          })
          .catch(() => {
            this.test.loading = false
          })
      }
    },
    filterQuestionList () {
      if (this.selectedSessionId) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'session_template_questions__session_template', 'value', this.selectedSessionId)
      }

      this.$refs.entityIndexQuestions.search()
    },
    getSessions () {
      this.sessions.loading = true
      APIGateway.sessionTemplate.index({ unit: this.unitId || null, per_page: 999999 })
        .then((data) => {
          this.sessions = new SessionTemplateList(data.list)
          if (this.sessions.list.length > 0) {
            // this.selectedSession = this.sessions.list[0]
          }
          this.filterQuestionList()
          this.sessions.loading = false
          this.mounted = true
        })
        .catch(() => {
          this.sessions.loading = false
          this.mounted = true
        })
    },
    getSessionQuestions () {
      this.sessions.loading = true
      APIGateway.sessionTemplate.index({ unit: this.unitId || null, per_page: 999999 })
        .then((data) => {
          this.sessions = new SessionTemplateList(data.list)
          if (this.sessionOptions.length > 0) {
            this.selectedSession = this.sessionOptions[0]
          }
          this.sessions.loading = false
        })
        .catch(() => {
          this.sessions.loading = false
        })
    },
    onChangeQuestionListPage (response) {
      this.updateloadedQuestionsByArray(response.data.results)
    },
    updateloadedQuestionsByArray (array, allSelected = false) {
      if (!array || !Array.isArray(array)) {
        return
      }
      array.forEach(item => {
        const questionId = item.question || item.id
        const mark = item.mark || 0
        const isExtraMark = item.is_extra_mark || false
        const selected = allSelected || this.value.includes(questionId)
        const target = this.loadedQuestions[questionId]
        if (!target) {
          this.loadedQuestions[questionId] = {
            question: questionId,
            mark,
            is_extra_mark: isExtraMark,
            selected
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentsSelector {
}
</style>
