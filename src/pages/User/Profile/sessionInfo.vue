<template>
  <div>
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
    <entity-show v-if="mounted"
                 v-model:value="inputs"
                 title="جزییات جلسه"
                 :api="api"
                 :show-expand-button="false"
                 :show-edit-button="false"
                 :show-index-button="false"
                 :show-reload-button="false"
                 :before-load-input-data="beforeLoadInputData">
      <template #before-form-builder>
        <div class="session-title-and-time-row">
          <div class="item">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="18.165"
                   height="19.91"
                   viewBox="0 0 18.165 19.91">
                <g id="Document"
                   transform="translate(0)">
                  <path id="Combined_Shape"
                        data-name="Combined Shape"
                        d="M0,14.553v-9.2A4.973,4.973,0,0,1,5.215,0l7.693,0a5.025,5.025,0,0,1,5.257,5.357v9.2a4.973,4.973,0,0,1-5.215,5.354l-7.693,0A5.025,5.025,0,0,1,0,14.553ZM5.22,1.5A3.494,3.494,0,0,0,1.5,5.357v9.2A3.5,3.5,0,0,0,5.256,18.41l7.689,0a3.494,3.494,0,0,0,3.721-3.854v-9.2A3.5,3.5,0,0,0,12.909,1.5ZM5.5,14.973a.75.75,0,1,1,0-1.5h7.22a.75.75,0,1,1,0,1.5Zm0-4.186a.75.75,0,1,1,0-1.5h7.22a.75.75,0,0,1,0,1.5Zm0-4.177a.75.75,0,0,1,0-1.5H8.251a.75.75,0,0,1,0,1.5Z"
                        transform="translate(0 0)"
                        fill="#aaa095" />
                </g>
              </svg>
            </div>
            <div class="title">
              {{ title }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <svg id="Calendar"
                   xmlns="http://www.w3.org/2000/svg"
                   width="19.5"
                   height="21.5"
                   viewBox="0 0 19.5 21.5">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M5.521,21.5C2.115,21.5,0,19.4,0,16.023V6.973A5,5,0,0,1,4.965,1.6V.75a.75.75,0,0,1,1.5,0v.83h6.578V.75a.75.75,0,0,1,1.5,0V1.6a5.382,5.382,0,0,1,3.532,1.46A5.379,5.379,0,0,1,19.5,6.976V16.1c0,3.332-2.116,5.4-5.522,5.4ZM1.5,16.023C1.5,18.588,2.928,20,5.521,20h8.458C16.572,20,18,18.615,18,16.1V8.9H1.5ZM18,7.4V6.973a3.862,3.862,0,0,0-.987-2.855A3.867,3.867,0,0,0,14.543,3.1v.938a.75.75,0,1,1-1.5,0V3.08H6.466v.961a.75.75,0,0,1-1.5,0V3.1A3.486,3.486,0,0,0,1.5,6.973V7.4Zm-4.553,8.542a.746.746,0,0,1,.745-.75H14.2a.75.75,0,1,1-.754.75Zm-4.437,0a.746.746,0,0,1,.745-.75h.009a.75.75,0,1,1-.754.75Zm-4.448,0a.747.747,0,0,1,.746-.75h.009a.75.75,0,1,1-.755.75Zm8.885-3.886a.747.747,0,0,1,.745-.751H14.2a.75.75,0,1,1-.754.751Zm-4.437,0a.747.747,0,0,1,.745-.751h.009a.75.75,0,1,1-.754.751Zm-4.448,0a.747.747,0,0,1,.746-.751h.009a.75.75,0,1,1-.755.751Z"
                      transform="translate(0 0)"
                      fill="#aaa095" />
              </svg>
            </div>
            <div class="title">
              شروع:
              {{ startingTime }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <svg id="Calendar"
                   xmlns="http://www.w3.org/2000/svg"
                   width="19.5"
                   height="21.5"
                   viewBox="0 0 19.5 21.5">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M5.521,21.5C2.115,21.5,0,19.4,0,16.023V6.973A5,5,0,0,1,4.965,1.6V.75a.75.75,0,0,1,1.5,0v.83h6.578V.75a.75.75,0,0,1,1.5,0V1.6a5.382,5.382,0,0,1,3.532,1.46A5.379,5.379,0,0,1,19.5,6.976V16.1c0,3.332-2.116,5.4-5.522,5.4ZM1.5,16.023C1.5,18.588,2.928,20,5.521,20h8.458C16.572,20,18,18.615,18,16.1V8.9H1.5ZM18,7.4V6.973a3.862,3.862,0,0,0-.987-2.855A3.867,3.867,0,0,0,14.543,3.1v.938a.75.75,0,1,1-1.5,0V3.08H6.466v.961a.75.75,0,0,1-1.5,0V3.1A3.486,3.486,0,0,0,1.5,6.973V7.4Zm-4.553,8.542a.746.746,0,0,1,.745-.75H14.2a.75.75,0,1,1-.754.75Zm-4.437,0a.746.746,0,0,1,.745-.75h.009a.75.75,0,1,1-.754.75Zm-4.448,0a.747.747,0,0,1,.746-.75h.009a.75.75,0,1,1-.755.75Zm8.885-3.886a.747.747,0,0,1,.745-.751H14.2a.75.75,0,1,1-.754.751Zm-4.437,0a.747.747,0,0,1,.745-.751h.009a.75.75,0,1,1-.754.751Zm-4.448,0a.747.747,0,0,1,.746-.751h.009a.75.75,0,1,1-.755.751Z"
                      transform="translate(0 0)"
                      fill="#aaa095" />
              </svg>
            </div>
            <div class="title">
              پایان:
              {{ endingTime }}
            </div>
          </div>
        </div>
      </template>
    </entity-show>
  </div>
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { Session } from 'src/models/Session.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'UserPanel.Profile.SessionInfo',
  components: {
    EntityShow,
    Breadcrumbs
  },
  data () {
    return {
      classroom: new Classroom(),
      session: new Session(),
      mounted: false,
      api: null,
      inputs: [
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-md-12' },
        { type: 'separator', name: 'space', size: '1px', col: 'col-md-12' },
        { type: 'inputEditor', name: 'syllabus', responseKey: 'syllabus', label: 'مقرری جلسه', col: 'col-md-12' },
        { type: 'separator', name: 'space', size: '1px', col: 'col-md-12' },
        { type: 'inputEditor', name: 'assignment_description', responseKey: 'assignment_description', label: 'تکلیف جلسه', col: 'col-md-12' },

        { type: 'hidden', name: 'title', responseKey: 'title', label: 'نام جلسه', col: 'col-md-1' },
        { type: 'hidden', name: 'starting_time', responseKey: 'starting_time', label: 'زمان شروع جلسه', col: 'col-md-1' },
        { type: 'hidden', name: 'ending_time', responseKey: 'ending_time', label: 'زمان پایان جلسه', col: 'col-md-1' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-1' }
      ]
    }
  },
  computed: {
    title () {
      return this.getInputValue('title')
    },
    endingTime () {
      const data = this.getInputValue('ending_time')
      if (!data) {
        return '-'
      }

      return ShamsiDate.getDateTime(data)
    },
    startingTime () {
      const data = this.getInputValue('starting_time')
      if (!data) {
        return '-'
      }

      return ShamsiDate.getDateTime(data)
    }
  },
  mounted() {
    this.api = APIGateway.session.APIAdresses.byId(this.$route.params.id)
    this.mounted = true
  },
  methods: {
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'دوره های من',
            to: { name: 'UserPanel.Profile.AllClassrooms' }
          },
          {
            label: this.classroom.title,
            to: { name: 'UserPanel.Profile.ClassroomInfo', params: { id: this.classroom.id } }
          },
          {
            label: 'جزییات جلسه',
            to: { name: 'UserPanel.Profile.SessionInfo', params: { id: this.$route.params.id } }
          }
        ]
      })
    },
    getInputValue (name) {
      return this.inputs.find(input => input.name === name).value
    },
    beforeLoadInputData (data) {
      this.session = new Session(data)
      this.classroom.loading = true
      this.getClassInfo(this.session.classroom)
    },
    getClassInfo (classroomId) {
      this.classroom.loading = true
      APIGateway.classroom.get(classroomId)
        .then(classroom => {
          this.classroom = new Classroom(classroom)
          this.updateBreadcrumbs()
          this.classroom.loading = false
        })
        .catch(() => {
          this.classroom.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.entity-show {
  .session-title-and-time-row {
    background-color: #FCF9F4;
    margin: -16px;
    width: calc( 100% + 32px );
    max-width: calc( 100% + 32px );
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    padding: 16px;
    border-bottom: solid 1px #DFE1EC;
    margin-bottom: 24px;
    .item {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      width: 25%;
      align-items: center;
      .icon {
        padding-right: 11px;
      }
      .title {
        padding-right: 11px;
      }
    }
  }
}
</style>
