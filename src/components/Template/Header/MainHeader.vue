<template>
  <div class="header-inside col"
       :class="{'isHomePage': isHomePage}">
    <div class="user-top-menu"
         :class="{'isHomePage': isHomePage}">
      <div class="right-side">
        <q-toolbar>
          <q-btn class="lt-md q-mr-md"
                 icon="menu"
                 color="primary"
                 round
                 flat
                 text-color="gray"
                 dense
                 unelevated
                 @click="toggleLeftDrawer" />
          <q-btn flat
                 round
                 dense
                 class="top-menu-item top-menu-logo gt-sm"
                 :to="{name: 'Public.Home'}">
            <q-img src="/assets/images/web/user-top-menu-logo.png"
                   width="53" />
          </q-btn>
          <div class="gt-sm">
            <q-btn stretch
                   flat
                   label="اخبار و اطلاعیه ها"
                   :to="{ name: 'Public.Post.List.News' }"
                   class="top-menu-item" />
            <q-btn stretch
                   flat
                   label="راهنما"
                   :to="{ name: 'Public.Post.List.Guide' }"
                   class="top-menu-item" />
            <q-btn stretch
                   flat
                   label="آرشیو محتوا"
                   :to="{ name: 'Public.ContentCategoryParentParent.List' }"
                   class="top-menu-item" />
            <q-btn stretch
                   flat
                   label="Shop"
                   :to="{ name: 'Public.Shop' }"
                   class="top-menu-item" />
            <q-btn stretch
                   flat
                   label="فروشگاه"
                   class="top-menu-item">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item v-close-popup
                          href="https://formafzar.ir/form/unfv5"
                          target="_blank"
                          clickable>
                    <q-item-section>کتب سطح یک</q-item-section>
                  </q-item>
                  <q-item v-close-popup
                          href="https://formafzar.com/form/zmvhh"
                          target="_blank"
                          clickable>
                    <q-item-section>کتب سطح دو</q-item-section>
                  </q-item>
                  <q-item v-close-popup
                          href="https://formafzar.com/form/9949w"
                          target="_blank"
                          clickable>
                    <q-item-section>کتب سطح سه</q-item-section>
                  </q-item>
                  <q-item v-close-popup
                          href="https://formafzar.com/form/yk7z7"
                          target="_blank"
                          clickable>
                    <q-item-section>کتب سطح چهار</q-item-section>
                  </q-item>
                  <q-item v-close-popup
                          href="https://formafzar.com/form/qlif0"
                          target="_blank"
                          clickable>
                    <q-item-section>کتب سطح پنج</q-item-section>
                  </q-item>
                  <q-item v-close-popup
                          href="https://formafzar.com/form/q9abs"
                          target="_blank"
                          clickable>
                    <q-item-section>کتب جریان‌شناسی سطح یک</q-item-section>
                  </q-item>
                  <q-item v-close-popup
                          href="https://formafzar.com/form/xskmo"
                          target="_blank"
                          clickable>
                    <q-item-section>کتب جریان‌شناسی سطح دو</q-item-section>
                  </q-item>
                  <q-item v-close-popup
                          href="https://formafzar.com/form/p1y9a"
                          target="_blank"
                          clickable>
                    <q-item-section>کتاب تشکیلات بهشتی</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn stretch
                   flat
                   label="درباره ما"
                   :to="{ name: 'Public.AboutUs' }"
                   class="top-menu-item" />
            <q-btn stretch
                   flat
                   label="تماس با ما"
                   :to="{ name: 'Public.ContactUs' }"
                   class="top-menu-item" />
            <q-btn stretch
                   flat
                   label="سوالات متداول"
                   :to="{ name: 'Public.FAQ' }"
                   class="top-menu-item" />
          </div>
        </q-toolbar>
      </div>

      <q-btn flat
             round
             dense
             class="center-logo lt-md"
             :to="{name: 'Public.Home'}">
        <q-img src="/assets/images/web/homepage-first-section-logo.png" />
      </q-btn>

      <div class="left-side">
        <q-btn flat
               :to="{ name: 'Public.PostTopic.List' }"
               class="btn-cart">
          <q-icon name="search" />
        </q-btn>
        <q-btn v-if="isUserLogin"
               flat
               :to="{ name: 'Public.Cart' }"
               class="btn-cart">
          <q-badge>
            {{ cartItemCount }}
          </q-badge>
          <q-icon name="shopping_cart" />
        </q-btn>
        <q-btn v-if="user && user.id !== null"
               color="primary"
               @click="goToProperPanel">
          <svg id="_000000ff"
               data-name="#000000ff"
               xmlns="http://www.w3.org/2000/svg"
               width="19.995"
               height="19.995"
               viewBox="0 0 19.995 19.995">
            <path id="Path_29101"
                  data-name="Path 29101"
                  d="M5.87,0h8.253a6.009,6.009,0,0,1,5.509,3.949A6.133,6.133,0,0,1,20,5.873v8.214a6.011,6.011,0,0,1-4.645,5.752A6.293,6.293,0,0,1,14.124,20H5.873A6.008,6.008,0,0,1,0,14.085V5.872A6.012,6.012,0,0,1,5.87,0M5.526,1.356a4.673,4.673,0,0,0-4.195,4.66q0,4,0,8.005a4.676,4.676,0,0,0,4.684,4.643q4,0,8,0a4.675,4.675,0,0,0,4.645-4.644q0-4.024,0-8.047a4.673,4.673,0,0,0-3.974-4.589,8.038,8.038,0,0,0-1.257-.053H6.288A7.085,7.085,0,0,0,5.526,1.356Z"
                  fill="#fff" />
            <path id="Path_29102"
                  data-name="Path 29102"
                  d="M157.367,85.315a4,4,0,1,1-2.651,1.25,4,4,0,0,1,2.651-1.25m-.228,1.373a2.666,2.666,0,1,0,1.776.286A2.674,2.674,0,0,0,157.139,86.688Z"
                  transform="translate(-147.63 -81.975)"
                  fill="#fff" />
            <path id="Path_29103"
                  data-name="Path 29103"
                  d="M122.8,324.315c.815-.016,1.63,0,2.446-.007a5.976,5.976,0,0,1,4.042,1.606.67.67,0,0,1,.145.733.651.651,0,0,1-.749.385,1.129,1.129,0,0,1-.5-.325,4.66,4.66,0,0,0-2.94-1.081q-1.093,0-2.187,0a4.66,4.66,0,0,0-3.1,1.23.694.694,0,0,1-.528.214.668.668,0,0,1-.457-1.121A5.994,5.994,0,0,1,122.8,324.315Z"
                  transform="translate(-114.152 -311.642)"
                  fill="#fff" />
          </svg>
          <span class="btn-label">
            حساب کاربری
          </span>
          <q-menu v-if="canSeeAdminPanel"
                  fit>
            <q-list>
              <q-item v-close-popup
                      clickable
                      :to="{ name: 'UserPanel.Profile.UserInfo' }">
                <q-item-section>
                  پنل کاربری
                </q-item-section>
              </q-item>
              <q-item v-close-popup
                      clickable
                      :to="{ name: 'Admin' }">
                <q-item-section>
                  پنل ادمین
                </q-item-section>
              </q-item>
              <q-item v-close-popup
                      clickable
                      @click="logOut">
                <q-item-section>
                  خروج
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn v-else
               color="primary"
               :to="{name: 'Login'}">
          <span class="btn-label">
            ورود / ثبت نام
          </span>
          <svg id="Login"
               xmlns="http://www.w3.org/2000/svg"
               width="18.479"
               height="20"
               viewBox="0 0 18.479 20">
            <path id="Combined_Shape"
                  data-name="Combined Shape"
                  d="M9.157,0A4.429,4.429,0,0,0,4.733,4.424v.942a.75.75,0,0,0,1.5,0V4.424A2.928,2.928,0,0,1,9.157,1.5h4.885a2.939,2.939,0,0,1,2.936,2.937V15.575A2.929,2.929,0,0,1,14.053,18.5H9.169a2.938,2.938,0,0,1-2.935-2.934v-.932a.75.75,0,1,0-1.5,0v.932A4.44,4.44,0,0,0,9.169,20h4.884a4.431,4.431,0,0,0,4.425-4.425V4.436A4.442,4.442,0,0,0,14.042,0Zm.176,6.556a.75.75,0,0,0,0,1.06L10.975,9.25H.75a.75.75,0,1,0,0,1.5H10.976L9.334,12.385a.75.75,0,1,0,1.058,1.062l2.929-2.916a.747.747,0,0,0,0-1.062L10.393,6.554a.75.75,0,0,0-1.06,0Z"
                  transform="translate(18.479 20) rotate(180)"
                  fill="#fff" />
          </svg>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import { Basket } from 'src/models/Basket.js'
import { mapGetters, mapMutations } from 'vuex'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'templateHeader',
  data () {
    return {
      user: new User(),
      topMenuItems: [
      ]
    }
  },
  computed: {
    cartItemCount () {
      return this.basket.items_info.list.length
    },
    basket: {
      get () {
        return this.$store.getters['Shop/basket']
      },
      set (newValue) {
        this.$store.commit('Shop/updateBasket', newValue)
      }
    },
    isUserLogin () {
      return this.user && this.user.id !== null
    },
    canSeeAdminPanel () {
      return this.user.isAdmin() || this.user.isSuperUser() || this.user.isEducationalDepartmentHead() || this.user.isFinancialDepartmentHead()
    },
    isAdminPage () {
      return this.$route.name && this.$route.name.includes('Admin.')
    },
    isProfilePage () {
      return this.$route.name && this.$route.name.includes('UserPanel.Profile.')
    },
    isHomePage () {
      return this.$route.name && this.$route.name === 'Public.Home'
    },
    ...mapGetters('AppLayout', [
      'breadcrumbs',
      'windowSize'
    ])
  },
  mounted () {
    this.loadAuthData()
    if (this.isUserLogin) {
      this.checkoutReview()
    }
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateLayoutLeftDrawerVisible'
    ]),
    checkoutReview () {
      this.basket.loading = true
      APIGateway.basket.checkoutReview()
        .then((basket) => {
          this.basket = new Basket(basket)
        })
        .finally(() => {
          this.basket.loading = false
        })
    },
    loadAuthData () {
      this.user = this.$store.getters['Auth/user']
    },
    goToProperPanel () {
      if (this.canSeeAdminPanel) {
        // this.$router.push({ name: 'Admin.User.Index' })
      } else {
        this.$router.push({ name: 'UserPanel.Profile.UserInfo' })
      }
    },
    goToHome () {
      this.$router.push({ name: 'Public.Home' })
    },
    goToAdminDashboard () {
      this.$router.push({ name: 'Admin.Content.Index' })
    },
    logOut () {
      this.$store.dispatch('Auth/logOut')
    },
    toggleLeftDrawer () {
      this.updateLayoutLeftDrawerVisible(true)
    },
    hasRoute (route) {
      if (!route) {
        return
      }
      return !!(route.name || route.path)
    },
    getRoute (route) {
      if (!this.hasRoute(route)) {
        return { name: null }
      }
      if (route.name) {
        return { name: route.name }
      } else if (route.path) {
        return { path: route.path }
      } else {
        return { name: null }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.drawer-btn {
  display: none;
  @media screen and (max-width: 1439px) {
    & {
      display: block;
    }
  }
  @media screen and (max-width: 599px) {
    & {
      margin-bottom: 10px;
    }
  }
}

.right-side {
  display: flex;
  align-items: center;
  .breadcrumbs {
    &:deep(> *) {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 31px;
      text-align: right;
      color: #23263B;

      div:first-child {
        font-size: 18px;
      }
    }
  }
  @media screen and (max-width: 1023px) {
    & {
      margin-left: 42px;
    }
  }
  @media screen and (max-width: 599px) {
    & {
      margin-left: 0;
    }
  }

}

.left-side {
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 1439px) {
    & {
      position: absolute;
      right: 0;
    }
  }
  @media screen and (max-width: 1023px) {
    .q-btn {
      width: 40px;
      padding: 0;
      .btn-label {
        display: none;
      }
    }
  }
  @media screen and (max-width: 599px) {
    & {
      right: 16px;
      margin-bottom: 10px;
    }
  }
}
</style>

<style scoped lang="scss">
.header-inside {
  height: 120px;
  background-color: #FBF4EA;
  color: #212121;
  //border-bottom: solid 1px #DFE1EC;
  &.isHomePage {
    background: transparent;
    @media only screen and (max-width: 1023px) {
      & {
        background-color: #FBF4EA;
      }
    }
  }
  .admin-top-menu {
    display: flex;
    flex-flow: row;
    height: 100%;
    .top-menu-items {
      width: calc( 100% - 240px );
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      .q-btn {
        height: 40px;
        svg {
          margin-right: 10px;
        }
      }
      .right-side {
        display: flex;
        flex-flow: row;
        align-items: center;
        padding-left: 50px;
      }
      .left-side {
        display: flex;
        flex-flow: row;
        align-items: center;
        padding-right: 50px;
      }
    }
    .logo {
      width: 240px;
      height: 100%;
      background: #FBF4EA;
      border-right: solid 1px #DFE1EC;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo-image {
        width: 106px;
        height: auto;
      }
    }
  }
  .user-top-menu {
    padding-top: 30px;
    margin-right: 100px;
    margin-left: 100px;
    margin-bottom: 22px;

    display: flex;
    flex-flow: row;
    justify-content: space-between;
    .q-btn {
      height: 40px;
      svg {
        margin-right: 10px;
        margin-left: 10px;
      }
    }
    .right-side {
      display: flex;
      flex-flow: row;
      align-items: center;
      .q-toolbar {
        min-height: 68px;
        .q-btn {
          align-self: center;
        }
      }
    }

    .center-logo {
      $width: 100px;
      $height: 55px;
      position: absolute;
      width: $width;
      height: 100%;
      top: 0;
      left: calc( 50% - (#{$width} / 2));
    }

    .left-side {
      display: flex;
      flex-flow: row;
      align-items: center;
      padding-right: 50px;
      @media only screen and (max-width: 1023px) {
        & {
          height: 100%;
        }
      }
      @media only screen and (max-width: 599px) {
        & {
          padding-right: 0;
        }
      }
    }

    &.isHomePage {
      .q-toolbar {
        .top-menu-item {
          color: white;
        }
      }
    }

    @media only screen and (max-width: 1500px) {
      & {
        margin-right: 10px;
        margin-left: 10px;
      }
    }
    @media only screen and (max-width: 1023px) {
      & {
        padding-top: 0;
        margin-bottom: 0;
      }
    }
  }
  @media only screen and (max-width: 1023px) {
    & {
      height: 70px;
    }
  }
}

.top-menu-items {
  border-radius: 10px;
  @media only screen and (max-width: 1439px) {
    & {
      display: none !important;
    }
  }
  @media only screen and (max-width: 500px) {
    .q-btn__content {
      margin: 4px;
      font-size: 0.7rem;
    }
  }
  @media only screen and (max-width: 400px) {
    .q-btn__content {
      margin: 3px;
      font-size: 0.6rem;
    }
  }
}

.breadcrumbs {
  .q-breadcrumbs__separator {
    .q-icon {
      font-size: 22px;
    }
  }
}

.drawer-btn {
  .q-btn {
    flex-direction: row !important;

    &.toolbar-button {
      margin-left: 0 !important;
    }
  }
}

.q-btn {
  &.toolbar-button {
    margin-left: 12px;
    height: 48px;
    width: 48px;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 16px;
    border: solid 1px #c5c5c5;
  }
}

.left-side {
  .q-btn {
    &.toolbar-button {
      .q-btn__content {
        .q-btn-dropdown__arrow {
          display: none !important;
        }
      }
    }
    &.btn-cart {
      background: white;
      color: $primary;
      margin-right: 20px;
      .q-badge {
        background: #FBF4EA;
        color: $primary;
      }
    }
  }
}
</style>
