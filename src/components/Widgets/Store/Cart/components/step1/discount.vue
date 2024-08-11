<template>
  <div class="cart-discount">
    <div class="cart-discount__title">
      <q-icon name="percent" />
      کد تخفیف:
    </div>
    <div v-if="mounted"
         class="cart-discount__info">
      <div class="cart-discount__selected-discount">
        <q-input v-model="discountCode"
                 :disable="!!basket.discount"
                 placeholder="کدتخفیف" />
      </div>
      <div class="cart-discount__edit-btn">
        <q-btn v-if="!basket.discount"
               color="info"
               unelevated
               :loading="discountLoading"
               @click="setDiscount">
          اعمال تخفیف
        </q-btn>
        <q-btn v-else
               color="info"
               unelevated
               :loading="discountLoading"
               @click="removeDiscountCode">
          حذف کد تخفیف
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'CartDiscount',
  props: {
    basket: {
      type: Basket,
      default: new Basket()
    }
  },
  emits: ['set-discount'],
  data () {
    return {
      discountCode: null,
      discountLoading: false,
      mounted: false
    }
  },
  mounted() {
    this.mounted = true
    this.discountCode = this.basket.discount_info.code
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    },
    setDiscount () {
      this.discountLoading = true
      APIGateway.basket.submitDiscountCode(this.basket.id, this.discountCode)
        .finally(() => {
          this.discountLoading = false
          this.$emit('set-discount')
        })
    },
    removeDiscountCode () {
      this.discountLoading = true
      APIGateway.basket.removeDiscountCode(this.basket.id)
        .then(() => {
          this.discountCode = null
        })
        .finally(() => {
          this.discountLoading = false
          this.$emit('set-discount')
        })
    }
  }
}
</script>

<style scoped lang="scss">
.cart-discount {
  border-radius: 8px;
  background: #F9F9FB;
  border: 1px solid #DFE1EC;
  padding: 20px 30px 46px 38px;
  .cart-discount__title {
    color: #727272;
    font-size: 16px;
    margin-bottom: 22px;
  }
  .cart-discount__info {
    display: flex;
    flex-flow: row;
    gap: 16px;
    justify-content: flex-start;
    align-items: center;
    .cart-discount__selected-discount {

    }
    .cart-discount__edit-btn {

    }
  }
  :global(.cart-discount__dialog-cart) {
    width: 700px;
    max-width: 90vw;
  }
}
</style>
