<template>
  <div class="header-inside col">
    <div v-if="isAdminPage || isProfilePage"
         class="admin-top-menu">
      <div class="logo">
        <router-link :to="{name: 'Public.Home'}">
          <q-img class="logo-image"
                 src="/assets/images/admin/layout/admin-logo.png" />
        </router-link>
      </div>
      <div class="top-menu-items">
        <div class="right-side">
          <q-btn flat
                 :to="{name: 'Public.Home'}">
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="20.5"
                 height="21.505"
                 viewBox="0 0 20.5 21.505">
              <g id="Home"
                 transform="translate(0 0)">
                <path id="Fill_1"
                      data-name="Fill 1"
                      d="M16.277,21.506H14.353A1.973,1.973,0,0,1,12.4,19.536V16.46a.677.677,0,0,0-.684-.669H8.831a.675.675,0,0,0-.674.669v3.066a.742.742,0,0,1-.031.215,1.983,1.983,0,0,1-1.979,1.764H4.223A4.211,4.211,0,0,1,0,17.317V8.6A3.158,3.158,0,0,1,1.259,6.1L7.794.855a3.913,3.913,0,0,1,4.88,0L19.256,6.1A3.154,3.154,0,0,1,20.5,8.582v8.734A4.211,4.211,0,0,1,16.277,21.506ZM8.826,14.291h2.891A2.179,2.179,0,0,1,13.9,16.46v3.076a.472.472,0,0,0,.47.469h1.906A2.709,2.709,0,0,0,19,17.317V8.593a1.672,1.672,0,0,0-.667-1.309L11.74,2.026a2.416,2.416,0,0,0-3.01,0L2.181,7.282A1.684,1.684,0,0,0,1.5,8.61v8.707a2.709,2.709,0,0,0,2.723,2.688H6.147a.486.486,0,0,0,.491-.479.766.766,0,0,1,.019-.171v-2.9A2.182,2.182,0,0,1,8.826,14.291Z"
                      transform="translate(0 0)"
                      fill="#aaa095" />
              </g>
            </svg>
            صفحه اصلی
          </q-btn>
        </div>
        <div class="left-side">
          <q-btn flat>
            <svg id="_000000ff"
                 data-name="#000000ff"
                 xmlns="http://www.w3.org/2000/svg"
                 width="30"
                 height="30"
                 viewBox="0 0 30 30">
              <path id="Path_29101"
                    data-name="Path 29101"
                    d="M8.807,0H21.19a9.015,9.015,0,0,1,8.266,5.926A9.2,9.2,0,0,1,30,8.811V21.135a9.019,9.019,0,0,1-6.97,8.631A9.442,9.442,0,0,1,21.19,30H8.811A9.013,9.013,0,0,1,0,21.133V8.81A9.021,9.021,0,0,1,8.807,0M8.291,2.034A7.012,7.012,0,0,0,2,9.025q0,6.006,0,12.011A7.016,7.016,0,0,0,9.026,28q6,0,12.007,0A7.014,7.014,0,0,0,28,21.035Q28,15,28,8.961a7.012,7.012,0,0,0-5.962-6.885A12.06,12.06,0,0,0,20.154,2H9.434A10.63,10.63,0,0,0,8.291,2.034Z"
                    fill="#aaa095" />
              <path id="Path_29102"
                    data-name="Path 29102"
                    d="M159.237,85.32A6,6,0,1,1,155.26,87.2a6.006,6.006,0,0,1,3.977-1.876m-.343,2.06a4,4,0,1,0,2.664.429A4.011,4.011,0,0,0,158.895,87.38Z"
                    transform="translate(-144.628 -80.308)"
                    fill="#aaa095" />
              <path id="Path_29103"
                    data-name="Path 29103"
                    d="M124.8,324.32c1.223-.023,2.446-.006,3.669-.01a8.967,8.967,0,0,1,6.065,2.409,1,1,0,0,1,.218,1.1.976.976,0,0,1-1.124.578,1.694,1.694,0,0,1-.749-.488,6.993,6.993,0,0,0-4.412-1.622q-1.64,0-3.281,0a6.992,6.992,0,0,0-4.654,1.845,1.041,1.041,0,0,1-.792.32,1,1,0,0,1-.685-1.682A8.994,8.994,0,0,1,124.8,324.32Z"
                    transform="translate(-111.831 -305.305)"
                    fill="#aaa095" />
            </svg>
            {{ user.fullname() }}
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item v-if="user.canSeeUserProfilePanel()"
                        v-close-popup
                        clickable
                        :to="{name: 'UserPanel.Profile.UserInfo'}">
                  <q-item-section>پروفایل</q-item-section>
                </q-item>
                <q-item v-close-popup
                        clickable
                        @click="logOut">
                  <q-item-section>خروج</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </div>
    <div v-else
         class="user-top-menu"
         :class="{'isHomePage': isHomePage}">
      <div class="right-side">
        <q-toolbar>
          <q-btn flat
                 round
                 dense
                 class="top-menu-item top-menu-logo"
                 :to="{name: 'Public.Home'}">
            <q-img src="assets/images/web/user-top-menu-logo.png"
                   width="53" />
          </q-btn>
          <q-btn stretch
                 flat
                 label="اخبار و رویدادها"
                 class="top-menu-item" />
          <q-btn stretch
                 flat
                 label="سامانه آموزش"
                 class="top-menu-item" />
          <q-btn-dropdown stretch
                          flat
                          label="آرشیو محتوایی"
                          class="top-menu-item">
            <q-list>
              <q-item-label header>عنوان یک</q-item-label>
              <q-item v-for="n in 3"
                      :key="`x.${n}`"
                      v-close-popup
                      clickable
                      tabindex="0">
                <q-item-section>
                  <q-item-label>زیر عنوان</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset
                           spaced />
              <q-item-label header>عنوان دو</q-item-label>
              <q-item v-for="n in 3"
                      :key="`y.${n}`"
                      v-close-popup
                      clickable
                      tabindex="0">
                <q-item-section>
                  <q-item-label>زیر عنوان</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn stretch
                 flat
                 label="فروشگاه"
                 class="top-menu-item" />
          <q-btn stretch
                 flat
                 label="پخش زنده"
                 class="top-menu-item" />
          <q-btn stretch
                 flat
                 label="درباره ما"
                 class="top-menu-item" />
          <q-btn stretch
                 flat
                 label="تماس با ما"
                 class="top-menu-item" />
        </q-toolbar>
      </div>
      <div class="left-side">
        <q-btn v-if="user && user.id !== null"
               color="primary"
               :to="{name: 'UserPanel.Profile.UserInfo'}">
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
          حساب کاربری
        </q-btn>
        <q-btn v-else
               color="primary"
               :to="{name: 'Login'}">
          ورود / ثبت نام
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'templateHeader',
  data () {
    return {
      topMenuItems: [
        // {
        //   title: 'معرفی پروژه',
        //   scrollTo: '#introSection',
        //   routeName: 'aaaaaaaaaaaa'
        // },
        // {
        //   title: 'مجامع',
        //   scrollTo: '#majameSection',
        //   routeName: 'aaaaaaaaaaaa'
        // },
        // {
        //   title: 'مشاورین حقوقی',
        //   scrollTo: '#moshaverinSection',
        //   routeName: 'aaaaaaaaaaaa'
        // },
        // {
        //   title: 'تصاویر',
        //   scrollTo: '#gallerySection',
        //   routeName: 'aaaaaaaaaaaa'
        // },
        // {
        //   title: 'اخبار و رویدادها',
        //   scrollTo: '#newsSection',
        //   routeName: 'aaaaaaaaaaaa'
        // },
        // {
        //   title: 'ارتباط با ما',
        //   scrollTo: '#feedback',
        //   routeName: 'aaaaaaaaaaaa'
        // }
      ]
    }
  },
  computed: {
    isAdminPage () {
      return this.$route.name && this.$route.name.includes('Admin.')
    },
    isProfilePage () {
      return this.$route.name && this.$route.name.includes('UserPanel.Profile.')
    },
    isHomePage () {
      return this.$route.name && this.$route.name === 'Public.Home'
    },
    user () {
      return this.$store.getters['Auth/user']
    },
    ...mapGetters('AppLayout', [
      'breadcrumbs',
      'windowSize'
    ])
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateLayoutLeftDrawerVisible'
    ]),
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
    display: block;
  }
  @media screen and (max-width: 599px) {
    margin-bottom: 10px;
  }
}

.right-side {
  display: flex;
  align-items: center;
  @media screen and (max-width: 1439px) {
    margin-left: 78px;
  }
  @media screen and (max-width: 1023px) {
    margin-left: 42px;
  }
  @media screen and (max-width: 599px) {
    margin-left: 0;
  }

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
}

.left-side {
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 1439px) {
    position: absolute;
    right: 30px;
  }
  @media screen and (max-width: 599px) {
    right: 16px;
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
.header-inside {
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
    margin-top: 30px;
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
    .left-side {
      display: flex;
      flex-flow: row;
      align-items: center;
      padding-right: 50px;
    }

    &.isHomePage {
      .q-toolbar {
        .top-menu-item {
          color: white;
        }
      }
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
  }
}
</style>
