<template>
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
      <q-tab name="movies3"
             label="بخش آنلاین" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="classroomInfo">
        <show-classroom-info :options="{ profileMode: true }" />
      </q-tab-panel>

      <q-tab-panel name="educations">
        <entity-index v-if="mounted"
                      ref="entityIndex"
                      v-model:value="inputs"
                      title="لیست جلسات"
                      :api="api"
                      :table="table"
                      :table-keys="tableKeys"
                      :show-expand-button="false"
                      :show-reload-button="false"
                      :show-search-button="false">
          <template #table-cell="{inputData}">
            <q-td :props="inputData.props">
              <template v-if="inputData.props.col.name === 'actions'">
                <q-btn size="md"
                       color="primary"
                       label="جزییات"
                       :to="{name: 'UserPanel.Profile.SessionInfo', params: {id: inputData.props.row.id}}" />
              </template>
              <template v-else>
                {{ inputData.props.value }}
              </template>
            </q-td>
          </template>
        </entity-index>
      </q-tab-panel>

      <q-tab-panel name="movies1">
        آزمون
      </q-tab-panel>
      <q-tab-panel name="movies2">
        پروژه
      </q-tab-panel>
      <q-tab-panel name="movies3">
        بخش آنلاین
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import Enums from 'src/assets/Enums/Enums.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ShowClassroomInfo from 'src/components/Widgets/Other/ShowClassroomInfo/ShowClassroomInfo.vue'

export default {
  name: 'UserPanel.Profile.ClassroomInfo',
  components: {
    ShowClassroomInfo,
    EntityIndex
  },
  data () {
    return {
      mounted: false,
      tab: 'classroomInfo',
      inputs: [],
      api: null,
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
            name: 'actions',
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
      }
    }
  },
  computed: {
    selectedCategoryId () {
      return this.getInputValue('category')
    }
  },
  watch: {
    selectedCategoryId () {
      this.setInputValue('unit', null)
      this.getUnits(this.selectedCategoryId)
    }
  },
  mounted () {
    this.api = APIGateway.classroom.APIAdresses.byId(this.$route.params.id)
    this.mounted = true
  },
  methods: {
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
    getInputValue (name) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      if (!this.inputs[inputIndex]) {
        return null
      }
      return this.inputs[inputIndex].value
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
