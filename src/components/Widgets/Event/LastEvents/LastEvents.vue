<template>
  <div class="eventCarousel">
    <div class="eventCarousel-title">
      <div>
        <q-banner class="banner">
          آخرین
          رویدادها
        </q-banner>
      </div>
      <div>
        <q-btn flat
               :to="{name: 'Public.AllEvents'}">
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
      <div v-if="!events.loading && events.list.length > 0"
           ref="slider"
           class="splide"
           role="group"
           aria-label="Splide Basic HTML Example">
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="(event, eventIndex) in events.list"
                :key="eventIndex"
                class="splide__slide">
              <event-item :event="event" />
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="!events.loading && events.list.length === 0">
        رویدادی یافت نشد.
      </div>
      <div v-else-if="events.loading">
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
import EventItem from 'src/components/EventItem.vue'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import { Classroom, ClassroomList } from 'src/models/Classroom.js'
import { EventRegistrationList } from 'src/models/EventRegistration.js'

export default {
  name: 'EventCarousel',
  components: {
    EventItem
  },
  mixins: [mixinPrefetchServerData],
  data () {
    return {
      loading: false,
      user: new User(),
      userRegistrations: new EventRegistrationList(),
      slider: null,
      events: new ClassroomList(),
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
        gap: 24,
        snap: true,
        // focus: 'center',
        breakpoints: this.breakpoints
      }).mount()
    },
    getHoldingType (event) {
      return new Classroom(event).holding_type_info.label
    },
    prefetchServerDataPromise () {
      return this.getEvents()
    },
    prefetchServerDataPromiseThen (eventList) {
      this.events = new ClassroomList(eventList.list)
      this.events.loading = false
      this.loadSlider()
    },
    prefetchServerDataPromiseCatch () {
      this.events.loading = false
    },

    loadAuthData () {
      this.user = this.$store.getters['Auth/user']
    },
    getTerm (event) {
      if (!event.beginning_registration_period) {
        return '-'
      }
      return ShamsiDate.getTerm(event.beginning_registration_period)
    },
    isEventRegistered (eventId) {
      return !!this.userRegistrations.list.find(item => item.event === eventId && (item.status === 'REGISTERED' || item.status === 'ENROLLED'))
    },
    getUserRegistrations () {
      this.userRegistrations.loading = true
      APIGateway.classroomRegistration.index()
        .then((eventRegistrationList) => {
          this.userRegistrations = new EventRegistrationList(eventRegistrationList.list)
          this.userRegistrations.loading = false
        })
        .catch(() => {
          this.userRegistrations.loading = false
        })
    },
    getEvents () {
      this.events.loading = true
      // return APIGateway.event.index()
      return APIGateway.classroom.index({
        unit__category__type: 'EVENT',
        per_page: 9999
      })
    }
  }
}
</script>

<style scoped lang="scss">
.eventCarousel {
  padding: 60px 0;
  .eventCarousel-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
  }
  .carousel-section {
  }
}
</style>
