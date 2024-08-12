<template>
  <div class="productCarousel">
    <div class="productCarousel-title">
      <div>
        <q-banner class="banner">
          فروشگاه
        </q-banner>
      </div>
      <div>
        <q-btn flat
               :to="{name: 'Public.Shop'}">
          مشاهده همه
          <svg xmlns="http://www.w3.org/2000/svg"
               width="18.387"
               height="11.502"
               viewBox="0 0 18.387 11.502"
               class="q-ml-sm">
            <path id="Combined_Shape"
                  data-name="Combined Shape"
                  d="M-9.338,11.408a.748.748,0,0,0,.388-.656V6.5h8.2A.751.751,0,0,0,0,5.75.75.75,0,0,0-.75,5h-8.2V.75A.751.751,0,0,0-9.338.093.769.769,0,0,0-9.7,0a.735.735,0,0,0-.4.115l-7.938,5a.747.747,0,0,0-.35.635.742.742,0,0,0,.35.634l7.938,5a.751.751,0,0,0,.4.116A.746.746,0,0,0-9.338,11.408ZM-10.45,9.392l-5.78-3.641,5.78-3.642Z"
                  transform="translate(18.387)"
                  fill="#eac38a" />
          </svg>
        </q-btn>
      </div>
    </div>
    <div class="carousel-section">
      <div v-if="!products.loading && products.list.length > 0"
           ref="slider"
           class="splide"
           role="group"
           aria-label="Splide Basic HTML Example">
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="(product, productIndex) in products.list"
                :key="productIndex"
                class="splide__slide">
              <product-item :product="product" />
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="!products.loading && products.list.length === 0">
        محصولی یافت نشد.
      </div>
      <div v-else-if="products.loading">
        کمی صبر کنید ...
      </div>
    </div>
  </div>
</template>

<script>
import Splide from '@splidejs/splide'
import ProductItem from './productItem.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { ProductList } from 'src/models/Product.js'
import '@splidejs/splide/dist/css/splide-core.min.css'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'ProductCarousel',
  components: {
    ProductItem
  },
  mixins: [mixinPrefetchServerData],
  data () {
    return {
      loading: false,
      slider: null,
      products: new ProductList(),
      breakpoints: {
        1920: {
          perPage: 4
        },
        900: {
          perPage: 2
        },
        500: {
          perPage: 1
        }
      },
      maximizedToggle: true,
      dialog: false
    }
  },
  mounted () {
    this.loadSlider()
  },
  methods: {
    loadSlider () {
      this.$nextTick(() => {
        if (!this.$refs.slider) {
          return
        }
        new Splide(this.$refs.slider, {
          direction: 'rtl',
          paginationDirection: 'rtl',
          // type: 'loop',
          focus: 0,
          gap: 24,
          snap: true,
          // focus: 'center',
          breakpoints: this.breakpoints
        }).mount()
      })
    },
    prefetchServerDataPromise () {
      return this.getProducts()
    },
    prefetchServerDataPromiseThen (productList) {
      this.products = new ProductList(productList.list)
      this.products.loading = false
      this.loadSlider()
    },
    prefetchServerDataPromiseCatch () {
      this.products.loading = false
    },

    getProducts () {
      this.products.loading = true
      // return APIGateway.product.index()
      return APIGateway.product.index({
        per_page: 20
      })
    }
  }
}
</script>

<style scoped lang="scss">
.productCarousel {
  padding: 60px 0;
  .productCarousel-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
  }
  .carousel-section {
  }
}
</style>
