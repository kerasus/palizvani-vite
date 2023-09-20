<template>
  <div class="TransactionList"
       :style="localOptions.style">
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست تراکنش های بانکی"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :table-grid-size="$q.screen.lt.sm"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :to="{name: 'UserPanel.Payment.Show', params: {id: inputData.props.row.id}}">
            مشاهده جزییات
          </q-btn>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
      <template #entity-index-table-item-cell="{inputData}">
        <entity-index-grid-item :input-data="inputData">
          <template #col="{col, row}">
            <template v-if="col.name === 'number'">
              {{ inputData.rowNumber }}
            </template>
            <template v-else-if="col.name === 'action'">
              <q-btn color="primary"
                     :to="{name: 'UserPanel.Payment.Show', params: {id: row.id}}">
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
// import { shallowRef } from 'vue'
import Assist from 'assets/js/Assist.js'
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
// import { Payment } from 'src/models/Payment.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { Transaction } from 'src/models/Transaction.js'
// import BtnControl from 'src/components/Control/btn.vue'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'

// const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'TransactionList',
  components: { EntityIndex, EntityIndexGridItem },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.transaction.APIAdresses.base,
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
            name: 'amount',
            required: true,
            label: 'مبلغ تراکنش (ریال)',
            align: 'left',
            field: row => row.amount.toLocaleString('fa')
          },
          {
            name: 'description',
            required: true,
            label: 'توضیحات',
            align: 'left',
            field: row => row.description
          },
          {
            name: 'reference_code',
            required: true,
            label: 'کد مرجع',
            align: 'left',
            field: row => row.reference_code
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Transaction(row)).status_info.label
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          }
          // {
          //   name: 'action',
          //   required: true,
          //   label: 'جزییات',
          //   align: 'left',
          //   field: row => ''
          // }
        ]
      },
      mounted: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.setOwner()
    // this.setActionBtn()
    this.$bus.on('ReloadUserPayments', this.search)
    this.mounted = true
  },
  methods: {
    setOwner () {
      const user = this.$store.getters['Auth/user']
      FormBuilderAssist.setAttributeByName(this.inputs, 'owner', 'value', user.id)
    }
    // setActionBtn () {
    //   FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.search)
    // },
    // search () {
    //   this.$refs.entityIndex.search()
    // }
  }
}
</script>

<style scoped lang="scss">
.TransactionList {
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
