<template>
  <q-btn :label="label"
         :color="color"
         :class="btnClass"
         :disable="disable"
         :loading="loading"
         @click="atClick" />
</template>

<script>
export default {
  name: 'BtnControl',
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    btnClass: {
      default: '',
      type: String
    },
    color: {
      default: 'primary',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    disable: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    },
    atClick: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      inputData: null
    }
  },
  created () {
    this.inputData = this.value
  }
}
</script>
