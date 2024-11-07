<template>
  <div class="step1__sidebar">
    <div class="step1__sidebar-total-price">
      <div class="step1__sidebar-total-price-label">
        قیمت کالاها
      </div>
      <div class="step1__sidebar-total-price-value">
        {{ basket.price.toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div v-if="basket.margin_amount"
         class="step1__sidebar-total-discount">
      <div class="step1__sidebar-total-discount-label">
        تخفیف ها
      </div>
      <div class="step1__sidebar-total-discount-value">
        {{ basket.margin_amount.toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div v-if="basket.margin_amount"
         class="step1__sidebar-separator" />
    <div v-if="basket.margin_amount"
         class="step1__sidebar-total-price">
      <div class="step1__sidebar-total-price-label">
        قابل سفارش
      </div>
      <div class="step1__sidebar-total-price-value">
        {{ basket.sellable_price.toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div v-if="basket.discount"
         class="step1__sidebar-discount-code">
      <div class="step1__sidebar-discount-code-label">
        کد تخفیف
      </div>
      <div class="step1__sidebar-discount-code-value">
        {{ basket.discount_amount.toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div class="step1__sidebar-separator" />
    <div class="step1__sidebar-final-price">
      <div class="step1__sidebar-final-price-label">
        مجموع
      </div>
      <div class="step1__sidebar-final-price-value">
        {{ basket.order_price.toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div class="step1__sidebar-continue-action">
      <q-btn color="primary"
             unelevated
             @click="onComplete">
        به خرید ادامه بده
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'

export default {
  name: 'cartItem',
  props: {
    basket: {
      type: Basket,
      default: new Basket()
    }
  },
  emits: ['complete'],
  data () {
    return {
      step: 1
    }
  },
  methods: {
    onComplete () {
      this.$emit('complete')
    }
  }
}
</script>

<style scoped lang="scss">
.step1__sidebar {
  width: 100%;
  background: #F9F9FB;
  border: 1px solid #DFE1EC;
  border-radius: 8px;
  padding: 34px 16px 30px 16px;
  .step1__sidebar-total-price {
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
    letter-spacing: 0;
    .step1__sidebar-total-price-label {
      color: #212121;
      font-size: 18px;
    }
    .step1__sidebar-total-price-value {
      color: $primary;
      font-size: 18px;
    }
  }
  .step1__sidebar-total-discount {
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
    letter-spacing: 0;
    color: #FF3D3D;
    .step1__sidebar-total-discount-label {
      font-size: 18px;
    }
    .step1__sidebar-total-discount-value {
      font-size: 18px;
    }
  }
  .step1__sidebar-discount-code {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;
    letter-spacing: 0;
    color: #FF3D3D;
    .step1__sidebar-discount-code-label {
      font-size: 18px;
    }
    .step1__sidebar-discount-code-value {
      font-size: 18px;
    }
  }
  .step1__sidebar-separator {
    width: 100%;
    background: #F9F9FB;
    border: 1px dashed $primary;
    margin-bottom: 19px;
  }
  .step1__sidebar-final-price {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    letter-spacing: 0;
    .step1__sidebar-final-price-label {
      color: #212121;
      font-size: 18px;
    }
    .step1__sidebar-final-price-value {
      font-size: 20px;
      color: $primary;
    }
  }
  .step1__sidebar-continue-action {
    padding: 0 16px;
    .q-btn {
      width: 100%;
    }
  }
}
</style>
