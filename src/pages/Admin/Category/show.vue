<template>
  <entity-edit ref="categoryEntityEdit"
               v-model:value="inputs"
               title="مشخصات دسته بندی"
               :api="api"
               :entity-id-key="entityIdKey"
               :entity-param-key="entityParamKey"
               :show-route-name="showRouteName"
               :show-close-button="false"
               :show-edit-button="false"
               :show-expand-button="false"
               :show-save-button="false"
               :show-reload-button="false">
    <template #after-form-builder>
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-md-3">
          <q-input v-model="newUnitName"
                   label="درس ها"
                   :disable="newUnitLoading"
                   :loading="newUnitLoading" />
        </div>
        <div class="col-md-3">
          <q-input v-model="newUnitSessionCount"
                   label="تعداد جلسات"
                   type="number"
                   :disable="newUnitLoading"
                   :loading="newUnitLoading" />
        </div>
        <div class="col-md-3">
          <q-btn color="primary"
                 label="افزودن"
                 @click="createUnit" />
        </div>
      </div>
      <div class="row ">
        <div class="col">
          <entity-index ref="unitEntityIndex"
                        v-model:value="unitFilterInputs"
                        title="لیست درس ها"
                        :api="unitApi"
                        :table="unitTable"
                        :table-keys="unitTableKeys"
                        :show-reload-button="false"
                        :show-search-button="false"
                        :show-expand-button="false">
            <template #table-cell="{inputData, showConfirmRemoveDialog}">
              <q-td :props="inputData.props">
                <template v-if="inputData.props.col.name === 'actions'">
                  <div class="action-column-entity-index">
                    <q-btn size="md"
                           color="primary"
                           label="تعیین جزییات"
                           :to="{name: 'Admin.Unit.Show', params: {id: inputData.props.row.id}}" />
                    <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />
                  </div>
                </template>
                <template v-else>
                  {{ inputData.props.value }}
                </template>
              </q-td>
            </template>
          </entity-index>
        </div>
      </div>
    </template>
  </entity-edit>
</template>

<script>
import { shallowRef } from 'vue'
import API_ADDRESS from 'src/api/Addresses.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { EntityEdit, EntityIndex } from 'quasar-crud'
import BtnControl from 'src/components/Control/btn.vue'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'Admin.Category.Index',
  components: {
    EntityEdit,
    EntityIndex,
    DeleteBtn
  },
  data () {
    return {
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: API_ADDRESS.category.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Category.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام دسته بندی', col: 'col-md-6' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'بروزرسانی', props: { atClick: this.updateCategory }, col: 'col-md-6' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id' }
      ],

      unitFilterInputs: [],

      unitApi: API_ADDRESS.unit.base + '?category=' + this.$route.params.id,
      unitTable: {
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
            label: 'نام درس',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'count',
            required: true,
            label: 'تعداد جلسات',
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
      unitTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }

    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    updateCategory () {
      if (!this.$refs.categoryEntityEdit) {
        return
      }
      this.$refs.categoryEntityEdit.editEntity()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    },
    reloadUnits () {
      this.$refs.unitEntityIndex.reload()
    },
    createUnit () {
      this.newUnitLoading = true
      this.$axios.post(API_ADDRESS.unit.base, {
        title: this.newUnitName,
        category: this.$route.params.id,
        default_session_count: this.newUnitSessionCount
      })
        .then(() => {
          this.newUnitLoading = false
          this.reloadUnits()
        })
        .catch(() => {
          this.newUnitLoading = false
        })
    }
  }
}
</script>

<style>
.fit-to-card {
  margin: -16px;
}
</style>
