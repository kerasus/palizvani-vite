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
      <q-btn label="اعلام نتایج"
             color="primary"
             :loading="notifyAnnounceResultLoading"
             outline
             class="q-ml-md"
             @click="notifyAnnounceResult" />
      <q-btn label="بستن کلاس"
             color="primary"
             :loading="closeClassroomLoading"
             outline
             class="q-ml-md"
             @click="closeClassroom" />
    </template>
    <template v-slot:entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'actions'">
        <q-btn color="primary"
               outline
               label="عملیات"
               :loading="updateTranscriptSheetLoading">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item v-close-popup
                      clickable
                      @click="updateTranscriptSheetsFinalScore(inputData.props.row)">
                <q-item-section>تغییر نمره نهایی</q-item-section>
              </q-item>
              <q-item v-if="!inputData.props.row.certification"
                      v-close-popup
                      clickable
                      @click="updateTranscriptSheetsUploadCertification(inputData.props.row)">
                <q-item-section>آپلود فایل مدرک</q-item-section>
              </q-item>
              <q-item v-if="inputData.props.row.certification"
                      v-close-popup
                      clickable
                      @click="updateTranscriptSheetsRemoveCertification(inputData.props.row)">
                <q-item-section>حذف فایل مدرک</q-item-section>
              </q-item>
              <q-item v-close-popup
                      clickable
                      @click="updateTranscriptSheetsUploadIsSentByPost(inputData.props.row)">
                <q-item-section>تغییر وضعیت پست شده</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </template>
      <template v-else-if="inputData.col.name === 'is_sent_by_post'">
        <q-badge :color="inputData.col.value ? 'green' : 'red'"
                 outline>
          <template v-if="inputData.col.value">
            پست شده
          </template>
          <template v-else>
            پست نشده
          </template>
        </q-badge>
      </template>
      <template v-else-if="inputData.col.name === 'certification'">
        <a v-if="inputData.col.value"
           :href="inputData.col.value"
           target="_blank">
          <q-btn color="primary"
                 label="دانلود مدرک" />
        </a>
        <q-icon v-else
                name="close"
                color="red" />
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
import BtnControl from 'src/components/Control/btn.vue'
import { Registration } from 'src/models/Registration.js'
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
      closeClassroomLoading: false,
      notifyAnnounceResultLoading: false,
      updateTranscriptSheetLoading: false,

      announceResultListInputs: [
        { type: 'select', name: 'status', value: null, label: 'وضعیت نهایی', options: (new TranscriptSheet()).statusEnums, placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'select', name: 'registration__status', value: null, label: 'وضعیت ثبت نام', options: (new Registration()).statusEnums, placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'optionGroupRadio', name: 'certification__isnull', value: null, label: 'مدرک', options: [{ label: 'همه موارد', value: null }, { label: 'آپلود شده', value: false }, { label: 'آپلود نشده', value: true }], placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'hidden', name: 'registration__classroom', value: classroomId },
        {
          type: BtnControlComp,
          name: 'btn',
          label: 'جستجو',
          placeholder: ' ',
          atClick: () => {
            this.$refs.announceResultList.search()
          },
          col: 'col-md-2 col-12'
        }
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
            name: 'is_sent_by_post',
            required: true,
            label: 'ارسال شده با پست',
            align: 'left',
            field: row => row.is_sent_by_post
          },
          {
            name: 'certification',
            required: true,
            label: 'مدرک',
            align: 'left',
            field: row => row.certification
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
    this.mounted = true
  },
  methods: {
    closeClassroom () {
      this.closeClassroomLoading = true
      APIGateway.classroom.close(this.classroom.id)
        .then(() => {
          this.closeClassroomLoading = false
          this.$refs.announceResultList.search()
        })
        .catch(() => {
          this.closeClassroomLoading = false
        })
    },
    notifyAnnounceResult () {
      this.notifyAnnounceResultLoading = true
      APIGateway.classroom.notifyAnnounceResult(this.classroom.id)
        .then(() => {
          this.notifyAnnounceResultLoading = false
          this.$refs.announceResultList.search()
        })
        .catch(() => {
          this.notifyAnnounceResultLoading = false
        })
    },
    searchActivitySheetList () {
      this.$refs.activitySheet.search()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    },
    updateTranscriptSheetsFinalScore (transcriptSheet) {
      this.$q.dialog({
        title: 'تغییر نمره نهایی',
        message: 'نمره نهایی مورد نظر را وارد کنید:',
        prompt: {
          model: null,
          type: 'text'
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        this.updateTranscriptSheetLoading = true
        APIGateway.transcriptSheet.update(transcriptSheet.id, {
          final_score: data
        })
          .then(() => {
            this.$refs.announceResultList.search()
            this.updateTranscriptSheetLoading = false
          })
          .catch(() => {
            this.updateTranscriptSheetLoading = false
          })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    updateTranscriptSheetsUploadCertification (transcriptSheet) {
      this.$q.dialog({
        title: 'آپلود فایل مدرک',
        message: 'فایل مدرک را انتخاب کنید:',
        prompt: {
          model: null,
          type: 'file'
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        this.updateTranscriptSheetLoading = true
        const formData = new FormData()
        formData.append('certification', data[0])
        APIGateway.transcriptSheet.update(transcriptSheet.id, formData)
          .then(() => {
            this.$refs.announceResultList.search()
            this.updateTranscriptSheetLoading = false
          })
          .catch(() => {
            this.updateTranscriptSheetLoading = false
          })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    updateTranscriptSheetsRemoveCertification (transcriptSheet) {
      this.$q.dialog({
        title: 'حذف فایل مدرک',
        message: 'آیا از حذف فایل مدرک اطمینان دارید؟',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.updateTranscriptSheetLoading = true
        APIGateway.transcriptSheet.update(transcriptSheet.id, {
          certification: null
        })
          .then(() => {
            this.$refs.announceResultList.search()
            this.updateTranscriptSheetLoading = false
          })
          .catch(() => {
            this.updateTranscriptSheetLoading = false
          })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    updateTranscriptSheetsUploadIsSentByPost (transcriptSheet) {
      const state = transcriptSheet.is_sent_by_post ? 'نشده' : 'شده'
      this.$q.dialog({
        title: 'ارسال شده با پست',
        message: 'آیا از تغییر به حالت ارسال ' + state + ' با پست اطمینان دارید؟',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.updateTranscriptSheetLoading = true
        APIGateway.transcriptSheet.update(transcriptSheet.id, {
          is_sent_by_post: transcriptSheet.is_sent_by_post ? 0 : 1
        })
          .then(() => {
            this.$refs.announceResultList.search()
            this.updateTranscriptSheetLoading = false
          })
          .catch(() => {
            this.updateTranscriptSheetLoading = false
          })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    getExcel () {
      this.exportReportLoading = true
      APIGateway.transcriptSheet.exportReport({
        type: 'list',
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
