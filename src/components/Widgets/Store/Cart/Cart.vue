<template>
  <div class="cart"
       :style="localOptions.style">
    <breadcrumbs class="q-mb-md" />
    <div class="cart__stepper">
      <stepper />
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import Stepper from './components/stepper.vue'

export default {
  name: 'ContentList',
  components: { Breadcrumbs, Stepper },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false
    }
  },
  mounted() {
    this.mounted = true
    this.updateBreadcrumbs()
  },
  methods: {
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'خانه',
            to: { name: 'Public.Home' }
          },
          {
            label: 'فروشگاه',
            to: { name: 'Public.Shop' }
          },
          {
            label: 'سبد خرید',
            to: { name: 'Public.Cart' }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.cart {
  .cart__stepper {
    margin-top: 46px;
  }
}
</style>
