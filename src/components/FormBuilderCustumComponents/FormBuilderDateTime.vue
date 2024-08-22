<template>
  <div class="form-builder-date-time"
       :class="customClass">
    <div v-if="outsideLabel"
         class="outside-label">
      {{ outsideLabel }}
    </div>
    <div class="inputs">
      <q-input ref="input"
               :model-value="displayTime"
               :name="name"
               :loading="loading"
               :filled="filled"
               readonly
               dir="ltr"
               :disable="disable"
               :label="placeholder ? null : label"
               :stack-label="!!placeholder"
               :placeholder="placeholder"
               :rules="rules"
               :lazy-rules="lazyRules"
               :outlined="outlined"
               :class="customClass"
               :input-class="customClass"
               @click="onClickInput('time')">
        <template v-slot:append>
          <q-icon name="access_time"
                  class="cursor-pointer">
            <q-popup-proxy v-model="popupTime"
                           cover
                           transition-show="scale"
                           transition-hide="scale">
              <q-time v-model="dateTime.time"
                      mask="HH:mm:00"
                      format24h
                      :disable="disable"
                      :title="title ? title : label"
                      :now-btn="nowBtn"
                      @update:model-value="onChangeTime">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup
                         label="بستن"
                         color="primary"
                         flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
          <q-btn v-if="clearable"
                 icon="close"
                 flat
                 round
                 class="cursor-pointer"
                 @click="onClear" />
        </template>
      </q-input>
      <q-input ref="input"
               :model-value="displayDate"
               :name="name"
               :loading="loading"
               :filled="filled"
               readonly
               dir="ltr"
               :disable="disable"
               :label="placeholder ? null : label"
               :stack-label="!!placeholder"
               :placeholder="placeholder"
               :rules="rules"
               :lazy-rules="lazyRules"
               :outlined="outlined"
               :class="customClass"
               :input-class="customClass"
               @click="onClickInput('date')">
        <template v-slot:append>
          <q-icon name="event"
                  class="cursor-pointer">
            <q-popup-proxy v-model="popupDate"
                           cover
                           transition-show="scale"
                           transition-hide="scale">
              <q-date v-model="dateTime.date"
                      :calendar="calendar"
                      mask="YYYY/MM/DD"
                      :range="range"
                      :multiple="multiple"
                      :disable="disable"
                      :title="title ? title : label"
                      :today-btn="todayBtn"
                      @update:model-value="onChangeDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup
                         label="بستن"
                         color="primary"
                         flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
        <template #prepend>
          <q-btn icon="close"
                 flat
                 round
                 class="clear-btn"
                 @click="onClear" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import { inputMixin } from 'quasar-form-builder'

moment.loadPersian()

export default {
  name: 'FormBuilderDateTime',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    outsideLabel: {
      default: null,
      type: String
    },
    calendar: {
      default: 'persian',
      type: String
    },
    calendarIcon: {
      default: 'event',
      type: String
    },
    clockIcon: {
      default: 'access_time',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    placeholder: {
      default: '',
      type: String
    },
    value: {
      default: '',
      type: String
    },
    nowBtn: {
      default: false,
      type: Boolean
    },
    iso8601: {
      default: true,
      type: Boolean
    },
    todayBtn: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      displayDateTime: '',
      popupDate: false,
      popupTime: false,
      dateTime: {
        date: '',
        time: ''
      },
      rendrKey: Date.now(),
      showDate: false,
      showTime: false
    }
  },
  computed: {
    displayDate () {
      if (!this.displayDateTime) {
        return ''
      }

      const dataArr = this.displayDateTime.split(' ')
      if (dataArr.length > 0) {
        return dataArr[0]
      }
      return ''
    },
    displayTime () {
      if (!this.displayDateTime) {
        return ''
      }

      const dataArr = this.displayDateTime.split(' ')
      if (dataArr.length === 2) {
        return dataArr[1]
      }
      return ''
    }
  },
  watch: {
    value: {
      handler(newValue) {
        if (!newValue) {
          this.inputData = null
          this.displayDateTime = ''
          return
        }
        const newDate = moment(newValue.toString()).format('YYYY-MM-DD')
        const newTime = moment(newValue.toString()).format('HH:mm:00')
        this.updateDateTime(newDate, 'date')
        this.updateDateTime(newTime, 'time')
      },
      immediate: true
    }
  },
  methods: {
    onClickInput (type) {
      if (type === 'date') {
        this.popupDate = true
      } else {
        this.popupTime = true
      }
    },
    onClear () {
      this.displayDateTime = ''
      this.inputData = null
      this.change(this.inputData)
    },
    onChangeDate (newValue) {
      let gregorianDate = newValue
      if (this.calendar === 'persian') {
        gregorianDate = this.shamsiToMiladiDate(newValue.toString())
      }
      this.updateDateTime(gregorianDate, 'date')
    },
    onChangeTime (newValue) {
      this.updateDateTime(newValue, 'time')
    },
    updateDateTime (newValue, updateType = 'date') {
      const defaultDate = moment(Date.now()).format('YYYY-MM-DD')
      const defaultTime = moment(Date.now()).format('HH:mm:00')
      const inputData = this.inputData ? this.inputData.replace('T', ' ') : defaultDate + ' ' + defaultTime
      const arrValue = inputData.toString().trim().split(' ')
      let arrDisplay = new Array(arrValue)
      if (updateType === 'date') {
        arrDisplay = [newValue.toString(), arrValue[1]]
        // if (this.calendar === 'persian') {
        //   arrValue[0] = this.shamsiToMiladiDate(newValue.toString())
        // } else {
        //   arrValue[0] = newValue.toString()
        // }
        arrValue[0] = newValue.toString()
      } else if (updateType === 'time') {
        const timeWithoutSecond = arrValue[1].split(':').splice(0, 2).join(':')
        if (this.calendar === 'persian') {
          arrDisplay = [this.miladiToShamsiDate(arrValue[0]), timeWithoutSecond]
        } else {
          arrDisplay = [arrValue[0], timeWithoutSecond]
        }
        arrValue[1] = newValue.toString()
      }

      const delimiter = this.iso8601 ? 'T' : ' '
      this.displayDateTime = arrDisplay.join(' ').replace(',', ' ')
      this.inputData = arrValue.join(delimiter).replace(',', ' ')
      this.change(this.inputData)
    },

    shamsiToMiladiDate(date) {
      return moment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
    },
    miladiToShamsiDate(date) {
      return moment(date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')
    }
  }
}
</script>

<style scoped lang="scss">
.inputs {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  .q-field {
    width: 50%;
  }
}
</style>
