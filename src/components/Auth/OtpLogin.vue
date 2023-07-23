<template>
  <q-card v-if="!userLogin"
          class="col-lg-4 col-md-5 col-sm-6 col-xs-10 login-card my-card shadow-6">
    <q-card-section class="row bg-primary text-white justify-between">
      <div class="row login-header-right-side justify-center items-center">
        <p class="login-entry-title q-ml-md q-mb-none">ورود</p>
      </div>
      <q-avatar />
    </q-card-section>
    <q-linear-progress v-if="loadingList"
                       indeterminate
                       class="q-mt-sm" />
    <q-separator />
    <div class="q-pa-lg">
      <q-input v-if="otpStep === 'sendOtp'"
               ref="userName"
               v-model="username"
               bottom-slots
               color="blue-8"
               name="userName"
               label="شماره همراه"
               @keydown.enter="sendOtp">
        <template v-slot:before>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input v-if="otpStep === 'loginByOtp'"
               ref="otp"
               v-model="otp"
               bottom-slots
               color="blue-8"
               name="otp"
               label="کد تایید"
               @keydown.enter="loginByOtp">
        <template v-slot:before>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-card-actions align="left">
        <q-btn v-if="otpStep === 'sendOtp'"
               color="primary"
               label="ارسال کد تایید"
               @click="sendOtp" />
        <q-btn v-if="otpStep === 'loginByOtp'"
               color="primary"
               label="ورود"
               @click="loginByOtp" />
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'OTPLogin',
  mixins: [mixinAuth],
  props: {
    redirect: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    userLogin: false,
    loadingList: false,
    otpStep: 'sendOtp',
    username: null,
    password: null,
    otp: null
  }),
  computed: {
    user () {
      return this.$store.getters['Auth/user']
    }
  },
  created () {
    if (this.getToken()) {
      this.getUserData(() => { this.redirectTo() })
    }
  },
  methods: {
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

    handleErr (err) {
      this.loadingList = false
      const messages = []
      for (const key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          this.$q.notify({
            type: 'negative',
            message,
            position: 'top'
          })
        })
      }
      if (!err.data.errors) {
        if (err.data.message) messages.push(err.data.message)
        else messages.push(err.statusText)
        this.$q.notify({
          type: 'negative',
          message: messages,
          position: 'top'
        })
      }
    },

    sendOtp () {
      this.loadingList = true
      this.$axios.post(API_ADDRESS.auth.sendOtp, {
        mobile_number: this.username
      })
        .then(() => {
          this.loadingList = false
          this.otpStep = 'loginByOtp'
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    },
    loginByOtp () {
      this.loadingList = true
      this.$store.dispatch('Auth/otpLogin', {
        mobile_number: this.username,
        otp: this.otp
      })
        .then(() => {
          this.loadingList = false
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          this.$store.commit('AppLayout/showOtpLoginDialog', false)
          if (this.redirect) {
            this.redirectTo()
          }
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    }
  }
}
</script>

<style scoped>
.login-card {
  min-width: 300px;
}
</style>
