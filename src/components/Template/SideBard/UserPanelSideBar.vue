<template>
  <div class="side-menu-main-layout">
    <div v-if="false"
         class="side-logo">
      <div class="logo-image" />
    </div>
    <q-list class="side-menu-list"
            padding>
      <q-input v-if="false"
               v-model="searchText"
               dense
               standout="bg-deep-purple-5 text-white"
               placeholder="جست و جو"
               @update:model-value ="search(userProfileMenuItems)">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <menu-item :menu="userProfileMenuItems" />
    </q-list>
    <div v-if="false"
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
</template>

<script>
import { User } from 'src/models/User.js'
import menuItem from 'src/components/Menu/SideMenu/MenuItem.vue'

export default {
  name: 'SideMenu-dashboard',
  components: { menuItem },
  data () {
    return {
      user: new User(),
      clickedItem: null,
      searchText: '',

      userProfileMenuItems: [
        {
          title: 'پیشخوان',
          routeName: 'Public.AllClassrooms',
          scrollTo: '#introSection',
          show: true,
          active: false
        },
        {
          title: 'مدیریت حلقه ها',
          // routeName: 'Admin.User.Index',
          scrollTo: '#introSection',
          show: true,
          active: false
        },
        {
          title: 'دوره های آموزشی',
          routeName: null,
          show: true,
          open: false,
          active: false,
          children: [
            {
              title: 'دوره های من',
              routeName: 'UserPanel.Profile.AllClassrooms',
              show: true,
              active: false
            },
            {
              title: 'کارنامه',
              scrollTo: '#introSection',
              // routeName: 'Admin.User.Index',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'درخواست ها',
          // routeName: 'Admin.User.Index',
          scrollTo: '#introSection',
          show: true,
          active: false
        },
        {
          title: 'بخش مالی',
          routeName: null,
          show: true,
          open: false,
          active: false,
          children: [
            {
              title: 'صورتحساب ها',
              scrollTo: '#introSection',
              routeName: 'UserPanel.Invoice.List',
              show: true,
              active: false
            },
            {
              title: 'کیف پول الکترونیک',
              routeName: 'UserPanel.Wallet',
              show: true,
              active: false
            }
          ]
        }
      ],

      titlesList: []
    }
  },
  computed: {
    isAdminRoute () {
      return this.$route.name && this.$route.name.includes('Admin.')
    },
    isProfilePage () {
      return this.$route.name && this.$route.name.includes('UserPanel.Profile.')
    }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData () {
      this.user = this.$store.getters['Auth/user']
    },
    loadUserItems () {
      if (this.user.isSuperUser()) {
        this.titlesList.unshift(...[
          {
            title: 'کاربران',
            routeName: 'Admin.User.Index',
            show: true,
            active: false
          },
          {
            title: 'سامانه آموزشی',
            routeName: null,
            show: true,
            open: false,
            active: false,
            children: [
              {
                title: 'دسته بندی ها',
                routeName: 'Admin.Category.Index',
                show: true,
                active: false
              },
              {
                title: 'دوره های آموزشی',
                routeName: 'Admin.Classroom.Index',
                show: true,
                active: false
              }
            ]
          }
        ])
      }
    },
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
  border-radius: 0;
  margin: 30px 0 0 0;
  overflow-y: auto;

  .side-logo {
    display: flex;
    height: 167px;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1919px) {
      height: 136px;
    }
    @media screen and (max-width: 1439px) {
      height: 100px;
    }
    @media screen and (max-width: 599px) {
      height: 110px;
    }

    .logo-image {
      width: 140px;
      height: 95px;
      @media screen and (max-width: 1919px) {
        height: 76px;
      }
      @media screen and (max-width: 1439px) {
        width: 100px;
        height: 50px;
      }

      .q-img__container {
        width: 140px;
        height: 95px;
        @media screen and (max-width: 1919px) {
          height: 76px;
        }
        @media screen and (max-width: 1439px) {
          width: 100px;
          height: 50px;
        }
      }
    }
  }

  .q-list {
    padding: 0;
    width: 100%;

    &.side-menu-list {
      margin: 0;

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

        &.item-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          padding: 0 14px 0 10px;
          border-radius: 14px;

          &.alone-item {
            height: 40px;

            &.active-route {
              .indicator {
                height: 8px;
                width: 8px;
                background-color: white;
                border-radius: 50%;
                margin: auto;
              }
            }
          }

          .section-title {
            height: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;

            .title-icon {
              margin-right: 12px;
            }

            .q-item__section--side {
              padding: 0;
            }
          }

          .list-section {
            display: flex;
            flex-direction: row;
            justify-content: right;

            .q-avatar {
              height: 22px;
              width: 22px;
            }
          }
        }
      }

      .side-expansion-list {
        &.top-expansion {
          margin-bottom: 10px;
        }

        .expansion-body {
          display: flex;
          margin-left: 8px;
        }

        .q-expansion-item__content {
          .vertical-separator {
            margin: 6px 9px 9px 9px;
            @media screen and (max-width: 599px) {
              margin: 0 10px 12px 10px;
            }
          }
        }

        .q-list {
          &.list-expansion {
            margin-bottom: 0;

            .item-list-expansion {
              height: 30px;
              margin: 5px;

              .item-list-expansion-title {
                justify-content: start;
              }
            }

            .top-expansion-separator {
              margin: 0 40px 5px 40px;
              @media screen and (max-width: 1439px) {
                margin: 0 30px 5px 30px;
              }
              @media screen and (max-width: 599px) {
                margin: 0 45px 5px 45px;
              }
            }

            .list-child-item {
              height: 30px;
              justify-content: right;
              margin-bottom: 8px;
              width: 157px;
              border-radius: 10px;
              padding: 0 14px;
              @media screen and (max-width: 1439px) {
                width: 148px;
              }
              @media screen and (max-width: 599px) {
                width: 160px;
                margin-bottom: 5px;
                padding: 0 10px 0 12px;
              }

              &:last-child {
                margin-bottom: 0;
              }

              .list-child-section {
                font-size: 14px !important;
                justify-content: center;
              }
            }
          }
        }
      }

      .active-route {
        background-color: rgb(91 122 95 / 8%);
        color: #616161;

        .indicator {
          height: 6px;
          width: 6px;
          background-color: white;
          border-radius: 50%;
          margin: auto;
        }
      }

    }

    .q-item__section--avatar {
      min-width: 0 !important;
    }

    a {
      text-decoration: none;
      color: #212121;
      padding: 0;
    }
  }

  .log-out {
    color: white;
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
    @media screen and (max-width: 1439px) {
      margin: 0 31px 33px 31px;
    }
    @media screen and (max-width: 599px) {
      margin: 0 30px 30px 30px;
      //padding: 0 0 0 10px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .q-avatar {
      height: 22px;
      width: 22px;
      margin-right: 12px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
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
