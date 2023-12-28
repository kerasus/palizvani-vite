<template>
  <entity-index v-if="mounted"
                ref="graderList"
                v-model:value="graderListInputs"
                title="لیست مصححین"
                :api="graderListApi"
                :table="graderListTable"
                :table-keys="graderListTableKeys"
                :show-search-button="false"
                :show-reload-button="false"
                :show-expand-button="false">
    <template #toolbar>
      <form-builder ref="formBuilder"
                    v-model:value="addGraderInputs"
                    :loading="addNewGraderLoading" />
    </template>
    <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
      <template v-if="inputData.col.name === 'number'">
        {{ inputData.rowNumber }}
      </template>
      <template v-else-if="inputData.col.name === 'actions'">
        <div class="action-column-entity-index">
          <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />
        </div>
      </template>
      <template v-else-if="inputData.col.name === 'members'">
        <div class="action-column-entity-index">
          <q-btn size="md"
                 color="primary"
                 outline
                 label="بررسی پروژه"
                 :to="{name: 'Admin.Classroom.Grader.Members', params: {classroom_id: $route.params.id, project_id: inputData.props.row.id}}"
                 class="q-mr-md" />
        </div>
      </template>
      <template v-else>
        {{ inputData.col.value }}
      </template>
    </template>
  </entity-index>
  <q-skeleton v-else
              type="rect"
              height="200px" />
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'
import { FormBuilder, inputMixin } from 'quasar-form-builder'
import EntityInput from 'quasar-crud/src/components/Entity/Attachment/EntityInput.vue'

const EntityInputComp = shallowRef(EntityInput)

export default {
  name: 'GraderList',
  components: {
    DeleteBtn,
    EntityIndex,
    FormBuilder
  },
  mixins: [inputMixin],
  props: {
    classroomId: {
      type: Number,
      default: null
    }
  },
  data () {
    const classroomId = this.classroomId
    return {
      mounted: false,
      addNewGraderLoading: false,

      addGraderInputs: [
        {
          type: EntityInputComp,
          name: 'graders',
          selectionMode: 'multiple',
          popUpButtonConfig: {
            label: 'اختصاص مصحح جدید',
            outline: true,
            buttonColor: 'deep-purple',
            buttonTextColor: 'white',
            buttonBadgeColor: 'pink'
          },
          dialogConfirmButtonConfig: {
            label: 'تایید',
            buttonColor: 'deep-purple',
            buttonTextColor: 'white',
            buttonBadgeColor: 'pink'
          },

          apiAddress: APIGateway.user.APIAdresses.base,
          tableTitle: 'لیست کل مصححین',
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
                label: 'شناسه',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'fullname',
                required: true,
                label: 'نام و نام خانوادگی',
                align: 'left',
                field: row => row.firstname + ' ' + row.lastname
              },
              {
                name: 'national_code',
                required: true,
                label: 'کد ملی',
                align: 'left',
                field: row => row.national_code
              },
              {
                name: 'mobile_number',
                required: true,
                label: 'شماره همراه',
                align: 'left',
                field: row => row.mobile_number
              }
            ]
          },
          inputs: [
            { type: 'input', name: 'id', value: null, label: 'شناسه', placeholder: ' ', col: 'col-md-4 col-12' },
            { type: 'input', name: 'national_code', value: null, label: 'کد ملی', placeholder: ' ', col: 'col-md-4 col-12' },
            { type: 'input', name: 'mobile_number', value: null, label: 'شماره همراه', placeholder: ' ', col: 'col-md-4 col-12' },
            { type: 'input', name: 'email', value: null, label: 'ایمیل', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'input', name: 'firstname', value: null, label: 'نام', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'input', name: 'lastname', value: null, label: 'نام خانوادگی', placeholder: ' ', col: 'col-md-3 col-12' },
            { type: 'hidden', name: 'role', value: 'grader' },
            { type: 'hidden', name: 'classroom_graders__classroom__ne', value: classroomId }
          ],
          itemIndicatorKey: row => row.firstname + ' ' + row.lastname,
          // itemIndicatorKey: 'firstname',
          itemIdentifyKey: 'id',
          onConfirmed: this.onConfirmedSelected,

          value: [],
          selected: [],
          col: 'col-md-12 col-12'
        }
      ],

      graderListInputs: [
        { type: 'hidden', name: 'classroom', value: classroomId }
      ],
      graderListApi: APIGateway.classroomGrader.APIAdresses.base,
      graderListTable: {
        columns: [
          {
            name: 'number',
            required: true,
            label: 'شماره',
            align: 'left',
            field: () => ''
          },
          {
            name: 'id',
            required: true,
            label: 'شناسه',
            align: 'left',
            field: row => row.grader_info.id
          },
          {
            name: 'title',
            required: true,
            label: 'جنسیت',
            align: 'left',
            field: row => (row.grader_info.gender === 1) ? 'مذکر' : ((row.grader_info.gender === 2) ? 'مونث' : '-')
          },
          {
            name: 'creation_time',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.grader_info.firstname + ' ' + row.grader_info.lastname
          },
          {
            name: 'creation_time',
            required: true,
            label: 'کدملی',
            align: 'left',
            field: row => row.grader_info.national_code
          },
          {
            name: 'creation_time',
            required: true,
            label: 'شماره تلفن',
            align: 'left',
            field: row => row.grader_info.mobile_number
          },
          {
            name: 'creation_time',
            required: true,
            label: 'دانشگاه',
            align: 'left',
            field: row => row.grader_info.last_academy_name
          },
          {
            name: 'creation_time',
            required: true,
            label: 'شهر',
            align: 'left',
            field: row => row.grader_info.living_city
          },
          {
            name: 'actions',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: ''
          }
        ]
      },
      graderListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  computed: {
    tableChosenValues: {
      get () {
        if (Array.isArray(this.tableSelectedValues)) {
          return this.tableSelectedValues
        }
        return [this.tableSelectedValues]
      },
      set () {}
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    onConfirmedSelected (data) {
      const graders = data.map(item => item.id)
      this.addNewGraderLoading = true
      APIGateway.classroom.appendGraders({ classroomId: this.classroomId, graders })
        .then(() => {
          this.$refs.graderList.search()
          this.addNewGraderLoading = false
        })
        .catch(() => {
          this.addNewGraderLoading = false
        })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.grader_info.firstname + ' ' + row.grader_info.lastname + ' اطمینان دارید؟'
    }
  }
}
</script>
