<template>
  <div class="package-item">
    <div class="package-item__badges">
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
      <div class="package-item__price-base">
        {{ parseInt(packageItem.unit_price).toLocaleString('fa') }}
        تومان
      </div>
      <div class="package-item__price-final">
        {{ packageItem.getFinalPrice() }}
        تومان
      </div>
    </div>
    <div class="package-item__actions">
      <q-btn class="package-item__actions-view"
             :to="{ name: 'Public.Package', params: { id: packageItem.id } }"
             color="primary"
             outline>
        مشاهده جزییات
      </q-btn>
      <q-btn class="package-item__actions-add-to-cart"
             :loading="addToCartLoading"
             color="primary"
             @click="addToCart">
        افزودن به سبد
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'
import { Package } from 'src/models/Package.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'PackageItem',
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
  methods: {
    addToCart () {
      this.addToCartLoading = true
      APIGateway.basketItem.addPackage(this.packageItem.id, 1)
        .finally(() => {
          this.addToCartLoading = false
          this.checkoutReview()
        })
    },
    checkoutReview () {
      this.basket.loading = true
      APIGateway.basket.checkoutReview()
        .then((basket) => {
          this.$store.commit('Shop/updateBasket', new Basket(basket))
        })
        .finally(() => {
          this.basket.loading = false
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
    margin-bottom: 52px;
  }
  .package-item__price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 43px;
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
    display: none;
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
      .package-item__badge {
        .package-item__badge-title {
          display: block;
        }
      }
    }
    :deep(.package-item__thumbnail) {
      margin: 10px 105px 4px 105px;
      .q-img {
        width: 100%;
      }
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
</style>
