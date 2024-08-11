<template>
  <div>
    <q-banner class="banner">
      {{ bannerMessage }}
    </q-banner>
    <template v-if="registerStep === 'getUsername'">
      <div class="hello">
        سلام
      </div>
      <label for="username">
        لطفا ایمیل یا شماره تلفن همراه خود را وارد کنید
      </label>
      <q-input id="username"
               v-model="username"
               outlined
               class="username-input"
               placeholder="ایمیل یا شماره تلفن همراه"
               :disable="loading"
               :loading="loading"
               @keydown.enter="goToVerifyStep">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <div class="accept-rules-and-conditions-message">
        با ثبت نام در سامانه
        <span class="accept-rules-and-conditions-message-btn"
              @click="showRulesAndConditions">
          قوانین و شرایط استفاده
        </span>
        از آن را می‌پذیرم.
      </div>
      <q-btn class="full-width btn-GoToVerify"
             color="primary"
             label="ادامه"
             :disable="loading"
             :loading="loading"
             @click="goToVerifyStep" />
      <div class="go-to-login-message">
        حساب کاربری دارید؟
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
               :loading="loading"
               @keydown.enter="verify" />
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

      <div class="information-top-message">
        لطفا اطلاعات کاربری خود را وارد کنید.
      </div>
      <label for="name">
        نام
      </label>
      <q-input id="name"
               v-model="firstname"
               outlined
               class="name-input"
               placeholder="نام خود را وارد کنید"
               @keydown.enter="verify">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <label for="lastname">
        نام خانوادگی
      </label>
      <q-input id="lastname"
               v-model="lastname"
               outlined
               class="lastname-input"
               placeholder="نام خانوادگی خود را وارد کنید"
               @keydown.enter="verify">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <label class="password-label"
             for="password">
        گذرواژه
      </label>
      <q-input id="password"
               v-model="password"
               outlined
               class="password-input"
               placeholder="گذرواژه خود را وارد کنید"
               :type="visibilityIcon === 'visibility' ? 'password' : 'text'"
               @keydown.enter="verify">
        <template v-slot:prepend>
          <q-icon name="lock_open" />
        </template>
        <template v-slot:append>
          <q-icon :name="visibilityIcon"
                  class="cursor-pointer"
                  @click="toggleVisibilityIcon" />
        </template>
      </q-input>
      <label class="password-label"
             for="password">
        تکرار گذرواژه
      </label>
      <q-input id="rePassword"
               v-model="rePassword"
               outlined
               class="password-input"
               placeholder="مجدد گذرواژه خود را وارد کنید"
               :type="visibilityIcon === 'visibility' ? 'password' : 'text'"
               @keydown.enter="verify">
        <template v-slot:prepend>
          <q-icon name="lock_open" />
        </template>
        <template v-slot:append>
          <q-icon :name="visibilityIcon"
                  class="cursor-pointer"
                  @click="toggleVisibilityIcon" />
        </template>
      </q-input>

      <q-btn class="full-width btn-verifyUsername"
             color="primary"
             label="ثبت نام"
             :disable="loading"
             :loading="loading"
             @click="verify" />
      <div class="go-to-set-username-message"
           @click="goToGetUsernameStep">
        تغییر شماره تلفن همراه یا استفاده از آدرس ایمیل
      </div>
    </template>
    <template v-else-if="registerStep === 'information'">
      <div class="information-top-message">
        لطفا اطلاعات کاربری خود را وارد کنید.
      </div>
    </template>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import Timer from 'src/components/Auth/Timer.vue'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'RegisterStep',
  components: { Timer },
  mixins: [mixinAuth],
  props: {
    redirect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sendOtpLoading: false,
      timerEnded: false,
      loading: false,
      visibilityIcon: 'visibility',
      bannerMessage: 'ثبت نام در سامانه',
      registerStep: 'getUsername',
      username: null,
      verifyNumber: null,
      firstname: null,
      lastname: null,
      password: null,
      rePassword: null,
      otpInterval: null,
      otpTimer: 120,

      userLogin: false,
      loadingList: false,
      otpStep: 'sendOtp',

      otp: null
    }
  },
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
  },
  methods: {
    toggleVisibilityIcon () {
      this.visibilityIcon = this.visibilityIcon === 'visibility' ? 'visibility_off' : 'visibility'
    },
    onStopTimer () {
      this.timerEnded = true
    },
    restartTimer () {
      this.sendOtpSignUp()
    },
    sendOtpSignUp () {
      if (!this.username) {
        this.$q.notify({
          type: 'negative',
          message: 'ایمیل یا شماره تلفن همراه را وارد کنید.'
        })
        return
      }
      this.sendOtpLoading = true
      APIGateway.auth.sendOtpSignUp({ input: this.username })
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
        this.bannerMessage = 'ثبت نام در سامانه'
      } else if (step === 'verify') {
        this.bannerMessage = 'کد تایید'
      } else if (step === 'information') {
        this.bannerMessage = 'اطلاعات کاربری'
      }
    },

    getToken () {
      return this.$store.getters['Auth/accessToken']
    },

    getEnter (targetRefKey) {
      this.$refs[targetRefKey].focus()
    },

    redirectTo () {
      let redirectTo = window.localStorage.getItem('redirectTo')
      if (!redirectTo) {
        redirectTo = 'Admin.Content.Index'
      }

      if (!this.user.isSuperUser()) {
        redirectTo = 'Admin.Installment.Index'
      }

      this.$router.push({ name: redirectTo })
    },

    register () {
      if (!this.firstname || !this.lastname || !this.password) {
        this.$q.notify({
          type: 'negative',
          message: 'نام و نام خانوادگی و کلمه عبور را وارد کنید.'
        })
        return
      }
      this.$axios.post(API_ADDRESS.auth.setPass, {
        new_password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      })
        .then(() => {
          this.loading = false
          this.$router.push({ name: 'Public.Home' })
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
    goToVerifyStep () {
      if (!this.username) {
        this.$q.notify({
          type: 'negative',
          message: 'ایمیل یا شماره تلفن همراه را وارد کنید.'
        })
        return
      }
      this.loading = true
      APIGateway.auth.sendOtpSignUp({ input: this.username })
        .then(() => {
          this.loading = false
          this.restartOtpInterval()
          // this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          // this.redirectTo()
          this.setRegisterStep('verify')
        })
        .catch(() => {
          this.loading = false
        })
    },
    verify () {
      if (!this.verifyNumber) {
        this.$q.notify({
          type: 'negative',
          message: 'کد تایید شماره همراه را وارد نکرده اید'
        })
        return
      }
      if (this.rePassword !== this.password) {
        this.$q.notify({
          type: 'negative',
          message: 'نام کلمه عبور و تکرار کلمه عبور یکسان نیستند'
        })
        return
      }
      this.loading = true
      this.$store.dispatch('Auth/signUp', {
        input: this.username,
        otp: this.verifyNumber,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      })
        .then(() => {
          this.loading = false
          this.$router.push({ name: 'Public.Home' })
          // this.setRegisterStep('information')
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

.information-top-message {
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
