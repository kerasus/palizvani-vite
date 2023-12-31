<template>
  <div class="AdminUserIndex">
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست کاربران"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :show-expand-button="false"
                  :show-reload-button="false"
                  :show-search-button="false">
      <template #toolbar>
        <q-btn color="primary"
               :loading="exportReportLoading"
               @click="exportExcel">
          خروجی اکسل
        </q-btn>
      </template>
      <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <div class="action-column-entity-index">
            <q-btn size="md"
                   color="primary"
                   label="جزییات"
                   :to="{name: 'Admin.User.Show', params: {id: inputData.props.row.id}}"
                   class="q-mr-md" />
            <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
              <q-tooltip>
                حذف
              </q-tooltip>
            </delete-btn>
          </div>
        </template>
        <template v-else-if="inputData.col.name === 'status'">
          <div class="action-column-entity-index">
            <q-toggle v-model="inputData.props.row.is_active"
                      label="فعال/غیر فعال"
                      @update:model-value="changeUserActiveStatus(inputData.props.row)" />
          </div>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import Assist from 'src/assets/js/Assist.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'Admin.User.Index',
  components: {
    DeleteBtn,
    EntityIndex
  },
  data () {
    return {
      mounted: false,
      exportReportLoading: false,
      inputs: [
        { type: 'input', name: 'id', value: null, label: 'شناسه', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'national_code', value: null, label: 'کد ملی', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'mobile_number', value: null, label: 'شماره همراه', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'email', value: null, label: 'ایمیل', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'firstname', value: null, label: 'نام', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'lastname', value: null, label: 'نام خانوادگی', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-3 col-12' }
      ],
      api: APIGateway.user.APIAdresses.base,
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
            name: 'fullname',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.firstname + ' ' + row.lastname
          },
          {
            name: 'national_code',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.national_code
          },
          {
            name: 'mobile_number',
            required: true,
            label: 'شماره همراه',
            align: 'left',
            field: row => row.mobile_number
          },
          {
            name: 'email',
            required: true,
            label: 'ایمیل',
            align: 'left',
            field: row => row.email
          },
          {
            name: 'roles',
            required: true,
            label: 'نقش',
            align: 'left',
            field: row => row.roles.join(', ')
          },
          {
            name: 'is_active',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => row.is_active ? 'فعال' : 'غیر فعال'
          },
          {
            name: 'action',
            required: true,
            label: '',
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
  mounted() {
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    exportExcel () {
      const params = this.$refs.entityIndex.createParams()
      this.exportReportLoading = true
      delete params.btn
      params.type = 'users'
      APIGateway.user.exportReport(params)
        .then((xlsxData) => {
          Assist.saveXlsx(xlsxData, 'لیست کاربران')
          this.exportReportLoading = false
        })
        .catch(() => {
          this.exportReportLoading = false
        })
    },
    setActionBtn () {
      this.inputs.forEach((item, index) => {
        if (item.name === 'btn') {
          this.inputs[index].atClick = this.search
        }
      })
    },
    search () {
      this.$refs.entityIndex.search()
    },
    changeUserActiveStatus (user) {
      APIGateway.user.updateByAdmin(user)
        .then(() => {
          this.search()
        })
        .catch(() => {
          this.search()
        })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.firstname + row.lastname + ' اطمینان دارید؟'
    }
  }
}
</script>

<style lang="scss">
.AdminUserIndex {
  .action-column-entity-index {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
