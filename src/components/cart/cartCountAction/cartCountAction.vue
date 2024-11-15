<template>
  <div class="cart-count-action">
    <div class="cart-count-action-increase">
      <q-btn outline
             color="primary"
             icon="add"
             :loading="basketItem.loading"
             @click="onIncrease" />
    </div>
    <div class="cart-count-action-count">
      {{ basketItem.count }}
    </div>
    <div class="cart-count-action-decrease">
      <q-btn v-if="basketItem.count > 1"
             outline
             color="red"
             icon="remove"
             :loading="basketItem.loading || loading"
             @click="onDecrease" />
      <q-btn v-else
             flat
             color="red"
             icon="delete_outline"
             :loading="basketItem.loading || loading"
             @click="onRemove" />
    </div>
  </div>
</template>

<script>
import { BasketItem } from 'src/models/BasketItem.js'

export default {
  name: 'cartCountAction',
  props: {
    basketItem: {
      type: BasketItem,
      default: new BasketItem()
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['increase', 'decrease', 'remove'],
  methods: {
    onIncrease () {
      this.$emit('increase')
    },
    onDecrease () {
      this.$emit('decrease')
    },
    onRemove () {
      this.$emit('remove')
    }
  }
}
</script>

<style scoped lang="scss">
.cart-count-action {
  background: #FFFFFF;
  border: 1px solid #DFE1EC;
  border-radius: 8px;
  padding: 12px 10px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  $btn-size: 24px;
  .q-btn {
    width: $btn-size;
    height: $btn-size;
    min-height: $btn-size;
    padding: 0;
  }
  .cart-count-action-count {
    color: $primary;
    font-size: 16px;
  }
}
</style>
