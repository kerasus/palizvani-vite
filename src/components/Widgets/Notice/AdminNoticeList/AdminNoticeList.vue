<template>
  <div class="AdminNoticeList"
       :style="localOptions.style">
    <entity-index v-if="mounted"
                  v-model:value="inputs"
                  title="لیست اعلان ها"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'action'">
          <q-btn flat
                 color="primary"
                 :to="{name: 'Admin.Notice.Show', params: {id: inputData.props.row.id}}">
            مشاهده جزییات
          </q-btn>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
// import { Notice } from 'src/models/Notice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'

export default {
  name: 'AdminNoticeList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.notice.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [],
      table: {
        columns: [
          {
            name: 'title',
            required: true,
            label: 'موضوع اعلان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'sender',
            required: true,
            label: 'فرستنده',
            align: 'left',
            field: row => row.creator_info ? row.creator_info.firstname + ' ' + row.creator_info.lastname : ''
          },
          {
            name: 'last_modification_time',
            required: true,
            label: 'زمان ارسال',
            align: 'left',
            field: row => row.is_sent ? ShamsiDate.getDateTime(row.last_modification_time) : '-'
          },
          // {
          //   name: 'status',
          //   required: true,
          //   label: 'وضعیت',
          //   align: 'left',
          //   // field: row => (new Notice(row)).status_info.label
          //   field: row => row.state
          // },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: row => ''
          }
        ]
      },
      mounted: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.mounted = true
  }
}
</script>

<style scoped lang="scss">
.AdminNoticeList {

}
</style>
