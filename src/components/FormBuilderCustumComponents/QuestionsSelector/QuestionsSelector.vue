<template>
  <div class="ContentsSelector q-mt-md">
    <q-banner>
      انتخاب سوال
    </q-banner>
    <div v-if="!readonly && unitId !== false">
      <div class="row q-col-gutter-md q-mt-xs">
        <div class="col-md-4">
          <div>
            نوع جلسه
          </div>
          <div>
            <q-select v-model="selectedSession"
                      :options="sessionOptions"
                      :loading="sessions.loading"
                      emit-value
                      clearable
                      map-options
                      @clear="clearFn()" />
          </div>
        </div>
        <div class="col-md-4 flex items-end">
          <q-btn color="primary"
                 label="تایید فیلتر"
                 @click="filterQuestionList" />
        </div>
      </div>
    </div>
    <div class="content-list q-mt-lg">
      <entity-index ref="entityIndexQuestions"
                    v-model:value="inputs"
                    :title="'لیست سوالات ' + selectedSessionTitle"
                    :api="api"
                    :table="table"
                    :table-keys="tableKeys"
                    :show-search-button="false"
                    :show-expand-button="false"
                    :show-reload-button="false"
                    @onPageChanged="onChangeQuestionListPage">
        <template #entity-index-table-cell="{inputData}">
          <template v-if="inputData.col.name === 'choice'">
            <q-checkbox v-model="loadedQuestions[inputData.props.row.id].selected"
                        color="primary"
                        @update:model-value="emitValues" />
          </template>
          <template v-else-if="inputData.col.name === 'mark'">
            <q-input v-model="loadedQuestions[inputData.props.row.id].mark"
                     :disable="!loadedQuestions[inputData.props.row.id].selected"
                     style="width: 80px"
                     @update:model-value="emitValues" />
          </template>
          <template v-else-if="inputData.col.name === 'number'">
            {{ inputData.rowNumber }}
          </template>
          <template v-else-if="inputData.col.name === 'is_extra_mark'">
            <q-toggle v-model="loadedQuestions[inputData.props.row.id].is_extra_mark"
                      :disable="!loadedQuestions[inputData.props.row.id].selected"
                      @update:model-value="emitValues" />
          </template>
          <template v-else-if="inputData.col.name === 'action'">
            <div class="action-column-entity-index">
              <q-btn v-if="$route.params.unit_id"
                     color="primary"
                     outline
                     :to="getShowQuestionRoute(inputData.props.row.id, $route.params.unit_id, selectedSessionId)">
                مشاهده پاسخ
                <q-icon name="visibility"
                        class="q-ml-md" />
              </q-btn>
            </div>
          </template>
          <template v-else>
            {{ inputData.col.value }}
          </template>
        </template>
      </entity-index>
    </div>
    <div class="content-list q-mt-lg">
      <template v-if="questionType === 'QUESTION_BANK'">
        <div class="row">
          <div class="col-md-4 col-12">
            تعداد سوالات اجباری انتخاب شده:
            {{ countOfForceQuestions }}
          </div>
          <div class="col-md-4 col-12">
            مجموع بارم‌ها:
            {{ sumOfTotalMarks }}
          </div>
          <div class="col-12" />
          <div class="col-md-4 col-12">
            تعداد سوالات اختیاری انتخاب شده:
            {{ countOfExtraQuestions }}
          </div>
          <div class="col-md-4 col-12">
            مجموع بارم سوالات اختیاری:
            {{ sumOfExtraMarks }}
          </div>
        </div>
      </template>
      <template v-else-if="questionType === 'EVENT'">
        <div class="row">
          <div class="col-md-4 col-12">
            تعداد سوالات انتخاب شده:
            {{ selectedQuestions.length }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import NormalizeNumber from 'src/assets/js/NormalizeNumber.js'
import { Question, QuestionList } from 'src/models/Question.js'
import { SessionTemplateList } from 'src/models/SessionTemplate.js'

export default {
  name: 'QuestionsSelector',
  components: {
    EntityIndex
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
    unitId: {
      default: null,
      type: [Number, String, Boolean]
    }
  },
  emits: ['update:value'],
  data () {
    return {
      mounted: false,
      selectedSession: null,
      sessions: new SessionTemplateList(),
      sessionQuestions: new QuestionList(),
      loadedQuestions: {},

      api: APIGateway.question.APIAdresses.base,
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
      return this.selectedQuestions.filter(item => !item.is_extra_mark).length
    },
    countOfExtraQuestions () {
      return this.selectedQuestions.filter(item => item.is_extra_mark).length
    },
    sumOfExtraMarks () {
      let sum = 0
      this.selectedQuestions.filter(item => item.is_extra_mark).forEach(item => {
        sum += parseInt(NormalizeNumber.toEnglish(item.mark.toString()))
      })

      return sum
    },
    sumOfTotalMarks () {
      let sum = 0
      this.selectedQuestions.forEach(item => {
        sum += parseInt(NormalizeNumber.toEnglish(item.mark.toString()))
      })

      return sum
    },
    selectedQuestions () {
      const resultArray = []
      Object.keys(this.loadedQuestions).forEach(questionId => {
        if (this.loadedQuestions[questionId].selected) {
          resultArray.push(this.loadedQuestions[questionId])
        }
      })
      return resultArray
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
      this.updateloadedQuestionsByArray(newValue, true)
    }
  },
  created () {
    if (this.questionType === 'QUESTION_BANK') {
      this.table.columns = [
        {
          name: 'choice',
          required: true,
          label: 'انتخاب',
          align: 'left',
          field: () => ''
        },
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
          name: 'text',
          required: true,
          label: 'عنوان سوال',
          align: 'left',
          field: row => row.text
        },
        {
          name: 'mark',
          required: true,
          label: 'بارم',
          align: 'left',
          field: row => row.mark
        },
        {
          name: 'level',
          required: true,
          label: 'سطح سوال',
          align: 'left',
          field: row => new Question(row).level_info.label
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
          name: 'choice',
          required: true,
          label: 'انتخاب',
          align: 'left',
          field: () => ''
        },
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
          name: 'text',
          required: true,
          label: 'عنوان سوال',
          align: 'left',
          field: row => row.text
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
  },
  mounted () {
    if (this.questionType === 'QUESTION_BANK') {
      this.getSessions()
    } else {
      this.mounted = true
    }
  },
  methods: {
    getShowQuestionRoute (questionId, unitId, selectedSessionId) {
      if (this.questionType === 'QUESTION_BANK') {
        return { name: 'Admin.Unit.Questions.Show', params: { unit_id: unitId, session_template_id: selectedSessionId, id: questionId } }
      } else if (this.questionType === 'EVENT') {
        return { name: 'Admin.Event.TestSet.Questions.Show', params: { question_id: questionId } }
      }
    },
    emitValues () {
      this.localValue = this.selectedQuestions
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
    clearFn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'session_template_questions__session_template', 'value', null)
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
