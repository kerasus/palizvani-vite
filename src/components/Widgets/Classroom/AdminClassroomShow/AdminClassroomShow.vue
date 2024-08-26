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
  <q-card v-if="mounted"
          class="AdminClassroomShow">
    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
      <q-tab v-if="canShowTabPage('classroomInfo')"
             name="classroomInfo"
             label="مشخصات" />
      <q-tab v-if="canShowTabPage('sessions')"
             :disable="!classroom.id"
             name="sessions"
             :label="sessionsTabTitle" />
      <q-tab v-if="canShowTabPage('projects')"
             :disable="!classroom.id"
             name="projects"
             label="پروژه‌ها" />
      <q-tab v-if="canShowTabPage('exams')"
             :disable="!classroom.id"
             name="exams"
             :label="localOptions.classroomType === 'TRAINING' ? 'آزمون' : 'پرسشنامه'" />
      <q-tab v-if="canShowTabPage('members')"
             :disable="!classroom.id"
             name="members"
             label="اندیشه جویان" />
      <q-tab v-if="canShowTabPage('teams')"
             :disable="!classroom.id"
             name="teams"
             label="گروه" />
      <q-tab v-if="canShowTabPage('graders')"
             :disable="!classroom.id"
             name="graders"
             label="مصححین" />
      <q-tab v-if="canShowTabPage('leaders')"
             :disable="!classroom.id"
             name="leaders"
             label="سرگروه ها" />
      <q-tab v-if="canShowTabPage('activity_sheet')"
             :disable="!classroom.id"
             name="activity_sheet"
             label="فعالیت کلاسی" />
      <q-tab v-if="canShowTabPage('announce_result')"
             :disable="!classroom.id"
             name="announce_result"
             label="کارنامه" />
      <q-tab v-if="canShowTabPage('live_streaming_url')"
             :disable="!classroom.id"
             name="live_streaming_url"
             label="بخش آنلاین" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="classroomInfo"
                   class="q-pa-none">
        <classroom-info v-model:classroom="classroom"
                        :classroom-type="localOptions.classroomType"
                        :classroom-id="parseInt($route.params.id)" />
      </q-tab-panel>
      <q-tab-panel name="sessions"
                   class="q-pa-none">
        <session-list :classroom-id="parseInt($route.params.id)"
                      :classroom-type="localOptions.classroomType" />
      </q-tab-panel>

      <q-tab-panel name="projects"
                   class="q-pa-none">
        <project-list :classroom-id="parseInt($route.params.id)" />
      </q-tab-panel>
      <q-tab-panel name="exams"
                   class="q-pa-none">
        <test-list v-if="classroom.id"
                   :classroom="classroom"
                   :classroom-id="parseInt($route.params.id)"
                   :classroom-type="localOptions.classroomType" />
      </q-tab-panel>
      <q-tab-panel name="members"
                   class="q-pa-none">
        <members-list :classroom-id="parseInt($route.params.id)" />
      </q-tab-panel>
      <q-tab-panel name="teams"
                   class="q-pa-none">
        <team-list :classroom-id="parseInt($route.params.id)" />
      </q-tab-panel>
      <q-tab-panel name="graders"
                   class="q-pa-none">
        <grader-list :classroom-id="parseInt($route.params.id)" />
      </q-tab-panel>
      <q-tab-panel name="leaders"
                   class="q-pa-none">
        <leader-list :classroom-id="parseInt($route.params.id)" />
      </q-tab-panel>
      <q-tab-panel name="activity_sheet"
                   class="q-pa-none">
        <activity-sheet-list v-if="classroom.id"
                             :classroom="classroom"
                             :classroom-id="parseInt($route.params.id)" />
      </q-tab-panel>
      <q-tab-panel name="announce_result"
                   class="q-pa-none">
        <announce-result-list v-if="classroom.id"
                              :classroom="classroom" />
      </q-tab-panel>
      <q-tab-panel name="live_streaming_url">
        <live-streaming v-if="classroom.id"
                        :classroom="classroom" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import TeamList from './components/TeamList.vue'
import TestList from './components/TestList.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { Classroom } from 'src/models/Classroom.js'
import LeaderList from './components/LeaderList.vue'
import GraderList from './components/GraderList.vue'
import SessionList from './components/SessionList.vue'
import ProjectList from './components/ProjectList.vue'
import MembersList from './components/MembersList.vue'
import { UnitCategory } from 'src/models/UnitCategory.js'
import ClassroomInfo from './components/ClassroomInfo.vue'
import LiveStreaming from './components/LiveStreaming.vue'
import ActivitySheetList from './components/ActivitySheetList.vue'
import AnnounceResultList from './components/AnnounceResultList.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'Admin.Classroom.Show',
  components: {
    TeamList,
    TestList,
    LeaderList,
    GraderList,
    SessionList,
    ProjectList,
    MembersList,
    Breadcrumbs,
    ClassroomInfo,
    LiveStreaming,
    ActivitySheetList,
    AnnounceResultList
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      tab: 'classroomInfo',
      classroom: new Classroom()
    }
  },
  computed: {
    classroomId () {
      return this.classroom.id
    },
    classroomTypeTitle () {
      const unitCategory = new UnitCategory({ type: this.localOptions.classroomType })
      return unitCategory.type_info.label
    },
    sessionsTabTitle () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'لیست جلسات'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'لیست برنامه ها'
      }
      return 'لیست جلسات'
    },
    indexPageRouteName () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'Admin.Classroom.Index'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'Admin.Event.Index'
      }
      return 'Admin.Classroom.Index'
    },
    showPageRouteName () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'Admin.Classroom.Show'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'Admin.Event.Show'
      }
      return 'Admin.Classroom.Show'
    },
    canShowTabPage () {
      return (tabName) => {
        const tabs = {
          TRAINING: [
            'classroomInfo',
            'sessions',
            'projects',
            'exams',
            'members',
            'teams',
            'graders',
            'leaders',
            'activity_sheet',
            'announce_result',
            'live_streaming_url'
          ],
          EVENT: [
            'classroomInfo',
            'sessions',
            'members',
            'exams',
            'live_streaming_url'
          ]
        }

        return tabs[this.localOptions.classroomType].includes(tabName)
      }
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
  mounted () {
    this.mounted = true
  },
  methods: {
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'لیست ' + this.classroomTypeTitle,
            to: { name: this.indexPageRouteName }
          },
          {
            label: this.classroom.title,
            to: { name: this.showPageRouteName, params: { id: this.$route.params.id } }
          }
        ]
      })
    }
  }
}
</script>
