<template>
  <div class="product-item">
    <div class="product-item__badges">
      <div class="product-item__badge">
        <div class="product-item__badge-title">
          {{ product.is_physical_info.label }}
        </div>
        <div class="product-item__badge-icon">
          <q-icon :name="product.is_physical ? 'shopping_basket' : 'folder'" />
        </div>
      </div>
      <div class="product-item__badge">
        <div class="product-item__badge-title">
          {{ product.physical_type_info.label }}
        </div>
        <div class="product-item__badge-icon">
          <q-icon name="category" />
        </div>
      </div>
    </div>
    <div class="product-item__thumbnail">
      <q-img :src="product.thumbnail" />
    </div>
    <div class="product-item__title">
      {{ product.title }}
    </div>
    <div class="product-item__price">
      <div class="product-item__price-base">
        {{ parseInt(product.unit_price).toLocaleString('fa') }}
        ریال
      </div>
      <div class="product-item__price-final">
        {{ product.getFinalPrice() }}
        ریال
      </div>
    </div>
    <div class="product-item__actions">
      <q-btn class="product-item__actions-view"
             color="primary"
             :to="{ name: 'Public.Product', params: { id: product.id } }"
             outline>
        مشاهده جزییات
      </q-btn>
      <q-btn class="product-item__actions-add-to-cart"
             :loading="addToCartLoading"
             color="primary"
             @click="addToCart">
        افزودن به سبد
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Product,
      default: new Product()
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
      APIGateway.basketItem.addProduct(this.product.id, 1)
        .finally(() => {
          this.addToCartLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.product-item {
  $transition-time: 0.2s;
  background: #F6F6F6;
  border: 1px solid #DFE1EC;
  border-radius: 8px;
  position: relative;
  .product-item__badges {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    gap: 10px;
    .product-item__badge {
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
      .product-item__badge-title {
        display: none;
        font-size: 13px;
        color: #212121;
      }
      .product-item__badge-icon {
        color: $primary;
      }
    }
  }
  :deep(.product-item__thumbnail) {
    transition: all $transition-time;
    margin: 15px 58px 12px 58px;
    .q-img {
      width: 100%;
    }
  }
  .product-item__title {
    color: #212121;
    width: 100%;
    padding: 0 4px;
    text-align: center;
    font-size: 18px;
    margin-bottom: 52px;
  }
  .product-item__price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 43px;
    .product-item__price-final {
      font-size: 20px;
      color: #475F4A;
    }
    .product-item__price-base {
      font-size: 16px;
      color: #FF3D3D;
      text-decoration: line-through;
    }
  }
  .product-item__actions {
    display: none;
    margin: 0 25px 25px 25px;
    .product-item__actions-view {
      background: white;
      margin-bottom: 20px;
      width: 100%;
    }
    .product-item__actions-add-to-cart {
      width: 100%;
    }
  }
  &:hover {
    .product-item__badges {
      .product-item__badge {
        .product-item__badge-title {
          display: block;
        }
      }
    }
    :deep(.product-item__thumbnail) {
      margin: 10px 105px 4px 105px;
      .q-img {
        width: 100%;
      }
    }
    .product-item__title {
      margin-bottom: 44px;
    }
    .product-item__price {
      margin-bottom: 27px;
    }
    .product-item__actions {
      display: flex;
      flex-flow: column;
    }
  }
}
</style>
