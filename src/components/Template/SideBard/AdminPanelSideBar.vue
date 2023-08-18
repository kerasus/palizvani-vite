<template>
  <div class="AdminPanelSideBar">
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
      <menu-item :menu="adminMenuItems" />
    </q-list>
  </div>
</template>

<script>
import menuItem from 'src/components/Menu/SideMenu/MenuItem.vue'

export default {
  name: 'AdminPanelSideBar',
  components: { menuItem },
  data () {
    return {
      adminMenuItems: [
        {
          title: 'کاربران',
          routeName: 'Admin.User.Index',
          icon: 'groups',
          show: true,
          active: false
        },
        {
          title: 'مدیریت آموزش',
          icon: 'import_contacts',
          routeName: null,
          show: true,
          open: true,
          active: false,
          children: [
            {
              title: 'درس ها و چارت آموزشی',
              routeName: 'Admin.Category.Index',
              show: true,
              active: false
            },
            {
              title: 'کلاس های آموزشی',
              routeName: 'Admin.Classroom.Index',
              show: true,
              active: false
            },
            {
              title: 'درخواست ها',
              routeName: 'Admin.Classroom.Ticket',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'حلقه های مباحثاتی',
          icon: 'diversity_2',
          routeName: null,
          show: true,
          open: true,
          active: false,
          children: [
            {
              title: 'دسته بندی ها',
              routeName: 'Admin.Category.DiscussionCircles.Index',
              show: true,
              active: false
            },
            {
              title: 'حلقه های مباحثاتی',
              routeName: 'Admin.Classroom.DiscussionCircles.Index',
              show: true,
              active: false
            },
            {
              title: 'درخواست ها',
              routeName: 'Admin.Classroom.DiscussionCircles.Ticket',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'محتوا',
          icon: 'live_tv',
          routeName: null,
          show: true,
          open: true,
          active: false,
          children: [
            {
              title: 'دسته بندی ها',
              routeName: 'Admin.ContentCategory.List',
              show: true,
              active: false
            },
            {
              title: 'لیست محتوا ها',
              routeName: 'Admin.Content.List',
              show: true,
              active: false
            },
            {
              title: 'درخواست ها',
              routeName: 'Admin.Content.Ticket',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'مدیریت مالی',
          icon: 'payments',
          routeName: null,
          show: true,
          open: true,
          active: false,
          children: [
            {
              title: 'صورتحساب ها',
              routeName: 'Admin.Invoice.List',
              show: true,
              active: false
            },
            {
              title: 'درخواست ها',
              routeName: 'Admin.Invoice.Ticket.List',
              show: true,
              active: false
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.AdminPanelSideBar {
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
