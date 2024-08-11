<template>
  <q-card flat
          class="classroom-item"
          :class="{'isRegistered' : classroom.is_current_user_registered }">
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
      <img class="thumbnail-img q-ma-xs"
           :src="classroom.thumbnail"
           @click="goToPage">
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
          {{classroom.professor_info.firstname}}
          {{classroom.professor_info.lastname}}
        </div>
      </div>
      <div class="attribute-item">
        <div class="attribute-logo">
          <q-icon name="cast_for_education"
                  size="20px"
                  color="grey" />
        </div>
        <div class="attribute-value">
          {{ getHoldingType(classroom) }}
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
          ریال
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="action-section">
      <q-btn color="primary"
             class="btn-show-classroom"
             :to="{name: 'Public.ShowClassroomInfo', params: {id: classroom.id}}">
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
import { Classroom } from 'src/models/Classroom.js'

export default defineComponent({
  name: 'OptionPanel',
  props: {
    classroom: {
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
      this.$router.push({ name: 'Public.ShowClassroomInfo', params: { id: this.classroom.id } })
    },
    getHoldingType (classroom) {
      return new Classroom(classroom).holding_type_info.label
    }
  }
})
</script>

<style lang="scss" scoped>
.classroom-item {
  width: 100%;
  background-color: #F6F6F6;
  border-radius: 8px;
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
    .thumbnail-img {
      width: 100%;
      height: auto;
      border-radius: 10px;
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
</style>
