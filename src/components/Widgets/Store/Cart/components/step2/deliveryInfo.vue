<template>
  <div class="delivery-info">
    <div class="delivery-info__title">
      <q-icon name="local_shipping" />
      زمان و شیوه ارسال:
    </div>
    <div class="delivery-info__info">
      <div class="delivery-info__selected-type">
        <div class="delivery-info__selected-type-radio">
          <q-radio v-model="radioValue"
                   :val="1"
                   label="پست پیشتاز" />
        </div>
        <div class="delivery-info__selected-type-meta">
          <q-icon name="schedule" />
          زمان تقریبی سفارش بر اساس محدوده جغرافیایی
          48-72
          ساعت
        </div>
        <div class="delivery-info__selected-type-meta">
          <q-icon name="shopping_bag" />
          هزینه به آدرس و وزن مرصوله متغیر میباشد
        </div>
      </div>
      <div class="delivery-info__price-info">
        <div class="delivery-info__price-label">
          <q-icon name="local_shipping" />
          هزینه ارسال
        </div>
        <div class="delivery-info__price-value">
          {{ basket.delivery_cost.toLocaleString('fa') }}
          ریال
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'

export default {
  name: 'DeliveryInfo',
  props: {
    basket: {
      type: Basket,
      default: new Basket()
    }
  },
  data () {
    return {
      radioValue: 1
    }
  }
}
</script>

<style scoped lang="scss">
.delivery-info {
  border-radius: 8px;
  background: #F9F9FB;
  border: 1px solid #DFE1EC;
  padding: 20px 30px 46px 38px;
  .delivery-info__title {
    color: #727272;
    font-size: 16px;
    margin-bottom: 22px;
  }
  .delivery-info__info {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    .delivery-info__selected-type {
      .delivery-info__selected-type-radio {
        margin-bottom: 16px;
      }
      .delivery-info__selected-type-meta {
        padding-left: 20px;
        font-size: 12px;
        color: #727272;
        margin-bottom: 16px;
      }
    }
    .delivery-info__price-info {
      .delivery-info__price-label {
        color: #616161;
        font-size: 16px;
        margin-bottom: 18px;
      }
      .delivery-info__price-value {
        color: $primary;
        font-size: 18px;
      }
    }
    @media screen and (max-width: 800px) {
      & {
        flex-flow: column;
      }
    }
  }
}
</style>
