<template>
  <div class="classroomCarousel">
    <div class="classroomCarousel-title">
      <div>
        <q-banner class="banner">
          دوره های آموزشی
        </q-banner>
      </div>
      <div>
        <q-btn flat
               :to="{name: 'Public.AllClassrooms'}">
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
      <carousel v-if="!classrooms.loading && classrooms.list.length > 0"
                :breakpoints="breakpoints"
                dir="rtl">
        <slide v-for="classroom in classrooms.list"
               :key="classroom.id + classroomsKey">
          <classroom-item :classroom="classroom" />
        </slide>

        <template #addons="{ slidesCount }">
          <navigation v-if="slidesCount > 1" />
          <pagination v-if="slidesCount > 1 && false" />
        </template>
      </carousel>
      <div v-else-if="!classrooms.loading && classrooms.list.length === 0">
        دوره ای یافت نشد.
      </div>
      <div v-else-if="classrooms.loading">
        کمی صبر کنید ...
      </div>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { User } from 'src/models/User.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ClassroomItem from 'src/components/ClassroomItem.vue'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import { Classroom, ClassroomList } from 'src/models/Classroom.js'
import { ClassroomRegistrationList } from 'src/models/ClassroomRegistration.js'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel/dist/carousel'

export default {
  name: 'ClassroomCarousel',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    ClassroomItem
  },
  mixins: [mixinPrefetchServerData],
  data: () => ({
    loading: false,
    user: new User(),
    classroomsKey: Date.now(),
    userRegistrations: new ClassroomRegistrationList(),
    slide: 0,
    classrooms: new ClassroomList(),
    breakpoints: {
      // 1024 and up
      1024: {
        itemsToShow: 3,
        snapAlign: 'start'
      },
      // 700px and up
      700: {
        itemsToShow: 2.2,
        snapAlign: 'center'
      },
      // 300px and up
      300: {
        itemsToShow: 1.1,
        snapAlign: 'center'
      }
    },
    maximizedToggle: true,
    dialog: false
  }),
  mounted () {
    this.loadAuthData()
    if (this.user && this.user.id !== null) {
      this.getUserRegistrations()
    }
  },
  methods: {
    getHoldingType (classroom) {
      return new Classroom(classroom).holding_type_info.label
    },
    prefetchServerDataPromise () {
      return this.getClassrooms()
    },
    prefetchServerDataPromiseThen (classroomList) {
      this.classrooms = new ClassroomList(classroomList.list)
      this.classrooms.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.classrooms.loading = false
    },

    loadAuthData () {
      this.user = this.$store.getters['Auth/user']
    },
    getTerm (classroom) {
      if (!classroom.beginning_registration_period) {
        return '-'
      }
      return ShamsiDate.getTerm(classroom.beginning_registration_period)
    },
    isClassroomRegistered (classroomId) {
      return !!this.userRegistrations.list.find(item => item.classroom === classroomId && (item.status === 'REGISTERED' || item.status === 'ENROLLED'))
    },
    getUserRegistrations () {
      this.userRegistrations.loading = true
      APIGateway.classroomRegistration.index()
        .then((classroomRegistrationList) => {
          this.userRegistrations = new ClassroomRegistrationList(classroomRegistrationList.list)
          this.classroomsKey = Date.now()
          this.userRegistrations.loading = false
        })
        .catch(() => {
          this.userRegistrations.loading = false
        })
    },
    getClassrooms () {
      this.classrooms.loading = true
      return APIGateway.classroom.index({
        unit__category__type: 'EVENT'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.classroomCarousel {
  padding: 60px 0;
  .classroomCarousel-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
  }
  .carousel-section {
    padding: 0 60px;
    :deep(.carousel__prev),
    :deep(.carousel__next) {
      width: 48px;
      height: 48px;
      background-color: #475F4A;
      border-radius: 8px;
      &.carousel__prev--in-active {
        background-color: #DEDEDE;
      }
      &:after {
      }
      svg {
        //display: none;
      }
    }
    :deep(.carousel__prev) {
      right: auto;
      left: 0;
      transform: translate(-100%, -50%);
      color: white;
    }
    :deep(.carousel__next) {
      left: auto;
      right: 0;
      transform: translate(100%, -50%);
      color: white;
    }
    .carousel__slide {
      padding: 0 12px;
      .classroomCarousel-item {
        width: 100%;
        &.isRegistered {
          .thumbnail {
            position: relative;
            z-index: 1;
            .RegisteredSign {
              position: absolute;
              right: 5px;
              top: 7px;
              z-index: 2;
              display: block;
            }
          }
        }
        .thumbnail {
          padding-top: 17px;
          padding-left: 22px;
          padding-right: 22px;
          padding-bottom: 26px;
          .RegisteredSign {
            display: none;
          }
        }
        .title {
          text-align: left;
          padding-top: 0;
          padding-left: 46px;
          padding-right: 46px;
          padding-bottom: 33px;
        }
        .attribute {
          padding-top: 0;
          padding-left: 46px;
          padding-right: 46px;
          padding-bottom: 44px;
          .attribute-item {
            margin-bottom: 21px;
            display: flex;
            flex-flow: row;
            .attribute-logo {
              margin-right: 15px;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
        .action-section {
          padding: 0;
          .btn-show-classroom {
            width: 100%;
            height: 60px;
            border-top-right-radius: 0;
            border-top-left-radius: 0;
          }
        }
      }
    }
  }
}
</style>
