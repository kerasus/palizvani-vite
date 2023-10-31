<template>
  <div class="RegistrationList"
       :style="localOptions.style">
    <template v-if="isUserLogin">
      <q-banner class="q-mb-md">
        {{ mainTitle }}
      </q-banner>

      <template v-if="!registrations.loading && registrations.list.length > 0">
        <div class="row q-col-gutter-md">
          <div v-for="registration in registrations.list"
               :key="registration.id"
               class="col-md-4">
            <classroom-item :classroom="registration.classroom_info" />
          </div>
        </div>
      </template>
      <div v-else-if="!registrations.loading && registrations.list.length === 0">
        {{ notFoundMessage }}
      </div>
      <div v-else-if="registrations.loading">
        <q-linear-progress v-if="registrations.loading"
                           indeterminate />
        کمی صبر کنید ...
      </div>
    </template>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'
import ClassroomItem from 'src/components/ClassroomItem.vue'
import { RegistrationList } from 'src/models/Registration.js'

export default {
  name: 'RegistrationList',
  components: { ClassroomItem },
  mixins: [mixinWidget, mixinAuth],
  data: () => {
    return {
      defaultOptions: {
        classroomType: 'TRAINING'
      },
      registrations: new RegistrationList()
    }
  },
  computed: {
    mainTitle () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'دوره های شما'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'رویداد های شما'
      }
      return 'دوره های شما'
    },
    notFoundMessage () {
      if (this.localOptions.classroomType === 'TRAINING') {
        return 'دوره ای یافت نشد.'
      }
      if (this.localOptions.classroomType === 'EVENT') {
        return 'رویدادی یافت نشد.'
      }
      return 'دوره ای یافت نشد.'
    }
  },
  mounted() {
    this.getRegistrations()
  },
  methods: {
    getRegistrations () {
      this.registrations.loading = true
      APIGateway.registration.index({
        per_page: 9999,
        owner: this.user.id,
        classroom__unit__category__type: this.localOptions.classroomType
      })
        .then((registrations) => {
          this.registrations = new RegistrationList(registrations.list)
          this.registrations.loading = false
        })
        .catch(() => {
          this.registrations.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.RegistrationList {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
  }
  :deep(.list) {
    .quasar-crud-index-table {
      padding: 0;
      .q-table__container {
        background-color: transparent;
        box-shadow: none;
        border: none;
        .q-table__top {
          display: none;
        }
      }
    }
  }
}
</style>
