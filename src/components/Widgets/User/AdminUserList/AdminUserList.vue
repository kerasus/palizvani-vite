<template>
  <div class="AdminUserList"
       :style="localOptions.style">
    <div class="title">
      پکیج‌ها
    </div>
    <q-card class="list"
            flat>
      <entity-index v-if="mounted"
                    v-model:value="inputs"
                    title=""
                    :api="api"
                    :table="table"
                    :table-keys="tableKeys"
                    :create-route-name="createRouteName"
                    :show-search-button="false"
                    :show-expand-button="false"
                    :show-reload-button="false"
                    :default-layout="false">
        <template #entity-index-table-cell="{inputData}">
          <template v-if="inputData.col.name === 'action'">
            <q-btn flat
                   color="primary"
                   :to="{name: 'AdminPanel.User.Show', params: {id: inputData.props.row.id}}">
              مشاهده جزییات
            </q-btn>
          </template>
          <template v-else>
            {{ inputData.col.value }}
          </template>
        </template>
      </entity-index>
    </q-card>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminUserList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.user.APIAdresses.base,
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
            name: 'firstname',
            required: true,
            label: 'نام',
            align: 'left',
            field: row => row.firstname
          },
          {
            name: 'lastname',
            required: true,
            label: 'نام خانوادگی',
            align: 'left',
            field: row => row.lastname
          },
          {
            name: 'mobile_number',
            required: true,
            label: 'شماره موبایل',
            align: 'left',
            field: row => row.mobile_number
          },
          {
            name: 'roles',
            required: true,
            label: 'نقش',
            align: 'left',
            field: row => row.roles.join(', ')
          },
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
.AdminUserList {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
  }
  :deep(.list) {
    .quasar-crud-index-table {
      padding: 0;
      .q-table__container {
        background-color: transparent;
        box-shadow: none;
        border: none;
        .q-table__top {
          display: none;
        }
      }
    }
  }
}
</style>
