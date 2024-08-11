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

      <div v-if="!classrooms.loading && classrooms.list.length > 0"
           ref="slider"
           class="splide"
           role="group"
           aria-label="Splide Basic HTML Example">
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="(classroom, classroomIndex) in classrooms.list"
                :key="classroomIndex"
                class="splide__slide">
              <classroom-item :classroom="classroom" />
            </li>
          </ul>
        </div>
      </div>
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
import '@splidejs/splide/dist/css/splide-core.min.css'
import Splide from '@splidejs/splide'
import { User } from 'src/models/User.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ClassroomItem from 'src/components/ClassroomItem.vue'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import { Classroom, ClassroomList } from 'src/models/Classroom.js'
import { ClassroomRegistrationList } from 'src/models/ClassroomRegistration.js'

export default {
  name: 'ClassroomCarousel',
  components: {
    ClassroomItem
  },
  mixins: [mixinPrefetchServerData],
  data () {
    return {
      loading: false,
      user: new User(),
      userRegistrations: new ClassroomRegistrationList(),
      slider: null,
      classrooms: new ClassroomList(),
      breakpoints: {
        1920: {
          perPage: 3
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
    this.loadAuthData()
    this.loadSlider()
    if (this.user && this.user.id !== null) {
      this.getUserRegistrations()
    }
  },
  methods: {
    loadSlider () {
      if (!this.$refs.slider) {
        return
      }
      new Splide(this.$refs.slider, {
        direction: 'rtl',
        paginationDirection: 'rtl',
        // type: 'loop',
        focus: 0,
        snap: true,
        gap: 24,
        // focus: 'center',
        breakpoints: this.breakpoints
      }).mount()
    },
    getHoldingType (classroom) {
      return new Classroom(classroom).holding_type_info.label
    },
    prefetchServerDataPromise () {
      return this.getClassrooms()
    },
    prefetchServerDataPromiseThen (classroomList) {
      this.classrooms = new ClassroomList(classroomList.list)
      this.classrooms.loading = false
      this.loadSlider()
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
          this.userRegistrations.loading = false
        })
        .catch(() => {
          this.userRegistrations.loading = false
        })
    },
    getClassrooms () {
      this.classrooms.loading = true
      return APIGateway.classroom.index({
        unit__category__type: 'TRAINING'
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
  }
}
</style>
