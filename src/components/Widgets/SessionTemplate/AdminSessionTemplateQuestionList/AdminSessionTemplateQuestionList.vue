<template>
  <div class="AdminSessionTemplateQuestionList"
       :style="localOptions.style">
    <q-skeleton v-if="!unit.id || !sessionTemplate.id"
                type="text"
                width="200px" />
    <breadcrumbs v-else
                 style="margin-top: 29px; margin-bottom: 19px;" />
    <div class="flex justify-end q-mb-md">
      <q-btn label="ایجاد سوال جدید"
             color="primary"
             class="q-mr-md"
             :to="{ name: 'Admin.Unit.Questions.Create', pragma: { unit_id: $route.params.unit_id, session_template_id: $route.params.session_template_id } }" />
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-index v-if="mounted"
                  v-model:value="inputs"
                  title="لیست سوالات"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <div class="action-column-entity-index">
            <q-btn color="primary"
                   outline
                   round
                   icon="drive_file_rename_outline"
                   :to="{ name: 'Admin.Unit.Questions.Show', params: { unit_id: this.$route.params.unit_id, session_template_id: this.$route.params.session_template_id, id: inputData.props.row.id } }"
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
import { EntityIndex } from 'quasar-crud'
import { Unit } from 'src/models/Unit.js'
import { Question } from 'src/models/Question.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'
import { SessionTemplate } from 'src/models/SessionTemplate.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'AdminSessionTemplateQuestionList',
  components: {
    DeleteBtn,
    Breadcrumbs,
    EntityIndex
  },
  mixins: [mixinWidget],
  data () {
    return {
      unit: new Unit(),
      sessionTemplate: new SessionTemplate(),
      api: APIGateway.question.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'type', value: 'QUESTION_BANK' },
        { type: 'hidden', name: 'session_template_questions__session_template', value: this.$route.params.session_template_id }
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
            name: 'text',
            required: true,
            label: 'سوال',
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
            name: 'action',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: row => ''
          }
        ]
      },
      mounted: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.mounted = true
    Promise.all([
      this.getUnit(),
      this.getSessionTemplate()
    ])
      .then(() => {
        this.updateBreadcrumbs()
      })
      .catch(() => {
      })
  },
  methods: {
    getUnit () {
      return new Promise((resolve, reject) => {
        this.unit.loading = true
        APIGateway.unit.get(this.$route.params.unit_id)
          .then((unit) => {
            this.unit = new Unit(unit)
            this.unit.loading = false
            resolve()
          })
          .catch(() => {
            this.unit.loading = false
            reject()
          })
      })
    },
    getSessionTemplate () {
      return new Promise((resolve, reject) => {
        this.sessionTemplate.loading = true
        APIGateway.sessionTemplate.get(this.$route.params.session_template_id)
          .then((sessionTemplate) => {
            this.sessionTemplate = new SessionTemplate(sessionTemplate)
            this.sessionTemplate.loading = false
            resolve()
          })
          .catch(() => {
            this.sessionTemplate.loading = false
            reject()
          })
      })
    },
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'درس ها و چارت آموزشی',
            to: { name: 'Admin.Category.Index' }
          },
          {
            label: this.unit.category_info.title,
            to: { name: 'Admin.Category.Show', params: { id: this.unit.category_info.id } }
          },
          {
            label: this.unit.title,
            to: { name: 'Admin.Unit.Show', params: { id: this.unit.id } }
          },
          {
            label: this.sessionTemplate.title,
            to: { name: 'Admin.SessionTemplate.Show', params: { id: this.sessionTemplate.id } }
          },
          {
            label: 'لیست سوالات'
          }
        ]
      })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف (' + row.text + ') اطمینان دارید؟'
    }
  }
}
</script>
