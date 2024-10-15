<template>
  <q-banner :style="localOptions.style">
    <div v-html="localOptions.text" />
  </q-banner>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'Banner',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        style: null,
        text: null
      }
    }
  }
}
</script>
