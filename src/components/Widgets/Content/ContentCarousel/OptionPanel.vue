<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="q-mt-md">
        عنوان
      </div>
      <div class="row">
        <div class="col-md-8 col-12">
          <q-input v-model="localOptions.categoryTitle" />
        </div>
      </div>
      <div class="q-mt-md">
        کد دسته پدربزرگ
      </div>
      <div class="row">
        <div class="col-md-8 col-12">
          <q-input v-model="localOptions.categoryCategoryCategoryId" />
        </div>
      </div>
      <div>
        کد دسته پدر
      </div>
      <div class="row">
        <div class="col-md-4 col-12">
          <q-checkbox v-model="localOptions.categoryCategoryFromQueryParams"
                      label="استفاده از کوری پارام صفحه" />
        </div>
        <div v-if="!localOptions.categoryCategoryFromQueryParams"
             class="col-md-8 col-12">
          <q-input v-model="localOptions.categoryCategoryId" />
        </div>
      </div>
      <div>
        کد دسته فرزند
      </div>
      <div class="row">
        <div class="col-md-4 col-12">
          <q-checkbox v-model="localOptions.categoryFromQueryParams"
                      label="استفاده از کوری پارام صفحه" />
        </div>
        <div v-if="!localOptions.categoryFromQueryParams"
             class="col-md-8 col-12">
          <q-input v-model="localOptions.categoryId" />
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs
  },
  mixins: [mixinOptionPanel],
  data () {
    return {
      defaultOptions: {
        categoryTitle: 'عنوان دلخواه برای دسته محتوای مشخص شده',
        categoryId: null,
        categoryCategoryId: null,
        categoryCategoryCategoryId: null,
        categoryFromQueryParams: false,
        categoryCategoryFromQueryParams: false
      }
    }
  }
})
</script>
