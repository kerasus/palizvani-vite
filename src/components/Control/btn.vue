<template>
  <div :class="customClass">
    <div v-if="placeholder && label"
         class="outside-label" />
    <q-btn :label="label"
           :color="color"
           :class="btnClass"
           :disable="disable"
           :loading="loading"
           @click="onClick" />
  </div>
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
    placeholder: {
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
    customClass: {
      default: '',
      type: String
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
  },
  methods: {
    onClick (event) {
      this.atClick()
      this.$emit('onClick', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.outside-label {
  height: 25px;
}
</style>
