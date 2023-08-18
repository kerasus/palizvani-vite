<template>
  <div>
    <q-banner class="banner">
      {{ bannerMessage }}
    </q-banner>
    <template v-if="registerStep === 'getUsername'">
      <label for="username">
        ایمیل یا شماره تلفن همراه
      </label>
      <q-input id="username"
               v-model="username"
               outlined
               class="username-input"
               label="ایمیل یا شماره تلفن همراه"
               :disable="loading"
               :loading="loading"
               @keydown.enter="goToVerifyStep">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-btn class="full-width btn-GoToVerify"
             color="primary"
             label="ارسال کد بازیابی"
             :disable="loading"
             :loading="loading"
             @click="goToVerifyStep" />
      <div class="go-to-login-message">
        گذرواژه را به خاطر دارید؟
        <span class="btn-go-to-login-span"
              @click="goToLoginStep">
          وارد شوید
        </span>
      </div>
    </template>
    <template v-else-if="registerStep === 'verify'">
      <label for="verifyNumber">
        .لطفا کد تایید ارسال شده به شماره
        {{ username }}
        را وارد کنید
      </label>
      <q-input id="verifyNumber"
               v-model="verifyNumber"
               outlined
               class="username-input"
               label=""
               :disable="loading"
               :loading="loading" />
      <div class="resend-timer-message">
        <template v-if="!timerEnded">
          <span class="resend-timer-message-value">
            <timer ref="timer"
                   :time="120"
                   @stop="onStopTimer" />
          </span>
          تا درخواست مجدد
        </template>
        <template v-else>
          <q-btn color="primary"
                 class="full-width"
                 :loading="sendOtpLoading"
                 @click="restartTimer">
            ارسال مجدد کد تایید
          </q-btn>
        </template>
      </div>
      <label class="password-label"
             for="password">
        گذرواژه
      </label>
      <q-input id="password"
               v-model="password"
               outlined
               class="password-input"
               type="password"
               label="گذرواژه جدید خود را وارد کنید"
               @keydown.enter="verify">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
        <template v-slot:append>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-btn class="full-width btn-verifyUsername"
             color="primary"
             label="تایید و ورود"
             :disable="loading"
             :loading="loading"
             @click="verify" />
      <div class="go-to-set-username-message"
           @click="goToGetUsernameStep">
        تغییر شماره تلفن همراه یا استفاده از آدرس ایمیل
      </div>
    </template>
    <template v-else-if="registerStep === 'newPassword'">
      <q-btn class="full-width btn-login"
             color="primary"
             label="تایید و ورود"
             @click="setNewPassword" />
    </template>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import Timer from 'src/components/Auth/Timer.vue'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'ForgetStep',
  components: { Timer },
  mixins: [mixinAuth],
  props: {
    redirect: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    sendOtpLoading: false,
    timerEnded: false,
    loading: false,
    bannerMessage: 'بازیابی گذرواژه',
    registerStep: 'getUsername',
    username: null,
    verifyNumber: null,
    firstname: null,
    lastname: null,
    password: null,
    otpInterval: null,
    otpTimer: 120,

    userLogin: false,
    loadingList: false,
    otpStep: 'sendOtp',

    otp: null
  }),
  computed: {
    user () {
      return this.$store.getters['Auth/user']
    },
    formatedTimer () {
      const second = this.otpTimer % 60
      const minute = Math.floor(this.otpTimer / 60)

      return minute + ':' + second
    }
  },
  created () {
    // if (this.getToken()) {
    //   this.getUserData(() => { this.redirectTo() })
    // }
    this.setRegisterStep('getUsername')
    this.$store.dispatch('Auth/logOut')
  },
  methods: {
    onStopTimer () {
      this.timerEnded = true
    },
    restartTimer () {
      this.sendOtpForgotPassword()
    },
    sendOtpForgotPassword () {
      this.sendOtpLoading = true
      APIGateway.auth.sendOtpForgotPassword({
        input: this.username
      })
        .then(() => {
          this.sendOtpLoading = false
          this.timerEnded = false
          this.$nextTick(() => {
            this.$refs.timer.startTimer()
          })
        })
        .catch(() => {
          this.sendOtpLoading = false
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
    setRegisterStep (step) {
      this.registerStep = step
      this.setBannerMessageFromStep(step)
    },
    setBannerMessageFromStep (step) {
      if (step === 'getUsername') {
        this.bannerMessage = 'بازیابی گذرواژه'
      } else if (step === 'verify') {
        this.bannerMessage = 'کد بازیابی گذرواژه'
      } else if (step === 'newPassword') {
        this.bannerMessage = 'ایجاد گذرواژه جدید'
      }
    },

    getToken () {
      return this.$store.getters['Auth/accessToken']
    },

    getEnter (targetRefKey) {
      this.$refs[targetRefKey].focus()
    },
    setNewPassword () {
      this.$axios.post(API_ADDRESS.auth.setPass, {
        new_password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      })
        .then(() => {
          this.loading = false
          this.redirectTo()
          // this.$store.commit('Auth/updateAccessToken', response.data.token.access_token)
          // this.$store.commit('Auth/setAccessToken', response.data.token.access_token)
          // this.$emit('register')
        })
        .catch(() => {
          this.loading = false
        })
    },
    goToLoginStep () {
      this.$emit('goToLoginStep')
    },
    showRulesAndConditions () {

    },
    redirectTo () {
      let redirectTo = 'Public.Home'

      if (this.user.canSeeAdminPanel()) {
        redirectTo = 'Admin.User.Index'
      }

      this.$router.push({ name: redirectTo })
    },
    goToVerifyStep () {
      if (!this.username) {
        return
      }
      this.loading = true
      APIGateway.auth.sendOtpForgotPassword({
        input: this.username
      })
        .then(() => {
          this.restartOtpInterval()
          this.loading = false
          this.setRegisterStep('verify')
        })
        .catch(() => {
          this.loading = false
        })
    },
    verify () {
      if (!this.verifyNumber) {
        return
      }
      this.loading = true
      this.$store.dispatch('Auth/setPassword', {
        input: this.username,
        password: this.password,
        otp: this.verifyNumber
      })
        .then(() => {
          this.loading = false
          this.redirectTo()
          // this.setRegisterStep('newPassword')
        })
        .catch(() => {
          this.loading = false
        })
    },
    goToGetUsernameStep () {
      this.setRegisterStep('getUsername')
    }
  }
}
</script>

<style lang="scss" scopedresend-timer-message>
.banner {
margin-bottom: 13px;
}
.hello {
  margin-bottom: 8px;
}
.username-input {
  margin-top: 18px;
}
.username-input {
  margin-bottom: 20px;
}
.accept-rules-and-conditions-message {
  color: #212121;
  margin-bottom: 30px;
  .accept-rules-and-conditions-message-btn {
    color: #5B7A5F;
    cursor: pointer;
  }
}
.btn-GoToVerify {
  margin-bottom: 40px;
  font-size: 18px;
}
.go-to-login-message {
  font-size: 16px;
  .btn-go-to-login-span {
    color: #5B7A5F;
    cursor: pointer;
  }
}
.resend-timer-message {
  margin-bottom: 20px;
  text-align: center;
  .resend-timer-message-value {

  }
}
.btn-verifyUsername {
  margin-bottom: 40px;
}
.go-to-set-username-message {
  color: #5B7A5F;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}

.newPassword-top-message {
  margin-bottom: 3px;
}
.name-input, .lastname-input {
  margin-bottom: 25px;
}
.name-input, .lastname-input, .password-input {
  margin-top: 8px;
}
.password-input {
  margin-bottom: 54px;
}
</style>
