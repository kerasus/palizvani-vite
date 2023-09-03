<template>
  <div class="all-classroom">
    <div class="all-classroom-title">
      <div>
        <q-banner class="banner">
          دوره های آموزشی
        </q-banner>
      </div>
      <div class="all-classroom-filter">
        <q-btn outline
               color="primary"
               class="btn-filter"
               @click="openFilterDialog">
          فیلتر
          <svg xmlns="http://www.w3.org/2000/svg"
               width="19.5"
               height="19.501"
               viewBox="0 0 19.5 19.501"
               class="q-ml-sm">
            <g id="Filter_2"
               data-name="Filter 2"
               transform="translate(0 0)">
              <path id="Fill_1"
                    data-name="Fill 1"
                    d="M8.146,19.5A1.151,1.151,0,0,1,7,18.346V13.774a4.39,4.39,0,0,0-1.194-3.022.717.717,0,0,1-.066-.062L.893,5.536A3.283,3.283,0,0,1,0,3.277V2.341A2.331,2.331,0,0,1,2.315,0H17.186A2.33,2.33,0,0,1,19.5,2.341v.936a3.294,3.294,0,0,1-.891,2.258l-4.847,5.154a4.39,4.39,0,0,0-1.242,3.073v2.287a2.058,2.058,0,0,1-1.066,1.808l-2.761,1.5A1.147,1.147,0,0,1,8.146,19.5ZM2.315,1.5a.829.829,0,0,0-.815.841v.936a1.785,1.785,0,0,0,.485,1.23L6.773,9.6a.648.648,0,0,1,.051.049A5.874,5.874,0,0,1,8.5,13.774v3.984l2.236-1.218a.557.557,0,0,0,.284-.491V13.762a5.859,5.859,0,0,1,1.659-4.109l4.837-5.145A1.789,1.789,0,0,0,18,3.277V2.341a.828.828,0,0,0-.814-.841Z"
                    transform="translate(0 0)"
                    fill="#475f4a" />
            </g>
          </svg>
        </q-btn>
        <q-input filled
                 label="جستجوی دوره آموزشی "
                 class="input-filter">
          <template v-slot:append>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="20.265"
                 height="20.722"
                 viewBox="0 0 20.265 20.722">
              <g id="Search"
                 transform="translate(0)">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M18.985,20.5l-3.169-3.16a9.755,9.755,0,1,1,1.1-1.026l3.132,3.124a.75.75,0,0,1-1.06,1.062ZM1.5,9.738A8.238,8.238,0,1,0,9.739,1.5,8.247,8.247,0,0,0,1.5,9.738Z"
                      transform="translate(0 0)"
                      fill="#475f4a" />
              </g>
            </svg>
          </template>
        </q-input>
      </div>
    </div>
    <div v-if="displayTitleFilters.length > 0"
         class="all-classroom-selected-filter">
      فیلترها:
      <q-chip v-for="(displayTitleFilter, displayTitleFilterIndex) in displayTitleFilters"
              :key="displayTitleFilterIndex"
              removable
              outline
              color="primary"
              text-color="white"
              @remove="clearFilterItem(displayTitleFilter.filterKey)">
        {{ displayTitleFilter.label }}
      </q-chip>
    </div>
    <div v-if="!classrooms.loading && classrooms.list.length > 0"
         :key="classroomsKey"
         class="classrooms row q-col-gutter-md">
      <div v-for="classroom in classrooms.list"
           :key="classroom.id"
           class="classroom-col col-md-4">
        <classroom-item :classroom="classroom" />
      </div>
    </div>
    <div v-else-if="!classrooms.loading && classrooms.list.length === 0">
      دوره ای یافت نشد.
    </div>
    <div v-else-if="classrooms.loading">
      کمی صبر کنید ...
    </div>
    <q-dialog v-model="filterDialog"
              :position="'top'"
              full-width>
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
              <select-control v-model:value="filter.category"
                              :options="categories.list"
                              :disable="categories.loading"
                              :loading="categories.loading"
                              optionValue="id"
                              optionLabel="title"
                              label="گروه آموزشی"
                              @update:model-value="getUnits" />
            </div>
            <div class="col-md-3">
              <select-control v-model:value="filter.unit"
                              :options="units.list"
                              :disable="units.loading"
                              :loading="units.loading"
                              optionValue="id"
                              optionLabel="title"
                              label="درس" />
            </div>
            <div class="col-md-3">
              <select-control v-model:value="filter.classroomStatus"
                              :options="classroomStatuses"
                              optionValue="value"
                              optionLabel="label"
                              label="وضعیت دوره" />
            </div>
            <div class="col-md-3">
              <select-control v-model:value="filter.classroomHoldingTypes"
                              :options="classroomHoldingTypes"
                              optionValue="value"
                              optionLabel="label"
                              label="نوع برگزاری" />
            </div>
            <div class="col-md-3">
              <select-control v-model:value="filter.professor"
                              :options="professors"
                              :disable="professorsLoading"
                              :loading="professorsLoading"
                              optionValue="value"
                              optionLabel="label"
                              label="استاد" />
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
    </q-dialog>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import { UnitList } from 'src/models/Unit.js'
import Enums from 'src/assets/Enums/Enums.js'
import API_ADDRESS from 'src/api/Addresses.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { ClassroomList } from 'src/models/Classroom.js'
import ClassroomItem from 'src/components/ClassroomItem.vue'
import SelectControl from 'src/components/Control/Select.vue'
import { UnitCategoryList } from 'src/models/UnitCategory.js'
import { ClassroomRegistrationList } from 'src/models/ClassroomRegistration.js'

export default {
  name: 'AllClassrooms',
  components: { SelectControl, ClassroomItem },
  data: () => ({
    loading: false,
    user: new User(),
    units: new UnitList(),
    classroomsKey: Date.now(),
    userRegistrations: new ClassroomRegistrationList(),
    categories: new UnitCategoryList(),
    professors: [],
    professorsLoading: false,
    filter: {
      category: null,
      unit: null,
      classroomStatus: null,
      classroomHoldingTypes: null,
      professor: null
    },
    filterDialog: false,
    classrooms: new ClassroomList()
  }),
  computed: {
    classroomStatuses () {
      return Enums.classroomStatuses
    },
    classroomHoldingTypes () {
      return Enums.classroomHoldingTypes
    },
    displayTitleFilters () {
      const filters = []
      if (this.filter.category) {
        filters.push({
          filterKey: 'category',
          value: this.filter.category,
          label: this.categories.list.find(item => item.id === this.filter.category).title
        })
      }
      if (this.filter.unit) {
        filters.push({
          filterKey: 'unit',
          value: this.filter.unit,
          label: this.units.list.find(item => item.id === this.filter.unit).title
        })
      }
      if (this.filter.classroomStatus) {
        filters.push({
          filterKey: 'classroomStatus',
          value: this.filter.classroomStatus,
          label: this.classroomStatuses.find(item => item.value === this.filter.classroomStatus).label
        })
      }
      if (this.filter.classroomHoldingTypes) {
        filters.push({
          filterKey: 'classroomHoldingTypes',
          value: this.filter.classroomHoldingTypes,
          label: this.classroomHoldingTypes.find(item => item.value === this.filter.classroomHoldingTypes).label
        })
      }
      if (this.filter.professor) {
        const fullname = this.getUserFullname(this.professors.find(item => item.id === this.filter.professor))
        filters.push({
          filterKey: 'professor',
          value: this.filter.professor,
          label: fullname
        })
      }

      return filters
    }
  },
  mounted () {
    this.loadAuthData()
    if (this.user && this.user.id !== null) {
      this.getUserRegistrations()
    }
    this.getClassrooms()
    this.getCategories()
    this.getUnits()
  },
  methods: {
    loadAuthData () {
      this.user = this.$store.getters['Auth/user']
    },
    getUserRegistrations () {
      this.userRegistrations.loading = true
      APIGateway.classroomRegistration.index()
        .then((classroomRegistrationList) => {
          this.userRegistrations = new ClassroomRegistrationList(classroomRegistrationList.list)
          this.classroomsKey = Date.now()
          this.userRegistrations.loading = false
        })
        .catch(() => {
          this.userRegistrations.loading = false
        })
    },
    isClassroomRegistered (classroomId) {
      return !!this.userRegistrations.list.find(item => item.classroom === classroomId && (item.status === 'REGISTERED' || item.status === 'ENROLLED'))
    },
    getTerm (classroom) {
      if (!classroom.beginning_registration_period) {
        return '-'
      }
      return ShamsiDate.getTerm(classroom.beginning_registration_period)
    },
    getProfessors () {
      this.$axios.get(API_ADDRESS.user.base + '?per_page=9999&role=professor')
        .then(response => {
          this.professors = response.data.results.map(item => {
            return {
              value: item.id,
              label: this.getUserFullname(item)
            }
          })
        })
    },
    getUserFullname (user) {
      return user.firstname + ' ' + user.lastname
    },
    getFilters () {
      let filters = ''
      if (this.filter.category) {
        filters += '&category=' + this.filter.category
      }
      if (this.filter.unit) {
        filters += '&unit=' + this.filter.unit
      }
      if (this.filter.classroomStatus) {
        filters += '&classroomStatus=' + this.filter.classroomStatus
      }
      if (this.filter.classroomHoldingTypes) {
        filters += '&holding_type=' + this.filter.classroomHoldingTypes
      }
      if (this.filter.professor) {
        filters += '&professor=' + this.filter.professor
      }

      // if (filters) {
      //   filters = filters.slice(1)
      // }

      return filters
    },
    getClassrooms () {
      this.classrooms.loading = true
      APIGateway.classroom.index({ per_page: 9999 })
        .then(classroomList => {
          this.classrooms = new ClassroomList(classroomList.list)
          this.classrooms.loading = false
        })
        .catch(() => {
          this.classrooms.loading = false
        })
    },
    getCategories () {
      this.categories.loading = true
      APIGateway.unitCategory.index()
        .then(unitCategoryList => {
          this.categories.loading = false
          this.categories = new UnitCategoryList(unitCategoryList.list)
        })
        .catch(() => {
          this.categories.loading = false
        })
    },
    getUnits (categoryId) {
      this.units.loading = true
      // let address = API_ADDRESS.unit.base
      // if (categoryId) {
      //   address = API_ADDRESS.unit.base + '?category=' + categoryId
      // }
      APIGateway.unit.index({ category: categoryId })
        .then(unitList => {
          this.units.loading = false
          this.units = new UnitList(unitList.list)
        })
        .catch(() => {
          this.units.loading = false
        })
    },
    openFilterDialog () {
      this.filterDialog = true
    },
    closeFilterDialog () {
      this.filterDialog = false
    },
    cancelFilter () {
      this.clearAllFilters()
      this.closeFilterDialog()
    },
    doFilter () {
      this.getClassrooms()
      this.closeFilterDialog()
    },
    clearFilterItem (key) {
      this.filter[key] = null
      this.doFilter()
    },
    clearAllFilters () {
      Object.keys(this.filter).forEach(filterKey => {
        this.filter[filterKey] = null
      })
    }
  }
}
</script>

<style scoped lang="scss">
.all-classroom {
  padding: 60px 0;
  .all-classroom-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
  }
  .all-classroom-selected-filter {
    margin-bottom: 30px;
  }
  .all-classroom-filter {
    display: flex;
    flex-flow: row;
    .btn-filter {
      margin-right: 20px;
    }
  }
  .input-filter {
    &:deep {
      .q-field__control {
        border-radius: 8px;
        .q-field__native {
          padding-top: 8px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.all-classroom-widget.filter-card {
  background-color: #F9F9F9;
  .filter-card-section {
    width: 1476px;
    margin: auto;
  }
  .filter-card-header {
    margin-bottom: 53px;
    padding-bottom: 0;
  }
  .filter-card-filter-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 65px;
    button {
      width: 158px;
    }
  }
}
</style>
