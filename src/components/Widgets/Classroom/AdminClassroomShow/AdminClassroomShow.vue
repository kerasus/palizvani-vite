<template>
  <q-skeleton v-if="classroom.loading"
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
  <q-card class="AdminClassroomShow">
    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
      <q-tab name="classroomInfo"
             label="مشخصات" />
      <q-tab name="sessions"
             label="لیست جلسات" />
      <q-tab name="projects"
             label="پروژه‌ها" />
      <q-tab name="movies2"
             label="آزمون" />
      <q-tab name="members"
             label="اندیشه جویان" />
      <q-tab name="teams"
             label="گروه" />
      <q-tab name="graders"
             label="مصححین" />
      <q-tab name="leaders"
             label="سرگروه ها" />
      <q-tab name="activity_sheet"
             label="فعالیت کلاسی" />
      <q-tab name="live_streaming_url"
             label="بخش آنلاین" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="classroomInfo"
                   class="q-pa-none">
        <classroom-info v-model:classroom="classroom"
                        :classroom-id="$route.params.id" />
      </q-tab-panel>
      <q-tab-panel name="sessions"
                   class="q-pa-none">
        <session-list :classroom-id="$route.params.id" />
      </q-tab-panel>

      <q-tab-panel name="projects"
                   class="q-pa-none">
        <project-list :classroom-id="$route.params.id" />
      </q-tab-panel>
      <q-tab-panel name="movies2">
        آزمون
      </q-tab-panel>
      <q-tab-panel name="members"
                   class="q-pa-none">
        <members-list :classroom-id="$route.params.id" />
      </q-tab-panel>
      <q-tab-panel name="teams"
                   class="q-pa-none">
        <team-list :classroom-id="$route.params.id" />
      </q-tab-panel>
      <q-tab-panel name="graders"
                   class="q-pa-none">
        <grader-list :classroom-id="$route.params.id" />
      </q-tab-panel>
      <q-tab-panel name="leaders"
                   class="q-pa-none">
        <leader-list :classroom-id="$route.params.id" />
      </q-tab-panel>
      <q-tab-panel name="activity_sheet"
                   class="q-pa-none">
        <activity-sheet-list :classroom-id="$route.params.id" />
      </q-tab-panel>
      <q-tab-panel name="live_streaming_url">
        <live-streaming :classroom="classroom" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { Classroom } from 'src/models/Classroom.js'
import TeamList from './components/TeamList.vue'
import LeaderList from './components/LeaderList.vue'
import GraderList from './components/GraderList.vue'
import SessionList from './components/SessionList.vue'
import ProjectList from './components/ProjectList.vue'
import MembersList from './components/MembersList.vue'
import ClassroomInfo from './components/ClassroomInfo.vue'
import LiveStreaming from './components/LiveStreaming.vue'
import ActivitySheetList from './components/ActivitySheetList.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'Admin.Classroom.Show',
  components: {
    TeamList,
    LeaderList,
    GraderList,
    SessionList,
    ProjectList,
    MembersList,
    Breadcrumbs,
    ClassroomInfo,
    LiveStreaming,
    ActivitySheetList
  },
  data () {
    return {
      tab: 'classroomInfo',
      classroom: new Classroom()
    }
  },
  computed: {
    classroomId () {
      return this.classroom.id
    }
  },
  watch: {
    classroomId (newValue) {
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
            label: 'دوره های آموزشی',
            to: { name: 'Admin.Classroom.Index' }
          },
          {
            label: this.classroom.title,
            to: { name: 'Admin.Classroom.Show', params: { id: this.$route.params.id } }
          }
        ]
      })
    }
  }
}
</script>
