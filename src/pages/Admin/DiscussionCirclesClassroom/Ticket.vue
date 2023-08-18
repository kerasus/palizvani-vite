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
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AdminTicketList', options: { 0: { label: 'مالی', value: 'INVOICE' }, 1: { label: 'آموزش', value: 'TRAINING_CLASSROOM' }, 2: { label: 'حلقه های مباحثاتی', value: 'DISCUSSION_CIRCLE_CLASSROOM' }, 3: { label: 'SESSION', value: 'SESSION' }, style: {}, defaultSourceType: 'DISCUSSION_CIRCLE_CLASSROOM' } }], options: { style: { paddingTop: '' } } }], options: { className: '', height: 'auto', boxed: true, boxedWidth: 1200, gutterXSize: 'md', gutterYSize: 'md', absolute: 'none', paddingOfBoxedInFullWidth: '30px', style: { maxWidth: '1200px', width: '1200px' } } }] }, options: { fullHeight: false, backgrounds: { xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null } }, verticalAlign: null, style: { minHeight: 'auto' } } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
