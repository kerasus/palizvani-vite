<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div>
        defaultCategoryType
      </div>
      <q-select v-model="localOptions.defaultCategoryType"
                :options="categoryTypeOptions"
                emit-value
                map-options />
      <!--      <div>-->
      <!--        defaultSourceType-->
      <!--      </div>-->
      <!--      <q-select v-model="localOptions.defaultSourceType"-->
      <!--                :options="options"-->
      <!--                emit-value-->
      <!--                map-options />-->
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import { TicketCategory } from 'src/models/TicketCategory.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs
  },
  mixins: [mixinOptionPanel],
  data () {
    const ticketCategoryTypes = (new TicketCategory()).typeEnums
    ticketCategoryTypes.push({ label: 'قابل انتخاب', value: null })
    return {
      options: [
        { label: 'قابل انتخاب', value: null },
        { label: 'مالی', value: 'INVOICE' },
        { label: 'آموزش', value: 'TRAINING_CLASSROOM' },
        { label: 'حلقه های مباحثاتی', value: 'DISCUSSION_CIRCLE_CLASSROOM' },
        { label: 'محتوا', value: 'CONTENT' },
        { label: 'SESSION', value: 'SESSION' }
      ],
      categoryTypeOptions: ticketCategoryTypes
    }
  }
})
</script>
