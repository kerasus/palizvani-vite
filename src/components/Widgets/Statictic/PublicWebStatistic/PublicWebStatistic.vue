<template>
  <div class="PublicWebStatistic">
    <div class="PublicWebStatistic-title">
      <div>
        <q-banner class="banner">
          آمار بنیاد
        </q-banner>
      </div>
    </div>
    <div class="PublicWebStatistic-boxes row">
      <div class="PublicWebStatistic-boxes row" />
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
// import ShamsiDate from 'src/assets/ShamsiDate.js'
// import { APIGateway } from 'src/api/APIGateway.js'
import { ClassroomList } from 'src/models/Classroom.js'
import { ClassroomRegistrationList } from 'src/models/ClassroomRegistration.js'

export default {
  name: 'PublicWebStatistic',
  data: () => ({
    loading: false,
    user: new User(),
    classroomsKey: Date.now(),
    userRegistrations: new ClassroomRegistrationList(),
    slide: 0,
    classrooms: new ClassroomList(),
    breakpoints: {
      // 1024 and up
      1024: {
        itemsToShow: 3,
        snapAlign: 'start'
      },
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center'
      },
      // 300px and up
      300: {
        itemsToShow: 1.5,
        snapAlign: 'center'
      }
    },
    maximizedToggle: true,
    dialog: false
  })
}
</script>

<style scoped lang="scss">
.PublicWebStatistic {
  padding: 60px 0;
  .PublicWebStatistic-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
  }
  :deep(.carousel__prev),
  :deep(.carousel__next) {
    width: 48px;
    height: 48px;
    background-color: #475F4A;
    border-radius: 8px;
    &.carousel__prev--in-active {
      background-color: #DEDEDE;
    }
    &:after {
    }
    svg {
      //display: none;
    }
  }
  :deep(.carousel__prev) {
    right: auto;
    left: 0;
    transform: translate(-100%, -50%);
  }
  :deep(.carousel__next) {
    left: auto;
    right: 0;
    transform: translate(100%, -50%);
  }
  .carousel__slide {
    padding: 0 12px;
    .PublicWebStatistic-item {
      width: 100%;
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
  }
}
</style>
