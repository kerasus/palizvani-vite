<template>
  <div class="package-show"
       :style="localOptions.style">
    <breadcrumbs class="q-mb-md" />
    <div class="package-show__summery">
      <div class="package-show__summery-info">
        <div class="package-show__thumbnail">
          <q-img :src="storePackage.thumbnail" />
        </div>
        <div class="package-show__meta">
          <div class="package-show__title">
            {{ storePackage.title }}
          </div>
          <div class="package-show__attrs">
            <div class="package-show__attrs-title">
              ویژگی ها:
            </div>
            <div class="package-show__attrs-items">
              <div class="package-show__attrs-item">
                <div class="package-show__attrs-item-label">
                  وزن:
                </div>
                <div class="package-show__attrs-item-value">
                  {{ storePackage.weight }}
                  گرم
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="package-show__summery-price">
        <div v-if="storePackage.unit_price !== storePackage.sellable_price"
             class="discount-badge">
          <discount-badge />
        </div>
        <div class="package-show__summery-price-title">
          <q-icon name="shopping_cart" />
          قیمت محصول
        </div>
        <div v-if="storePackage.unit_price !== storePackage.sellable_price"
             class="package-show__summery-price-base">
          {{ parseInt(storePackage.unit_price).toLocaleString('fa') }}
          ریال
        </div>
        <div class="package-show__summery-price-final">
          {{ parseInt(storePackage.sellable_price).toLocaleString('fa') }}
          ریال
        </div>
        <q-btn label="افزودن به سبد"
               outline
               color="primary"
               :loading="addToCartLoading"
               class="package-show__summery-price-action"
               @click="addToCart" />
      </div>
    </div>
    <div class="package-show__products">
      <q-expansion-item expand-separator
                        default-opened
                        icon="inventory_2"
                        label="اقلام داخل بسته">
        <product-item v-for="(product, productIndex) in storePackage.products_info.list"
                      :key="productIndex"
                      :product="product"
                      class="product-item-component" />
      </q-expansion-item>

    </div>
    <div v-if="storePackage.description"
         class="package-show__descriptions">
      <q-banner class="package-show__descriptions-title">
        توضیحات:
      </q-banner>
      <div class="package-show__descriptions-data"
           v-html="storePackage.description" />
    </div>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'
import { Package } from 'src/models/Package.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ProductItem from './components/productItem.vue'
import DiscountBadge from './components/discountBadge.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'ContentShow',
  components: { Breadcrumbs, ProductItem, DiscountBadge },
  mixins: [mixinWidget],
  data () {
    return {
      storePackage: new Package(),
      addToCartLoading: false
    }
  },
  computed: {
    packageId () {
      return this.$route.params.id
    }
  },
  mounted() {
    this.setBreadcrumbsLoading()
    this.getPackage()
  },
  methods: {
    addToCart () {
      this.addToCartLoading = true
      APIGateway.basketItem.addProduct(this.packageId, 1)
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
    },
    getPackage () {
      this.storePackage.loading = true
      APIGateway.package.get(this.packageId)
        .then((storePackage) => {
          this.storePackage = new Package(storePackage)
          this.updateBreadcrumbs()
        })
        .finally(() => {
          this.storePackage.loading = false
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
            label: this.storePackage.title,
            to: { name: 'Public.Package', params: { id: this.storePackage } }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.package-show {
  $price-section-with: 312px;
  .package-show__summery {
    $gap: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: $gap;
    align-items: stretch;
    justify-content: flex-start;
    margin-bottom: 24px;
    .package-show__summery-info {
      border-radius: 8px;
      background: #F6F6F6;
      border: 1px solid #DFE1EC;
      padding: 24px;
      width: calc( 100% - #{$price-section-with} - #{$gap} );
      display: flex;
      flex-wrap: wrap;
      gap: 74px;
      align-items: flex-start;
      justify-content: flex-start;
      .package-show__thumbnail {
        width: 239px;
        @media screen and (max-width: 600px) {
          & {
            width: 100%;
          }
        }
      }
      .package-show__meta {
        .package-show__title {
          font-size: 22px;
          margin-bottom: 35px;
        }
        .package-show__attrs {
          .package-show__attrs-title {
            color: #727272;
            font-size: 16px;
            margin-bottom: 16px;
          }
          .package-show__attrs-items {
            .package-show__attrs-item {
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
              .package-show__attrs-item-label {
                color: #797979;
              }
              .package-show__attrs-item-value {
                color: #212121;
              }
            }
          }
        }
        @media screen and (max-width: 600px) {
          & {
            width: 100%;
          }
        }
      }
      @media screen and (max-width: 900px) {
        & {
          width: 100%;
        }
      }
      @media screen and (max-width: 600px) {
        & {
          gap: 16px;
          padding-bottom: 0;
        }
      }
    }
    .package-show__summery-price {
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
      .package-show__summery-price-title {
        font-size: 16px;
        color: #616161;
        .q-icon {
          font-size: 20px;
          color: #AAA095;
        }
      }
      .package-show__summery-price-base {
        font-size: 18px;
        color: #FF3D3D;
        text-decoration: line-through;
      }
      .package-show__summery-price-final {
        font-size: 24px;
        color: #475F4A;
      }
      .package-show__summery-price-action {
        width: 100%;
        background: white !important;
      }
      @media screen and (max-width: 900px) {
        & {
          padding-top: 8px;
          padding-bottom: 8px;
          width: 100%;
        }
      }
    }
    @media screen and (max-width: 1024px) {
      & {
        flex-flow: column;
      }
      .package-show__summery-info {
        width: 100%;
      }
      .package-show__summery-price {
        width: 100%;
      }
    }
  }
  .package-show__products {
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
  .package-show__descriptions {
    padding: 32px 32px 70px 32px;
    border: 1px solid #DFE1EC;
    border-radius: 8px;
    background: #F6F6F6;
    .package-show__descriptions-title{
      color: #727272;
      font-size: 16px;
      margin-bottom: 21px;
    }
    .package-show__descriptions-data {
      color: #212121;
      font-size: 16px;
    }
  }
}
</style>
