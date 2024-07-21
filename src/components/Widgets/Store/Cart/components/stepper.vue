<template>
  <div class="stepper">
    <q-stepper v-if="mounted"
               ref="stepper"
               v-model="step"
               flat
               color="primary"
               animated>
      <q-step :name="1"
              title="سبد خرید"
              icon="shopping_cart"
              active-icon="shopping_cart"
              done-icon="shopping_cart"
              :done="step > 1">
        <step1 @complete="onCompleteStep1" />
      </q-step>

      <q-step :name="2"
              title="زمان و نحوه ارسال"
              icon="local_shipping"
              done-icon="local_shipping"
              active-icon="local_shipping"
              :done="step > 2">
        <step2 @complete="onCompleteStep2" />
      </q-step>

      <q-step :name="3"
              title="پرداخت"
              icon="account_balance_wallet"
              done-icon="account_balance_wallet"
              active-icon="account_balance_wallet"
              disable>
        <step3 />
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import Step1 from './step1/step1.vue'
import Step2 from './step2/step2.vue'
import Step3 from './step3/step3.vue'

export default {
  name: 'stepper',
  components: { Step1, Step2, Step3 },
  props: {
    type: {
      type: String,
      default: 'product'
    }
  },
  emits: ['onChangeFilters'],
  data () {
    return {
      mounted: false,
      step: 1
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    onCompleteStep1 () {
      this.step = 2
    },
    onCompleteStep2 () {
      this.step = 3
    }
  }
}
</script>

<style scoped lang="scss">
.stepper {
  :deep(.q-stepper) {
    .q-stepper__header {
      height: 94px;
      background: #F5F5F5;
      border-radius: 8px;
    }
    .q-stepper__content {
      .q-panel {
        .q-stepper__step {
          .q-stepper__step-content {
            .q-stepper__step-inner {
              padding: 40px 0 1px 0;
            }
          }
        }
      }
    }
  }
}
</style>
