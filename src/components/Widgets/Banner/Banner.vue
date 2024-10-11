<template>
  <q-banner :style="localOptions.style"
            v-html="localOptions.text" />
</template>

<script>
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'Banner',
  mixins: [mixinPrefetchServerData, mixinWidget],
  data() {
    return {
      defaultOptions: {
        text: null
      }
    }
  }
}
</script>
