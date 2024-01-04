<template>
  <div class="UsersOfTestSelector q-mt-md">
    <q-banner>
      لیست کاربران
    </q-banner>
    <div class="content-list q-mt-lg">
      <entity-index v-if="mounted"
                    ref="entityIndexUsers"
                    v-model:value="inputs"
                    :title="'لیست کاربران'"
                    :api="api"
                    :table="table"
                    :table-keys="tableKeys"
                    :show-search-button="false"
                    :show-expand-button="false"
                    :show-reload-button="false"
                    @onPageChanged="onChangeQuestionListPage">
        <template #toolbar>
          <q-btn color="primary"
                 class="q-mr-md"
                 outline
                 @click="selectAllAllowedUser">
            انتخاب تمام افراد مجاز
          </q-btn>
          <q-btn color="primary"
                 icon="search"
                 @click="selectAllAllowedUser" />
        </template>
        <template #entity-index-table-cell="{inputData}">
          <template v-if="inputData.col.name === 'choice'">
            <q-checkbox v-model="loadedItems[inputData.props.row.owner].selected"
                        color="primary"
                        @update:model-value="emitValues" />
            {{ inputData.col.value }}
          </template>
          <template v-else-if="inputData.col.name === 'number'">
            {{ inputData.rowNumber }}
          </template>
          <template v-else>
            {{ inputData.col.value }}
          </template>
        </template>
      </entity-index>
    </div>
    <div class="content-list q-mt-lg">
      <div class="row">
        <div class="col-md-4 col-12">
          تعداد انتخاب شده:
          {{ selectedItems.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'UsersOfTestSelector',
  components: {
    EntityIndex
  },
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    readonly: {
      default: false,
      type: Boolean
    },
    showPageLink: {
      default: true,
      type: Boolean
    },
    showDownloadLink: {
      default: false,
      type: Boolean
    },
    classroomId: {
      default: null,
      type: [Number, String]
    }
  },
  emits: ['update:value'],
  data () {
    return {
      loadedItems: {},
      mounted: false,

      api: APIGateway.registration.APIAdresses.examineeSheet,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'input', name: 'owner__national_code', value: null, label: 'کد ملی', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'owner__mobile_number', value: null, label: 'شماره همراه', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'owner__firstname', value: null, label: 'نام', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'owner__lastname', value: null, label: 'نام خانوادگی', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'hidden', name: 'classroom', value: this.classroomId }
      ],
      table: {
        columns: [
          {
            name: 'choice',
            required: true,
            label: 'انتخاب',
            align: 'left',
            field: (row) => {
              this.loadedItems[row.owner].is_passed_project_condition = row.is_passed_project_condition
              this.loadedItems[row.owner].is_passed_assignment_condition = row.is_passed_assignment_condition
              this.loadedItems[row.owner].is_passed_attendance_condition = row.is_passed_attendance_condition
              return ''
            }
          },
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
            name: 'owner_info.fullName',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'owner_info.national_code',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.owner_info.national_code
          },
          {
            name: 'owner_info.mobile_number',
            required: true,
            label: 'شماره تلفن',
            align: 'left',
            field: row => row.owner_info.mobile_number
          },
          {
            name: 'is_passed_project_condition',
            required: true,
            label: 'پروژه',
            align: 'left',
            field: row => row.is_passed_project_condition ? 'مجاز' : 'غیر مجاز'
          },
          {
            name: 'is_passed_assignment_condition',
            required: true,
            label: 'تکلیف',
            align: 'left',
            field: row => row.is_passed_assignment_condition ? 'مجاز' : 'غیر مجاز'
          },
          {
            name: 'is_passed_attendance_condition',
            required: true,
            label: 'حضور و غیاب',
            align: 'left',
            field: row => row.is_passed_attendance_condition ? 'مجاز' : 'غیر مجاز'
          }
        ]
      }
    }
  },
  computed: {
    selectedItems () {
      const resultArray = []
      Object.keys(this.loadedItems).forEach(itemId => {
        if (this.loadedItems[itemId].selected) {
          resultArray.push(this.loadedItems[itemId])
        }
      })
      return resultArray
    },
    localValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('update:value', newValue)
      }
    }
  },
  watch: {
    value (newValue) {
      this.updateloadedItemsByArray(newValue, true)
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    selectAllAllowedUser () {
      Object.keys(this.loadedItems)
        .forEach(itemId => {
          if (
            this.loadedItems[itemId].is_passed_project_condition &&
            this.loadedItems[itemId].is_passed_assignment_condition &&
            this.loadedItems[itemId].is_passed_attendance_condition
          ) {
            this.loadedItems[itemId].selected = true
          }
        })
    },
    searchList () {
      this.$refs.entityIndexUsers.search()
    },
    emitValues () {
      this.localValue = this.selectedItems.map(item => item.id)
    },
    onChangeQuestionListPage (response) {
      this.updateloadedItemsByArray(response.data.results)
    },
    updateloadedItemsByArray (array, allSelected = false) {
      array.forEach(item => {
        const itemId = item.owner || item.id || item
        const selected = allSelected || this.value.includes(itemId)
        const target = this.loadedItems[itemId]
        if (!target) {
          this.loadedItems[itemId] = {
            id: itemId,
            selected
          }
        } else {
          this.loadedItems[itemId].selected = selected
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.UsersOfTestSelector {
}
</style>
