<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'UserPanel.Invoice.Thankyou',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'InvoiceThankyou' }] }], options: {} }] }, options: { fullHeight: true, backgrounds: { xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null } }, verticalAlign: 'center', style: { minHeight: '100vh' } } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
