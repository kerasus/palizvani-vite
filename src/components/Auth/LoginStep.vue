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
             placeholder="ایمیل یا شماره تلفن همراه خود را وارد کنید"
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
             placeholder="گذرواژه خود را وارد کنید"
             :type="visibilityIcon === 'visibility' ? 'password' : 'text'"
             @keydown.enter="login">
      <template v-slot:prepend>
        <q-icon name="lock_open" />
      </template>
      <template v-slot:append>
        <q-icon :name="visibilityIcon"
                class="cursor-pointer"
                @click="toggleVisibilityIcon" />
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
  data () {
    return {
      userLogin: false,
      loadingList: false,
      visibilityIcon: 'visibility',
      otpStep: 'sendOtp',
      username: null,
      password: null,
      otp: null
    }
  },
  created () {
    // if (this.getToken()) {
    //   this.getUserData(() => { this.redirectTo() })
    // }
  },
  methods: {
    toggleVisibilityIcon () {
      this.visibilityIcon = this.visibilityIcon === 'visibility' ? 'visibility_off' : 'visibility'
    },
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
      if (!this.username || !this.password) {
        this.$q.notify({
          type: 'negative',
          message: 'نام کاربری و کلمه عبور را وارد کنید.'
        })
        return
      }
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
