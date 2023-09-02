<template>
  <overdue-instalments v-if="mounted" />
</template>

<script>
import OverdueInstalments from 'src/components/Widgets/Invoice/OverdueInstalments/OverdueInstalments.vue'

export default {
  name: 'UserPanel.Profile.AllClassrooms',
  components: {
    OverdueInstalments
  },
  data () {
    return {
      mounted: false
    }
  },
  mounted () {
    this.mounted = true
  }
}
</script>
