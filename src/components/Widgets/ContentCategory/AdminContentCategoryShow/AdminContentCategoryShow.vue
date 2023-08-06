<template>
  <div class="AdminContentCategoryShow"
       :style="localOptions.style">
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
        <div v-if="contentCategory.id"
             class="q-mt-lg">
          <admin-content-category-list :key="listKey"
                                       title="لیست دسته بندی های جزیی"
                                       :parent="contentCategory.id" />
          <q-separator class="q-my-lg" />
          <admin-content-category-create :key="listKey"
                                         title="ایجاد دسته بندی جزیی"
                                         :parent="contentCategory.id"
                                         @onCreated="onCreated" />
        </div>
      </template>
    </entity-edit>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit, EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import { ContentCategory } from 'src/models/ContentCategory.js'
import AdminContentCategoryList from 'src/components/Widgets/ContentCategory/AdminContentCategoryList/AdminContentCategoryList.vue'
import AdminContentCategoryCreate from 'src/components/Widgets/ContentCategory/AdminContentCategoryCreate/AdminContentCategoryCreate.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminContentCategoryShow',
  components: {
    AdminContentCategoryList,
    AdminContentCategoryCreate,
    EntityEdit
  },
  mixins: [mixinWidget, EntityCreate],
  data: () => {
    return {
      listKey: Date.now(),
      replyText: null,
      mounted: false,
      entityLoading: true,
      contentCategory: new ContentCategory(),
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Ticket.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-6 col-12' },
        // { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', placeholder: ' ', col: 'col-md-12 col-12' },
        { type: 'hidden', name: 'parent', responseKey: 'parent', value: null },
        { type: 'hidden', name: 'id', responseKey: 'id', value: null },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تایید', placeholder: ' ', atClick: () => {}, col: 'col-12' }
      ]
    }
  },
  computed: {
    repliesInfo () {
      return this.inputs.find(input => input.name === 'replies_info').value
    }
  },
  created() {
    this.contentCategory.loading = true
    this.api = APIGateway.contentCategory.APIAdresses.byId(this.$route.params.id)
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    afterLoadInputData (data) {
      this.contentCategory = new ContentCategory(data)
      this.contentCategory.loading = false
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity()
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
.AdminContentCategoryShow {
}
</style>
