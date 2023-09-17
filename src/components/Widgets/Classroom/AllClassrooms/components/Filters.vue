<template>
  <q-card class="filter-card all-classroom-widget">
    <q-card-section class="filter-card-header filter-card-section">
      <div class="flex justify-between">
        <q-banner class="banner">
          فیلتر
        </q-banner>
        <q-btn flat
               @click="cancelFilter">
          <svg id="close_black_24dp"
               xmlns="http://www.w3.org/2000/svg"
               width="32"
               height="32"
               viewBox="0 0 32 32">
            <path id="Path_29089"
                  data-name="Path 29089"
                  d="M0,0H32V32H0Z"
                  fill="none" />
            <path id="Path_29090"
                  data-name="Path 29090"
                  d="M22.412,5.806a1.314,1.314,0,0,0-1.86,0L14.1,12.243l-6.45-6.45a1.315,1.315,0,1,0-1.86,1.86l6.45,6.45-6.45,6.45a1.315,1.315,0,0,0,1.86,1.86l6.45-6.45,6.45,6.45a1.315,1.315,0,0,0,1.86-1.86l-6.45-6.45,6.45-6.45A1.322,1.322,0,0,0,22.412,5.806Z"
                  transform="translate(1.897 1.897)"
                  fill="#ababab" />
          </svg>
        </q-btn>
      </div>
    </q-card-section>
    <q-card-section class="filter-card-filter-section filter-card-section">
      <div class="row q-col-gutter-md">
        <div class="col-md-3">
          <div>گروه آموزشی</div>
          <select-control v-model:value="localFilters.category"
                          :options="categories.list"
                          :disable="categories.loading"
                          :loading="categories.loading"
                          optionValue="id"
                          optionLabel="title"
                          @update:model-value="onChangeCategory" />
        </div>
        <div class="col-md-3">
          <div>درس</div>
          <select-control v-model:value="localFilters.unit"
                          :options="units.list"
                          :disable="units.loading"
                          :loading="units.loading"
                          optionValue="id"
                          optionLabel="title" />
        </div>
        <div class="col-md-3">
          <div>وضعیت دوره</div>
          <select-control v-model:value="localFilters.classroomStatus"
                          :options="classroomStatuses"
                          optionValue="value"
                          optionLabel="label" />
        </div>
        <div class="col-md-3">
          <div>نوع برگزاری</div>
          <select-control v-model:value="localFilters.classroomHoldingTypes"
                          :options="classroomHoldingTypes"
                          optionValue="value"
                          optionLabel="label" />
        </div>
        <div class="col-md-3">
          <div>استاد</div>
          <select-control v-model:value="localFilters.professor"
                          :options="professors"
                          :disable="professorsLoading"
                          :loading="professorsLoading"
                          optionValue="value"
                          optionLabel="label" />
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="filter-card-filter-actions filter-card-section">
      <q-btn color="primary"
             outline
             label="لغو فیلتر"
             @click="cancelFilter" />
      <q-btn color="primary"
             label="فیلتر کردن"
             @click="doFilter" />
    </q-card-actions>
  </q-card>
</template>

<script>
import Enums from 'assets/Enums/Enums.js'
import { UnitList } from 'src/models/Unit.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import { UnitCategoryList } from 'src/models/UnitCategory.js'
import SelectControl from 'src/components/Control/Select.vue'

export default {
  name: 'Filters',
  components: { SelectControl },
  mixins: [mixinAuth],
  props: {
    filters: {
      type: Object,
      default () {
        return {
          category: null,
          unit: null,
          classroomStatus: null,
          classroomHoldingTypes: null,
          professor: null
        }
      }
    },
    professors: {
      type: Array,
      default: () => []
    },
    categories: {
      type: UnitCategoryList,
      default: new UnitCategoryList()
    },
    units: {
      type: UnitList,
      default: new UnitList()
    }
  },
  emits: ['doFilter', 'cancelFilter', 'onChangeCategory', 'update:filters'],
  data () {
    return {
      professorsLoading: false
    }
  },
  computed: {
    localFilters: {
      get () {
        return this.filters
      },
      set (neValue) {
        this.$emit('update:filters', neValue)
      }
    },
    classroomStatuses () {
      return Enums.classroomStatuses
    },
    classroomHoldingTypes () {
      return Enums.classroomHoldingTypes
    }
  },
  methods: {
    cancelFilter () {
      this.$emit('cancelFilter')
    },
    doFilter () {
      this.$emit('doFilter')
    },
    onChangeCategory () {
      this.$emit('onChangeCategory')
    }
  }
}
</script>

<style scoped lang="scss">
.filter-card {
  :deep(.q-field) {
    &.q-select {
      .q-field__inner {
        .q-field__control {
          .q-field__control-container {
            padding-top: 6px;
          }
        }
      }
    }
  }
}
</style>
