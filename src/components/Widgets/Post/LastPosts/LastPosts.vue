<template>
  <div class="LastPostsCarousel">
    <div class="LastPostsCarousel-title">
      <div>
        <q-banner class="banner">
          آخرین
          اخبار
        </q-banner>
      </div>
      <div>
        <q-btn flat
               :to="{name: 'Public.Post.List.News'}">
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
      <div v-if="!posts.loading && posts.list.length > 0"
           ref="slider"
           class="splide"
           role="group"
           aria-label="Splide Basic HTML Example">
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="(post, postIndex) in posts.list"
                :key="postIndex"
                class="splide__slide">
              <post-item :post="post" />
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="!posts.loading && posts.list.length === 0">
        رویدادی یافت نشد.
      </div>
      <div v-else-if="posts.loading">
        کمی صبر کنید ...
      </div>
    </div>
  </div>
</template>

<script>
import Splide from '@splidejs/splide'
import { PostList } from 'src/models/Post.js'
import PostItem from './components/PostItem.vue'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import '@splidejs/splide/dist/css/splide-core.min.css'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'LastPosts',
  components: {
    PostItem
  },
  mixins: [mixinPrefetchServerData, mixinWidget],
  data () {
    return {
      loading: false,
      slider: null,
      posts: new PostList(),
      defaultOptions: {
        categoryId: null,
        categoryCategoryId: null,
        categoryCategoryCategoryId: null,
        categoryFromQueryParams: false,
        categoryCategoryFromQueryParams: false,
        categoryCategoryCategoryFromQueryParams: false
      },
      breakpoints: {
        1920: {
          perPage: 1
        },
        900: {
          perPage: 1
        },
        500: {
          perPage: 1
        }
      },
      maximizedToggle: true
    }
  },
  computed: {
    postCategoryId () {
      if (this.localOptions.categoryId) {
        return this.localOptions.categoryId
      }

      return null
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
      return this.getLastPosts()
    },
    prefetchServerDataPromiseThen (postList) {
      this.posts = new PostList(postList.list)
      this.posts.loading = false
      this.loadSlider()
    },
    prefetchServerDataPromiseCatch () {
      this.posts.loading = false
    },

    getTerm (event) {
      if (!event.beginning_registration_period) {
        return '-'
      }
      return ShamsiDate.getTerm(event.beginning_registration_period)
    },
    getLastPosts () {
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

      this.posts.loading = true
      return APIGateway.post.index(params)
    }
  }
}
</script>

<style scoped lang="scss">
.LastPostsCarousel {
  padding: 60px 0;
  .LastPostsCarousel-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
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
}
</style>
