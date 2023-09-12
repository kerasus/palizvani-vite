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
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AdminTicketList', options: { 0: { label: 'قابل انتخاب', value: null }, 1: { label: 'مالی', value: 'INVOICE' }, 2: { label: 'آموزش', value: 'TRAINING_CLASSROOM' }, 3: { label: 'حلقه های مباحثاتی', value: 'DISCUSSION_CIRCLE_CLASSROOM' }, 4: { label: 'محتوا', value: 'CONTENT' }, 5: { label: 'SESSION', value: 'SESSION' }, style: {}, defaultCategoryType: 'CONTENT' } }], options: { style: { paddingTop: '' } } }], options: { className: '', height: 'auto', boxed: true, boxedWidth: 1200, gutterXSize: 'md', gutterYSize: 'md', absolute: 'none', paddingOfBoxedInFullWidth: '30px', style: { maxWidth: '1200px', width: '1200px' } } }] }, options: { fullHeight: false, backgrounds: { xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null } }, verticalAlign: null, style: { minHeight: 'auto' } } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
