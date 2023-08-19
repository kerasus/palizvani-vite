<template>
  <div class="AdminLayout">
    <router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Router from 'src/router/Router.vue'

export default {
  components: { Router },
  data () {
    return {
      keepAliveComponents: []
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', window.screen.width > this.$q.screen.sizes.md)
    }
  },
  methods: {
    hasRoute (route) {
      if (!route) {
        return
      }
      return !!(route.name || route.path)
    },
    getRoute (route) {
      if (!this.hasRoute(route)) {
        return { name: null }
      }
      if (route.name) {
        return { name: route.name }
      } else if (route.path) {
        return { path: route.path }
      } else {
        return { name: null }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.AdminLayout {
  background: #F9F9F9;
  padding: 35px 35px 35px 61px;
  @media screen and (max-width: 1023px) {
    padding: 15px 10px !important;
  }
}
</style>
