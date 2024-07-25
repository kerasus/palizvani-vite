<template>
  <div class="invoice-info">
    <div class="invoice-info-title">
      مشخصات صورت حساب
    </div>
    <div class="invoice-info-body">
      <div class="invoice-info-body-item">
        <template v-if="classroom.id">
          عنوان:
          {{ classroom.title }}
        </template>
        <template v-if="basket.id">
          <cart-items :basket-items="basket.items_info" />
        </template>
      </div>
      <div class="invoice-info-body-item">
        شناسه:
        {{ invoice.id }}
      </div>
    </div>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'
import { Invoice } from 'src/models/Invoice.js'
import { Classroom } from 'src/models/Classroom.js'
import CartItems from './cartItems.vue'

export default {
  name: 'InvoiceInfo',
  components: { CartItems },
  props: {
    invoice: {
      type: Invoice,
      default: new Invoice()
    },
    basket: {
      type: Basket,
      default: new Basket()
    },
    classroom: {
      type: Classroom,
      default: new Classroom()
    }
  }
}
</script>

<style scoped lang="scss">
.invoice-info{
  background: #F5F5F5;
  border: 1px solid #DFE1EC;
  border-radius: 8px;
  .invoice-info-title {
    background: #FFFFFF;
    height: 70px;
    border-bottom: 1px solid #DFE1EC;
    border-radius: 8px 8px 0 0;
    font-size: 18px;
    letter-spacing: 0;
    color: #212121;
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
  }
  .invoice-info-body {
    padding: 29px 38px 42px;
    .invoice-info-body-item {
      font-size: 16px;
      letter-spacing: 0;
      color: #212121;
      margin-bottom: 31px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
