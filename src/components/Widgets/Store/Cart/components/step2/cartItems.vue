<template>
  <div class="cart-items">
    <div class="cart-items__title">
      <q-icon name="shopping_cart" />
      خرید شما:
    </div>
    <div class="cart-items__items row q-col-gutter-md">
      <div v-for="(basketItem, basketItemIndex) in basketItems.list"
           :key="basketItemIndex"
           class="col-md-2 col-sm-6 col-xs-12">
        <cart-item :basket-item="basketItem"
                   class="cart-items__item" />
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from './cartItem.vue'
import { Product } from 'src/models/Product'
import { BasketItemList } from 'src/models/BasketItem.js'

export default {
  name: 'CartItems',
  components: { CartItem },
  props: {
    basketItems: {
      type: BasketItemList,
      default: new BasketItemList()
    }
  },
  emits: ['increase', 'decrease', 'remove'],
  data () {
    return {
      step: 1
    }
  },
  computed: {
    packageOrProductObject () {
      if (this.basketItem.product) {
        return this.basketItem.product_info
      }
      if (this.basketItem.package) {
        return this.basketItem.package_info
      }

      return new Product()
    },
    usageIcon () {
      if (this.basketItem.package) {
        return 'inventory_2'
      }
      if (this.packageOrProductObject.is_physical) {
        return 'local_shipping'
      }
      return 'file_download'
    }
  },
  methods: {
    onIncrease () {
      this.$emit('increase', this.basketItem)
    },
    onDecrease () {
      this.$emit('decrease', this.basketItem)
    },
    onRemove () {
      this.$emit('remove', this.basketItem)
    }
  }
}
</script>

<style scoped lang="scss">
.cart-items {
  border-radius: 8px;
  background: #F9F9FB;
  border: 1px solid #DFE1EC;
  padding: 20px 38px;
  .cart-items__title {
    color: #727272;
    font-size: 16px;
    margin-bottom: 22px;
  }
  .cart-items__items {
    padding-left: 20px;
  }
}
</style>
