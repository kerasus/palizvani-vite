<template>
  <div class="AdminContentList"
       :style="localOptions.style">
    <breadcrumbs class="q-mb-xl"
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
                  v-model:value="inputs"
                  title="لیست محتواها"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :to="{name: 'Admin.Content.Show', params: {id: inputData.props.row.id}}">
            مشاهده جزییات
          </q-btn>
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
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import { SessionAttendanceSheets } from 'src/models/SessionAttendanceSheets'

export default {
  name: 'AdminSessionAttendanceSheetList',
  components: { EntityIndex, Breadcrumbs },
  mixins: [mixinWidget],
  data () {
    const sessionId = this.$route.params.session_id
    return {
      classroom: new Classroom(),
      api: APIGateway.sessionAttendanceSheets.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'session', value: sessionId }
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
            name: 'sender',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.owner.firstname + ' ' + row.owner.lastname
          },
          {
            name: 'sender',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.owner.national_code
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت تکلیف',
            align: 'left',
            field: row => (new SessionAttendanceSheets(row)).answer_status_info.label
          },
          {
            name: 'status',
            required: true,
            label: 'نتیجه تکلیف',
            align: 'left',
            field: row => (new SessionAttendanceSheets(row)).is_answer_verified_info.label
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
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
    this.getClassroom()
      .then(classroom => {
        this.classroom = new Classroom(classroom)
        this.$store.commit('AppLayout/updateBreadcrumbs', {
          visible: true,
          loading: false,
          path: [
            {
              label: 'دوره های آموزشی',
              to: { name: 'Admin.Classroom.Index' }
            },
            {
              label: this.classroom.title,
              to: { name: 'Admin.Classroom.Show', params: { id: this.$route.params.classroom_id } }
            },
            {
              label: 'لیست حضور و غیاب',
              to: { name: 'Admin.Classroom.Session.AttendanceSheetList', params: { classroom_id: this.$route.params.classroom_id, session_id: this.$route.params.session_id } }
            }
          ]
        })
      })
  },
  methods: {
    getClassroom () {
      return APIGateway.classroom.get(this.$route.params.classroom_id)
    }
  }
}
</script>

<style scoped lang="scss">
.AdminContentList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
