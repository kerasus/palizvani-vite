<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
// import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import { mixinAuth } from 'src/mixin/Mixins.js'

export default {
  name: 'Public.AllClassrooms',
  // mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO],
  mixins: [mixinAuth],
  data () {
    return {
      pageConfig: {},
      pageBuilderEditable: false,
      pageBuilderLoading: false,
      currenSections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AllClassrooms', options: { imageSource: null, ratio: null, hasAction: false, useAEEEvent: false, AEEEventBody: { id: '-', name: '-', creative: null, position: null }, action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null }, xs: { height: null, width: null, src: null }, sm: { height: null, width: null, src: null }, md: { height: null, width: null, src: null }, lg: { height: null, width: null, src: null }, xl: { height: null, width: null, src: null }, style: { marginBottom: '32px' } } }] }], options: { boxed: true } }] } }]
    }
  },
  mounted() {
    if (this.user && this.user.id !== null) {
      this.currenSections = [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AllClassrooms', options: { imageSource: null, ratio: null, hasAction: false, useAEEEvent: false, AEEEventBody: { id: '-', name: '-', creative: null, position: null }, action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null }, xs: { height: null, width: null, src: null }, sm: { height: null, width: null, src: null }, md: { height: null, width: null, src: null }, lg: { height: null, width: null, src: null }, xl: { height: null, width: null, src: null }, style: { marginBottom: '32px' } } }, { name: 'RegistrationList', options: { style: { marginBottom: '32px' } } }] }], options: { boxed: true } }] } }]
    }
  }
}
</script>
