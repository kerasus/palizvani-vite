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
                 :to="{name:'Admin.Feedback.Show', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              مشاهده
            </q-tooltip>
          </q-btn>
          <q-btn v-if="user.isSuperUser()"
                 round
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
import ShamsiDate from 'src/assets/ShamsiDate'

export default {
  name: 'Feedback',
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
          api: API_ADDRESS.feedback.base,
          title: {
            show: 'اطلاعات نظر',
            edit: 'اطلاعات نظر',
            create: 'ثبت نظر جدید',
            index: 'لیست نظر'
          },
          showRouteName: 'Admin.Feedback.Show',
          editRouteName: 'Admin.Feedback.Edit',
          indexRouteName: 'Admin.Feedback.Index',
          createRouteName: 'Admin.Feedback.Create',
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
                name: 'category',
                required: true,
                label: 'دسته',
                align: 'left',
                field: row => row.category
              },
              {
                name: 'creation_time',
                required: true,
                label: 'زمان ایجاد',
                align: 'left',
                field: row => ShamsiDate.getDateTime(row.creation_time)
              },
              {
                name: 'creator_info.nickname',
                required: true,
                label: 'نویسنده',
                align: 'left',
                field: row => row.summary
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
        { type: 'select', name: 'category', responseKey: 'category', options: [{ label: 'انتقاد', value: 'انتقاد' }, { label: 'پیشنهاد', value: 'پیشنهاد' }], value: null, label: 'دسته', col: 'col-md-3' },
        { type: 'dateTime', name: 'creation_time', responseKey: 'creation_time', outsideLabel: 'تاریخ ایجاد', col: 'col-md-3', disable: true },
        {
          type: 'tiptap-editor',
          name: 'description',
          responseKey: 'description',
          label: 'متن',
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
          },
          col: 'col-md-12'
        }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'id', label: 'شناسه', col: 'col-md-12' }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters['Auth/user']
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
