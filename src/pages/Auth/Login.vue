<template>
  <div class="login-page">
    <!--    <auth-login />-->
    <login-component />
  </div>
</template>

<script>
// import AuthLogin from 'src/components/Auth.vue'
import LoginComponent from 'src/components/Auth/LoginComponent.vue'

export default {
  name: 'Login',
  // components: { AuthLogin },
  components: { LoginComponent },
  computed: {
    isUserLogin () {
      return this.$store.getters['Auth/isUserLogin']
    }
  },
  mounted () {
    this.handleAuthenticatedUser()
  },
  methods: {
    redirectTo () {
      let redirectTo = this.$store.getters['Auth/redirectTo']
      if (this.redirect) {
        redirectTo = this.redirect
      }
      if (redirectTo === null || typeof redirectTo !== 'object') {
        redirectTo = { name: 'Public.Home' }
      }
      this.$router.push(redirectTo)
      this.$store.commit('Auth/updateRedirectTo', null)
    },
    handleAuthenticatedUser () {
      // ToDo: must check this if
      if (this.isUserLogin) {
        // this.$router.push({ name: 'Public.Home' })
        this.redirectTo()
        return
      }
      this.$store.dispatch('Auth/logOut', { clearRedirectTo: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
