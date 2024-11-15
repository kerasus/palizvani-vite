<template>
  <div class="product-item">
    <div class="product-item__meta">
      <div class="product-item__meta-thumbnail"
           @click="goToProductPage">
        <q-img :src="product.thumbnail" />
      </div>
      <div class="product-item__meta-info">
        <div class="product-item__product-title">
          <router-link :to="{ name: 'Public.Product', params: { id: product.id }}">
            {{ product.title }}
          </router-link>
        </div>
        <div class="product-item__product-atrs">
          <div class="product-item__product-atrs-title">
            ویژگی ها
          </div>
          <div class="product-item__product-atrs-list">
            <div class="product-item__product-atr">
              <div class="product-item__product-atr-label">
                {{ product.title }}
              </div>
              <div class="product-item__product-atr-value">
                {{ product.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-item__price">
      <div class="product-item__price-info">
        <div class="product-item__price-info-label">
          <q-icon name="shopping_cart" />
          قیمت محصول
        </div>
        <div class="product-item__price-info-value">
          <div v-if="product.unit_price !== product.sellable_price"
               class="product-item__price-base">
            {{ parseInt(product.unit_price).toLocaleString('fa') }}
            ریال
          </div>
          <div class="product-item__price-final">
            {{ parseInt(product.sellable_price).toLocaleString('fa') }}
            ریال
          </div>
        </div>
      </div>
      <q-btn color="primary"
             class="product-item__price-action"
             :loading="addToCartLoading"
             @click="addToCart">
        افزودن به سبد
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'

export default {
  name: 'productItem',
  props: {
    product: {
      type: Product,
      default: new Product()
    },
    addToCartLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['add-to-cart'],
  methods: {
    goToProductPage () {
      this.$router.push({ name: 'Public.Product', params: { id: this.product.id } })
    },
    addToCart () {
      this.$emit('add-to-cart', this.product.id)
    }
  }
}
</script>

<style scoped lang="scss">
.product-item {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  background: #F9F9FB;
  .product-item__meta {
    display: flex;
    gap: 32px;
    justify-content: flex-start;
    .product-item__meta-thumbnail {
      cursor: pointer;
      width: 123px;
    }
    .product-item__meta-info {
      .product-item__product-title {
        color: #212121;
        font-size: 18px;
        margin-bottom: 24px;
      }
      .product-item__product-atrs {
        .product-item__product-atrs-title {
          font-size: 16px;
          letter-spacing: 0;
          color: #AAA095;
          margin-bottom: 19px;
        }
        .product-item__product-atrs-list {
          .product-item__product-atr {
            font-size: 16px;
            display: flex;
            gap: 4px;
            align-items: center;
            margin-bottom: 31px;
            justify-content: flex-start;
            &:before {
              content: ' ';
              width: 8px;
              height: 8px;
              border-radius: 100%;
              background: #475F4A;
              margin-right: 6px;
            }
            .product-item__product-atr-label {
              font-size: 16px;
              color: #797979;
            }
            .product-item__product-atr-value {
              font-size: 16px;
              color: #212121;
            }
          }
        }
      }
    }
  }
  .product-item__price {
    display: flex;
    flex-direction: column;
    gap: 29px;
    justify-content: center;
    align-items: center;
    .product-item__price-info {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: flex-end;
      .product-item__price-info-label {
        font-size: 16px;
        color: #616161;
        margin-right: 53px;
        margin-bottom: 20px;
        .q-icon {
          font-size: 20px;
          color: #AAA095;
          margin-right: 10px;
        }
      }
      .product-item__price-info-value {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        //margin-bottom: 43px;
        margin-bottom: 8px;
        .product-item__price-final {
          font-size: 24px;
          color: #475F4A;
        }
        .product-item__price-base {
          font-size: 16px;
          color: #FF3D3D;
          text-decoration: line-through;
          margin-right: 18px;
        }
      }
    }
    .product-item__price-action {
      width: 252px;
    }
  }
}
</style>
