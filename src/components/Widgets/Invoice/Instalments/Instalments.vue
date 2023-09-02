<template>
  <div class="Instalments"
       :style="localOptions.style">

    <q-banner inline-actions
              class="text-white bg-red q-mb-md text-center">
      لطفا اقساط معوقه خود را پرداخت کنید.
    </q-banner>
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست اقساط معوقه"
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
                 :to="{name: 'UserPanel.Invoice.Show', params: {id: inputData.props.row.invoice}}">
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
                     :to="{name: 'UserPanel.Invoice.Show', params: {id: row.invoice}}">
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
import Assist from 'assets/js/Assist.js'
import { EntityIndex } from 'quasar-crud'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'

export default {
  name: 'Instalments',
  components: { EntityIndex, EntityIndexGridItem },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.instalment.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        // { type: 'hidden', name: 'type', value: 'overdue' }
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
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.invoice_info.title
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Invoice(row.invoice_info)).status_info.label
          },
          {
            name: 'amount',
            required: true,
            label: 'مبلغ صورتحساب(ریال)',
            align: 'left',
            field: row => row.invoice_info.amount.toLocaleString('fa')
          },
          {
            name: 'amount',
            required: true,
            label: 'مبلغ قسط(ریال)',
            align: 'left',
            field: row => row.amount.toLocaleString('fa')
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان ثبت',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ سررسید',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.due_date, 'jYYYY/jMM/jDD')
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
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    setOwner () {
      const user = this.$store.getters['Auth/user']
      FormBuilderAssist.setAttributeByName(this.inputs, 'owner', 'value', user.id)
    },
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.search)
    },
    search () {
      this.$refs.entityIndex.search()
    }
  }
}
</script>

<style scoped lang="scss">
.Instalments {
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
