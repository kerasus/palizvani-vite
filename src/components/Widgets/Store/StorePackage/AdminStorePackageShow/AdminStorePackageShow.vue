<template>
  <div class="AdminStorePackageShow"
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
                 title="اطلاعات بسته"
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
                 :after-load-input-data="afterLoadInputData" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'components/Control/btn.vue'
import ProductSelector from 'components/FormBuilderCustumComponents/ProductSelector.vue'
import ContentCategorySelector from 'components/FormBuilderCustumComponents/ContentCategorySelector.vue'

const BtnControlComp = shallowRef(BtnControl)
const ProductSelectorComp = shallowRef(ProductSelector)
const ContentCategorySelectorComp = shallowRef(ContentCategorySelector)

export default {
  name: 'AdminStorePackageShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data () {
    const packageId = this.$route.params.id
    return {
      mounted: false,
      entityLoading: true,
      api: APIGateway.package.APIAdresses.byId(packageId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Store.Package.Show',
      indexRouteName: 'Admin.Store.Package.List',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: ContentCategorySelectorComp, name: 'content_category', responseKey: 'content_category_info', categoryType: 'content', col: 'col-md-12 col-12' },
        { type: ContentCategorySelectorComp, name: 'store_category', responseKey: 'store_category_info', categoryType: 'store', col: 'col-md-12 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-md-12 col-12' },
        { type: 'checkbox', name: 'is_hidden', responseKey: 'is_hidden', label: 'نمایش/عدم نمایش', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'unit_price', responseKey: 'unit_price', label: 'قیمت واحد(ریال)', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'discount_percent', responseKey: 'discount_percent', label: 'درصد تخفیف', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'inventory', responseKey: 'inventory', label: 'موجودی', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'input', name: 'maximum_order_count', responseKey: 'maximum_order_count', label: 'سقف سفارش مجاز', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'input', name: 'weight', responseKey: 'weight', label: 'وزن', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: ProductSelectorComp, name: 'products', responseKey: 'products_info', label: 'انتخاب محصولات', selectionMode: 'multiple', col: 'col-12' },

        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ویرایش بسته', placeholder: ' ', ignoreValue: true, atClick: () => {}, col: 'col-md-6' }
      ]
    }
  },
  mounted() {
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      this.inputs.forEach((item, index) => {
        if (item.name === 'btn') {
          this.inputs[index].atClick = this.edit
        }
      })
    },
    afterLoadInputData () {
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
    }
  }
}
</script>

<style scoped lang="scss">
.AdminStorePackageShow {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    display: flex;
    flex-flow: row;
    position: relative;
    .static-title {

    }
    .dynamic-title {

    }
    .back-action {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  :deep(.form) {
    padding: 24px;
  }
}
</style>
