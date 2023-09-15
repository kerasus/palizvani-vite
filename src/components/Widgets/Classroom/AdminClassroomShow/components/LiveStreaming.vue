<template>
  <div v-if="classroom.loading">
    کمی صبر کنید...
  </div>
  <div v-else>
    <q-btn class="full-width q-mb-lg"
           color="primary"
           @click="goToLiveStreamUrl">
      رفتن به کلاس
    </q-btn>
    <iframe :src="classroom.live_streaming_url"
            title="W3Schools Free Online Web Tutorials"
            style="height: 80vh"
            class="full-width" />
  </div>
</template>

<script>
import { Classroom } from 'src/models/Classroom.js'

export default {
  name: 'LiveStreaming',
  props: {
    classroom: {
      type: Classroom,
      default: new Classroom()
    }
  },
  methods: {
    goToLiveStreamUrl () {
      window.open(this.classroom.live_streaming_url, '_blank')
    }
  }
}
</script>
