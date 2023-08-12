<template>
  <q-list class="side-menu-list"
          padding>
    <menu-item :menu="adminMenuItems" />
  </q-list>
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
          show: true,
          active: false
        },
        {
          title: 'مدیریت آموزش',
          icon: 'isax:book',
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
          title: 'محتوا',
          icon: 'isax:video',
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
          icon: 'isax:card',
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
