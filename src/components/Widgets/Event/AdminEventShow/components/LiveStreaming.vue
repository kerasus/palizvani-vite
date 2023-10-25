<template>
  <div v-if="event.loading">
    کمی صبر کنید...
  </div>
  <div v-else>
    <q-btn class="full-width q-mb-lg"
           color="primary"
           @click="goToLiveStreamUrl">
      رفتن به کلاس
    </q-btn>
    <iframe :src="event.live_streaming_url"
            title="W3Schools Free Online Web Tutorials"
            style="height: 80vh"
            class="full-width" />
  </div>
</template>

<script>
import { Event } from 'src/models/Event.js'

export default {
  name: 'LiveStreaming',
  props: {
    event: {
      type: Event,
      default: new Event()
    }
  },
  methods: {
    goToLiveStreamUrl () {
      window.open(this.event.live_streaming_url, '_blank')
    }
  }
}
</script>
