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
                  ref="transcriptSheetHistoryList"
                  v-model:value="transcriptSheetHistoryListInputs"
                  :title="'لیست تاریخچه نمرات'"
                  :api="transcriptSheetHistoryListApi"
                  :table="transcriptSheetHistoryListTable"
                  :table-keys="transcriptSheetHistoryListTableKeys"
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
                   :to="{name: 'Admin.Classroom.TranscriptSheetHistory.Test.Create', params: {classroom_id: $route.params.classroom_id, test_set_id:inputData.props.row.id}, query: $route.query}"
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
import { TranscriptSheetHistory } from 'src/models/TranscriptSheetHistory.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { mixinAuthData } from 'src/mixin/Mixins.js'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'TranscriptSheetHistoryShow',
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
      transcriptSheetHistoryListInputs: [
        { type: 'hidden', name: 'unit', value: this.$route.params.unit_id },
      ],
      transcriptSheetHistoryListApi: APIGateway.transcriptSheetHistory.APIAdresses.base,
      transcriptSheetHistoryListTable: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شناسه',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'national_code',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.national_code
          },
          {
            name: 'score',
            required: true,
            label: 'نمره',
            align: 'left',
            field: row => row.score
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => ShamsiDate.getDateTime(row.creation_time)
          },
          {
            name: 'last_modification_time',
            required: true,
            label: 'تاریخ آخرین تغییر',
            align: 'left',
            field: row => ShamsiDate.getDateTime(row.last_modification_time)
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
      transcriptSheetHistoryListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  mounted () {
    this.$refs.transcriptSheetHistoryList.search()
    this.mounted = true
  },
  methods: {
  }
}
</script>
