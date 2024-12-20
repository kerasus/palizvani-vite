<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-input v-model="localOptions.categoryId"
               label="category id" />
      <q-input v-model="localOptions.categoryParentId"
               label="category parent id" />
      <q-input v-model="localOptions.categoryParentParentId"
               label="category parent parent id" />
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs
  },
  mixins: [mixinOptionPanel],
  data() {
    return {
      defaultOptions: {
        categoryId: null,
        categoryParentId: null,
        categoryParentParentId: 1
      }
    }
  }
})
</script>
