<template>
  <div class="AdminStoreCategoryShow"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-edit v-if="mounted"
                 ref="entityEdit"
                 v-model:value="inputs"
                 title="مشخصات دسته بندی کلی"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-route-name="showRouteName"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-save-button="false"
                 :show-reload-button="false"
                 :redirect-after-edit="false"
                 :after-load-input-data="afterLoadInputData">
      <template #after-form-builder>
        <div v-if="storeCategory.id"
             class="q-mt-lg">
          <q-expansion-item expand-separator
                            label="لیست دسته بندی ها">
            <q-card>
              <q-card-section>
                <admin-store-category-list :key="listKey"
                                           title="لیست دسته بندی های جزیی"
                                           :parent="storeCategory.id" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            label="ایجاد دسته بندی">
            <q-card>
              <q-card-section>
                <admin-store-category-create :key="listKey"
                                             title="ایجاد دسته بندی جزیی"
                                             :parent="storeCategory.id"
                                             :show-back-btn="false"
                                             @onCreated="onCreated" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </template>
    </entity-edit>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'components/Control/btn.vue'
import { StoreCategory } from 'src/models/StoreCategory.js'
import AdminStoreCategoryList from 'components/Widgets/Store/StoreCategory/AdminStoreCategoryList/AdminStoreCategoryList.vue'
import AdminStoreCategoryCreate from 'components/Widgets/Store/StoreCategory/AdminStoreCategoryCreate/AdminStoreCategoryCreate.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminStoreCategoryShow',
  components: {
    EntityEdit,
    AdminStoreCategoryList,
    AdminStoreCategoryCreate
  },
  mixins: [mixinWidget],
  data () {
    const storeCategoryId = this.$route.params.id

    return {
      listKey: Date.now(),
      replyText: null,
      mounted: false,
      entityLoading: true,
      storeCategory: new StoreCategory(),
      api: APIGateway.storeCategory.APIAdresses.byId(storeCategoryId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Ticket.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', value: null, placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', value: null, placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', value: null, placeholder: ' ', col: 'col-md-12 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تایید', placeholder: ' ', ignoreValue: false, atClick: this.edit, col: 'col-12' },
        { type: 'hidden', name: 'parent', responseKey: 'parent', value: null },
        { type: 'hidden', name: 'id', responseKey: 'id', value: null }
      ]
    }
  },
  computed: {
    repliesInfo () {
      return this.inputs.find(input => input.name === 'replies_info').value
    }
  },
  created() {
    this.storeCategory.loading = true
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    afterLoadInputData (data) {
      this.storeCategory = new StoreCategory(data)
      this.storeCategory.loading = false
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
    },
    onCreated () {
      this.listKey = Date.now()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminStoreCategoryShow {
}
</style>
