<template>
  <div v-if="type === 'main'"
       class="main-footer">
    <div class="homePage-footer-container">
      <div class="footer-box-1">
        <div class="content-layout box-1-details ">
          <div class="icons self-center">
            <div class="alaa-logo-box">
              <lazy-img src="https://nodes.alaatv.com/upload/alaa-footer-desc.png"
                        height="52"
                        width="180" />
            </div>
            <div class="connection">
              <div class="title">
                راه‌های ارتباطی:
              </div>
              <div class="icon-box">
                <div class="telegram">
                  <q-btn flat
                         rounded
                         class="btn-social"
                         :href="'https://telegram.me/alaa_sanatisharif'">
                    <svg width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.85 12.8299L9.58 13.4099C10.06 13.5699 10.43 13.9399 10.59 14.4199L11.17 16.1499C11.66 17.6399 13.76 17.6099 14.22 16.1199L16.17 9.83988C16.55 8.58988 15.4 7.43989 14.17 7.81989L7.88 9.76987C6.39 10.2399 6.37 12.3399 7.85 12.8299Z"
                            stroke="#8a8ca6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"
                            stroke="#8a8ca6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                  </q-btn>
                </div>
                <div class="instagram">
                  <q-btn flat
                         rounded
                         class="btn-social"
                         :href="'https://www.instagram.com/alaa_sanatisharif'">
                    <svg width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                            stroke="#8a8ca6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                      <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                            stroke="#8a8ca6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                      <path d="M17.6361 7H17.6477"
                            stroke="#8a8ca6"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="titles">
            <div class="access title-box">
              <div class="main-title">دسترسی به سایت</div>
              <!-- <q-btn flat
                     class="sub-title"
                     :to="{name: 'cart'}">
                سوالات متداول
              </q-btn> -->
              <q-btn flat
                     class="sub-title"
                     :to="{name: 'UserPanel.Ticket'}">
                تیکت پشتیبانی
              </q-btn>
              <!-- <q-btn flat
                     class="sub-title"
                     :to="{name: 'cart'}">
                ارتباط با ما
              </q-btn>
              <q-btn flat
                     class="sub-title"
                     :to="{name: 'cart'}">
                درباره ما
              </q-btn> -->
            </div>
            <div class="profile title-box">
              <div class="main-title">دسترسی های کاربران</div>
              <q-btn flat
                     class="sub-title"
                     :to="{name: 'Public.Shop'}">
                محصولات آموزشی
              </q-btn>
              <q-btn flat
                     class="sub-title"
                     :href="'https://soalaa.com/'">
                سوالا
              </q-btn>
              <q-btn flat
                     class="sub-title"
                     :href="'https://forum.alaatv.com/'">
                پالیزوانی
              </q-btn>
            </div>
            <div class="products title-box">
              <div class="main-title">دسته بندی های محبوب</div>
            </div>
            <div class="others title-box self-center" />
          </div>
        </div>
      </div>
      <div class="footer-box-2">
        <div class="content-layout-2 box-2-details">
          <div class="layer-1">
            <div class="description">
              پالیزوانی
            </div>
            <div class="footer-row">
              <div class="footer-logo-item item-soala">
                <router-link :to="{name: 'Public.Home'}">
                  <q-img src="https://nodes.alaatv.com/upload/new-footer-alaaLogo.png"
                         alt="آلاء" />
                </router-link>
              </div>
              <div class="footer-logo-item item-alaa">
                <a referrerpolicy='origin'
                   target='_blank'
                   href='https://trustseal.enamad.ir/?id=102265&code=6ZHo5rWng4fOz0irLQaM'>
                  <img referrerpolicy='origin'
                       src='https://trustseal.enamad.ir/logo.aspx?id=102265&code=6ZHo5rWng4fOz0irLQaM'
                       alt='https://www.shahidpalizvani.ir'
                       style='cursor:pointer'
                       code='6ZHo5rWng4fOz0irLQaM'>
                </a>
              </div>
              <div class="footer-logo-item item-enamad">
                <a href="https://logo.samandehi.ir/Verify.aspx?id=146279&p=rfthaodsgvkauiwkjyoepfvl"
                   target="_blank">
                  <q-img src="https://nodes.alaatv.com/upload/samandehi.png?w=90&h=94"
                         alt="enamad.ir"
                         style="cursor:pointer" />
                </a>
              </div>
            </div>
          </div>
          <div class="layer-2 ">
            <div class="text-1">
              کلیه حقوق این وب سایت به ‌توسعه علمی آموزشی عدالت محور آلاء تعلق دارد و کپی برداری از آن ممنوع می باشد.
            </div>
            <q-btn unelevated
                   class="scroll-up"
                   @click="scrollToTop">
              <svg width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M18.07 11.57L12 5.5L5.92999 11.57"
                      stroke="#8A8CA6"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                <path d="M12 19V5.66992"
                      stroke="#8A8CA6"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
              </svg>
              برو بالا

            </q-btn>
            <div class="flex items-center text-replacement">
              <div class="text">
                کلیه حقوق این وب سایت به ‌توسعه علمی آموزشی عدالت محور آلاء تعلق دارد و کپی برداری از آن ممنوع می باشد.
              </div>
              <a target="_blank"
                 href="https://alaatv.com">
                <div class="flex items-center">
                  <div>AlaaTV.com</div>
                  <div class="q-mx-xs">2012 </div>
                  <div>©</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-footer lt-md">
      <q-list>
        <q-item v-for="(item , index) in mobileFooterItems"
                :key="index"
                v-ripple
                clickable
                class="q-mt-sm"
                :active="isRouteSelected(item.to)"
                active-class="active-item"
                exact-active-class="active-route"
                :to="{ name: item.to }">
          <q-item-section avatar>
            <q-icon v-if="item.title !== 'profile' || user.id === null"
                    :name="item.icon"
                    :class="{ active: $route.name === item.to }"
                    color="primary"
                    size="35px" />
            <q-avatar v-else
                      size="35px">
              <lazy-img :src="user.photo"
                        :alt="'user photo'"
                        width="35"
                        height="35"
                        class="user-photo" />
            </q-avatar>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
  <div v-else-if="type === 'gift-card'"
       class="gift-card-footer">
    <div class="mobile-footer">
      <q-list>
        <q-item v-for="(item , index) in giftCardFooterItems"
                :key="index"
                v-ripple
                clickable
                class="q-mt-sm"
                :active="isRouteSelected(item.to)"
                active-class="active-item"
                exact-active-class="active-route"
                :to="{ name: item.to }">
          <q-item-section avatar>
            <q-icon :name="item.icon"
                    :class="{ active: $route.name === item.to }"
                    color="white"
                    size="20px" />
            <div class="line" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'AlaaFooter',
  components: { LazyImg },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  },
  data() {
    return {
      mobileFooterItems: [
        {
          title: 'profile',
          icon: 'isax:user',
          to: 'Public.Home',
          active: false
        },
        {
          title: 'card',
          icon: 'isax:card',
          to: 'Public.Home',
          active: false
        },
        {
          title: 'bank-soala',
          icon: 'isax:discover',
          to: 'Public.Home',
          active: false
        },
        {
          title: 'home',
          icon: 'isax:home',
          to: 'Public.Home',
          active: false
        }
      ],
      giftCardFooterItems: [
        {
          title: 'home',
          icon: 'isax:home',
          to: 'Public.Home',
          active: false
        },
        {
          title: 'card',
          icon: 'isax:cards',
          to: 'Public.Home',
          active: false
        },
        {
          title: 'transaction',
          icon: 'isax:empty-wallet',
          to: 'Public.Home',
          active: false
        },
        {
          title: 'profile',
          icon: 'isax:user',
          to: 'Public.Home',
          active: false
        }
      ],
      user: new User()
    }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    isRouteSelected (itemName) {
      return this.$route.name === itemName
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    },
    scrollToTop() {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/sizes.scss";
.main-footer {
  .homePage-footer-container {
    @media screen and (max-width:599px){
      display: none;
    }
    .content-layout,.content-layout-2 {
      max-width: 1362px;
      margin: auto;
      padding-top: 60px;
      padding-bottom: 60px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
      color: #8A8CA6;
      @media screen and (max-width: 1439px) {
        max-width: 100%;
      }
    }
    .content-layout{
      @media screen and (max-width: 1439px) {
        max-width: 100%;
        padding: 35px 53px;
      }
      @media screen and (max-width: 1023px) {
        padding: 34px 33px;
      }
      @media screen and (max-width: 599px) {
        padding-top: 28px;
        padding-left: 52px;
        padding-right: 52px;
      }
    }
    .content-layout-2{
      padding-top: 40px;
      padding-bottom:10px;
      @media screen and (max-width: 1439px) {
        padding: 36px 50px 10px;
      }
      @media screen and (max-width: 1023px){
        padding:20px 30px;
      }
      @media screen and (max-width: 599px){
        padding: 25px 20px;
      }
    }
    .footer-box-1 {
      background: #FFFFFF;
    }
    .footer-box-2 {
      background: #f4f6f9;
    }
    .box-1-details {
      display: grid;
      grid-template-columns: 454px auto;
      @media screen and (max-width: 1439px) {
        grid-template-columns: 321px auto;
      }
      @media screen and (max-width: 1023px) {
        display: flex;
        flex-direction: column;
      }
      .icons {
        .alaa-logo-box{
          margin-bottom: 30px;
          width: 180px;
          @media screen and (max-width: 1439px) {
            margin-bottom: 15px;
          }
          @media screen and (max-width: 1023px) {
            margin-bottom: 0;
            margin-right: 30px;
          }
          @media screen and (max-width: 599px) {
            margin-bottom: 0;
            margin-right: 0;
          }

        }

        @media screen and (max-width: 1023px) {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }
        @media screen and (max-width: 599px) {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .connection {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 254px;
          .icon-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .btn-social {

            }
            .telegram {
              padding-right: 8px;
            }
            .instagram {
              padding-left: 8px;
            }
          }
        }
      }
      .titles {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        @media screen and (max-width: 599px) {
          grid-template-columns:1fr 1fr;
          justify-content: center;
          .title-box {
            justify-self: center;
            align-self: center;
            width: auto;
            padding-top: 20px;
          }
          .access,.profile {
            padding-bottom: 30px;
          }
        }
        @media screen and (max-width: 380px) {
          grid-template-columns:1fr ;
        }
        .main-title {
          margin-left: 8px;
          margin-bottom:16px;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          @media screen and (max-width: 1439px){
            margin-bottom: 12px;
          }
        }
        :deep(.sub-title) {
          width: 100%;
          align-items: flex-start;
          color: #434765;
          font-size: 12px;
          line-height: 19px;
          min-height: unset;
          margin-bottom: 10px;
          @media screen and (max-width: 1439px){
            margin-bottom: 8px;
          }
          &:last-child{
            margin-bottom: 0;
          }
          .q-btn__content {
            margin-top: 0;
            margin-bottom: 0;
          }
        }

      }
    }
    .box-2-details {
      .layer-1 {
        display: flex;
        justify-content: space-between;
        padding-bottom: 30px;
        @media screen and (max-width: 1439px){
          padding-bottom: 25px;
        }
        @media screen and (max-width: 1023px) {
          flex-direction: column;
          padding-bottom: 30px;
        }
        @media screen and (max-width: 599px) {
          padding-bottom: 20px;
        }

        .description {
          width: 540px;
          text-align: justify;
          @media screen and (max-width: 1439px) {
            width: 420px;
          }
          @media screen and (max-width: 1023px) {
            width: auto;
            padding-bottom: 20px;
          }
          //@media screen and (max-width: 599px) {}
        }
        .footer-row {
          display: flex;
          flex-flow: row;
          justify-content: center;
          align-items: center;
          @media screen and (max-width: 1023px) {
            justify-content: space-between;
            padding-right: 22px;
            padding-left: 22px;
          }
          @media screen and (max-width: 599px) {
            padding-right: 0;
            padding-left: 0;
          }
          .footer-logo-item {
            width: 180px;
            height: 180px;
            background: #FFFFFF;
            border-radius: 30px;
            .q-img,
            svg {
              max-width: 100%;
            }
            @media screen and (max-width: 1439px) {
              width: 134px;
              height: 134px;
              border-radius: 24px;

            }
            @media screen and (max-width: 1023px) {
              width: 120px;
              height: 120px;
            }
            @media screen and (max-width: 599px) {
              width: 86px;
              height: 86px;
              border-radius: 20px;
            }
            .q-img {
              width: 120px;
              //height: 120px;
              @media screen and (max-width: 1439px) {
                width: 97px;
                //height: 97px;
              }
              @media screen and (max-width: 1023px) {
                width: 74px;
                //height: 74px;
              }
              @media screen and (max-width: 599px) {
                width: 53px;
                //height: 53px;
              }
            }

          }
          .item-soala {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .item-alaa {
            margin-right: 52px;
            margin-left: 52px;
            display: flex;
            justify-content: center;
            align-items: center;
            @media screen and (max-width: 1439px) {
              margin-right: 30px;
              margin-left: 30px;
            }
            @media screen and (max-width:1023px) {
              margin-right: 0px;
              margin-left: 00px;
            }
          }
          .item-enamad {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

      }
      .layer-2{
        display: grid;
        grid-template-columns: 150px auto;
        align-items: flex-end;
        @media screen and (max-width: 1023px){
          grid-template-columns: 1fr 1fr;
        }
        .text-replacement {
          justify-self: end;
        }
        @media screen and (max-width: 599px){
          display: flex;
          flex-direction: column;
          position: relative;
          align-items: flex-start
        }

        .text-1{
          display: none;
          @media screen and (max-width: 1023px){
            display: block;
            justify-self: center;
            grid-column-start: 1;
            grid-column-end: 3;
            font-size: 12px;
            line-height: 19px;
          }
          @media screen and (max-width: 599px){
            display: none;
          }
        }
        .scroll-up {
          width: 100px;
          @media screen and (max-width: 1023px){
            justify-self: start;
          }
          @media screen and (max-width: 599px){
            width: 90px;
          }
        }
        .text{
          margin-right: 57px;
          @media screen and (max-width: 1439px){
            margin-right: 40px;
          }
          @media screen and (max-width: 1023px){
            display: none;
          }
          @media screen and (max-width: 599px){
            display: block;
            margin-right: 0;
            font-size: 12px;
            line-height: 19px;
            max-width: 312px;
          }
        }
        color:#8A8CA6;
        a{
          text-decoration: none;
          color:#8A8CA6;
          @media screen and (max-width: 599px){
            position: absolute;
            bottom: 0px;
            right: 0;
            font-size: 12px;
            line-height: 19px;
          }
          @media screen and (max-width: 599px){
            bottom: -20px;
          }
        }
        .toUpStyle{
          bottom: 0;
        }

      }
    }
    .layer-3{
      min-height: 40px;
      background: white;
      @media screen and (max-width:1023px){
        min-height: 30px;
      }
      @media screen and (max-width:599px){
        min-height: 60px;
      }
    }
  }
  .layer-4 {
    min-height: 72px;
    display: none;
    @media screen and (max-width:599px){
      display: block;
    }

  }
  .mobile-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    height: $mobileFooterHeight;
    background: white;
    border-radius: 16px 16px 0;
    box-shadow: 0 -6px 10px rgba(112, 108, 161, 0.07);

    $itemSize: 44px;

    .q-list {
      height: 100%;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      .q-item {
        width: $itemSize;
        min-width: $itemSize;
        max-width: $itemSize;
        min-height: $itemSize;
        max-height: $itemSize;
        height: $itemSize;
        padding: 0;
        margin-top: 0;
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
        &.q-item--active {
          .q-item__section {
            background-color: lighten($primary,34%);
            padding: 0;
          }
        }
        .q-item__section {
          padding: 0;
          width: $itemSize;
          min-width: $itemSize;
          max-width: $itemSize;
          min-height: $itemSize;
          max-height: $itemSize;
          height: $itemSize;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          .user-photo {
            width: 100%;
          }
          .active {
            //background-color: rgba(128, 117, 220, 0.34);
            //background-color: lighten($primary,34%);
            //border-radius: 8px;
          }
        }
      }
    }

    .active-route {
      background-color: rgba(128, 117, 220, 0.34);
      border-radius: 8px;

      .indicator {
        height: 6px;
        width: 6px;
        background-color: white;
        border-radius: 50%;
        margin: auto;
      }
    }
  }
}
.gift-card-footer {
  .mobile-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    height: $mobileFooterHeight;
    display: none;
    background: $primary;
    border-radius: 16px 16px 0;
    box-shadow: 0 -6px 10px rgba(112, 108, 161, 0.07);

    @media screen and (max-width:1024px){
      display: block;
      height: 72px;
    }

    $itemSize: 44px;

    .q-list {
      height: 100%;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      .q-item {
        width: $itemSize;
        min-width: $itemSize;
        max-width: $itemSize;
        min-height: $itemSize;
        max-height: $itemSize;
        height: $itemSize;
        padding: 0;
        margin-top: 0;
        margin-right: 30px;
        &.active-item {
          //background-color: red;
        }
        &:last-child {
          margin-right: 0;
        }
        &.q-item--active {
          .q-item__section {
            display: grid;
            padding: 12px;
            place-items: center;
            .line {
              display: block;
              height: 20px;
              width: 32px;
              background-color: white;
              margin-top: 20px;
              border-radius: 4px;
            }
          }
        }
        .q-item__section {
          padding: 0;
          width: $itemSize;
          min-width: $itemSize;
          max-width: $itemSize;
          min-height: $itemSize;
          max-height: $itemSize;
          height: $itemSize;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          .active {
            //background-color: rgba(128, 117, 220, 0.34);
            //background-color: lighten($primary,34%);
            //border-radius: 8px;
          }
        }
      }
    }

    .active-route {
      background-color: rgba(128, 117, 220, 0.34);
      border-radius: 8px;

      .indicator {
        height: 6px;
        width: 6px;
        background-color: white;
        border-radius: 50%;
        margin: auto;
      }
    }
  }
}
</style>
