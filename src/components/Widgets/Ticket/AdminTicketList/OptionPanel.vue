<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div>
        defaultSourceType
      </div>
      <q-select v-model="localOptions.defaultSourceType"
                :options="[{ label: 'مالی', value: 'INVOICE' }, { label: 'آموزش', value: 'CLASSROOM' }, { label: 'محتوا', value: 'CONTENT' }, { label: 'حلقه های مباحثاتی', value: 'DISCUSSION_CIRCLE' }]"
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
  mixins: [mixinOptionPanel]
})
</script>
