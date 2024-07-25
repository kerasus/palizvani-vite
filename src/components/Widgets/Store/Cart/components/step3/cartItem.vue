<template>
  <div class="cart-item">
    <div class="cart-item__use-type">
      <q-icon :name="usageIcon" />
    </div>
    <div class="cart-item__thumbnail">
      <q-img :src="packageOrProductObject.thumbnail" />
    </div>
    <div class="cart-item__title">
      {{ packageOrProductObject.title }}
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { BasketItem } from 'src/models/BasketItem.js'

export default {
  name: 'CartItem',
  props: {
    basketItem: {
      type: BasketItem,
      default: new BasketItem()
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
.cart-item {
  position: relative;
  .cart-item__use-type {
    position: absolute;
    top: 0;
    right: 0;
    width: 41px;
    height: 41px;
    background: #C8FFCF;
    border-radius: 0 8px;
    opacity: 0.57;
    color: $primary;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    .q-icon {
      font-size: 25px;
    }
  }
  .cart-item__thumbnail {
    border-radius: 8px;
    overflow: hidden;
  }
  .cart-item__title {
    font-size: 14px;
    color: #212121;
    text-align: center;
  }
}
</style>
