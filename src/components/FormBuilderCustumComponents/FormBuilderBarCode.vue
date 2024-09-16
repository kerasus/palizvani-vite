<template>
  <div class="FormBuilderBarCode">
    <div class="label">{{ label }}</div>
    <svg :id="barcodeId" />
  </div>
</template>

<script>
import { uid } from 'quasar'
import JsBarcode from 'jsbarcode'

export default {
  name: 'FormBuilderBarCode',
  props: {
    label: {
      default: '',
      type: String
    },
    value: {
      default: '',
      type: [String, Number]
    }
  },
  data () {
    return {
      barcodeId: null
    }
  },
  mounted() {
    this.loadBarcode()
  },
  methods: {
    loadBarcode () {
      this.barcodeId = 'FormBuilderBarCode-' + uid()
      setTimeout(() => {
        JsBarcode('#' + this.barcodeId, this.value, {
          // format: 'pharmacode',
          lineColor: '#0aa',
          width: 2,
          height: 50,
          displayValue: false
        })
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
.FormBuilderBarCode {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 0;
}
</style>
