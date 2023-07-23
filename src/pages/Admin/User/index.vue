<template>
  <entity-index ref="entityIndex"
                v-model:value="inputs"
                title="لیست کاربران"
                :api="api"
                :table="table"
                :table-keys="tableKeys"
                :show-expand-button="false"
                :show-reload-button="false"
                :show-search-button="false">
    <template #table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <div class="action-column-entity-index">
            <q-btn size="md"
                   color="primary"
                   label="جزییات"
                   :to="{name: 'Admin.User.Show', params: {id: inputData.props.row.id}}" />
            <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
              <q-tooltip>
                حذف
              </q-tooltip>
            </delete-btn>
          </div>
        </template>
        <template v-else-if="inputData.props.col.name === 'status'">
          <div class="action-column-entity-index">
            <q-toggle v-model="inputData.props.row.is_active"
                      label="فعال/غیر فعال"
                      @update:model-value="changeUserActiveStatus(inputData.props.row)" />
          </div>
        </template>
        <template v-else>
          {{ inputData.props.value }}
        </template>
      </q-td>
    </template>
  </entity-index>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses.js'
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
      inputs: [
        { type: 'input', name: 'id', value: null, label: 'شماره', col: 'col-md-2' },
        { type: 'input', name: 'firstname', value: null, label: 'نام', col: 'col-md-2' },
        { type: 'input', name: 'lastname', value: null, label: 'نام خانوادگی', col: 'col-md-2' },
        { type: 'input', name: 'national_code', value: null, label: 'کد ملی', col: 'col-md-2' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', props: { atClick: this.search }, col: 'col-md-2' }
      ],
      api: API_ADDRESS.user.base,
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
            name: 'fullname',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.firstname + ' ' + row.lastname
          },
          {
            name: 'first_name',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.national_code
          },
          {
            name: 'last_name',
            required: true,
            label: 'شماره تلفن',
            align: 'left',
            field: row => row.on_call_mobile_number
          },
          {
            name: 'email',
            required: true,
            label: 'نقش',
            align: 'left',
            field: row => 'نقش'
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => row.is_active
          },
          {
            name: 'actions',
            required: true,
            label: '',
            align: 'left',
            field: ''
          }
        ],
        data: []
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
  methods: {
    search () {
      this.$refs.entityIndex.search()
    },
    changeUserActiveStatus (user) {
      this.$axios.put(API_ADDRESS.user.base + '/' + user.id, user)
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
