<template>
  <div class="StoreRelatedProducts"
       :style="localOptions.style">
    <q-card v-if="relatedProducts.list.length > 0"
            class="StoreRelatedProducts__card">
      <q-card-section>
        محصولات مرتبط
      </q-card-section>
      <q-separator />
      <div class="products">
        <product-item v-for="(product, productIndex) in relatedProducts.list"
                      :key="productIndex"
                      :product="product"
                      :add-to-cart-loading="addToCartLoading"
                      class="product-item"
                      @add-to-cart="addToCart" />
      </div>
    </q-card>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ProductItem from './components/productItem.vue'
import { Product, ProductList } from 'src/models/Product.js'

export default {
  name: 'StoreRelatedProducts',
  components: { ProductItem },
  mixins: [mixinWidget],
  data () {
    return {
      addToCartLoading: false,
      relatedProducts: new ProductList()
    }
  },
  computed: {
    productId () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getRelatedProducts()
  },
  methods: {
    getRelatedProducts () {
      this.relatedProducts.loading = true
      APIGateway.product.relatedProducts({ id: this.productId })
        .then((products) => {
          this.relatedProducts = new ProductList(products.list)
        })
        .finally(() => {
          this.relatedProducts.loading = false
        })
    },
    addToCart (productId) {
      this.addToCartLoading = true
      APIGateway.basketItem.addProduct(productId, 1)
        .finally(() => {
          this.addToCartLoading = false
          this.checkoutReview()
        })
    },
    checkoutReview () {
      this.basket.loading = true
      APIGateway.basket.checkoutReview()
        .then((basket) => {
          this.$store.commit('Shop/updateBasket', new Basket(basket))
        })
        .finally(() => {
          this.basket.loading = false
        })
    },
    getProduct () {
      this.product.loading = true
      APIGateway.product.get(this.productId)
        .then((product) => {
          this.product = new Product(product)
          this.updateBreadcrumbs()
        })
        .finally(() => {
          this.product.loading = false
        })
    },
    setBreadcrumbsLoading () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: false,
        loading: true
      })
    },
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'خانه',
            to: { name: 'Public.Home' }
          },
          {
            label: 'فروشگاه',
            to: { name: 'Public.Shop' }
          },
          {
            label: this.product.title,
            to: { name: 'Public.Package', params: { id: this.product } }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.StoreRelatedProducts {
  .StoreRelatedProducts__card {
    box-shadow: none;
    border: 1px solid #DFE1EC;
    border-radius: 8px;
    .products {
      .product-item {
        border-bottom: solid 1px #DFE1EC;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
