<template>
  <div class="VerifyMobileNumber">
    <div class="label">
      {{ label }}
    </div>
    <div class="contents">
      <q-input v-model="textInput"
               :placeholder="placeholder"
               :disable="disable"
               :loading="loading"
               :class="{'verified': state === 'verified'}"
               class="VerifyMobileNumber-input" />
      <q-btn v-if="state === 'input-mobile-number'"
             label="دریافت کد"
             outline
             color="primary"
             class="VerifyMobileNumber-btn"
             :loading="loading"
             @click="sendOtp" />
      <q-btn v-if="state === 'send-verify-number'"
             label="تایید"
             color="primary"
             class="VerifyMobileNumber-btn"
             :loading="loading"
             @click="verify" />
      <div class="VerifyMobileNumber-message">
        {{message}}
        <svg v-if="state === 'send-verify-number'"
             xmlns="http://www.w3.org/2000/svg"
             width="19.5"
             height="18.94"
             viewBox="0 0 19.5 18.94"
             @click="updateMobileNumber">
          <g id="Edit"
             transform="translate(0)">
            <path id="Combined_Shape"
                  data-name="Combined Shape"
                  d="M11.5,18.94a.75.75,0,0,1,0-1.5h7.253a.75.75,0,0,1,0,1.5Zm-9.884,0a.749.749,0,0,1-.731-.577L.064,14.891a2.373,2.373,0,0,1,.461-2.037L9.944,1.073l.007-.009,0,0A3.006,3.006,0,0,1,14.116.653l1.7,1.326.018.014A2.8,2.8,0,0,1,17.1,3.767a2.87,2.87,0,0,1-.368,2.2c-.018.028-.036.055-1.865,2.347a.747.747,0,0,1-.131.164c-1.366,1.712-3.677,4.6-7.59,9.5a2.445,2.445,0,0,1-1.886.914l-3.639.046ZM1.7,13.792a.877.877,0,0,0-.171.755l.68,2.884,3.039-.038a.944.944,0,0,0,.733-.352c1.933-2.418,5.04-6.306,7.178-8.982L8.9,4.788Zm12.4-6.9c.82-1.027,1.36-1.7,1.41-1.769a1.351,1.351,0,0,0,.141-1,1.406,1.406,0,0,0-.652-.887c-.059-.04-1.265-.976-1.779-1.375l-.029-.022a1.512,1.512,0,0,0-.942-.331,1.473,1.473,0,0,0-1.13.519l-1.279,1.6Z"
                  fill="#475f4a" />
          </g>
        </svg>
      </div>
      <div v-if="state === 'send-verify-number'"
           class="VerifyMobileNumber-timer">
        {{formatedTimer}}
      </div>
      <div v-if="state === 'verified'"
           class="VerifyMobileNumber-verified-mark">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="23.999"
             viewBox="0 0 24 23.999">
          <g id="check_circle-24px_1_"
             data-name="check_circle-24px (1)"
             transform="translate(0 0)">
            <path id="Path_797"
                  data-name="Path 797"
                  d="M0,0H24V24H0Z"
                  transform="translate(0 0)"
                  fill="none" />
            <path id="Path_798"
                  data-name="Path 798"
                  d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM9.29,16.289,5.7,12.7a1,1,0,0,1,1.41-1.41L10,14.169l6.88-6.879a1,1,0,0,1,1.41,1.41L10.7,16.289a1,1,0,0,1-1.41,0Z"
                  transform="translate(0.001 0)"
                  fill="#10d078" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'VerifyMobileNumber',
  props: {
    value: {
      default: null,
      type: [String, Number]
    },
    btnClass: {
      default: '',
      type: String
    },
    color: {
      default: 'primary',
      type: String
    },
    atClick: {
      type: Function,
      default: () => {}
    }
  },
  emits: ['update:value', 'input', 'change'],
  data () {
    return {
      state: 'input-mobile-number',
      textInput: null,
      label: 'تلفن همراه',
      loading: false,
      mobileNumber: null,
      inputData: null,
      otpInterval: null,
      otpValue: null,
      message: '',
      otpTimer: 120,
      disable: false
    }
  },
  computed: {
    formatedTimer () {
      const second = this.otpTimer % 60
      const minute = Math.floor(this.otpTimer / 60)

      return minute + ':' + second
    }
  },
  watch: {
    value () {
      this.inputData = this.value
      this.updateState()
    }
  },
  created () {
    this.inputData = this.value
    this.updateState()
  },
  methods: {
    updateState () {
      if (this.inputData !== null && this.inputData.length > 0) {
        this.disable = true
        this.textInput = this.inputData
        this.setState('verified')
        return
      }

      this.mobileNumber = this.inputData
    },
    setState (newState) {
      this.state = newState
      if (newState === 'input-mobile-number') {
        this.label = 'تلفن همراه'
      } else if (newState === 'send-verify-number') {
        this.label = 'کد تایید را وارد کنید'
      } else if (newState === 'verified') {
        this.label = 'تلفن همراه'
      }
    },
    sendOtp () {
      if (!this.textInput) {
        this.$q.notify({
          type: 'negative',
          message: 'شماره همراه خود را وارد کنید.'
        })
        return
      }
      this.mobileNumber = this.textInput
      this.loading = true
      APIGateway.auth.sendOtpVerify({ input: this.mobileNumber })
        .then(() => {
          this.loading = false
          this.message = 'کد تایید به شماره ' + this.mobileNumber + ' ارسال شد.'
          this.textInput = ''
          this.restartOtpInterval()
          this.setState('send-verify-number')
        })
        .catch(() => {
          this.loading = false
          this.updateMobileNumber()
        })
    },
    updateMobileNumber () {
      this.message = ''
      this.setState('input-mobile-number')
    },
    verify () {
      this.loading = true
      this.message = ''
      this.otpValue = this.textInput
      this.textInput = ''
      APIGateway.auth.verify({
        input: this.mobileNumber,
        otp: this.otpValue
      })
        .then(() => {
          this.loading = false
          this.disable = true
          this.setState('verified')
          this.change(this.mobileNumber)
        })
        .catch(() => {
          this.loading = false
          this.updateMobileNumber()
        })
    },
    restartOtpInterval () {
      this.clearOtpInterval()
      this.otpInterval = setInterval(() => {
        if (this.otpTimer === 0) {
          clearInterval(this.otpInterval)
        } else {
          this.otpTimer--
        }
      }, 1000)
    },
    clearOtpInterval () {
      this.otpTimer = 120
      if (this.otpInterval) {
        clearInterval(this.otpInterval)
      }
    },
    change (val) {
      this.$emit('update:value', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.VerifyMobileNumber {
  .contents {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    position: relative;
    .VerifyMobileNumber-input {
      width: calc( 100% - 130px );
      &.verified {
        width: 100%;
      }
    }
    .VerifyMobileNumber-btn {
      width: 118px;
      height: 48px;
      margin-left: 12px;
    }
    .VerifyMobileNumber-message {
      position: absolute;
      right: 0;
      bottom: -30px;
      svg {
        cursor: pointer;
      }
    }
    .VerifyMobileNumber-timer {
      position: absolute;
      right: 135px;
      bottom: 13px;
    }
    .VerifyMobileNumber-verified-mark {
      position: absolute;
      right: 15px;
      bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
