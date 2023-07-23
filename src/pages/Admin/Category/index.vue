<template>
  <div class="add-new-action-row">
    <q-btn color="primary"
           label="ایجاد دسته بندی جدید"
           :to="{name: 'Admin.Category.Create'}" />
  </div>
  <entity-index ref="entityIndex"
                v-model:value="inputs"
                title="لیست دسته بندی ها"
                :api="api"
                :table="table"
                :table-keys="tableKeys"
                :show-search-button="false"
                :show-reload-button="false"
                :show-expand-button="false">
    <template #table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <div class="action-column-entity-index">
            <q-btn size="md"
                   color="primary"
                   label="جزییات"
                   :to="{name: 'Admin.Category.Show', params: {id: inputData.props.row.id}}" />
            <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />
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
import ShamsiDate from 'src/assets/ShamsiDate.js'
import BtnControl from 'src/components/Control/btn.vue'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'Admin.Category.Index',
  components: {
    EntityIndex,
    DeleteBtn
  },
  data () {
    return {
      inputs: [
        { type: 'input', name: 'title', value: null, label: 'نام', col: 'col-md-2' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', props: { atClick: this.search }, col: 'col-md-2' }
      ],
      api: API_ADDRESS.category.base,
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
            label: 'نام',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'count',
            required: true,
            label: 'تعداد درس های دسته',
            align: 'left',
            field: () => '...'
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => ShamsiDate.getDateTime(row.creation_time)
          },
          {
            name: 'last_modification_time',
            required: true,
            label: 'تاریخ آخرین تغییر',
            align: 'left',
            field: row => ShamsiDate.getDateTime(row.last_modification_time)
          },
          {
            name: 'actions',
            required: true,
            label: 'عملیات',
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
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>

<style>
.add-new-action-row {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 22px;
}
</style>
