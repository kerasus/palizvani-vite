<template>
  <div class="AdminPostCategoryList"
       :style="localOptions.style">
    <div v-if="!parent"
         class="more-action">
      <q-btn label="دسته پست جدید"
             color="primary"
             :to="{name: 'Admin.PostCategory.Create'}" />
    </div>
    <entity-index v-if="mounted"
                  v-model:value="inputs"
                  :title="title"
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
                   :to="{name: 'Admin.PostCategory.Show', params: {id: inputData.props.row.id}}">
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
import Assist from 'assets/js/Assist.js'
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import DeleteBtn from 'components/Control/DeleteBtn.vue'

export default {
  name: 'AdminPostCategoryList',
  components: { DeleteBtn, EntityIndex },
  mixins: [mixinWidget],
  props: {
    title: {
      type: String,
      default: 'لیست دسته بندی های کلی'
    },
    parent: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
      api: APIGateway.postCategory.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'parent', value: null },
        { type: 'hidden', name: 'parent__isnull', value: null }
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
            label: 'نام دسته',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
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
  created() {
    FormBuilderAssist.setAttributeByName(this.inputs, 'parent', 'value', this.parent)
    if (!this.parent) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'parent__isnull', 'value', 'true')
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped lang="scss">
.AdminPostCategoryList {
  :deep(.entity-index) {
    .q-card__section {
      .q-item {
        display: none;
      }
    }
  }
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
