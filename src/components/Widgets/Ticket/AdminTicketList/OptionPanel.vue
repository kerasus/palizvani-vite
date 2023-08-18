<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div>
        defaultSourceType
      </div>
      <q-select v-model="localOptions.defaultSourceType"
                :options="options"
                emit-value
                map-options />
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
  data: () => {
    return {
      options: [
        { label: 'مالی', value: 'INVOICE' },
        { label: 'آموزش', value: 'TRAINING_CLASSROOM' },
        { label: 'حلقه های مباحثاتی', value: 'DISCUSSION_CIRCLE_CLASSROOM' },
        { label: 'محتوا', value: 'CONTENT' },
        { label: 'SESSION', value: 'SESSION' }
      ]
    }
  }
})
</script>
