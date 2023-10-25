<template>
  <breadcrumbs style="margin-top: 29px; margin-bottom: 19px;" />
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <q-card>
    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
      <q-tab name="eventInfo"
             label="اطلاعات دوره آموزشی" />
      <q-tab v-if="event.live_streaming_url"
             name="live_streaming_url"
             label="بخش آنلاین" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="eventInfo">
        <show-event-info v-if="mounted"
                         :options="{ profileMode: true }"
                         @onloadn="onloadnEvent" />
      </q-tab-panel>
      <q-tab-panel v-if="event.live_streaming_url"
                   name="live_streaming_url">
        <q-btn class="full-width q-mb-lg"
               color="primary"
               @click="goToLiveStreamUrl">
          رفتن به کلاس
        </q-btn>
        <q-banner>
          <div class="q-mb-md">
            نام کاربری اسکای روم:
            {{ user.national_code }}
          </div>
          <div>
            کلمه عبور اسکای روم:
            1234
          </div>
        </q-banner>
        <iframe :src="event.live_streaming_url"
                title="W3Schools Free Online Web Tutorials"
                style="height: 80vh"
                class="full-width" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { Event } from 'src/models/Event.js'
import Enums from 'src/assets/Enums/Enums.js'
import { Invoice } from 'src/models/Invoice.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import { ProjectAttendanceSheets } from 'src/models/ProjectAttendanceSheets.js'
import { SessionAttendanceSheets } from 'src/models/SessionAttendanceSheets.js'
import ShowEventInfo from 'src/components/Widgets/Event/ShowEventInfo/ShowEventInfo.vue'

export default {
  name: 'UserPanel.Profile.EventInfo',
  components: {
    Breadcrumbs,
    ShowEventInfo
  },
  mixins: [mixinAuth],
  data () {
    const eventId = this.$route.params.id
    return {
      mounted: false,
      tab: 'eventInfo',
      inputs: [],
      api: APIGateway.event.get(eventId),
      event: new Event(),
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
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'title',
            required: true,
            label: 'زمان شروع',
            align: 'left',
            field: row => row.beginning_time ? ShamsiDate.getDateTime(row.beginning_time) : '-'
          },
          {
            name: 'title',
            required: true,
            label: 'زمان پایان',
            align: 'left',
            field: row => row.ending_time ? ShamsiDate.getDateTime(row.ending_time) : '-'
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
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
    selectedCategoryId () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'category')?.value
    }
  },
  watch: {
    selectedCategoryId () {
      this.setInputValue('unit', null)
      this.getUnits(this.selectedCategoryId)
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    getCurrentUserAttendanceSheet (session) {
      if (!session?.session_attendance_sheets || session.session_attendance_sheets.length === 0) {
        return null
      }

      return session.session_attendance_sheets[0]
    },
    getProjectAttendanceSheets (project) {
      if (!project?.project_attendance_sheets || project.project_attendance_sheets.length === 0) {
        return null
      }

      return project.project_attendance_sheets[0]
    },
    goToLiveStreamUrl () {
      window.open(this.event.live_streaming_url, '_blank')
    },
    onloadnEvent (event) {
      this.event = new Event(event)
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'رویدادهای من',
            to: { name: 'UserPanel.Profile.AllEvents' }
          },
          {
            label: this.event.title,
            to: { name: 'UserPanel.Profile.EventInfo', params: { id: this.event.id } }
          }
        ]
      })
    },
    search () {
      this.$refs.entityIndex.search()
    },
    getEventHoldingTypeTitle (type) {
      const target = Enums.eventHoldingTypes.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    getEventStatusTitle (type) {
      const target = (new Event()).statusEnums.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    getInvoiceStatusTitle (type) {
      const target = (new Invoice()).statusEnums.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    loadInputDataOptions () {
      this.getCategories()
      this.getUnits()
    },
    setInputValue (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].value = value
    },
    getSelectOptions (result, value, label) {
      return result.map(item => {
        return {
          value: item[value],
          label: item[label]
        }
      })
    },
    loadSelectOptions (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].options = value
    }
  }
}
</script>
