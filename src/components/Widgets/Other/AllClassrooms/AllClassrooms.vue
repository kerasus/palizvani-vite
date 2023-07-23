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
    <div v-if="!loading && classrooms.length > 0"
         :key="classroomsKey"
         class="classrooms row q-col-gutter-md">
      <div v-for="classroom in classrooms"
           :key="classroom.id"
           class="classroom-col col-md-4">
        <q-card flat
                class="classroom-item"
                :class="{'isRegistered' : isClassroomRegistered(classroom.id) }">
          <q-card-section class="thumbnail">
            <router-link :to="{name: 'UserPanel.ShowClassroomInfo', params: {id: classroom.id}}">
              <div class="RegisteredSign">
                <svg class="ribbon"
                     xmlns="http://www.w3.org/2000/svg"
                     width="123.945"
                     height="123.422"
                     viewBox="0 0 123.945 123.422">
                  <g id="Group_11524"
                     data-name="Group 11524"
                     transform="translate(-361 -1111)">
                    <g id="Group_7903"
                       data-name="Group 7903"
                       transform="translate(361 1111)">
                      <g id="Group_7901"
                         data-name="Group 7901"
                         transform="translate(0 0)">
                        <rect id="Rectangle_1771"
                              data-name="Rectangle 1771"
                              width="13.986"
                              height="39.668"
                              transform="translate(0 83.754)"
                              fill="#cfb184" />
                        <rect id="Rectangle_1772"
                              data-name="Rectangle 1772"
                              width="39.668"
                              height="13.986"
                              transform="translate(84.277 0)"
                              fill="#cfb184" />
                        <path id="Path_18668"
                              data-name="Path 18668"
                              d="M1938.931,282.651l123.945-123.406-.016-.016h-44a9.041,9.041,0,0,0-6.379,2.631l-70.907,70.6a8.962,8.962,0,0,0-2.642,6.352Z"
                              transform="translate(-1938.931 -159.229)"
                              fill="#eac38a" />
                      </g>
                    </g>
                    <text id="دوره_های_من"
                          data-name="دوره‌های من"
                          transform="translate(445.063 1135.174) rotate(-45)"
                          fill="#fff"
                          font-size="18"
                          font-family="SegoeUI-Bold, Segoe UI"
                          font-weight="700"><tspan x="0"
                                                   y="0">دوره‌های من</tspan></text>
                  </g>
                </svg>
              </div>
              <q-img class="q-ma-xs"
                     :src="classroom.thumbnail" />
            </router-link>
          </q-card-section>
          <q-card-section class="title">
            <router-link :to="{name: 'UserPanel.ShowClassroomInfo', params: {id: classroom.id}}">
              {{classroom.title}}
            </router-link>
          </q-card-section>
          <q-card-section class="attribute">
            <div class="attribute-item">
              <div class="attribute-logo">
                <svg id="Profile"
                     xmlns="http://www.w3.org/2000/svg"
                     width="17.058"
                     height="21.399"
                     viewBox="0 0 17.058 21.399">
                  <path id="Combined_Shape"
                        data-name="Combined Shape"
                        d="M0,17.418c0-3.55,4.868-3.96,8.53-3.96,2.109,0,8.528,0,8.528,3.982,0,3.548-4.867,3.959-8.528,3.959C6.42,21.4,0,21.4,0,17.418Zm1.616,0c0,1.57,2.326,2.366,6.914,2.366s6.913-.789,6.913-2.345-2.326-2.366-6.913-2.366S1.616,15.862,1.616,17.418ZM8.5,11.436A5.718,5.718,0,0,1,8.53,0a5.718,5.718,0,0,1,0,11.436ZM4.349,5.718A4.171,4.171,0,0,0,8.5,9.9l.031.77V9.9a4.18,4.18,0,1,0-4.181-4.18Z"
                        transform="translate(0 0)"
                        fill="#aaa095" />
                </svg>
              </div>
              <div class="attribute-value">
                {{classroom.professor}}
              </div>
            </div>
            <div class="attribute-item">
              <div class="attribute-logo">
                <svg id="Calendar"
                     xmlns="http://www.w3.org/2000/svg"
                     width="21"
                     height="23.154"
                     viewBox="0 0 21 23.154">
                  <path id="Combined_Shape"
                        data-name="Combined Shape"
                        d="M5.945,23.154c-3.668,0-5.945-2.26-5.945-5.9V7.51A5.382,5.382,0,0,1,5.347,1.721V.807a.808.808,0,0,1,1.616,0V1.7h7.084V.807a.807.807,0,1,1,1.615,0v.914a5.8,5.8,0,0,1,3.8,1.572A5.793,5.793,0,0,1,21,7.513v9.824c0,3.588-2.279,5.817-5.946,5.817Zm-4.33-5.9c0,2.762,1.537,4.284,4.33,4.284h9.109c2.792,0,4.331-1.493,4.331-4.2V9.59H1.616ZM19.385,7.974V7.51a4.159,4.159,0,0,0-1.063-3.074,4.164,4.164,0,0,0-2.66-1.094v1.01a.807.807,0,0,1-1.615,0V3.317H6.963V4.352a.808.808,0,0,1-1.616,0V3.341c-2.413.2-3.732,1.664-3.732,4.169v.464Zm-4.9,9.2a.8.8,0,0,1,.8-.807h.01a.807.807,0,1,1-.812.807Zm-4.778,0a.8.8,0,0,1,.8-.807h.01a.807.807,0,1,1-.812.807Zm-4.79,0a.8.8,0,0,1,.8-.807h.01a.807.807,0,1,1-.813.807Zm9.568-4.185a.8.8,0,0,1,.8-.808h.01a.808.808,0,1,1-.812.808Zm-4.778,0a.8.8,0,0,1,.8-.808h.01a.808.808,0,1,1-.812.808Zm-4.79,0a.8.8,0,0,1,.8-.808h.01a.808.808,0,1,1-.813.808Z"
                        transform="translate(0 0)"
                        fill="#aaa095" />
                </svg>
              </div>
              <div class="attribute-value">
                {{ getTerm(classroom) }}
              </div>
            </div>
            <div class="attribute-item">
              <div class="attribute-logo">
                <svg id="Group_11306"
                     data-name="Group 11306"
                     xmlns="http://www.w3.org/2000/svg"
                     width="21.539"
                     height="21.044"
                     viewBox="0 0 21.539 21.044">
                  <g id="Buy"
                     transform="translate(0 0)">
                    <path id="Combined_Shape"
                          data-name="Combined Shape"
                          d="M16.3,19.649A1.395,1.395,0,1,1,17.7,21.044,1.4,1.4,0,0,1,16.3,19.649Zm-12.147,0a1.394,1.394,0,1,1,1.394,1.395A1.4,1.4,0,0,1,4.157,19.649ZM17.77,16.139H6.014A2.76,2.76,0,0,1,3.28,13.615L2.294,1.883.671,1.6A.812.812,0,0,1,.012.668.811.811,0,0,1,.815,0a.829.829,0,0,1,.13.011L3.186.4a.808.808,0,0,1,.666.729L4.1,4.143c15.367.007,15.424.014,15.5.022a2.254,2.254,0,0,1,1.912,2.553l-1.023,7.062a2.76,2.76,0,0,1-2.717,2.358ZM4.89,13.483a1.123,1.123,0,0,0,1.127,1.04H17.771a1.139,1.139,0,0,0,1.122-.972l1.024-7.064a.632.632,0,0,0-.121-.472.625.625,0,0,0-.418-.249c-.052,0-.6,0-1.677,0-1.693,0-4.455,0-7.291,0l-6.17,0ZM13.059,9.74a.808.808,0,0,1,0-1.616h2.985a.808.808,0,0,1,0,1.616Z"
                          transform="translate(0)"
                          fill="#aaa095" />
                  </g>
                </svg>
              </div>
              <div class="attribute-value">
                {{classroom.price}}
                تومان
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="action-section">
            <q-btn color="primary"
                   class="btn-show-classroom"
                   :to="{name: 'UserPanel.ShowClassroomInfo', params: {id: classroom.id}}">
              مشاهده و ثبت نام
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="18.387"
                   height="11.502"
                   viewBox="0 0 18.387 11.502">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M-9.338,11.408a.748.748,0,0,0,.388-.656V6.5h8.2A.751.751,0,0,0,0,5.75.75.75,0,0,0-.75,5h-8.2V.75A.751.751,0,0,0-9.338.093.769.769,0,0,0-9.7,0a.735.735,0,0,0-.4.115l-7.938,5a.747.747,0,0,0-.35.635.742.742,0,0,0,.35.634l7.938,5a.751.751,0,0,0,.4.116A.746.746,0,0,0-9.338,11.408ZM-10.45,9.392l-5.78-3.641,5.78-3.642Z"
                      transform="translate(18.387)"
                      fill="#fff" />
              </svg>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div v-else-if="!loading && classrooms.length === 0">
      دوره ای یافت نشد.
    </div>
    <div v-else-if="loading">
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
                              :options="categories"
                              :disable="categoriesLoading"
                              :loading="categoriesLoading"
                              optionValue="id"
                              optionLabel="title"
                              label="گروه آموزشی"
                              @update:model-value="getUnits" />
            </div>
            <div class="col-md-3">
              <select-control v-model:value="filter.unit"
                              :options="units"
                              :disable="unitsLoading"
                              :loading="unitsLoading"
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
import Enums from 'src/assets/Enums/Enums.js'
import API_ADDRESS from 'src/api/Addresses.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import SelectControl from 'src/components/Control/Select.vue'

export default {
  name: 'AllClassrooms',
  components: { SelectControl },
  data: () => ({
    loading: false,
    units: [],
    classroomsKey: Date.now(),
    userRegistrations: [],
    categories: [],
    professors: [],
    professorsLoading: false,
    categoriesLoading: false,
    unitsLoading: false,
    filter: {
      category: null,
      unit: null,
      classroomStatus: null,
      classroomHoldingTypes: null,
      professor: null
    },
    filterDialog: false,
    classrooms: []
  }),
  computed: {
    user () {
      return this.$store.getters['Auth/user']
    },
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
          label: this.categories.find(item => item.id === this.filter.category).title
        })
      }
      if (this.filter.unit) {
        filters.push({
          filterKey: 'unit',
          value: this.filter.unit,
          label: this.units.find(item => item.id === this.filter.unit).title
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
  created () {
    if (this.user && this.user.id !== null) {
      this.getUserRegistrations()
    }
    this.getClassrooms()
    this.getCategories()
    this.getUnits()
  },
  methods: {
    getUserRegistrations () {
      this.$axios.get(API_ADDRESS.registrations.base)
        .then((response) => {
          this.userRegistrations = response.data.results
          this.classroomsKey = Date.now()
        })
        .catch(() => {})
    },
    isClassroomRegistered (classroomId) {
      return !!this.userRegistrations.find(item => item.classroom === classroomId)
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
      this.loading = true
      this.$axios.get(API_ADDRESS.classroom.base + '?per_page=9999' + this.getFilters())
        .then(response => {
          this.classrooms = response.data.results
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getCategories () {
      this.categoriesLoading = true
      this.$axios.get(API_ADDRESS.category.base)
        .then(response => {
          this.categoriesLoading = false
          this.categories = response.data.results
        })
        .catch(() => {
          this.categoriesLoading = false
        })
    },
    getUnits (categoryId) {
      this.unitsLoading = true
      let address = API_ADDRESS.unit.base
      if (categoryId) {
        address = API_ADDRESS.unit.base + '?category=' + categoryId
      }
      this.$axios.get(address)
        .then(response => {
          this.unitsLoading = false
          this.units = response.data.results
        })
        .catch(() => {
          this.unitsLoading = false
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
  .classroom-item {
    width: 100%;
    background-color: #F6F6F6;
    border-radius: 8px;
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
      ::v-deep(img) {
        border-radius: 10px;
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
