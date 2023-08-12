<template>
  <q-card class="EntityIndexGridItem">
    <q-card-section v-if="inputData.props?.cols && inputData.props.cols.length > 0">
      <div v-for="(col, colIndex) in inputData.props.cols"
           :key="colIndex"
           class="table-column">
        <slot name="col"
              :col="col"
              :row="inputData.props.row">
          <div class="label"
               v-html="col.label" />
          <div class="value"
               v-html="col.field(inputData.props.row)" />
        </slot>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'EntityIndexGridItem',
  props: {
    inputData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted() {
    console.log('inputData', this.inputData)
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.EntityIndexGridItem {
  width: 100%;
  margin-bottom: 8px;
  .table-column {
    margin-bottom: 16px;
    .label {
      color: #616161;
    }
    .value {}
  }
}
</style>
