<template>
  <div class="AdminContentCreate"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-create v-if="mounted"
                   ref="entityCreate"
                   v-model:value="inputs"
                   title="ایجاد بسته"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'components/Control/btn.vue'
import ProductSelector from 'components/FormBuilderCustumComponents/ProductSelector.vue'
import ContentCategorySelector from 'components/FormBuilderCustumComponents/ContentCategorySelector.vue'

const BtnControlComp = shallowRef(BtnControl)
const ProductSelectorComp = shallowRef(ProductSelector)
const ContentCategorySelectorComp = shallowRef(ContentCategorySelector)

export default {
  name: 'AdminContentCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.content.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Content.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: ContentCategorySelectorComp, name: 'content_category', responseKey: 'content_category_info', categoryType: 'content', col: 'col-md-12 col-12' },
        { type: ContentCategorySelectorComp, name: 'store_category', responseKey: 'store_category_info', categoryType: 'store', col: 'col-md-12 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-md-12 col-12' },
        { type: 'inputEditor', name: 'specification', responseKey: 'specification', label: 'specification', col: 'col-md-12 col-12' },
        { type: 'input', name: 'unit_price', responseKey: 'unit_price', label: 'قیمت واحد', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'discount_percent', responseKey: 'discount_percent', label: 'درصد تخفیف', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'inventory', responseKey: 'inventory', label: 'موجودی', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'input', name: 'maximum_order_count', responseKey: 'maximum_order_count', label: 'سقف سفارش مجاز', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'input', name: 'weight', responseKey: 'weight', label: 'وزن', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: ProductSelectorComp, name: 'products', responseKey: 'products_info', label: 'انتخاب محصولات', selectionMode: 'multiple', col: 'col-12' },

        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ساخت بسته', placeholder: ' ', ignoreValue: true, atClick: () => {}, col: 'col-md-6' }
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
          this.inputs[index].atClick = this.onSubmit
        }
      })
    },
    onSubmit () {
      this.create()
    },
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity()
        .then(() => {
          this.entityLoading = false
        })
        .catch(() => {
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminContentCreate {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    position: relative;
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
