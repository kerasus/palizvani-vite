<template>
  <div>
    <q-banner class="banner">
      اطلاعات کاربری
    </q-banner>
    <div class="top-message">
      .لطفا اطلاعات کاربری خود را وارد کنید
    </div>
    <label for="name">
      نام
    </label>
    <q-input id="name"
             v-model="name"
             outlined
             class="name-input"
             label="نام خود را وارد کنید"
             @keydown.enter="login">
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
             label="نام خانوادگی خود را وارد کنید"
             @keydown.enter="login">
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
             label="گذرواژه خود را وارد کنید"
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
           label="ثبت نام"
           @click="login" />
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins.js'

export default {
  name: 'InformationStep',
  mixins: [mixinAuth],
  props: {
    redirect: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    name: false,
    lastname: false,
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
      let redirectTo = window.localStorage.getItem('redirectTo')
      if (!redirectTo) {
        redirectTo = 'Admin.Content.Index'
      }

      if (!this.user.isSuperUser()) {
        redirectTo = 'Admin.Installment.Index'
      }

      this.$router.push({ name: redirectTo })
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
    }
  }
}
</script>

<style scoped>
.banner {
margin-bottom: 20px;
}
.top-message {
  margin-bottom: 3px;
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
