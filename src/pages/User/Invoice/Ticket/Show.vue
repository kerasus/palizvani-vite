<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'AdminPanel.Package.Show',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'TicketShow', options: { style: {}, defaultSourceType: { label: 'مالی', value: 'INVOICE' } } }], options: { style: { paddingTop: '124px', paddingBottom: '100px' } } }], options: { className: '', height: 'auto', boxed: true, boxedWidth: 1200, gutterXSize: 'md', gutterYSize: 'md', absolute: 'none', paddingOfBoxedInFullWidth: '30px', style: { maxWidth: '1200px', width: '1200px' } } }] } }]
    }
  },
  created() {
    this.currenSections = this.sections
    this.pageBuilderLoading = false
  }
}
</script>
