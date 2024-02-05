<template>
  <entity-index v-if="mounted"
                ref="announceResultList"
                v-model:value="announceResultListInputs"
                title="کارنامه"
                :api="announceResultListApi"
                :table="announceResultListTable"
                :table-keys="announceResultListTableKeys"
                :show-search-button="false"
                :show-reload-button="false"
                :show-expand-button="false">
    <template #toolbar>
      <q-btn label="خروجی اکسل"
             color="primary"
             :loading="exportReportLoading"
             outline
             @click="getExcel" />
    </template>
    <template v-slot:entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'final_score'">
        <q-input v-model="inputData.props.row.final_score" />
      </template>
      <template v-else-if="inputData.col.name === 'actions'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 color="primary"
                 outline
                 label="اعمال تغییرات"
                 class="q-mr-md"
                 :loading="updateTranscriptSheetLoading"
                 @click="updateTranscriptSheets(inputData.props.row)" />
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
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import Assist from 'assets/js/Assist.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { TranscriptSheet } from 'src/models/TranscriptSheet.js'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'ActivitySheetList',
  components: {
    EntityIndex
  },
  props: {
    classroom: {
      type: Classroom,
      default: new Classroom()
    }
  },
  data () {
    const classroomId = this.classroom.id
    return {
      mounted: false,
      exportReportLoading: false,
      updateTranscriptSheetLoading: false,

      announceResultListInputs: [
        { type: 'hidden', name: 'registration__classroom', value: classroomId },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
      ],
      announceResultListApi: APIGateway.transcriptSheet.APIAdresses.base,
      announceResultListTable: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'owner_info.fullname',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.registration_info.owner_info.firstname + ' ' + row.registration_info.owner_info.lastname
          },
          {
            name: 'owner_info.national_code',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.registration_info.owner_info.national_code
          },
          {
            name: 'attendance_score',
            required: true,
            label: 'نمره حضور و غیاب',
            align: 'left',
            field: row => row.attendance_score
          },
          {
            name: 'highest_test_score',
            required: true,
            label: 'نمره آزمون',
            align: 'left',
            field: row => row.highest_test_score
          },
          {
            name: 'final_score',
            required: true,
            label: 'نمره نهایی',
            align: 'left',
            field: row => row.final_score
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت نهایی',
            align: 'left',
            field: row => new TranscriptSheet(row).status_info.label
          },
          {
            name: 'actions',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: () => ''
          }
        ]
      },
      announceResultListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  mounted () {
    this.setActivitySheetListActionBtn()
    this.mounted = true
  },
  methods: {
    setActivitySheetListActionBtn () {
      FormBuilderAssist.setAttributeByName(this.announceResultListInputs, 'btn', 'atClick', this.searchActivitySheetList)
    },
    searchActivitySheetList () {
      this.$refs.activitySheet.search()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    },
    updateTranscriptSheets(transcriptSheet) {
      this.updateTranscriptSheetLoading = true
      APIGateway.transcriptSheet.update({
        id: transcriptSheet.id,
        final_score: transcriptSheet.final_score
      })
        .then(() => {
          this.$refs.announceResultList.search()
          this.updateTranscriptSheetLoading = false
        })
        .catch(() => {
          this.updateTranscriptSheetLoading = false
        })
    },
    getExcel () {
      this.exportReportLoading = true
      APIGateway.transcriptSheet.exportReport({
        registration__classroom: this.classroom.id
      })
        .then((xlsxData) => {
          Assist.saveXlsx(xlsxData, this.classroom.title)
          this.exportReportLoading = false
        })
        .catch(() => {
          this.exportReportLoading = false
        })
    }
  }
}
</script>
