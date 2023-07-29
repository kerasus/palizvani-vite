<template>
  <div class="AdminLayout">
    <div v-if="breadcrumbsVisibility && false"
         class="q-mb-md">
      <q-skeleton v-if="!breadcrumbs.path"
                  width="100px"
                  height="10px" />
      <q-breadcrumbs v-else
                     class="breadcrumbs"
                     separator-color="dark"
                     gutter="sm">
        <template v-slot:separator>
          <q-icon name="isax:arrow-right-3 " />
        </template>
        <q-breadcrumbs-el v-for="(breadcrumb, index) in breadcrumbs.path"
                          :key="index"
                          :icon=breadcrumb.icon
                          :label=breadcrumb.title
                          :to="getRoute(breadcrumb.route)"
                          class="q-breadcrumbs-el">
          <q-skeleton v-if="breadcrumb.loading"
                      width="100px"
                      height="10px" />
        </q-breadcrumbs-el>
      </q-breadcrumbs>
    </div>
    <router :include="keepAliveComponents" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Router from 'src/router/Router.vue'

export default {
  components: { Router },
  data () {
    return {
      keepAliveComponents: []
    }
  },
  computed: {
    ...mapGetters('AppLayout', [
      'breadcrumbsVisibility',
      'breadcrumbs',
      'breadcrumbLoading'
    ])
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
  padding: 35px 35px 35px 61px;
  @media screen and (max-width: 1023px) {
    padding: 15px 10px !important;
  }
}
</style>
