<template>
  <div class="product-item">
    <div class="product-item__meta">
      <div class="product-item__meta-thumbnail">
        <q-img :src="product.thumbnail" />
      </div>
      <div class="product-item__meta-info">
        <div class="product-item__product-title">
          {{ product.title }}
        </div>
        <div class="product-item__product-atrs">
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
    <div class="product-item__price">
      <div class="product-item__price-info">
        <div class="product-item__price-info-icon">
          <q-icon name="shopping_cart" />
        </div>
        <div class="product-item__price-info-label">
          قیمت محصول:
        </div>
        <div class="product-item__price-info-value">
          {{ parseInt(product.unit_price).toLocaleString('fa') }}
          ریال
        </div>
      </div>
      <q-btn v-if="!product.is_hidden"
             color="primary"
             :to="{ name: 'Public.Product', params: { id: product.id }}"
             class="product-item__price-action">
        مشاهده
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
    }
  }
}
</script>

<style scoped lang="scss">
.product-item {
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .product-item__meta {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    justify-content: flex-start;
    .product-item__meta-thumbnail {
      width: 123px;
      @media screen and (max-width: 500px) {
        & {
          width: 100%;
        }
      }
    }
    .product-item__meta-info {
      .product-item__product-title {
        color: #212121;
        font-size: 18px;
        margin-bottom: 30px;
      }
      .product-item__product-atrs {
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
            color: #797979;
          }
          .product-item__product-atr-value {
            color: #212121;
          }
        }
      }
      @media screen and (max-width: 500px) {
        & {
          width: 100%;
        }
      }
    }
    @media screen and (max-width: 1024px) {
      & {
        width: 100%;
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
      align-items: center;
      justify-content: flex-start;
      .product-item__price-info-icon {
        font-size: 20px;
        color: #AAA095;
        margin-right: 10px;
      }
      .product-item__price-info-label {
        font-size: 16px;
        color: #616161;
        margin-right: 25px;
        @media screen and (max-width: 500px) {
          & {
            font-size: 14px;
          }
        }
      }
      .product-item__price-info-value {
        font-size: 24px;
        color: #475F4A;
        @media screen and (max-width: 500px) {
          & {
            font-size: 20px;
          }
        }
      }
    }
    .product-item__price-action {
      width: 252px;
    }
    @media screen and (max-width: 1024px) {
      & {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    & {
      width: 100%;
    }
  }
}
</style>
