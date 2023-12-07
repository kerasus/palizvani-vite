<template>
  <div>
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-index v-if="mounted"
                  ref="testSetList"
                  v-model:value="testSetListInputs"
                  title="لیست آزمون ها"
                  :api="testSetListApi"
                  :table="testSetListTable"
                  :table-keys="testSetListTableKeys"
                  :show-search-button="false"
                  :show-reload-button="false"
                  :show-expand-button="false">
      <template v-slot:entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'actions'">
          <div class="action-column-entity-index">
            <q-btn size="md"
                   color="primary"
                   label="انتخاب"
                   :to="{name: 'Admin.Classroom.TestSet.Test.Create', params: {classroom_id: $route.params.classroom_id, test_set_id:inputData.props.row.id}}"
                   :loading="createInvoiceLoading"
                   class="q-mr-md" />
          </div>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
    </entity-index>
    <q-skeleton v-else
                type="rect"
                height="200px" />
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { TestSet } from 'src/models/TestSet.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { mixinAuthData } from 'src/mixin/Mixins.js'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'LeaderTeamsShow',
  components: {
    EntityIndex
  },
  mixins: [mixinAuthData],
  data () {
    return {
      mounted: false,
      createInvoiceLoading: false,
      classroom: new Classroom(),

      dropClassroomByAdminLoading: false,
      exportReportLoading: false,
      testSetListInputs: [
        { type: 'hidden', name: 'classroom', value: this.$route.params.classroom_id }
      ],
      testSetListApi: APIGateway.testSet.APIAdresses.base,
      testSetListTable: {
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
            label: 'عنوان آزمون',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'test_set_questions.length',
            required: true,
            label: 'تعداد سوالات',
            align: 'left',
            field: row => row.test_set_questions.length
          },
          {
            name: 'level',
            required: true,
            label: 'درجه سختی',
            align: 'left',
            field: row => (new TestSet(row)).level_info.label
          },
          {
            name: 'beginning_time',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => row.creation_time ? ShamsiDate.getDateTime(row.creation_time) : '-'
          },
          {
            name: 'creator_info',
            required: true,
            label: 'ایجاد کننده',
            align: 'left',
            field: row => row.creator_info.firstname + ' ' + row.creator_info.lastname
          },
          {
            name: 'actions',
            required: true,
            label: 'انتخاب',
            align: 'left',
            field: ''
          }
        ]
      },
      testSetListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  mounted () {
    this.setMembersListActionBtn()
    FormBuilderAssist.setAttributeByName(this.testSetListInputs, 'leader', 'value', this.user.id)
    this.mounted = true
  },
  methods: {
    setMembersListActionBtn () {
      FormBuilderAssist.setAttributeByName(this.testSetListInputs, 'btn', 'atClick', this.searchMembersList)
    },
    searchMembersList () {
      this.$refs.testSetList.search()
    }
  }
}
</script>
