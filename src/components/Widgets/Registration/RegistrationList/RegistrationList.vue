<template>
  <div class="RegistrationList"
       :style="localOptions.style">
    <template v-if="isUserLogin">
      <q-banner class="q-mb-md">
        دوره های شما
      </q-banner>
      <q-linear-progress v-if="registrations.loading"
                         indeterminate />
      <template v-else>
        <div class="row q-col-gutter-md">
          <div v-for="registration in registrations.list"
               :key="registration.id"
               class="col-md-4">
            <classroom-item :classroom="registration.classroom_info" />
          </div>
        </div>
      </template>
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
      registrations: new RegistrationList()
    }
  },
  mounted() {
    this.getRegistrations()
  },
  methods: {
    getRegistrations () {
      this.registrations.loading = true
      APIGateway.registration.index({ per_page: 9999, owner: this.user.id })
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
