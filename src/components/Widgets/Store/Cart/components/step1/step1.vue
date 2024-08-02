<template>
  <div class="step1">
    <q-linear-progress v-if="basket.loading"
                       indeterminate />
    <template v-if="!basket.loading && basket.items_info.list.length > 0">
      <div class="step1__cart-items">
        <cart-item v-for="(basketItem, basketItemIndex) in basket.items_info.list"
                   :key="basketItemIndex"
                   :basket-item="basketItem"
                   class="step1__cart-item"
                   @remove="onRemove(basketItem)"
                   @increase="onIncrease(basketItem)"
                   @decrease="onDecrease(basketItem)" />
        <discount :basket="basket"
                  @set-discount="checkoutReview" />
      </div>
      <div class="step1__sidebar">
        <sidebar :basket="basket"
                 @complete="onComplete" />
      </div>
    </template>
    <template v-else-if="!basket.loading && basket.items_info.list.length === 0">
      <q-banner>
        سبد خرید شما خالیست.
      </q-banner>
    </template>
  </div>
</template>

<script>
import Sidebar from './sidebar.vue'
import CartItem from './cartItem.vue'
import Discount from './discount.vue'
import { Basket } from 'src/models/Basket.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'step1',
  components: { CartItem, Discount, Sidebar },
  props: {
    type: {
      type: String,
      default: 'product'
    }
  },
  emits: ['complete'],
  computed: {
    basket: {
      get () {
        return this.$store.getters['Shop/basket']
      },
      set (newValue) {
        this.$store.commit('Shop/updateBasket', newValue)
      }
    }
  },
  mounted() {
    this.checkoutReview()
  },
  methods: {
    checkoutReview () {
      this.basket.loading = true
      APIGateway.basket.checkoutReview()
        .then((basket) => {
          this.basket = new Basket(basket)
        })
        .finally(() => {
          this.basket.loading = false
        })
    },
    onIncrease (basketItem) {
      basketItem.loading = true
      const promise = basketItem.product ? APIGateway.basketItem.incrementProduct(basketItem.product) : APIGateway.basketItem.incrementPackage(basketItem.package)
      promise
        .then(() => {
          this.checkoutReview()
        })
        .finally(() => {
          basketItem.loading = false
        })
    },
    onDecrease (basketItem) {
      if (basketItem.count === 1) {
        this.onRemove(basketItem)
        return
      }
      basketItem.loading = true
      const promise = basketItem.product ? APIGateway.basketItem.decrementProduct(basketItem.product) : APIGateway.basketItem.decrementPackage(basketItem.package)
      // const newCount = basketItem.count - 1
      // APIGateway.basketItem.update(basketItem.id, newCount)
      promise
        .then(() => {
          this.checkoutReview()
        })
        .finally(() => {
          basketItem.loading = false
        })
    },
    onRemove (basketItem) {
      basketItem.loading = true
      APIGateway.basketItem.remove(basketItem.id)
        .then(() => {
          this.checkoutReview()
        })
        .finally(() => {
          basketItem.loading = false
        })
    },
    onComplete () {
      this.$emit('complete')
    }
  }
}
</script>

<style scoped lang="scss">
.step1 {
  display: flex;
  flex-flow: row;
  gap: 28px;
  $sidebar-width: 312px;
  .step1__cart-items {
    width: calc( 100% - #{$sidebar-width} );
    display: flex;
    flex-flow: column;
    gap: 24px;
  }
  .step1__sidebar {
    width: $sidebar-width;
  }
}
</style>
