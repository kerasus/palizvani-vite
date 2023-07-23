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
                 :to="{name:'Admin.Media.Show', params: {id: inputData.props.row.id}}">
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
        <template v-else-if="inputData.props.col.name === 'file'">
          <q-img :src="inputData.props.row.file"
                 width="100px" />
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
import ShamsiDate from 'src/assets/ShamsiDate'

export default {
  name: 'Media',
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
          api: API_ADDRESS.media.base,
          title: {
            show: 'اطلاعات تصویر',
            edit: 'اطلاعات تصویر',
            create: 'ثبت تصویر جدید',
            index: 'لیست تصاویر'
          },
          showRouteName: 'Admin.Media.Show',
          editRouteName: 'Admin.Media.Edit',
          indexRouteName: 'Admin.Media.Index',
          createRouteName: 'Admin.Media.Create',
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
                name: 'file',
                required: true,
                label: 'تصویر',
                align: 'left',
                field: row => row.file
              },
              {
                name: 'title',
                required: true,
                label: 'عنوان',
                align: 'left',
                field: row => row.title
              },
              {
                name: 'creation_time',
                required: true,
                label: 'زمان ایجاد',
                align: 'left',
                field: row => ShamsiDate.getDateTime(row.creation_tim)
              },
              {
                name: 'creator_info',
                required: true,
                label: 'ایجاد کننده',
                align: 'left',
                field: row => row.creator_info.nickname
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
        { type: 'input', name: 'id', responseKey: 'id', label: 'شناسه', col: 'col-md-3', disable: true },
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', col: 'col-md-3' },
        { type: 'file', name: 'file', responseKey: 'file', label: 'تصویر', col: 'col-md-6' }
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
    getRemoveMessage () {
      return 'آیا از حذف ' + 'تصویر' + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped>

</style>
