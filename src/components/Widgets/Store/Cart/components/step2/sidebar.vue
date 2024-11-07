<template>
  <div class="step2__sidebar">
    <div class="step2__sidebar-total-price">
      <div class="step2__sidebar-total-price-label">
        قیمت کالاها
      </div>
      <div class="step2__sidebar-total-price-value">
        {{ basket.price.toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div class="step2__sidebar-overall-discount-amount">
      <div class="step2__sidebar-overall-discount-amount-label">
        تخفیف ها
      </div>
      <div class="step2__sidebar-overall-discount-amount-value">
        {{ basket.overall_discount_amount.toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div class="step2__sidebar-delivery-cost">
      <div class="step2__sidebar-delivery-cost-label">
        هزینه ارسال
      </div>
      <div class="step2__sidebar-delivery-cost-value">
        {{ basket.delivery_cost.toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div class="step2__sidebar-separator" />
    <div class="step2__sidebar-final-price">
      <div class="step2__sidebar-final-price-label">
        جمع
      </div>
      <div class="step2__sidebar-final-price-value">
        {{ basket.overall_order_price.toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div class="step2__sidebar-continue-action">
      <q-btn color="primary"
             unelevated
             @click="onComplete">
        ثبت و ادامه خرید
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
.step2__sidebar {
  width: 100%;
  background: #F9F9FB;
  border: 1px solid #DFE1EC;
  border-radius: 8px;
  padding: 34px 16px 30px 16px;
  .step2__sidebar-total-price {
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
    letter-spacing: 0;
    .step2__sidebar-total-price-label {
      color: #212121;
      font-size: 18px;
    }
    .step2__sidebar-total-price-value {
      color: $primary;
      font-size: 18px;
    }
  }
  .step2__sidebar-delivery-cost {
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
    letter-spacing: 0;
    .step2__sidebar-delivery-cost-label {
      color: #212121;
      font-size: 18px;
    }
    .step2__sidebar-delivery-cost-value {
      color: $primary;
      font-size: 18px;
    }
  }
  .step2__sidebar-overall-discount-amount {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;
    letter-spacing: 0;
    color: #FF3D3D;
    .step2__sidebar-overall-discount-amount-label {
      font-size: 18px;
    }
    .step2__sidebar-overall-discount-amount-value {
      font-size: 18px;
    }
  }
  .step2__sidebar-separator {
    width: 100%;
    background: #F9F9FB;
    border: 1px dashed $primary;
    margin-bottom: 19px;
  }
  .step2__sidebar-final-price {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    letter-spacing: 0;
    .step2__sidebar-final-price-label {
      color: #212121;
      font-size: 18px;
    }
    .step2__sidebar-final-price-value {
      font-size: 20px;
      color: $primary;
    }
  }
  .step2__sidebar-continue-action {
    padding: 0 16px;
    .q-btn {
      width: 100%;
    }
  }
}
</style>
