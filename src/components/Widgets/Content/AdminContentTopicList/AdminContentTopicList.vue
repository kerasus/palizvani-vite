<template>
  <div class="AdminContentTopicList"
       :style="localOptions.style">
    <entity-index v-if="mounted"
                  v-model:value="inputs"
                  title="لیست فیش ها"
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
                   :to="{name: 'Admin.ContentTopic.Show', params: {id: inputData.props.row.id}}">
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
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

export default {
  name: 'AdminContentTopicList',
  components: { EntityIndex, DeleteBtn },
  mixins: [mixinWidget],
  props: {
    contentId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      api: APIGateway.contentTopic.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'content', value: null }
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
  created() {
    if (this.contentId) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'content', 'value', this.contentId)
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
.AdminContentTopicList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
