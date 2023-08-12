<template>
  <div class="UserPanelSideBar">
    <div class="logo lt-md">
      <q-btn flat
             round
             dense
             class="btn-logo"
             :to="{name: 'Public.Home'}">
        <q-img src="/assets/images/web/homepage-first-section-logo.png" />
      </q-btn>
    </div>
    <q-list class="side-menu-list"
            padding>
      <menu-item :menu="userProfileMenuItems" />
    </q-list>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import menuItem from 'src/components/Menu/SideMenu/MenuItem.vue'

export default {
  name: 'UserPanelSideBar',
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
          title: 'دوره های آموزشی',
          routeName: null,
          show: true,
          open: true,
          active: false,
          children: [
            {
              title: 'دوره های من',
              routeName: 'UserPanel.Profile.AllClassrooms',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'درخواست ها',
          routeName: 'UserPanel.Ticket.List',
          show: true,
          active: false
        },
        {
          title: 'بخش مالی',
          routeName: null,
          show: true,
          open: true,
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
.UserPanelSideBar {
  .logo {
    padding: 10px 60px;
    .q-btn {
      width: 100%;
    }
  }
  .side-menu-list {

  }
}
</style>
