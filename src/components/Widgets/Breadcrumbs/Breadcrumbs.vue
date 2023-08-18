<template>
  <div class="Breadcrumbs"
       :style="localOptions.style">
    <q-breadcrumbs v-if="breadcrumbs.visible">
      <template v-slot:separator>
        <q-icon name="chevron_right"
                color="gray" />
      </template>
      <q-breadcrumbs-el v-for="(el, elIndex) in breadcrumbs.path"
                        :key="elIndex"
                        :to="el.to"
                        :label="el.label" />
    </q-breadcrumbs>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'Breadcrumbs',
  mixins: [mixinWidget],
  computed: {
    breadcrumbs () {
      return this.$store.getters['AppLayout/breadcrumbs']
    }
  }
}
</script>

<style lang="scss" scoped>
.Breadcrumbs {

}
</style>
