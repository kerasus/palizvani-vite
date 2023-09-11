<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div>
        کد دسته
      </div>
      <q-input v-model="localOptions.categoryId" />
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
  mixins: [mixinOptionPanel]
})
</script>
