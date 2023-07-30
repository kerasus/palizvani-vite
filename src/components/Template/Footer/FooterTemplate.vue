<template>
  <div class="FooterTemplate">
    <main-footer v-if="type === 'main'" />
    <panel-footer v-if="type === 'panel'" />
  </div>
</template>

<script>
import MainFooter from 'src/components/Template/Footer/MainFooter.vue'
import PanelFooter from 'src/components/Template/Footer/PanelFooter.vue'

export default {
  name: 'FooterTemplate',
  components: { MainFooter, PanelFooter },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>
