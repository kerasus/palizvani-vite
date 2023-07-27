<template>
  <div v-if="type === 'main'"
       class="FooterTemplate">
    <main-footer />
  </div>
  <div v-else />
</template>

<script>
import MainFooter from 'src/components/Template/Footer/MainFooter.vue'

export default {
  name: 'FooterTemplate',
  components: { MainFooter },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>
