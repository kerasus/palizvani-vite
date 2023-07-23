<template>
  <entity-crud v-model:edit-inputs="editInputs"
               v-model:index-inputs="indexInputs"
               v-model:show-inputs="showInputs"
               v-model:create-inputs="createInputs"
               v-model:default-inputs="defaultInputs"
               v-bind="allProps">
    <template v-slot:entity-crud-table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.Category.Show', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              مشاهده
            </q-tooltip>
          </q-btn>
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="negative"
                 icon="delete"
                 class="q-ml-md"
                 @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
            <q-tooltip>
              حذف
            </q-tooltip>
          </q-btn>
        </template>
        <template v-else-if="inputData.props.col.name === 'description'">
          <div v-html="inputData.props.value" />
        </template>
        <template v-else>
          {{ inputData.props.value }}
        </template>
      </q-td>
    </template>
  </entity-crud>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityCrud } from 'quasar-crud'

export default {
  name: 'Category',
  components: {
    EntityCrud
  },
  data () {
    return {
      model: null,
      tags: [],
      expanded: true,
      allProps: {
        config: {
          api: API_ADDRESS.category.base,
          title: {
            show: 'اطلاعات دسته',
            edit: 'اطلاعات دسته',
            create: 'ثبت دسته جدید',
            index: 'لیست دسته'
          },
          showRouteName: 'Admin.Category.Show',
          editRouteName: 'Admin.Category.Edit',
          indexRouteName: 'Admin.Category.Index',
          createRouteName: 'Admin.Category.Create',
          tableKeys: {
            data: 'results',
            total: 'count',
            currentPage: 'current',
            perPage: 'per_page',
            pageKey: 'page'
          },
          table: {
            columns: [
              {
                name: 'id',
                required: true,
                label: '#',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'title',
                required: true,
                label: 'عنوان',
                align: 'left',
                field: row => row.title
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
          }
        }
      },
      defaultInputs: [
        { type: 'input', name: 'id', responseKey: 'id', label: 'شناسه', col: 'col-md-6', disable: true },
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', col: 'col-md-6' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'id', label: 'شناسه', col: 'col-md-12' }
      ]
    }
  },
  methods: {
    // for index.vue
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped>

</style>
