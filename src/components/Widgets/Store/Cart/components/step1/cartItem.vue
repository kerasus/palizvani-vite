<template>
  <div class="cart-item">
    <div class="cart-item__use-type">
      <q-icon :name="usageIcon" />
    </div>
    <div class="cart-item__remove-action">
      <q-btn flat
             icon="close"
             @click="onRemove" />
    </div>
    <div class="cart-item__thumbnail">
      <q-img :src="packageOrProductObject.thumbnail" />
    </div>
    <div class="cart-item__info">
      <div class="cart-item__title">
        {{ packageOrProductObject.title }}
      </div>
      <div class="cart-item__attrs">
        <div class="cart-item__attr">
          <div class="cart-item__attr-label">
            نوع:
          </div>
          <div class="cart-item__attr-value">
            {{ packageOrProductObject.is_physical_info.label }}
          </div>
        </div>
        <div v-if="basketItem.product"
             class="cart-item__attr">
          <div class="cart-item__attr-label">
            جنس:
          </div>
          <div class="cart-item__attr-value">
            {{ packageOrProductObject.physical_type_info.label }}
          </div>
        </div>
      </div>
      <div v-if="false"
           class="cart-item__type-info">
        صوت
        <q-icon color="primary"
                name="account_balance_wallet" />
      </div>
      <div class="cart-item__count-action">
        <cart-count-action :basket-item="basketItem"
                           @increase="onIncrease"
                           @decrease="onDecrease"
                           @remove="onRemove" />
      </div>
      <div class="cart-item__price">
        <div class="cart-item__price-base">
          {{ packageOrProductObject.unit_price.toLocaleString('fa') }}
          تومان
        </div>
        <div class="cart-item__price-final">
          {{ packageOrProductObject.getFinalPrice() }}
          تومان
        </div>
      </div>
      <div v-if="basketItem.package"
           class="cart-item__products">
        <div v-for="(product, productIndex) in basketItem.package_info.products_info.list"
             :key="productIndex"
             class="cart-item__product">
          {{ product.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { BasketItem } from 'src/models/BasketItem.js'
import CartCountAction from 'src/components/cart/cartCountAction/cartCountAction.vue'

export default {
  name: 'cartItem',
  components: { CartCountAction },
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
  $cart-background-color: #F9F9FB;
  $cart-item__thumbnail-width: 153px;
  position: relative;
  background: $cart-background-color;
  border: 1px solid #DFE1EC;
  border-radius: 8px;
  padding: 24px 22px 24px 67px;
  display: flex;
  flex-flow: row;
  gap: 30px;
  min-height: 203px;
  .cart-item__use-type {
    $cart-item__use-type-width: 37px;
    position: absolute;
    top: 0;
    left: 16px;
    width: $cart-item__use-type-width;
    color: white;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 22px;
    background: $primary;
    &:after {
      position: absolute;
      content: ' ';
      bottom: calc( (#{$cart-item__use-type-width} * -1 / 2) - 9px );
      left: 0;
      transform: rotate(45deg);
      background: $cart-background-color;
      width: $cart-item__use-type-width;
      height: $cart-item__use-type-width;
      border-radius: 2px;
    }
  }
  .cart-item__remove-action {
    position: absolute;
    top: 85px;
    left: 20px;
    .q-btn {
      width: 32px;
      height: 32px;
    }
  }
  .cart-item__thumbnail {
    width: $cart-item__thumbnail-width;
  }
  .cart-item__info {
    width: calc( 100% - #{$cart-item__thumbnail-width} );
    color: #212121;
    .cart-item__title {
      font-size: 22px;
      margin-bottom: 27px;
    }
    .cart-item__attrs {
      display: flex;
      flex-flow: row;
      gap: 35px;
      flex-wrap: nowrap;
      margin-bottom: 70px;
      .cart-item__attr {
        display: flex;
        flex-flow: row;
        gap: 5px;
        flex-wrap: nowrap;
        .cart-item__attr-label {
          font-size: 16px;
          color: #797979;
          &:before {
            display: inline-block;
            content: ' ';
            width: 8px;
            height: 8px;
            background: #475F4A;
            border-radius: 100%;
            margin-right: 4px;
          }
        }
        .cart-item__attr-value {
          font-size: 16px;
        }
      }
    }
    .cart-item__type-info {
      position: absolute;
      top: 30px;
      right: 22px;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      gap: 2px;
      padding: 0 4px 0 16px;
      background: #FFFFFF;
      border: 1px solid #DFE1EC;
      border-radius: 20px;
      color: #212121;
      font-size: 16px;
    }
    .cart-item__count-action {
      position: absolute;
      right: 20px;
      top: 65px;
      width: 120px;
    }
    .cart-item__price {
      position: absolute;
      top: 136px;
      right: 20px;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      gap: 19px;
      .cart-item__price-base {
        color: #FF3D3D;
        font-size: 18px;
        text-decoration: line-through;
      }
      .cart-item__price-final {
        color: $primary;
        font-size: 24px;
      }
    }
    .cart-item__products {
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      .cart-item__product {
        width: 33.33%;
        margin-bottom: 17px;
        &:before {
          display: inline-block;
          content: ' ';
          width: 8px;
          height: 8px;
          background: #475F4A;
          border-radius: 100%;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
