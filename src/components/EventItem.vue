<template>
  <q-card flat
          class="event-item"
          :class="{'isRegistered' : event.is_current_user_registered }">
    <q-card-section class="thumbnail">
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
            <text id="رویداد_های_من"
                  data-name="رویداد‌های من"
                  transform="translate(445.063 1135.174) rotate(-45)"
                  fill="#fff"
                  font-size="18"
                  font-family="SegoeUI-Bold, Segoe UI"
                  font-weight="700"><tspan x="0"
                                           y="0">رویداد‌های من</tspan></text>
          </g>
        </svg>
      </div>
      <img class="thumbnail-img"
           :src="event.thumbnail"
           @click="goToPage">
    </q-card-section>
    <div class="infos">
      <div class="title ellipsis-2-lines">
        <router-link :to="{name: 'Public.ShowEventInfo', params: {id: event.id}}">
          {{event.title}}
        </router-link>
      </div>
      <div class="date">
        <q-icon name="calendar_month"
                size="20px" />
        {{ miladiToShamsi() }}
      </div>
    </div>
    <q-card-actions class="action-section">
      <q-btn color="primary"
             class="btn-show-event"
             :to="{name: 'Public.ShowEventInfo', params: {id: event.id}}">
        مشاهده و ثبت نام
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
</template>

<script>
import { defineComponent } from 'vue'
// import { Event } from 'src/models/Event.js'
import { Classroom } from 'src/models/Classroom' //  using Classroom instead of Event to prevent props warning
import Assist from 'src/assets/js/Assist.js'

export default defineComponent({
  name: 'OptionPanel',
  props: {
    event: {
      type: Classroom,
      default: new Classroom()
    }
  },
  data() {
    return {
      size: 'xs',
      sizeOptions: ['xs', 'sm', 'md', 'lg', 'xl'],
      actionTypes: ['event', 'scroll', 'link'],
      defaultOptions: {
        imageSource: null,
        ratio: null,
        hasAction: false,
        useAEEEvent: false,
        AEEEventBody: {
          id: '-',
          name: '-',
          creative: null,
          position: null
        },
        action: {
          name: null,
          route: null,
          scrollTo: null,
          eventName: null,
          eventArgs: null
        },
        xs: {
          height: null,
          width: null,
          src: null
        },
        sm: {
          height: null,
          width: null,
          src: null
        },
        md: {
          height: null,
          width: null,
          src: null
        },
        lg: {
          height: null,
          width: null,
          src: null
        },
        xl: {
          height: null,
          width: null,
          src: null
        }
      }
    }
  },
  methods: {
    goToPage () {
      this.$router.push({ name: 'Public.ShowEventInfo', params: { id: this.event.id } })
    },
    getHoldingType (event) {
      return new Classroom(event).holding_type_info.label
    },
    miladiToShamsi () {
      if (!this.event.publish_time) {
        return '-'
      }
      return Assist.miladiToShamsi(this.event.publish_time, 'jD jMMMM jYYYY ساعت HH:mm')
    }
  }
})
</script>

<style lang="scss" scoped>
.event-item {
  width: 100%;
  background-color: #F6F6F6;
  border-radius: 8px;
  position: relative;
  z-index: 1;

  &.isRegistered {
    .thumbnail {
      position: relative;
      z-index: 1;
      .RegisteredSign {
        position: absolute;
        right: -13px;
        top: -13px;
        z-index: 2;
        display: block;
      }
    }
  }
  .thumbnail {
    padding: 0;
    .RegisteredSign {
      display: none;
    }
    .thumbnail-img {
      width: 100%;
      height: auto;
    }
  }
  .infos {
    position: absolute;
    left: 0;
    bottom: 60px;
    width: 100%;
    z-index: 2;
    .title {
      padding: 0 15px;
      text-align: left;
      margin-bottom: 49px;
      a {
        color: white;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .date {
      padding: 0 15px;
      text-align: left;
      margin-bottom: 24px;
      color: white;
      font-size: 16px;
      font-weight: normal;
      .q-icon {
        color: #EAC38A;
        margin-right: 12.5px;
      }
    }
  }
  .action-section {
    padding: 0;
    .btn-show-event {
      width: 100%;
      height: 60px;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
  }
}
</style>
