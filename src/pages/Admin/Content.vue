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
                 :to="{name:'Admin.Content.Show', params: {id: inputData.props.row.id}}">
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
  name: 'ContentPage',
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
          api: API_ADDRESS.content.base,
          title: {
            show: 'اطلاعات محتوا',
            edit: 'اطلاعات محتوا',
            create: 'ثبت محتوای جدید',
            index: 'لیست محتوا'
          },
          showRouteName: 'Admin.Content.Show',
          editRouteName: 'Admin.Content.Edit',
          indexRouteName: 'Admin.Content.Index',
          createRouteName: 'Admin.Content.Create',
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
                name: 'order',
                required: true,
                label: 'ترتیب',
                align: 'left',
                field: row => row.order
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
                field: row => (row.category_info) ? row.category_info.title : '-'
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
        { type: 'hidden', name: 'key', responseKey: 'key', value: 'key1', label: 'key', col: 'col-md-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'تصویر شاخص', col: 'col-md-3' },
        { type: 'space', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'id', label: 'شناسه', col: 'col-md-3', disable: true },
        { type: 'input', name: 'order', responseKey: 'order', label: 'ترتیب', col: 'col-md-3' },
        {
          type: 'entity',
          name: 'category',
          responseKey: 'category_info',
          selectionMode: 'single',
          label: 'دسته',
          buttonColor: 'primary',
          buttonTextColor: 'white',
          buttonBadgeColor: 'pink',
          indexConfig: {
            apiAddress: API_ADDRESS.category.base,
            tableTitle: 'لیست دسته ها',
            showTableItemsRouteName: 'Admin.BlockManagement.Show',
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
                }
              ],
              data: []
            },
            inputs: [
              { type: 'input', name: 'id', label: 'شناسه', col: 'col-md-12' }
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'title'
          },
          value: [],
          selected: [],
          col: 'col-md-6'
        },
        // { type: 'input', name: 'category', responseKey: 'category', label: 'دسته', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', col: 'col-md-12' },
        {
          type: 'tiptap-editor',
          name: 'summary',
          responseKey: 'summary',
          label: 'خلاصه',
          col: 'col-md-12',
          options: {
            bubbleMenu: false,
            floatingMenu: false,
            poem: false,
            reading: false,
            persianKeyboard: true,
            mathliveOptions: { smartFence: false },
            uploadServer: {
              url: API_ADDRESS.media.upload,
              instantUpload: true,
              responseKey: 'file',
              headers: { Authorization: 'Bearer ' + this.$store.getters['Auth/accessToken'] }
            }
          }
        },
        {
          type: 'tiptap-editor',
          name: 'text',
          responseKey: 'text',
          label: 'متن',
          col: 'col-md-12',
          options: {
            bubbleMenu: false,
            floatingMenu: false,
            poem: false,
            reading: false,
            persianKeyboard: true,
            mathliveOptions: { smartFence: false },
            uploadServer: {
              url: API_ADDRESS.media.upload,
              instantUpload: true,
              responseKey: 'file',
              headers: { Authorization: 'Bearer ' + this.$store.getters['Auth/accessToken'] }
            }
          }
        }
        // { type: 'input', name: 'value', responseKey: 'value', label: 'مقدار', col: 'col-md-12' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'category__title__contains', label: 'عنوان دسته', col: 'col-md-12' }
      ]
    }
  },
  methods: {
    setTiptapEditorOptions () {
      this.defaultInputs.forEach(defaultInput => {
        if (defaultInput.type !== 'tiptap-editor') {
          return
        }

        defaultInput.uploadServer = {
          url: API_ADDRESS.media.upload,
          instantUpload: true,
          headers: {
            Authorization: 'Bearer ' + this.$store.getters['Auth/accessToken']
          }
        }
      })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.category + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped>

</style>
