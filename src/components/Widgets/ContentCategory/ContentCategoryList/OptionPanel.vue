<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-banner class="q-mt-md">
        نوع لیست دسته
      </q-banner>
      <div>
        <q-option-group v-model="localOptions.listType"
                        :options="listTypeOptions"
                        color="primary" />
      </div>
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
      listTypeOptions: [
        {
          label: 'پدر بزرگ',
          value: 'category_parent_parent'
        },
        {
          label: 'پدر',
          value: 'category_parent'
        },
        {
          label: 'فرزند',
          value: 'category'
        }
      ],
      defaultOptions: {
        listType: 'category_parent_parent'
      }
    }
  }
})
</script>
