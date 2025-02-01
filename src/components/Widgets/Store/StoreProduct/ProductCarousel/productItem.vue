<template>
  <div class="product-item">
    <div class="product-item__badges">
      <div v-if="product.is_purchased"
           class="product-item__badge">
        <div class="product-item__badge-title">
          خریداری شده است
        </div>
        <div class="product-item__badge-icon">
          <q-icon name="done_all" />
        </div>
      </div>
      <div class="product-item__badge">
        <div class="product-item__badge-title">
          {{ product.is_physical_info.label }}
        </div>
        <div class="product-item__badge-icon">
          <q-icon :name="product.is_physical ? 'shopping_basket' : 'folder'" />
        </div>
      </div>
      <div v-if="product.physical_type"
           class="product-item__badge">
        <div class="product-item__badge-title">
          {{ product.physical_type_info.label }}
        </div>
        <div class="product-item__badge-icon">
          <q-icon name="category" />
        </div>
      </div>
    </div>
    <div class="product-item__thumbnail">
      <img :src="product.thumbnail">
    </div>
    <div class="product-item__title">
      {{ product.title }}
    </div>
    <div class="product-item__price">
      <div v-if="product.unit_price !== product.sellable_price"
           class="product-item__price-base">
        {{ parseInt(product.unit_price).toLocaleString('fa') }}
        ریال
      </div>
      <div class="product-item__price-final">
        {{ parseInt(product.sellable_price).toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div class="product-item__actions">
      <q-btn class="product-item__actions-view"
             color="primary"
             :to="{ name: 'Public.Product', params: { id: product.id } }"
             outline>
        مشاهده جزییات
      </q-btn>
      <template v-if="!product.is_add_to_basket_disabled">
        <q-btn v-if="!basketItem && (product.inventory > 0 || product.inventory ===-1)"
               class="product-item__actions-add-to-cart"
               :loading="addToCartLoading"
               color="primary"
               @click="addToCart">
          افزودن به سبد
        </q-btn>
        <cart-count-action v-else
                           :basket-item="basketItem"
                           @increase="onIncrease"
                           @decrease="onDecrease"
                           @remove="onRemove" />
      </template>
      <q-btn v-if="product.inventory === 0"
             class="product-btn-add-to-cart"
             :loading="addToCartLoading"
             disable
             color="primary">
        ناموجود
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'
import CartCountAction from 'src/components/cart/cartCountAction/cartCountAction.vue'

export default {
  name: 'ProductItem',
  components: { CartCountAction },
  props: {
    product: {
      type: Product,
      default: new Product()
    }
  },
  data () {
    return {
      addToCartLoading: false
    }
  },
  computed: {
    basket () {
      return this.$store.getters['Shop/basket']
    },
    basketItem () {
      const target = this.basket.items_info.list.find(basketItem => basketItem.product === this.product.id)
      if (!target) {
        return null
      }

      return target
    }
  },
  methods: {
    onIncrease () {
      this.addToCartLoading = true
      APIGateway.basketItem.incrementProduct(this.basketItem.product)
        .finally(() => {
          this.checkoutReview()
          this.addToCartLoading = false
        })
    },
    onDecrease () {
      this.addToCartLoading = true
      APIGateway.basketItem.decrementProduct(this.basketItem.product)
        .finally(() => {
          this.checkoutReview()
          this.addToCartLoading = false
        })
    },
    onRemove () {
      this.addToCartLoading = true
      APIGateway.basketItem.remove(this.basketItem.id)
        .finally(() => {
          this.checkoutReview()
          this.addToCartLoading = false
        })
    },
    addToCart () {
      this.addToCartLoading = true
      APIGateway.basketItem.addProduct(this.product.id, 1)
        .finally(() => {
          this.addToCartLoading = false
          this.checkoutReview()
        })
    },
    checkoutReview () {
      this.addToCartLoading = true
      APIGateway.basket.checkoutReview()
        .then((basket) => {
          this.$store.commit('Shop/updateBasket', new Basket(basket))
        })
        .finally(() => {
          this.addToCartLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.product-item {
  $transition-time: 0s;
  background: #F6F6F6;
  border: 1px solid #DFE1EC;
  border-radius: 8px;
  position: relative;
  .product-item__badges {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    gap: 10px;
    .product-item__badge {
      transition: all $transition-time;
      width: max-content;
      background: #FFFFFF;
      border: 1px solid #DFE1EC;
      border-radius: 20px;
      height: 30px;
      padding: 4px 8px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      gap: 4px;
      align-items: center;
      .product-item__badge-title {
        display: none;
        font-size: 13px;
        color: #212121;
      }
      .product-item__badge-icon {
        color: $primary;
      }
    }
  }
  :deep(.product-item__thumbnail) {
    transition: all $transition-time;
    margin: 15px 58px 12px 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .product-item__title {
    color: #212121;
    width: 100%;
    padding: 0 4px;
    text-align: center;
    font-size: 18px;
    //margin-bottom: 52px;
    margin-bottom: 8px;
  }
  .product-item__price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    //margin-bottom: 43px;
    margin-bottom: 8px;
    .product-item__price-final {
      font-size: 18px;
      color: #475F4A;
    }
    .product-item__price-base {
      font-size: 16px;
      color: #FF3D3D;
      text-decoration: line-through;
    }
  }
  .product-item__actions {
    //display: none;
    display: flex;
    flex-flow: column;
    margin: 0 25px 25px 25px;
    .product-item__actions-view {
      background: white;
      margin-bottom: 20px;
      width: 100%;
    }
    .product-item__actions-add-to-cart {
      width: 100%;
    }
  }
  &:hover {
    .product-item__badges {
      .product-item__badge {
        .product-item__badge-title {
          display: block;
        }
      }
    }
    //:deep(.product-item__thumbnail) {
    //  margin: 10px auto 4px auto;
    //  img {
    //    width: 90px;
    //  }
    //}
    //.product-item__title {
    //  margin-bottom: 44px;
    //}
    //.product-item__price {
    //  margin-bottom: 27px;
    //}
    .product-item__actions {
      display: flex;
      flex-flow: column;
    }
  }
  @media screen and (max-width: 1024px) {
    & {
      .product-item__badges {
        z-index: 2;
        .product-item__badge {
          .product-item__badge-title {
            display: block;
          }
        }
      }
      :deep(.product-item__thumbnail) {
        z-index: 1;
      }
      .product-item__title {
        margin-bottom: 44px;
      }
      .product-item__price {
        margin-bottom: 27px;
      }
      .product-item__actions {
        display: flex;
        flex-flow: column;
      }
    }
  }
}
</style>
