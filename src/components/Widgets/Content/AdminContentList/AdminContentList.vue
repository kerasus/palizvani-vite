<template>
  <div class="AdminContentList"
       :style="localOptions.style">
    <q-linear-progress v-if="loading"
                       indeterminate />
    <div class="more-action">
      <q-btn label="محتوای جدید"
             color="primary"
             :to="{name: 'Admin.Content.Create'}" />
    </div>
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست محتواها"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'thumbnail'">
          <q-img :src="inputData.col.value"
                 width="100px" />
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <div class="action-column-entity-index">
            <q-btn color="primary"
                   :to="{name: 'Admin.Content.Show', params: {id: inputData.props.row.id}}">
              مشاهده جزییات
            </q-btn>
            <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />
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
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminContentList',
  components: { DeleteBtn, EntityIndex },
  mixins: [mixinWidget],
  data () {
    return {
      loading: false,
      api: APIGateway.content.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'select', name: 'category', label: 'دسته بندی', placeholder: ' ', optionLabel: 'title', optionValue: 'id', col: 'col-md-3 col-12' },
        { type: 'input', name: 'search', value: null, col: 'col-md-3 col-12', label: 'جست و جو', placeholder: ' ' },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: this.search, col: 'col-md-2 col-12' }
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
            name: 'thumbnail',
            required: true,
            label: 'تصویر',
            align: 'left',
            field: row => row.thumbnail
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'category_info',
            required: true,
            label: 'دسته',
            align: 'left',
            field: row => row.category_info?.title
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
    this.getCategories()
  },
  methods: {
    getCategories () {
      this.loading = true
      APIGateway.contentCategory.index({ per_page: 9999 })
        .then((contentCategories) => {
          FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'options', contentCategories.list.list)
        })
        .finally(() => {
          this.loading = false
          this.mounted = true
        })
    },
    search () {
      this.$refs.entityIndex.search()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped lang="scss">
.AdminContentList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .action-column-entity-index {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
