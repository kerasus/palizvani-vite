<template>
  <q-btn color="primary"
         label="ایجاد دسته بندی جدید"
         :to="{name: 'Admin.Category.Create'}" />
  <entity-index v-model:value="inputs"
                title="لیست دسته بندی ها"
                :api="api"
                :table="table"
                :table-keys="tableKeys">
    <template #table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <div class="action-column-entity-index">
            <q-btn size="md"
                   color="primary"
                   label="جزییات"
                   :to="{name: 'Admin.Category.Show', params: {id: inputData.props.row.id}}" />
            <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />
          </div>
        </template>
        <template v-else>
          {{ inputData.props.value }}
        </template>
      </q-td>
    </template>
  </entity-index>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

export default {
  name: 'Admin.Category.Index',
  components: {
    EntityIndex,
    DeleteBtn
  },
  data () {
    return {
      inputs: [
        { type: 'input', name: 'title', value: null, label: 'نام', col: 'col-md-12' }
      ],
      api: API_ADDRESS.category.base,
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'title',
            required: true,
            label: 'نام',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'count',
            required: true,
            label: 'تعداد درس های دسته',
            align: 'left',
            field: () => '...'
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => ShamsiDate.getDateTime(row.creation_time)
          },
          {
            name: 'last_modification_time',
            required: true,
            label: 'تاریخ آخرین تغییر',
            align: 'left',
            field: row => ShamsiDate.getDateTime(row.last_modification_time)
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
      },
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },

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
            index: 'لیست دسته بندی ها'
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
                field: row => row.roles.length
                // field: row => row.roles.map(role => role.name).join(', ')
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
        {
          type: 'select',
          name: 'role',
          label: 'نقش',
          options: [{ label: 'superuser', value: 'superuser' }, { label: 'user', value: 'user' }],
          col: 'col-md-4'
        }
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
