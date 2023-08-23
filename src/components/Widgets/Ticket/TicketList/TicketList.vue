<template>
  <div class="TicketList"
       :style="localOptions.style">
    <div class="more-action">
      <q-btn label="ایجاد درخواست"
             color="primary"
             :to="{name: 'UserPanel.Ticket.Create'}" />
    </div>
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست درخواست ها"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :table-grid-size="$q.screen.lt.sm"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :to="{name: 'UserPanel.Ticket.Show', params: {id: inputData.props.row.id}}">
            مشاهده جزییات
          </q-btn>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
      <template #entity-index-table-item-cell="{inputData}">
        <entity-index-grid-item :input-data="inputData">
          <template #col="{col}">
            <template v-if="col.name === 'action'">
              <q-btn color="primary"
                     :to="{name: 'UserPanel.Ticket.Show', params: {id: inputData.props.row.id}}">
                مشاهده جزییات
              </q-btn>
            </template>
          </template>
        </entity-index-grid-item>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'TicketList',
  components: { EntityIndex, EntityIndexGridItem },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.ticket.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'owner', value: null }
      ],
      table: {
        columns: [
          {
            name: 'title',
            required: true,
            label: 'موضوع پیام',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'sender',
            required: true,
            label: 'فرستنده',
            align: 'left',
            field: row => row.creator_info.firstname + ' ' + row.creator_info.lastname
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Ticket(row)).status_info.label
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
    this.setOwner()
    this.mounted = true
  },
  methods: {
    setOwner () {
      const user = this.$store.getters['Auth/user']
      FormBuilderAssist.setAttributeByName(this.inputs, 'owner', 'value', user.id)
    }
  }
}
</script>

<style scoped lang="scss">
.TicketList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
