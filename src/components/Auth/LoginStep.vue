<template>
  <div>
    <q-banner class="banner">
      ورود به سامانه
    </q-banner>
    <label for="username">
      ایمیل یا شماره تلفن همراه یا کدملی
    </label>
    <q-input id="username"
             v-model="username"
             outlined
             class="username-input"
             label="ایمیل یا شماره تلفن همراه خود را وارد کنید"
             @keydown.enter="login">
      <template v-slot:prepend>
        <q-icon name="person" />
      </template>
    </q-input>
    <label class="password-label"
           for="password">
      <span>
        گذرواژه
      </span>
      <span class="btn-forgot-pass-span"
            @click="goToForgetStep">
        فراموشی گذرواژه
      </span>
    </label>
    <q-input id="password"
             v-model="password"
             outlined
             class="password-input"
             label="گذرواژه خود را وارد کنید"
             type="password"
             @keydown.enter="login">
      <template v-slot:prepend>
        <q-icon name="person" />
      </template>
      <template v-slot:append>
        <q-icon name="person" />
      </template>
    </q-input>
    <q-btn class="full-width btn-login"
           color="primary"
           label="ورود به سامانه"
           :loading="loadingList"
           @click="login" />
    <div>
      حساب کاربری ندارید؟
      <span class="btn-register-span"
            @click="goToRegisterStep">
        ثبت نام کنید
      </span>
    </div>
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins.js'

export default {
  name: 'LoginStep',
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
    username: '09123456789',
    password: '09123456789',
    otp: null
  }),
  computed: {
    user () {
      return this.$store.getters['Auth/user']
    }
  },
  created () {
    // if (this.getToken()) {
    //   this.getUserData(() => { this.redirectTo() })
    // }
  },
  methods: {
    getToken () {
      return this.$store.getters['Auth/accessToken']
    },

    getEnter (targetRefKey) {
      this.$refs[targetRefKey].focus()
    },

    redirectTo () {
      let redirectTo = this.$store.getters['Auth/redirectTo']
      // if (!redirectTo) {
      //   redirectTo = 'Admin.User.Index'
      // }

      if (!redirectTo && this.user.canSeeAdminPanel()) {
        redirectTo = { name: 'Admin.User.Index' }
      } else if (!redirectTo) {
        redirectTo = { name: 'Public.Home' }
      }

      this.$router.push(redirectTo)
    },

    login () {
      this.loadingList = true
      this.$store.dispatch('Auth/login', {
        input: this.username,
        password: this.password
      })
        .then(() => {
          this.loadingList = false
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          this.redirectTo()
        })
        .catch(() => {
          this.loadingList = false
        })
    },
    goToRegisterStep () {
      this.$emit('goToRegisterStep')
    },
    goToForgetStep () {
      this.$emit('goToForgetStep')
    }
  }
}
</script>

<style scoped>
.banner {
margin-bottom: 30px;
}
.username-input, .password-input {
  margin-top: 6px;
}
.username-input {
  margin-bottom: 27px;
}
.password-input {
  margin-bottom: 50px;
}
.btn-login {
  margin-bottom: 40px;
  font-size: 18px;
}
.password-label {
  display: flex;
  justify-content: space-between;
}
.btn-forgot-pass-span {
  color: #5B7A5F;
  font-size: 14px;
  cursor: pointer;
}
.btn-register-span {
  color: #475F4A;
  font-size: 16px;
  cursor: pointer;
}
</style>
