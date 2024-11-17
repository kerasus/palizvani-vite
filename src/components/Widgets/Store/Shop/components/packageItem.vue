<template>
  <div class="package-item">
    <div class="package-item__badges">
      <div v-if="packageItem.is_purchased"
           class="package-item__badge">
        <div class="package-item__badge-title">
          خریداری شده است
        </div>
        <div class="package-item__badge-icon">
          <q-icon name="done_all" />
        </div>
      </div>
      <div class="package-item__badge">
        <div class="package-item__badge-title">
          بسته
        </div>
        <div class="package-item__badge-icon">
          <q-icon name="inventory_2" />
        </div>
      </div>
    </div>
    <div class="package-item__thumbnail">
      <q-img :src="packageItem.thumbnail" />
    </div>
    <div class="package-item__title">
      {{ packageItem.title }}
    </div>
    <div class="package-item__price">
      <div v-if="packageItem.unit_price != packageItem.sellable_price"
           class="package-item__price-base">
        {{ parseInt(packageItem.unit_price).toLocaleString('fa') }}
        ریال
      </div>
      <div class="package-item__price-final">
        {{ packageItem.sellable_price.toLocaleString('fa') }}
        ریال
      </div>
    </div>
    <div class="package-item__actions">
      <q-btn class="package-item__actions-view"
             :to="{ name: 'Public.Package', params: { id: packageItem.id } }"
             color="primary"
             outline>
        مشاهده جزییات
      </q-btn>
      <template v-if="packageItem.is_add_to_basket_disabled">
        <q-btn v-if="!basketItem"
               class="package-item__actions-add-to-cart"
               :loading="addToCartLoading"
               color="primary"
               @click="addToCart">
          افزودن به سبد
        </q-btn>
        <cart-count-action v-else
                           :basket-item="basketItem"
                           @increase="onIncrease"
                           @decrease="onDecrease"
                           @remove="onRemove" />
      </template>
    </div>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'
import { Package } from 'src/models/Package.js'
import { APIGateway } from 'src/api/APIGateway.js'
import CartCountAction from 'src/components/cart/cartCountAction/cartCountAction.vue'

export default {
  name: 'PackageItem',
  components: { CartCountAction },
  props: {
    packageItem: {
      type: Package,
      default: new Package()
    }
  },
  data () {
    return {
      addToCartLoading: false
    }
  },
  computed: {
    basket () {
      return this.$store.getters['Shop/basket']
    },
    basketItem () {
      const target = this.basket.items_info.list.find(basketItem => basketItem.package === this.packageItem.id)
      if (!target) {
        return null
      }

      return target
    }
  },
  methods: {
    onIncrease () {
      this.addToCartLoading = true
      APIGateway.basketItem.incrementPackage(this.basketItem.package)
        .finally(() => {
          this.checkoutReview()
          this.addToCartLoading = false
        })
    },
    onDecrease () {
      this.addToCartLoading = true
      APIGateway.basketItem.decrementPackage(this.basketItem.package)
        .finally(() => {
          this.checkoutReview()
          this.addToCartLoading = false
        })
    },
    onRemove () {
      this.addToCartLoading = true
      APIGateway.basketItem.remove(this.basketItem.id)
        .finally(() => {
          this.checkoutReview()
          this.addToCartLoading = false
        })
    },
    addToCart () {
      this.addToCartLoading = true
      APIGateway.basketItem.addPackage(this.packageItem.id, 1)
        .finally(() => {
          this.addToCartLoading = false
          this.checkoutReview()
        })
    },
    checkoutReview () {
      this.addToCartLoading = true
      APIGateway.basket.checkoutReview()
        .then((basket) => {
          this.$store.commit('Shop/updateBasket', new Basket(basket))
        })
        .finally(() => {
          this.addToCartLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.package-item {
  $transition-time: 0.2s;
  background: #F6F6F6;
  border: 1px solid #DFE1EC;
  border-radius: 8px;
  position: relative;
  .package-item__badges {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    gap: 10px;
    .package-item__badge {
      transition: all $transition-time;
      width: max-content;
      background: #FFFFFF;
      border: 1px solid #DFE1EC;
      border-radius: 20px;
      height: 30px;
      padding: 4px 8px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      gap: 4px;
      align-items: center;
      .package-item__badge-title {
        display: none;
        font-size: 13px;
        color: #212121;
      }
      .package-item__badge-icon {
        color: $primary;
      }
    }
  }
  :deep(.package-item__thumbnail) {
    transition: all $transition-time;
    margin: 15px 58px 12px 58px;
    .q-img {
      width: 100%;
    }
  }
  .package-item__title {
    color: #212121;
    width: 100%;
    padding: 0 4px;
    text-align: center;
    font-size: 18px;
    //margin-bottom: 52px;
    margin-bottom: 8px;
  }
  .package-item__price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    //margin-bottom: 43px;
    margin-bottom: 16px;
    .package-item__price-final {
      font-size: 20px;
      color: #475F4A;
    }
    .package-item__price-base {
      font-size: 16px;
      color: #FF3D3D;
      text-decoration: line-through;
    }
  }
  .package-item__actions {
    //display: none;
    display: flex;
    flex-flow: column;
    margin: 0 25px 25px 25px;
    .package-item__actions-view {
      background: white;
      margin-bottom: 20px;
      width: 100%;
    }
    .package-item__actions-add-to-cart {
      width: 100%;
    }
  }
  &:hover {
    .package-item__badges {
      z-index: 1;
      .package-item__badge {
        .package-item__badge-title {
          display: block;
        }
      }
    }
    //:deep(.package-item__thumbnail) {
    //  margin: 10px 105px 4px 105px;
    //  .q-img {
    //    width: 100%;
    //  }
    //}
    //.package-item__title {
    //  margin-bottom: 44px;
    //}
    //.package-item__price {
    //  margin-bottom: 27px;
    //}
    .package-item__actions {
      display: flex;
      flex-flow: column;
    }
  }
  @media screen and (max-width: 1024px) {
    & {
      .package-item__badges {
        z-index: 2;
        .package-item__badge {
          .package-item__badge-title {
            display: block;
          }
        }
      }
      :deep(.package-item__thumbnail) {
        z-index: 1;
      }
      .package-item__title {
        margin-bottom: 44px;
      }
      .package-item__price {
        margin-bottom: 27px;
      }
      .package-item__actions {
        display: flex;
        flex-flow: column;
      }
    }
  }
}
</style>
