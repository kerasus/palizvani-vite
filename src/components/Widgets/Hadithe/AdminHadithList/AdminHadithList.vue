<template>
  <div class="AdminHadithList"
       :style="localOptions.style">
    <div class="more-action">
      <q-btn label="ایجاد حدیث جدید"
             color="primary"
             :to="{name: 'Admin.Hadith.Create'}" />
    </div>
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست احادیث"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'thumbnail'">
          <q-img :src="inputData.col.value"
                 width="100px" />
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :to="{name: 'Admin.Hadith.Show', params: {id: inputData.props.row.id}}">
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
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import Assist from 'src/assets/js/Assist.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminHadithList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data () {
    return {
      api: APIGateway.hadith.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'select', name: 'status', label: 'فیلتر', placeholder: ' ', options: [{ label: 'احادیث پیش رو', value: 'ONGOING' }, { label: 'آرشیو احادیث', value: 'PASSED' }], col: 'col-md-3 col-12' },
        { type: 'hidden', name: 'ordering', value: null },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', placeholder: ' ', atClick: this.search, col: 'col-md-3 col-12' }
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
            name: 'persian_text',
            required: true,
            label: 'متن حدیث',
            align: 'left',
            field: row => row.persian_text
          },
          {
            name: 'arabian_text',
            required: true,
            label: 'متن عربی',
            align: 'left',
            field: row => row.arabian_text
          },
          {
            name: 'source',
            required: true,
            label: 'منبع',
            align: 'left',
            field: row => row.source
          },
          {
            name: 'narrator',
            required: true,
            label: 'کوینده',
            align: 'left',
            field: row => row.narrator
          },
          {
            name: 'publish_date',
            required: true,
            label: 'تاریخ انتشار',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.publish_date)
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
  },
  methods: {
    search () {
      const status = FormBuilderAssist.getInputsByName(this.inputs, 'status')?.value
      if (status) {
        const prefix = status === 'ONGOING' ? '' : '-'
        FormBuilderAssist.setAttributeByName(this.inputs, 'ordering', 'value', prefix + 'publish_date')
      } else {
        FormBuilderAssist.setAttributeByName(this.inputs, 'ordering', 'value', null)
      }

      this.$refs.entityIndex.search()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminHadithList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
