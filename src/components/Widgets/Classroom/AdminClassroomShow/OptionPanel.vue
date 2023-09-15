<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-option-group v-model="localOptions.classroomType"
                      :options="classroomTypeOptions" />
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
  data () {
    return {
      classroomTypeOptions: [
        {
          label: 'دوره آموزشی',
          value: 'Classroom'
        },
        {
          label: 'حلقه مباحثاتی',
          value: 'DiscussionCircles'
        }
      ]
    }
  }
})
</script>
