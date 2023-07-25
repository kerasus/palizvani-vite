<template>
  <div>
    <div>
      <entity-edit v-if="mounted"
                   ref="categoryEntityEdit"
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
          <div class="flex justify-end">
            <q-btn color="primary"
                   label="تایید"
                   @click="updateCategory" />
          </div>
        </template>
      </entity-edit>
    </div>
    <div class="q-mt-md">
      <entity-index v-if="mounted"
                    ref="sessionEntityIndex"
                    v-model:value="sessionFilterInputs"
                    title="لیست جلسات"
                    :api="sessionApi"
                    :table="sessionTable"
                    :table-keys="sessionTableKeys"
                    :show-reload-button="false"
                    :show-search-button="false"
                    :show-expand-button="false">
        <template #toolbar>
          <div class="flex justify-end">
            <q-btn color="primary"
                   outline
                   label="افزودن جلسه"
                   :loading="newSessionLoading"
                   @click="createSession" />
          </div>
        </template>
        <template #table-cell="{inputData, showConfirmRemoveDialog}">
          <q-td :props="inputData.props">
            <template v-if="inputData.props.col.name === 'actions'">
              <div class="q-gutter-md">
                <div class="action-column-entity-index">
                  <q-btn size="md"
                         color="primary"
                         outline
                         label="بانک سوالات"
                         class="btn-go-to-question-bank"
                         :to="{name: 'Admin.Session.Show', params: {id: inputData.props.row.id}}" />
                  <q-btn size="md"
                         color="primary"
                         label="تعیین جزییات"
                         :to="{name: 'Admin.SessionTemplate.Show', params: {id: inputData.props.row.id}}" />
                  <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />
                </div>
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

<script>
import { shallowRef } from 'vue'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EntityEdit, EntityIndex } from 'quasar-crud'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'
import { UnitCategoryList } from 'src/models/UnitCategory.js'
import PostRequisites from 'src/components/Control/PostRequisites.vue'

const PostRequisitesComp = shallowRef(PostRequisites)

export default {
  name: 'Admin.Category.Index',
  components: {
    EntityEdit,
    DeleteBtn,
    EntityIndex
  },
  data () {
    return {
      mounted: false,
      newSessionLoading: false,
      newSessionName: '-',
      newSessionSessionCount: null,
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Unit.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام درس', col: 'col-md-12' },
        { type: 'inputEditor', name: 'rules', responseKey: 'rules', label: 'قوانین درس', col: 'col-md-12' },
        { type: 'inputEditor', name: 'codes', responseKey: 'codes', label: 'آیین نامه', col: 'col-md-12' },
        { type: PostRequisitesComp, name: 'prerequisites', responseKey: 'prerequisites', col: 'col-md-12' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-3' },
        { type: 'hidden', name: 'category', responseKey: 'category_info.id', label: 'id', col: 'col-md-3' }
      ],

      categories: new UnitCategoryList(),
      units: new UnitCategoryList(),
      prerequisite: {
        category: null,
        unit: null
      },

      sessionFilterInputs: [],

      sessionApi: null,
      sessionTable: {
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
            label: 'عنوان جلسه',
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
      sessionTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  mounted () {
    this.api = APIGateway.unit.APIAdresses.byId(this.$route.params.id)
    this.sessionApi = APIGateway.sessionTemplate.APIAdresses.base + '?unit=' + this.$route.params.id
    // this.getCategories()
    this.mounted = true
  },
  methods: {
    getCategories () {
      this.categories.loading = true
      APIGateway.unitCategory.index()
        .then(categories => {
          this.categories.loading = false
          this.categories = new UnitCategoryList(categories.list)
        })
        .catch(() => {
          this.categories.loading = false
        })
    },
    getUnits () {
      this.units.loading = true
      APIGateway.unit.index({ category: this.prerequisite.category })
        .then(units => {
          this.units.loading = false
          this.units = new UnitCategoryList(units.list)
        })
        .catch(() => {
          this.units.loading = false
        })
    },
    updateCategory () {
      this.$refs.categoryEntityEdit.editEntity()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    },
    reloadSessions () {
      this.$refs.sessionEntityIndex.reload()
    },
    createSession () {
      this.newSessionLoading = true
      APIGateway.sessionTemplate.create({
        title: this.newSessionName,
        unit: this.$route.params.id
      })
        .then(() => {
          this.newSessionLoading = false
          this.reloadSessions()
        })
        .catch(() => {
          this.newSessionLoading = false
        })
    }
  }
}
</script>

<style scoped>
.btn-go-to-question-bank {
  margin-right: 20px;
}
</style>
