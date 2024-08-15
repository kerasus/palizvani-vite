<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'Admin.Store.Basket.List',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'UserStoreBasketList' }], options: {} }], options: { className: '', height: 'auto', boxed: true, boxedWidth: 1200, gutterXSize: 'md', gutterYSize: 'md', absolute: 'none', paddingOfBoxedInFullWidth: '10px', alignment: { justifyContent: { global: null, xl: null, lg: null, md: null, sm: null, xs: null }, alignItems: { global: null, xl: null, lg: null, md: null, sm: null, xs: null }, alignContent: { global: null, xl: null, lg: null, md: null, sm: null, xs: null } }, style: { maxWidth: '1200px', width: '1200px' } } }] } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
