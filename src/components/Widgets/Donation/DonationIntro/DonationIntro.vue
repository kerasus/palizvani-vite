<template>
  <div class="DonationIntro">
    <div class="DonationIntro-title">
      <q-banner class="banner">
        صدقات و خیریه
      </q-banner>
    </div>
    <div class="content">
      <div class="text-and-action">
        <div class="text"
             v-html="localOptions.text" />
        <q-btn color="primary"
               :to="{ name: 'Public.DonationCategory.List' }">
          پرداخت صدقات و خیریه
        </q-btn>
      </div>
      <div class="carousel-section">
        <div v-if="localOptions.slides.length > 0"
             ref="slider"
             class="splide"
             role="group"
             aria-label="Splide Basic HTML Example">
          <div class="splide__track">
            <ul class="splide__list">
              <li v-for="(slide, slideIndex) in localOptions.slides"
                  :key="slideIndex"
                  class="splide__slide">
                <q-img :src="slide" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Splide from '@splidejs/splide'
import { mixinWidget } from 'src/mixin/Mixins.js'
import '@splidejs/splide/dist/css/splide-core.min.css'

export default {
  name: 'EventCarousel',
  mixins: [mixinWidget],
  data () {
    return {
      loading: false,
      slider: null,
      breakpoints: {
        1920: {
          perPage: 1
        },
        900: {
          perPage: 1
        },
        600: {
          perPage: 1
        }
      },
      maximizedToggle: true,
      defaultOptions: {
        text: null,
        slides: []
      }
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
    }
  }
}
</script>

<style scoped lang="scss">
.DonationIntro {
  padding: 60px 0;
  .DonationIntro-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
  }
  .content {
    display: flex;
    flex-flow: row;
    gap: 48px;
    justify-content: space-between;
    align-items: stretch;
    .text-and-action {
      width: 50%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      align-items: flex-end;
      .text {
        width: 100%;
      }
    }
    .carousel-section {
      width: 50%;
    }
    :deep(.carousel-section) {
      .splide__arrows {
        top: auto;
        bottom: 0;
        .splide__arrow {
          &.splide__arrow--prev {
            left: 50%;
            transform: translateX(-120%);
          }
          &.splide__arrow--next {
            right: 50%;
            transform: translateX(120%);
          }
        }
      }
    }

    @media screen and (max-width: 1200px) {
      & {
        flex-flow: column;
        gap: 16px;
        .text-and-action {
          width: 100%;
        }
        .carousel-section {
          width: 100%;
        }
      }
    }
  }
}
</style>
