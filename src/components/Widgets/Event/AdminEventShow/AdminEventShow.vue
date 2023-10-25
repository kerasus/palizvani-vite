<template>
  <q-skeleton v-if="event.loading"
              type="text"
              width="200px" />
  <breadcrumbs v-else
               style="margin-top: 29px; margin-bottom: 19px;" />
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <q-card class="AdminEventShow">
    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
      <q-tab name="eventInfo"
             label="مشخصات" />
      <q-tab name="projects"
             label="پروژه‌ها" />
      <q-tab name="movies2"
             label="آزمون" />
      <q-tab name="members"
             label="اندیشه جویان" />
      <q-tab name="activity_sheet"
             label="فعالیت کلاسی" />
      <q-tab name="live_streaming_url"
             label="بخش آنلاین" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="eventInfo"
                   class="q-pa-none">
        <event-info v-model:event="event"
                    :event-id="$route.params.id" />
      </q-tab-panel>

      <q-tab-panel name="projects"
                   class="q-pa-none">
        <project-list :event-id="$route.params.id" />
      </q-tab-panel>
      <q-tab-panel name="movies2">
        آزمون
      </q-tab-panel>
      <q-tab-panel name="members"
                   class="q-pa-none">
        <members-list :event-id="$route.params.id" />
      </q-tab-panel>
      <q-tab-panel name="activity_sheet"
                   class="q-pa-none">
        <activity-sheet-list :event-id="$route.params.id" />
      </q-tab-panel>
      <q-tab-panel name="live_streaming_url">
        <live-streaming :event="event" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { Event } from 'src/models/Event.js'
import ProjectList from './components/ProjectList.vue'
import MembersList from './components/MembersList.vue'
import EventInfo from './components/EventInfo.vue'
import LiveStreaming from './components/LiveStreaming.vue'
import ActivitySheetList from './components/ActivitySheetList.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'Admin.Event.Show',
  components: {
    ProjectList,
    MembersList,
    Breadcrumbs,
    EventInfo,
    LiveStreaming,
    ActivitySheetList
  },
  data () {
    return {
      tab: 'eventInfo',
      event: new Event()
    }
  },
  computed: {
    eventId () {
      return this.event.id
    }
  },
  watch: {
    eventId (newValue) {
      if (!newValue) {
        return
      }

      this.updateBreadcrumbs()
    }
  },
  methods: {
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'رویدادها',
            to: { name: 'Admin.Event.Index' }
          },
          {
            label: this.event.title,
            to: { name: 'Admin.Event.Show', params: { id: this.$route.params.id } }
          }
        ]
      })
    }
  }
}
</script>
