<template>
  <div class="AllEvents">
    <div class="AllEvents-title">
      <div>
        <q-banner class="banner">
          رویدادها
        </q-banner>
      </div>
      <div class="AllEvents-filter">
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
                 label="جستجوی رویداد "
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
         class="AllEvents-selected-filter">
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
    <div v-if="!events.loading && events.list.length > 0"
         :key="eventsKey"
         class="events row q-col-gutter-md">
      <div v-for="event in events.list"
           :key="event.id"
           class="event-col col-md-4">
        <event-item :event="event" />
      </div>
    </div>
    <div v-else-if="!events.loading && events.list.length === 0">
      رویدادی یافت نشد.
    </div>
    <div v-else-if="events.loading">
      کمی صبر کنید ...
    </div>
    <q-dialog v-model="filterDialog"
              :position="'top'"
              full-width>
      <filters v-model:filters="filter"
               :units="units"
               :professors="professors"
               :categories="categories"
               @doFilter="doFilter"
               @cancelFilter="cancelFilter"
               @onChangeCategory="onChangeCategory" />
    </q-dialog>
  </div>
</template>

<script>
import { UnitList } from 'src/models/Unit.js'
import Filters from './components/Filters.vue'
import { mixinAuth } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Event, EventList } from 'src/models/Event.js'
import EventItem from 'src/components/EventItem.vue'
import { UnitCategoryList } from 'src/models/UnitCategory.js'
import { EventRegistrationList } from 'src/models/EventRegistration.js'

export default {
  name: 'AllEvents',
  components: { EventItem, Filters },
  mixins: [mixinAuth],
  data: () => ({
    loading: false,
    units: new UnitList(),
    eventsKey: Date.now(),
    categories: new UnitCategoryList(),
    userRegistrations: new EventRegistrationList(),
    professors: [],
    professorsLoading: false,
    filter: {
      unit__category: null,
      unit: null,
      eventStatus: null,
      holding_type: null,
      professor: null
    },
    filterDialog: false,
    events: new EventList()
  }),
  computed: {
    eventStatuses () {
      return (new Event()).statusEnums
    },
    eventHoldingTypeOptions () {
      return (new Event()).holding_typeEnums
    },
    displayTitleFilters () {
      const filters = []
      if (this.filter.unit__category) {
        const targetCategory = this.categories.list.find(item => item.id === this.filter.unit__category)
        if (targetCategory) {
          filters.push({
            filterKey: 'unit__category',
            value: this.filter.unit__category,
            label: targetCategory.title
          })
        }
      }
      if (this.filter.unit) {
        const targetUnit = this.units.list.find(item => item.id === this.filter.unit)
        if (targetUnit) {
          filters.push({
            filterKey: 'unit',
            value: this.filter.unit,
            label: targetUnit.title
          })
        }
      }
      if (this.filter.eventStatus) {
        filters.push({
          filterKey: 'eventStatus',
          value: this.filter.eventStatus,
          label: this.eventStatuses.find(item => item.value === this.filter.eventStatus).label
        })
      }
      if (this.filter.holding_type) {
        filters.push({
          filterKey: 'holding_type',
          value: this.filter.holding_type,
          label: this.eventHoldingTypeOptions.find(item => item.value === this.filter.holding_type).label
        })
      }
      if (this.filter.professor) {
        const targetProfessor = this.professors.find(item => item.value === this.filter.professor)
        filters.push({
          filterKey: 'professor',
          value: this.filter.professor,
          label: targetProfessor.label
        })
      }

      return filters
    }
  },
  mounted () {
    if (this.user && this.user.id !== null) {
      this.getUserRegistrations()
    }
    this.getEvents()
    this.getCategories()
    this.getUnits()
    this.getProfessors()
  },
  methods: {
    getUserRegistrations () {
      this.userRegistrations.loading = true
      APIGateway.classroomRegistration.index()
        .then((eventRegistrationList) => {
          this.userRegistrations = new EventRegistrationList(eventRegistrationList.list)
          this.eventsKey = Date.now()
          this.userRegistrations.loading = false
        })
        .catch(() => {
          this.userRegistrations.loading = false
        })
    },
    isEventRegistered (eventId) {
      return !!this.userRegistrations.list.find(item => item.event === eventId && (item.status === 'REGISTERED' || item.status === 'ENROLLED'))
    },
    getEvents () {
      this.events.loading = true
      this.filter.per_page = 9999
      APIGateway.event.index(this.filter)
        .then(eventList => {
          this.events = new EventList(eventList.list)
          this.events.loading = false
        })
        .catch(() => {
          this.events.loading = false
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
    getProfessors () {
      APIGateway.user.professors({ per_page: 9999 })
        .then(({ list }) => {
          this.professors = list.list.map(item => {
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
    getUnits (categoryId) {
      this.units.loading = true
      APIGateway.unit.index({ category: categoryId })
        .then(unitList => {
          this.units.loading = false
          this.units = new UnitList(unitList.list)
        })
        .catch(() => {
          this.units.loading = false
        })
    },
    onChangeCategory () {
      this.filter.unit = null
      this.getUnits(this.filter.unit__category)
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
      this.getEvents()
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
.AllEvents {
  padding: 60px 0;
  .AllEvents-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
  }
  .AllEvents-selected-filter {
    margin-bottom: 30px;
  }
  .AllEvents-filter {
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
.AllEvents-widget.filter-card {
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
