<template>
  <div class="product-show"
       :style="localOptions.style">
    <breadcrumbs class="q-mb-md" />
    <div class="product-show__summery">
      <div class="product-show__summery-info">
        <div class="product-show__thumbnail">
          <q-img :src="product.thumbnail" />
        </div>
        <div class="product-show__meta">
          <div class="product-show__title">
            {{ product.title }}
          </div>
          <div class="product-show__attrs">
            <div class="product-show__attrs-title">
              ویژگی ها:
            </div>
            <div class="product-show__attrs-items">
              <div v-if="product.is_physical !== null"
                   class="product-show__attrs-item">
                <div class="product-show__attrs-item-label">
                  نوع:
                </div>
                <div class="product-show__attrs-item-value">
                  {{ product.is_physical ? 'فیزیکی' : 'مجازی' }}
                  <template v-if="product.is_physical">
                    ({{ product.physical_type_info.label }})
                  </template>
                </div>
              </div>
              <div v-if="product.weight !== null"
                   class="product-show__attrs-item">
                <div class="product-show__attrs-item-label">
                  وزن:
                </div>
                <div class="product-show__attrs-item-value">
                  {{ product.weight }}
                  گرم
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-show__summery-price">
        <div class="product-show__summery-price-title">
          <q-icon name="shopping_cart" />
          قیمت محصول
        </div>
        <div class="product-show__summery-price-base">
          {{ product.unit_price }}
          تومان
        </div>
        <div class="product-show__summery-price-final">
          {{ product.getFinalPrice() }}
          تومان
        </div>
        <q-btn label="افزودن به سبد"
               outline
               color="primary"
               class="product-show__summery-price-action" />
      </div>
    </div>
    <div v-if="false"
         class="product-show__products">
      <q-expansion-item expand-separator
                        default-opened
                        icon="inventory_2"
                        label="اقلام داخل بسته">
        <product-item v-for="(product, productIndex) in product.products_info.list"
                      :key="productIndex"
                      :product="product"
                      class="product-item-component" />
      </q-expansion-item>

    </div>
    <div v-if="product.description"
         class="product-show__descriptions">
      <q-banner class="product-show__descriptions-title">
        توضیحات:
      </q-banner>
      <div class="product-show__descriptions-data"
           v-html="product.description" />
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ProductItem from './components/productItem.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'ContentShow',
  components: { Breadcrumbs, ProductItem },
  mixins: [mixinWidget],
  data () {
    return {
      product: new Product()
    }
  },
  computed: {
    productId () {
      return this.$route.params.id
    }
  },
  mounted() {
    this.setBreadcrumbsLoading()
    this.getPackage()
  },
  methods: {
    getPackage () {
      this.product.loading = true
      APIGateway.product.get(this.productId)
        .then((product) => {
          this.product = new Product(product)
          this.updateBreadcrumbs()
        })
        .finally(() => {
          this.product.loading = false
        })
    },
    setBreadcrumbsLoading () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: false,
        loading: true
      })
    },
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
            label: this.product.title,
            to: { name: 'Public.Package', params: { id: this.product } }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.product-show {
  $price-section-with: 312px;
  .product-show__summery {
    display: flex;
    gap: 24px;
    align-items: stretch;
    justify-content: flex-start;
    margin-bottom: 24px;
    .product-show__summery-info {
      border-radius: 8px;
      background: #F6F6F6;
      border: 1px solid #DFE1EC;
      padding: 24px;
      width: calc( 100% - #{$price-section-with} );
      display: flex;
      gap: 74px;
      align-items: flex-start;
      justify-content: flex-start;
      .product-show__thumbnail {
        width: 239px;
      }
      .product-show__meta {
        .product-show__title {
          font-size: 22px;
          margin-bottom: 35px;
        }
        .product-show__attrs {
          .product-show__attrs-title {
            color: #727272;
            font-size: 16px;
            margin-bottom: 16px;
          }
          .product-show__attrs-items {
            .product-show__attrs-item {
              font-size: 16px;
              display: flex;
              gap: 4px;
              align-items: center;
              margin-bottom: 20px;
              justify-content: flex-start;
              &:before {
                content: ' ';
                width: 8px;
                height: 8px;
                border-radius: 100%;
                background: #475F4A;
                margin-right: 6px;
              }
              .product-show__attrs-item-label {
                color: #797979;
              }
              .product-show__attrs-item-value {
                color: #212121;
              }
            }
          }
        }
      }
    }
    .product-show__summery-price {
      width: $price-section-with;
      border-radius: 8px;
      background: #F6F6F6;
      border: 1px solid #DFE1EC;
      padding: 76px 20px 46px 20px;
      gap: 10px;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: flex-start;
      .product-show__summery-price-title {
        font-size: 16px;
        color: #616161;
        .q-icon {
          font-size: 20px;
          color: #AAA095;
        }
      }
      .product-show__summery-price-base {
        font-size: 18px;
        color: #FF3D3D;
        text-decoration: line-through;
      }
      .product-show__summery-price-final {
        font-size: 24px;
        color: #475F4A;
      }
      .product-show__summery-price-action {
        width: 100%;
        background: white !important;
      }
    }
  }
  .product-show__products {
    margin-bottom: 47px;
    :deep(.q-expansion-item) {
      .q-expansion-item__container {
        .q-item {
          background: #F6F6F6;
          border: 1px solid #DFE1EC;
          border-radius: 8px;
          .q-item__section--avatar {
            padding-right: 8px;
            font-size: 36px;
            min-width: 36px;
            color: #AAA095;
          }
          .q-item__label {
            font-size: 18px;
            color: #212121;
          }
        }
        .q-expansion-item__content {
          border: 1px solid #DFE1EC;
          border-top: none;
        }
      }
      &.q-expansion-item--expanded {
        .q-expansion-item__container {
          .q-item {
            border-radius: 8px 8px 0 0;
          }
        }
      }
    }
    .product-item-component {
      border-bottom: 1px solid #DFE1EC;
      &:last-child {
        border: none;
      }
    }
  }
  .product-show__descriptions {
    padding: 32px 32px 70px 32px;
    border: 1px solid #DFE1EC;
    border-radius: 8px;
    background: #F6F6F6;
    .product-show__descriptions-title{
      color: #727272;
      font-size: 16px;
      margin-bottom: 21px;
    }
    .product-show__descriptions-data {
      color: #212121;
      font-size: 16px;
    }
  }
}
</style>
