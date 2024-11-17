<template>
  <q-card v-for="(product, productIndex) in products.list"
          :key="productIndex"
          class="q-mb-md">
    <q-card-section>{{ product.title }}</q-card-section>
    <q-separator />
    <q-card-section>
      <content-medias v-if="product.medias_info.list.length > 0"
                      :can-delete="false"
                      :can-add-media="false"
                      :show-download-link="true"
                      :show-page-link="false"
                      :readonly="true"
                      :value="product.medias_info.list" />
      <q-badge v-else>
        محتوای قابل دانلودی برای این محصول وجود ندارد
      </q-badge>
    </q-card-section>
  </q-card>
</template>

<script>
import { BasketItem } from 'src/models/BasketItem.js'
import { ProductList } from 'src/models/Product.js'
import ContentMedias from 'src/components/FormBuilderCustumComponents/ContentMedias/ContentMedias.vue'

export default {
  name: 'ProductOrPackageMedias',
  components: { ContentMedias },
  props: {
    basketItem: BasketItem,
    default: new BasketItem()
  },
  data () {
    return {
      products: new ProductList(),
      medias: null
    }
  },
  mounted() {
    this.loadProducts()
  },
  methods: {
    loadProducts () {
      if (this.basketItem.product_info.id) {
        this.products = new ProductList([this.basketItem.product_info])
      } else if (this.basketItem.package_info.id) {
        this.products = new ProductList(this.basketItem.package_info.products_info)
      }
    }
  }
}
</script>

<style scoped>

</style>
