<template>
  <div class="drawer-inside">
    <div class="side-menu-main-layout">
      <div class="side-logo">
        <q-btn flat
               round
               dense
               class="btn-logo"
               :to="{name: 'Public.Home'}">
          <q-img src="/assets/images/web/homepage-first-section-logo.png" />
        </q-btn>
      </div>
      <div class="side-menu-body">
        <q-list class="side-menu-list"
                padding>
          <menu-item :items="menuItems"
                     :menu-items-color="'#5867dd'" />
        </q-list>
        <div v-if="isUserLogin"
             class="log-out"
             @click="logOut">
          <span>
            <q-avatar icon="isax:logout"
                      size="30"
                      dir="rtl" />
          </span>
          <span class="logout-text">خروج </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import menuItem from 'src/components/Menu/SideMenu/MenuItem.vue'

export default {
  name: 'MainSideBarTemplate',
  components: { menuItem },
  data () {
    return {
      user: new User(),
      isAdmin: false,
      isUserLogin: false,
      clickedItem: null,
      searchText: '',
      menuItems: [
        {
          title: 'اخبار و رویدادها',
          route: { name: 'Public.Post.List.News' },
          type: 'itemMenu',
          permission: 'all',
          show: true
        },
        {
          title: 'راهنما',
          route: { name: 'Public.Post.List.Guide' },
          type: 'itemMenu',
          permission: 'all',
          show: true
        },
        // {
        //   title: 'Shop',
        //   route: { name: 'Public.Shop' },
        //   type: 'itemMenu',
        //   permission: 'all',
        //   show: true
        // },
        {
          title: 'فروشگاه',
          type: 'simpleMenu',
          children: [
            {
              title: 'کتب سطح یک',
              externalLink: 'https://formafzar.com/form/iv9cq',
              show: true
            },
            {
              title: 'کتب سطح دو',
              externalLink: 'https://formafzar.com/form/zmvhh',
              show: true
            },
            {
              title: 'کتب سطح سه',
              externalLink: 'https://formafzar.com/form/9949w',
              show: true
            },
            {
              title: 'کتب سطح چهار',
              externalLink: 'https://formafzar.com/form/dttpf',
              show: true
            },
            {
              title: 'کتب سطح پنج',
              externalLink: 'https://formafzar.com/form/qlif0',
              show: true
            },
            {
              title: 'کتب جریان‌شناسی',
              externalLink: 'https://formafzar.com/form/ch1om',
              show: true
            },
            {
              title: 'کتب جریان‌شناسی سطح دو',
              externalLink: 'https://formafzar.com/form/xskmo',
              show: true
            },
            {
              title: 'کتاب تشکیلات بهشتی',
              externalLink: 'https://formafzar.com/form/j3x1d',
              show: true
            }
          ],
          show: false,
          mobileMode: true
        },
        {
          title: 'درباره ما',
          route: { name: 'Public.AboutUs' },
          type: 'itemMenu',
          permission: 'all',
          show: true
        },
        {
          title: 'تماس با ما',
          route: { name: 'Public.ContactUs' },
          type: 'itemMenu',
          permission: 'all',
          show: true
        },
        {
          title: 'سوالات متداول',
          route: { name: 'Public.FAQ' },
          type: 'itemMenu',
          permission: 'all',
          show: true
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.loadAuthData()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    handleResize() {
      const windowWidth = window.innerWidth
      this.menuItems.forEach(item => {
        if (item.mobileMode) {
          item.show = windowWidth < 1024
        }
      })
    },
    // updateMenuItems () {
    //   if (!this.isUserLogin) {
    //     this.titlesList.splice(0, 1)
    //   }
    // },
    search (list, parentContain = false) {
      if (!list || list.length === 0) {
        return false
      }
      if (parentContain) {
        return true
      }
      let flag = false
      list.forEach(item => {
        const contain = item.title.includes(this.searchText)
        if (this.search(item.children, contain) || contain) {
          flag = true
          item.show = true
          item.open = true
        } else {
          item.open = false
          item.show = false
        }
      })
      return flag
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu-main-layout {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .side-logo {
    padding: 20px 90px;
    .btn-logo {
      width: 100%;
    }
  }
  .side-menu-body {
    display: grid;
    grid-template-rows: auto;
    .q-list {
      padding: 0;
      &.side-menu-list {
        margin: 0 24px 109px 24px;

        .top-separator {
          margin: 0 40px 32px 40px;
          @media screen and (max-width: 1919px) {
            margin: 0 30px 25px 30px;
          }
          @media screen and (max-width: 1439px) {
            margin: 0 45px 22px 45px;
          }
        }

        .q-item {
          padding: 0;
          min-height: 0;
        }
        .search-input {
          margin-bottom: 30px;
        }
        @media screen and (max-width: 1919px) {
           & {
             margin: 0 24px 34px 24px;
           }
        }
        @media screen and (max-width: 1439px) {
          & {
            margin: 0 21px 26px 21px;
          }
        }
        @media screen and (max-width: 599px) {
          & {
            margin: 0 18px 8px 18px;
          }
        }
      }
    }
    .log-out {
      align-self: end;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      height: 40px !important;
      //width: 232px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      padding: 0 14px 0 10px;
      margin: 0 0 36px 27px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      .q-avatar {
        height: 22px;
        width: 22px;
        margin-right: 12px;
        transform: matrix(-1, 0, 0, 1, 0, 0);
      }
      @media screen and (max-width: 1439px) {
        & {
          margin: 0 31px 33px 31px;
        }
      }
      @media screen and (max-width: 599px) {
        & {
          margin: 0 30px 30px 30px;
          //padding: 0 0 0 10px;
        }
      }
    }
  }
  .log-out {
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    height: 40px !important;
    //width: 232px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 0 14px 0 10px;
    margin: 0 0 36px 27px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .q-avatar {
      height: 22px;
      width: 22px;
      margin-right: 12px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
    @media screen and (max-width: 1439px) {
      & {
        margin: 0 31px 33px 31px;
      }
    }
    @media screen and (max-width: 599px) {
      & {
        margin: 0 30px 30px 30px;
        //padding: 0 0 0 10px;
      }
    }
  }
  &:deep(.side-menu-main-layout) {
    .q-expansion-item__container {
      .q-item {
        display: flex;
        padding: 0 10px !important;
      }
      .q-icon {
        font-size: 21px;
      }
    }
  }
}
</style>
