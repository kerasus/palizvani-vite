<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions, mixinPrefetchServerData, mixinSEO } from 'src/mixin/Mixins.js'

export default {
  name: 'index',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO],
  data () {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'HomePageFirstSection' }] }], options: { boxed: true } }] }, options: { fullHeight: true, backgrounds: { xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null } }, verticalAlign: 'center', background: { image: 'assets/images/web/homepage-first-section-background.png', position: 'center', size: 'cover', repeat: 'no-repeat', attachment: 'fixed' }, style: { marginTop: '-120px', minHeight: '100vh', backgroundImage: "url('assets/images/web/homepage-first-section-background.png')", backgroundAttachment: 'fixed' } } }, { data: { rows: [{ cols: [{ widgets: [{ name: 'ClassroomCarousel' }] }], options: { boxed: true } }] }, options: { background: { color: '#F6F6F6' } } }]
    }
  }
  // mounted () {
  //   this.currenSections = this.sections
  //   this.pageBuilderLoading = false
  // }
}
</script>
