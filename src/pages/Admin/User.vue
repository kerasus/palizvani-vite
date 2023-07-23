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
                 :to="{name:'Admin.User.Show', params: {id: inputData.props.row.id}}">
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
  name: 'User',
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
          api: API_ADDRESS.user.base,
          title: {
            show: 'اطلاعات کاربر',
            edit: 'اطلاعات کاربر',
            create: 'ثبت کاربر جدید',
            index: 'لیست کاربران'
          },
          showRouteName: 'Admin.User.Show',
          editRouteName: 'Admin.User.Edit',
          indexRouteName: 'Admin.User.Index',
          createRouteName: 'Admin.User.Create',
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
                name: 'nickname',
                required: true,
                label: 'نام',
                align: 'left',
                field: row => row.nickname
              },
              {
                name: 'mobile_number',
                required: true,
                label: 'موبایل',
                align: 'left',
                field: row => row.mobile_number
              },
              {
                name: 'phone_number',
                required: true,
                label: 'تلفن',
                align: 'left',
                field: row => row.phone_number
              },
              {
                name: 'email',
                required: true,
                label: 'ایمیل',
                align: 'left',
                field: row => row.email
              },
              {
                name: 'gender',
                required: true,
                label: 'جنسیت',
                align: 'left',
                field: row => row.gender
              },
              {
                name: 'roles',
                required: true,
                label: 'نقش ها',
                align: 'left',
                field: row => row.roles.map(role => role.name).join(', ')
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
        { type: 'input', name: 'id', responseKey: 'id', label: 'شناسه', col: 'col-md-1', disable: true },
        { type: 'input', name: 'nickname', responseKey: 'nickname', label: 'نام', col: 'col-md-4' },
        { type: 'input', name: 'father_name', responseKey: 'father_name', label: 'نام پدر', col: 'col-md-4' },
        { type: 'input', name: 'national_code', responseKey: 'national_code', label: 'کدملی', col: 'col-md-3' },

        { type: 'input', name: 'mobile_number', responseKey: 'mobile_number', label: 'موبایل', col: 'col-md-4' },
        { type: 'input', name: 'phone_number', responseKey: 'phone_number', label: 'تلفن محل سکونت', col: 'col-md-4' },
        { type: 'input', name: 'email', responseKey: 'email', label: 'ایمیل', col: 'col-md-4' }

        // { type: 'optionGroupCheckbox', name: 'roles', responseKey: 'roles', multiple: true, value: [], optionValue: 'id', optionLabel: 'name', options: [{ name: 'anony2mous', id: 2 }, { name: 'anony1mous', id: 1 }, { name: 'anonymous', id: 4 }], col: 'col-md-3' },
        // { type: 'optionGroupRadio', name: 'gender', responseKey: 'gender', multiple: true, optionValue: 'value', optionLabel: 'name', options: [{ label: 'آقا', value: true }, { label: 'خانم', value: false }], col: 'col-md-3' },
        // { type: 'optionGroupRadio', name: 'marital_status', responseKey: 'marital_status', multiple: true, optionValue: 'value', optionLabel: 'name', options: [{ label: 'متاهل', value: true }, { label: 'مجرد', value: false }], col: 'col-md-3' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'id', label: 'شناسه', col: 'col-md-4' },
        { type: 'input', name: 'nickname', label: 'نام', col: 'col-md-4' },
        { type: 'input', name: 'national_code', label: 'کدملی', col: 'col-md-4' },
        { type: 'input', name: 'mobile_number', label: 'موبایل', col: 'col-md-4' },
        { type: 'input', name: 'email', label: 'ایمیل', col: 'col-md-4' },
        { type: 'select', name: 'role', label: 'نقش', options: [{ label: 'superuser', value: 'superuser' }, { label: 'user', value: 'user' }], col: 'col-md-4' }
      ]
    }
  },
  methods: {
    // for index.vue
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.nickname + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped>

</style>
