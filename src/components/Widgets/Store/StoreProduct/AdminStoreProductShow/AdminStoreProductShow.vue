<template>
  <div class="AdminContentShow"
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
                 title="اطلاعات محصول"
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
import ContentMedias from 'components/FormBuilderCustumComponents/ContentMedias/ContentMedias.vue'
import ContentCategorySelector from 'components/FormBuilderCustumComponents/ContentCategorySelector.vue'

const BtnControlComp = shallowRef(BtnControl)
const ContentMediasComp = shallowRef(ContentMedias)
const ContentCategorySelectorComp = shallowRef(ContentCategorySelector)

export default {
  name: 'AdminContentShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: true,
      api: APIGateway.product.APIAdresses.byId(this.$route.params.id),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Store.Product.Show',
      indexRouteName: 'Admin.Store.Product.List',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: ContentCategorySelectorComp, name: 'content_category', responseKey: 'content_category_info', categoryType: 'content', col: 'col-md-12 col-12' },
        { type: ContentCategorySelectorComp, name: 'store_category', responseKey: 'store_category_info', categoryType: 'store', col: 'col-md-12 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-md-12 col-12' },
        { type: 'inputEditor', name: 'specification', responseKey: 'specification', label: 'specification', col: 'col-md-12 col-12' },
        { type: ContentMediasComp, name: 'medias', responseKey: 'medias_info', sourceType: 'PRODUCT', col: 'col-md-12 col-12' },
        { type: 'input', name: 'unit_price', responseKey: 'unit_price', label: 'قیمت واحد', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'discount_percent', responseKey: 'discount_percent', label: 'درصد تخفیف', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'inventory', responseKey: 'inventory', label: 'موجودی', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'input', name: 'maximum_order_count', responseKey: 'maximum_order_count', label: 'سقف سفارش مجاز', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'input', name: 'weight', responseKey: 'weight', label: 'وزن', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'checkbox', name: 'is_physical', responseKey: 'is_physical', label: 'فیزیکی', placeholder: ' ', col: 'col-12' },

        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ویرایش محصول', placeholder: ' ', ignoreValue: true, atClick: () => {}, col: 'col-md-6' }
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
.AdminContentShow {
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
