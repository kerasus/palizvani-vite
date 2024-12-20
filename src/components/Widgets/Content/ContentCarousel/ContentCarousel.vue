<template>
  <div class="contentCarousel">
    <div class="contentCarousel-title">
      <div>
        <q-banner class="banner">
          سیر مطالعاتی و سخنرانی‌ها
        </q-banner>
      </div>
      <div>
        <q-btn flat
               :to="{name: 'Public.ContentCategoryParentParent.List'}">
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
      <div v-if="!contents.loading && contents.list.length > 0"
           ref="slider"
           class="splide"
           role="group"
           aria-label="Splide Basic HTML Example">
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="(content, contentIndex) in contents.list"
                :key="contentIndex"
                class="splide__slide">
              <content-item :content="content" />
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="!contents.loading && contents.list.length === 0">
        رویدادی یافت نشد.
      </div>
      <div v-else-if="contents.loading">
        کمی صبر کنید ...
      </div>
    </div>
  </div>
</template>

<script>
import Splide from '@splidejs/splide'
import { APIGateway } from 'src/api/APIGateway.js'
import { ContentList } from 'src/models/Content.js'
import '@splidejs/splide/dist/css/splide-core.min.css'
import ContentItem from './componetns/ContentItem.vue'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'EventCarousel',
  components: {
    ContentItem
  },
  mixins: [mixinPrefetchServerData, mixinWidget],
  data () {
    return {
      loading: false,
      slider: null,
      contents: new ContentList(),
      breakpoints: {
        1920: {
          perPage: 3
        },
        900: {
          perPage: 2
        },
        600: {
          perPage: 1
        }
      },
      maximizedToggle: true
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
      return this.getContents()
    },
    prefetchServerDataPromiseThen (contentList) {
      this.contents = new ContentList(contentList.list)
      this.contents.loading = false
      this.loadSlider()
    },
    prefetchServerDataPromiseCatch () {
      this.contents.loading = false
    },

    getContents () {
      const params = {}

      if (this.localOptions.categoryCategoryCategoryId) {
        params.category__parent__parent = this.localOptions.categoryCategoryCategoryId
      }

      if (this.localOptions.categoryCategoryId) {
        params.category__parent = this.localOptions.categoryCategoryId
      }

      if (this.localOptions.categoryId) {
        params.category = this.localOptions.categoryId
      }

      this.contents.loading = true
      return APIGateway.content.index(params)
    }
  }
}
</script>

<style scoped lang="scss">
.contentCarousel {
  padding: 60px 0;
  .contentCarousel-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
  }
  .carousel-section {
  }
}
</style>
