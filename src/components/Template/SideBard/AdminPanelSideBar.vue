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
      <menu-item :menu="adminMenuItems"
                 :user="user" />
    </q-list>
  </div>
</template>

<script>
import { mixinAuthData } from 'src/mixin/Mixins.js'
import menuItem from 'src/components/Menu/SideMenu/MenuItem.vue'

export default {
  name: 'AdminPanelSideBar',
  components: { menuItem },
  mixins: [mixinAuthData],
  data () {
    return {
      adminMenuItems: [
        {
          title: 'کاربران',
          roles: ['superuser'],
          routeName: 'Admin.User.Index',
          icon: 'groups',
          show: true,
          active: false
        },
        {
          title: 'دوره های آموزشی',
          roles: ['superuser', 'educational_department_head'],
          icon: 'import_contacts',
          routeName: null,
          show: true,
          open: true,
          active: false,
          children: [
            {
              title: 'درس ها و چارت آموزشی',
              roles: ['superuser', 'educational_department_head'],
              routeName: 'Admin.Category.Index',
              show: true,
              active: false
            },
            {
              title: 'دوره های آموزشی',
              roles: ['superuser', 'educational_department_head'],
              routeName: 'Admin.Classroom.Index',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'حلقه های مباحثاتی',
          roles: ['superuser', 'educational_department_head'],
          icon: 'diversity_2',
          routeName: null,
          show: true,
          open: true,
          active: false,
          children: [
            {
              title: 'درس ها و چارت آموزشی',
              roles: ['superuser', 'educational_department_head'],
              routeName: 'Admin.Category.DiscussionCircles.Index',
              show: true,
              active: false
            },
            {
              title: 'حلقه های مباحثاتی',
              roles: ['superuser', 'educational_department_head'],
              routeName: 'Admin.Classroom.DiscussionCircles.Index',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'درخواست های آموزش',
          roles: ['superuser', 'educational_department_head'],
          routeName: 'Admin.Ticket.List.Educational',
          icon: 'local_activity',
          show: true,
          active: false
        },
        {
          title: 'دوره های من',
          roles: ['superuser', 'team_leader'],
          routeName: 'Admin.Leader.MyClassrooms.Index',
          icon: 'diversity_3',
          show: true,
          active: false
        },
        {
          title: 'محتوا',
          roles: ['superuser'],
          icon: 'live_tv',
          routeName: null,
          show: true,
          open: true,
          active: false,
          children: [
            {
              title: 'دسته بندی ها',
              roles: ['superuser'],
              routeName: 'Admin.ContentCategory.List',
              show: true,
              active: false
            },
            {
              title: 'لیست محتوا ها',
              roles: ['superuser'],
              routeName: 'Admin.Content.List',
              show: true,
              active: false
            },
            {
              title: 'درخواست ها',
              roles: ['superuser'],
              routeName: 'Admin.Content.Ticket',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'بلاگ',
          roles: ['superuser'],
          icon: 'rss_feed',
          routeName: null,
          show: true,
          open: true,
          active: false,
          children: [
            {
              title: 'دسته بندی ها',
              roles: ['superuser'],
              routeName: 'Admin.PostCategory.List',
              show: true,
              active: false
            },
            {
              title: 'لیست پست ها',
              roles: ['superuser'],
              routeName: 'Admin.Post.List',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'مدیریت مالی',
          roles: ['superuser', 'financial_department_head'],
          icon: 'payments',
          routeName: null,
          show: true,
          open: true,
          active: false,
          children: [
            {
              title: 'صورتحساب ها',
              roles: ['superuser', 'financial_department_head'],
              routeName: 'Admin.Invoice.List',
              show: true,
              active: false
            },
            {
              title: 'پرداخت ها',
              roles: ['superuser', 'financial_department_head'],
              routeName: 'Admin.Payment.List',
              show: true,
              active: false
            },
            {
              title: 'درخواست ها',
              roles: ['superuser', 'financial_department_head'],
              routeName: 'Admin.Invoice.Ticket.List',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'تمام درخواست ها',
          roles: ['superuser'],
          routeName: 'Admin.Ticket.List',
          icon: 'confirmation_number',
          show: true,
          active: false
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
