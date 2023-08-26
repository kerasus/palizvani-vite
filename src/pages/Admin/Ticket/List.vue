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
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AdminTicketList', options: { 0: { label: 'قابل انتخاب', value: null }, 1: { label: 'مالی', value: 'INVOICE' }, 2: { label: 'آموزش', value: 'TRAINING_CLASSROOM' }, 3: { label: 'حلقه های مباحثاتی', value: 'DISCUSSION_CIRCLE_CLASSROOM' }, 4: { label: 'محتوا', value: 'CONTENT' }, 5: { label: 'SESSION', value: 'SESSION' }, style: {}, defaultCategoryType: 'EDUCATIONAL' } }], options: { style: { paddingTop: '', marginBottom: '124px' } } }], options: {} }] } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
