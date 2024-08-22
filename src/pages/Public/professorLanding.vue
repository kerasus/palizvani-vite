<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { PageSetting } from 'src/models/PageSetting.js'
import { mixinSEO, mixinPageOptions, mixinPrefetchServerData, mixinAuth } from 'src/mixin/Mixins.js'

export default {
  name: 'Landing',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO, mixinAuth],
  computed: {
    hasDynamicSetting () {
      return !!this.$route.meta?.hasDynamicSetting
    },
    hasDynamicSettingWithParams () {
      return !!this.$route.meta?.hasDynamicSettingWithParams
    }
  },
  methods: {
    onFailedFetchData () {
      setTimeout(() => {
        this.checkNewLanding()
      }, 1000)
    },
    goToNotFoundLanding () {
      // this.$router.push({ name: 'NotFound' })
      this.$router.push({ name: 'Public.Home' })
    },
    checkNewLanding () {
      if (!this.isUserLogin || !this.user.isSuperUser()) {
        this.goToNotFoundLanding()
        return
      }

      this.$q.dialog({
        title: 'ساخت صفحه استاد جدید',
        message: 'از نام لندینگ ' + this.$route.params.professor_name + ' اطمینان دارید؟ ',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.createNewLanding()
      }).onCancel(() => {
        // this.$router.push({ name: 'Public.Home' })
        this.goToNotFoundLanding()
      })
    },
    createNewLanding () {
      const params = JSON.stringify(this.$route.params)
      const routeName = this.$route.name
      const key = 'route_name:' + routeName + '-params:' + params
      const value = new PageSetting({
        value: { sections: [], seo: {}, layoutConfig: {} }
      }).getStringifyValue()
      APIGateway.pageSetting.create({ key, value })
        .then(() => {
          this.currenSections = []
        })
    }
  }
}
</script>
