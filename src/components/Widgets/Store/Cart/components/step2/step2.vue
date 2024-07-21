<template>
  <div class="step2">
    <q-linear-progress v-if="basket.loading"
                       indeterminate />
    <template v-if="!basket.loading">
      <div class="step2__cart-info">
        <cart-items :basket-items="basket.items_info" />
        <cart-address :basket="basket"
                      @set-address="onSetAddress" />
        <delivery-info :basket="basket" />
      </div>
      <div class="step2__sidebar">
        <sidebar :basket="basket"
                 @complete="onComplete" />
      </div>
    </template>
  </div>
</template>

<script>
import Sidebar from './sidebar.vue'
import CartItems from './cartItems.vue'
import CartAddress from './cartAddress.vue'
import DeliveryInfo from './deliveryInfo.vue'
import { Basket } from 'src/models/Basket.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'step2',
  components: { CartItems, CartAddress, Sidebar, DeliveryInfo },
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
    onSetAddress () {
      this.checkoutReview()
    },
    onComplete () {
      this.$emit('complete')
    }
  }
}
</script>

<style scoped lang="scss">
.step2 {
  display: flex;
  flex-flow: row;
  gap: 28px;
  $sidebar-width: 312px;
  .step2__cart-info {
    width: calc( 100% - #{$sidebar-width} );
    display: flex;
    flex-flow: column;
    gap: 24px;
  }
  .step2__sidebar {
    width: $sidebar-width;
  }
}
</style>
