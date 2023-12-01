<template>
  <div class="AdminSessionTemplateQuestionList"
       :style="localOptions.style">
    <!--    <q-skeleton v-if="mounted"-->
    <!--                type="text"-->
    <!--                width="200px" />-->
    <!--    <breadcrumbs v-else-->
    <!--                 style="margin-top: 29px; margin-bottom: 19px;" />-->
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
import { Question } from 'src/models/Question.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'
// import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'AdminSessionTemplateQuestionList',
  components: {
    EntityIndex,
    // Breadcrumbs,
    DeleteBtn
  },
  mixins: [mixinWidget],
  data () {
    return {
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
    // this.updateBreadcrumbs()
  },
  methods: {
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          // {
          //   label: 'لیست ',
          //   to: { name: this.indexPageRouteName }
          // },
          // {
          //   label: 'this.classroom.title',
          //   to: { name: this.showPageRouteName, params: { id: 12 } }
          // }
        ]
      })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف (' + row.text + ') اطمینان دارید؟'
    }
  }
}
</script>
