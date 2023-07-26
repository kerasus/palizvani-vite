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
    <carousel v-if="!classrooms.loading && classrooms.list.length > 0"
              :breakpoints="breakpoints"
              dir="rtl">
      <slide v-for="classroom in classrooms.list"
             :key="classroom.id + classroomsKey">
        <q-card flat
                class="classroomCarousel-item"
                :class="{'isRegistered' : isClassroomRegistered(classroom.id) }">
          <q-card-section class="thumbnail">
            <router-link :to="{name: 'Public.ShowClassroomInfo', params: {id: classroom.id}}">
              <div class="RegisteredSign">
                <svg class="ribbon"
                     xmlns="http://www.w3.org/2000/svg"
                     width="123.945"
                     height="123.422"
                     viewBox="0 0 123.945 123.422">
                  <g id="Group_11524"
                     data-name="Group 11524"
                     transform="translate(-361 -1111)">
                    <g id="Group_7903"
                       data-name="Group 7903"
                       transform="translate(361 1111)">
                      <g id="Group_7901"
                         data-name="Group 7901"
                         transform="translate(0 0)">
                        <rect id="Rectangle_1771"
                              data-name="Rectangle 1771"
                              width="13.986"
                              height="39.668"
                              transform="translate(0 83.754)"
                              fill="#cfb184" />
                        <rect id="Rectangle_1772"
                              data-name="Rectangle 1772"
                              width="39.668"
                              height="13.986"
                              transform="translate(84.277 0)"
                              fill="#cfb184" />
                        <path id="Path_18668"
                              data-name="Path 18668"
                              d="M1938.931,282.651l123.945-123.406-.016-.016h-44a9.041,9.041,0,0,0-6.379,2.631l-70.907,70.6a8.962,8.962,0,0,0-2.642,6.352Z"
                              transform="translate(-1938.931 -159.229)"
                              fill="#eac38a" />
                      </g>
                    </g>
                    <text id="دوره_های_من"
                          data-name="دوره‌های من"
                          transform="translate(445.063 1135.174) rotate(-45)"
                          fill="#fff"
                          font-size="18"
                          font-family="SegoeUI-Bold, Segoe UI"
                          font-weight="700"><tspan x="0"
                                                   y="0">دوره‌های من</tspan></text>
                  </g>
                </svg>
              </div>
              <q-img class="q-ma-xs"
                     :src="classroom.thumbnail" />
            </router-link>
          </q-card-section>
          <q-card-section class="title">
            <router-link :to="{name: 'Public.ShowClassroomInfo', params: {id: classroom.id}}">
              {{classroom.title}}
            </router-link>
          </q-card-section>
          <q-card-section class="attribute">
            <div class="attribute-item">
              <div class="attribute-logo">
                <svg id="Profile"
                     xmlns="http://www.w3.org/2000/svg"
                     width="17.058"
                     height="21.399"
                     viewBox="0 0 17.058 21.399">
                  <path id="Combined_Shape"
                        data-name="Combined Shape"
                        d="M0,17.418c0-3.55,4.868-3.96,8.53-3.96,2.109,0,8.528,0,8.528,3.982,0,3.548-4.867,3.959-8.528,3.959C6.42,21.4,0,21.4,0,17.418Zm1.616,0c0,1.57,2.326,2.366,6.914,2.366s6.913-.789,6.913-2.345-2.326-2.366-6.913-2.366S1.616,15.862,1.616,17.418ZM8.5,11.436A5.718,5.718,0,0,1,8.53,0a5.718,5.718,0,0,1,0,11.436ZM4.349,5.718A4.171,4.171,0,0,0,8.5,9.9l.031.77V9.9a4.18,4.18,0,1,0-4.181-4.18Z"
                        transform="translate(0 0)"
                        fill="#aaa095" />
                </svg>
              </div>
              <div class="attribute-value">
                {{classroom.professor}}
              </div>
            </div>
            <div class="attribute-item">
              <div class="attribute-logo">
                <svg id="Calendar"
                     xmlns="http://www.w3.org/2000/svg"
                     width="21"
                     height="23.154"
                     viewBox="0 0 21 23.154">
                  <path id="Combined_Shape"
                        data-name="Combined Shape"
                        d="M5.945,23.154c-3.668,0-5.945-2.26-5.945-5.9V7.51A5.382,5.382,0,0,1,5.347,1.721V.807a.808.808,0,0,1,1.616,0V1.7h7.084V.807a.807.807,0,1,1,1.615,0v.914a5.8,5.8,0,0,1,3.8,1.572A5.793,5.793,0,0,1,21,7.513v9.824c0,3.588-2.279,5.817-5.946,5.817Zm-4.33-5.9c0,2.762,1.537,4.284,4.33,4.284h9.109c2.792,0,4.331-1.493,4.331-4.2V9.59H1.616ZM19.385,7.974V7.51a4.159,4.159,0,0,0-1.063-3.074,4.164,4.164,0,0,0-2.66-1.094v1.01a.807.807,0,0,1-1.615,0V3.317H6.963V4.352a.808.808,0,0,1-1.616,0V3.341c-2.413.2-3.732,1.664-3.732,4.169v.464Zm-4.9,9.2a.8.8,0,0,1,.8-.807h.01a.807.807,0,1,1-.812.807Zm-4.778,0a.8.8,0,0,1,.8-.807h.01a.807.807,0,1,1-.812.807Zm-4.79,0a.8.8,0,0,1,.8-.807h.01a.807.807,0,1,1-.813.807Zm9.568-4.185a.8.8,0,0,1,.8-.808h.01a.808.808,0,1,1-.812.808Zm-4.778,0a.8.8,0,0,1,.8-.808h.01a.808.808,0,1,1-.812.808Zm-4.79,0a.8.8,0,0,1,.8-.808h.01a.808.808,0,1,1-.813.808Z"
                        transform="translate(0 0)"
                        fill="#aaa095" />
                </svg>
              </div>
              <div class="attribute-value">
                {{ getTerm(classroom) }}
              </div>
            </div>
            <div class="attribute-item">
              <div class="attribute-logo">
                <svg id="Group_11306"
                     data-name="Group 11306"
                     xmlns="http://www.w3.org/2000/svg"
                     width="21.539"
                     height="21.044"
                     viewBox="0 0 21.539 21.044">
                  <g id="Buy"
                     transform="translate(0 0)">
                    <path id="Combined_Shape"
                          data-name="Combined Shape"
                          d="M16.3,19.649A1.395,1.395,0,1,1,17.7,21.044,1.4,1.4,0,0,1,16.3,19.649Zm-12.147,0a1.394,1.394,0,1,1,1.394,1.395A1.4,1.4,0,0,1,4.157,19.649ZM17.77,16.139H6.014A2.76,2.76,0,0,1,3.28,13.615L2.294,1.883.671,1.6A.812.812,0,0,1,.012.668.811.811,0,0,1,.815,0a.829.829,0,0,1,.13.011L3.186.4a.808.808,0,0,1,.666.729L4.1,4.143c15.367.007,15.424.014,15.5.022a2.254,2.254,0,0,1,1.912,2.553l-1.023,7.062a2.76,2.76,0,0,1-2.717,2.358ZM4.89,13.483a1.123,1.123,0,0,0,1.127,1.04H17.771a1.139,1.139,0,0,0,1.122-.972l1.024-7.064a.632.632,0,0,0-.121-.472.625.625,0,0,0-.418-.249c-.052,0-.6,0-1.677,0-1.693,0-4.455,0-7.291,0l-6.17,0ZM13.059,9.74a.808.808,0,0,1,0-1.616h2.985a.808.808,0,0,1,0,1.616Z"
                          transform="translate(0)"
                          fill="#aaa095" />
                  </g>
                </svg>
              </div>
              <div class="attribute-value">
                {{classroom.price}}
                تومان
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="action-section">
            <q-btn color="primary"
                   class="btn-show-classroom"
                   :to="{name: 'Public.ShowClassroomInfo', params: {id: classroom.id}}">
              جزییات دوره
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="18.387"
                   height="11.502"
                   viewBox="0 0 18.387 11.502">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M-9.338,11.408a.748.748,0,0,0,.388-.656V6.5h8.2A.751.751,0,0,0,0,5.75.75.75,0,0,0-.75,5h-8.2V.75A.751.751,0,0,0-9.338.093.769.769,0,0,0-9.7,0a.735.735,0,0,0-.4.115l-7.938,5a.747.747,0,0,0-.35.635.742.742,0,0,0,.35.634l7.938,5a.751.751,0,0,0,.4.116A.746.746,0,0,0-9.338,11.408ZM-10.45,9.392l-5.78-3.641,5.78-3.642Z"
                      transform="translate(18.387)"
                      fill="#fff" />
              </svg>
            </q-btn>
          </q-card-actions>
        </q-card>
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
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { User } from 'src/models/User.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { ClassroomList } from 'src/models/Classroom.js'
import { ClassroomRegistrationList } from 'src/models/ClassroomRegistration.js'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel/dist/carousel'

export default {
  name: 'ClassroomCarousel',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
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
        itemsToShow: 4,
        snapAlign: 'start'
      },
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center'
      },
      // 300px and up
      300: {
        itemsToShow: 1.5,
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
    this.getClassrooms()
  },
  methods: {
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
      return !!this.userRegistrations.list.find(item => item.classroom === classroomId)
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
      APIGateway.classroom.index()
        .then(classroomList => {
          this.classrooms = new ClassroomList(classroomList.list)
          this.classrooms.loading = false
        })
        .catch(() => {
          this.classrooms.loading = false
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
  }
  :deep(.carousel__next) {
    left: auto;
    right: 0;
    transform: translate(100%, -50%);
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
</style>
