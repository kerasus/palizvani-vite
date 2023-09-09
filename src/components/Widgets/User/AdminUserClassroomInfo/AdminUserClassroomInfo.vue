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
  <q-card class="q-mb-md">
    <q-card-section>
      <q-banner>
        <div class="row">
          <div class="col-md-3">
            {{ userInfo.fullname() }}
          </div>
          <div class="col-md-3">
            کد ملی:
            {{ userInfo.national_code }}
          </div>
          <div class="col-md-3">
            شماره همراه:
            {{ userInfo.mobile_number }}
          </div>
          <div class="col-md-3">
            <q-btn color="primary"
                   :to="{name: 'Admin.User.Show', params: {id: userInfo.id}}">
              مشاهده کاربر
            </q-btn>
          </div>
        </div>
      </q-banner>
    </q-card-section>
  </q-card>
  <q-card>
    <q-tabs v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
      <q-tab name="classroomInfo"
             label="اطلاعات دوره آموزشی" />
      <q-tab name="educations"
             label="جدول آموزشی" />
      <q-tab name="movies1"
             label="آزمون" />
      <q-tab name="movies2"
             label="پروژه" />
      <q-tab v-if="classroom.live_streaming_url"
             name="live_streaming_url"
             label="بخش آنلاین" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="classroomInfo">
        <show-classroom-info v-if="mounted"
                             :options="{ profileMode: true }"
                             @onloadn="onloadnClassroom" />
      </q-tab-panel>

      <q-tab-panel name="educations">
        <entity-index v-if="mounted"
                      ref="entityIndex"
                      v-model:value="inputs"
                      title="لیست جلسات"
                      :api="api"
                      :table="table"
                      :table-keys="tableKeys"
                      :table-grid-size="$q.screen.lt.sm"
                      :show-expand-button="false"
                      :show-reload-button="false"
                      :show-search-button="false">
          <template #entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'action'">
              <q-btn size="md"
                     color="primary"
                     label="جزییات"
                     :to="{name: 'UserPanel.Profile.SessionInfo', params: {id: inputData.props.row.id}}" />
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </template>
          <template #entity-index-table-item-cell="{inputData}">
            <entity-index-grid-item :input-data="inputData">
              <template #col="{col, row}">
                <template v-if="col.name === 'action'">
                  <q-btn size="md"
                         color="primary"
                         label="جزییات"
                         :to="{name: 'UserPanel.Profile.SessionInfo', params: {id: row.id}}" />
                </template>
              </template>
            </entity-index-grid-item>
          </template>
        </entity-index>
      </q-tab-panel>

      <q-tab-panel name="movies1">
        آزمون
      </q-tab-panel>
      <q-tab-panel name="movies2">
        پروژه
      </q-tab-panel>
      <q-tab-panel v-if="classroom.live_streaming_url"
                   name="live_streaming_url">
        <q-btn class="full-width q-mb-lg"
               color="primary"
               @click="goToLiveStreamUrl">
          رفتن به کلاس
        </q-btn>
        <iframe :src="classroom.live_streaming_url"
                title="W3Schools Free Online Web Tutorials"
                style="height: 80vh"
                class="full-width" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { User } from 'src/models/User.js'
import Enums from 'src/assets/Enums/Enums.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import ShowClassroomInfo from 'src/components/Widgets/Other/ShowClassroomInfo/ShowClassroomInfo.vue'

export default {
  name: 'AdminUserClassroomInfo',
  components: {
    EntityIndex,
    Breadcrumbs,
    ShowClassroomInfo,
    EntityIndexGridItem
  },
  data () {
    // const useId = this.$route.params.id
    const classroomId = this.$route.params.classroom_id
    return {
      mounted: false,
      tab: 'classroomInfo',
      inputs: [],
      api: APIGateway.classroom.APIAdresses.byId(classroomId),
      classroom: new Classroom(),
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره',
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
            field: row => row.starting_time ? ShamsiDate.getDateTime(row.starting_time) : '-'
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
        ],
        data: []
      },
      tableKeys: {
        data: 'sessions_info',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      userInfo: new User()
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
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.userInfo.loading = true
      APIGateway.user.get({ data: { id: this.$route.params.id } })
        .then((user) => {
          this.userInfo = new User(user)
          this.userInfo.loading = false
        })
        .catch(() => {
          this.userInfo.loading = false
        })
    },
    goToLiveStreamUrl () {
      window.open(this.classroom.live_streaming_url, '_blank')
    },
    onloadnClassroom (classroom) {
      this.classroom = new Classroom(classroom)
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'کاربران',
            to: { name: 'Admin.User.Index' }
          },
          {
            label: 'اطلاعات کاربر',
            to: { name: 'Admin.User.Show', params: { id: this.$route.params.id } }
          },
          {
            label: this.classroom.title,
            to: { name: 'UserPanel.Profile.ClassroomInfo', params: { id: this.classroom.id } }
          }
        ]
      })
    },
    search () {
      this.$refs.entityIndex.search()
    },
    getClassroomHoldingTypeTitle (type) {
      const target = Enums.classroomHoldingTypes.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    getClassroomStatusTitle (type) {
      const target = Enums.classroomStatuses.find(item => item.value === type)
      if (!target) {
        return '-'
      }

      return target.label
    },
    getInvoiceStatusTitle (type) {
      const target = Enums.invoiceStatus.find(item => item.value === type)
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
