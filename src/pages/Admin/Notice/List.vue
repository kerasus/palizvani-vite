<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'AdminPanel.Package.List',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AdminNoticeList', options: { style: { marginBottom: '24px' } } }, { name: 'AdminNoticeCreate' }], options: {} }], options: {} }] } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
