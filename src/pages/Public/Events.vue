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
  name: 'Public.AllEvents',
  mixins: [mixinAuth],
  // mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO]
  data () {
    return {
      pageConfig: {},
      pageBuilderEditable: false,
      pageBuilderLoading: false,
      currenSections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AllClassrooms', options: { style: {}, classroomType: 'EVENT' } }], options: {} }], options: { boxed: true } }] } }]
    }
  },
  mounted() {
    if (this.user && this.user.id !== null) {
      this.currenSections = [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AllClassrooms', options: { style: {}, classroomType: 'EVENT' } }, { name: 'RegistrationList', options: { style: { marginBottom: '32px' }, classroomType: 'EVENT' } }], options: {} }], options: { boxed: true } }] } }]
    }
  }
}
</script>
