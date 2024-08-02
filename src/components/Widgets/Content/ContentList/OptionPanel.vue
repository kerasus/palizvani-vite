<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="q-mt-md">
        کد دسته پدربزرگ
      </div>
      <div class="row">
        <div class="col-md-4 col-12">
          <q-checkbox v-model="localOptions.categoryCategoryCategoryFromQueryParams"
                      label="استفاده از کوری پارام صفحه" />
        </div>
        <div v-if="!localOptions.categoryCategoryCategoryFromQueryParams"
             class="col-md-8 col-12">
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
      <div>
        نام کلاس دکمه های موجود در کامپوننت
      </div>
      <div class="row">
        <div class="col-md-8 col-12">
          <q-input v-model="localOptions.btnShowPostClassName" />
        </div>
      </div>
      <div class="q-mt-md">
        <q-input v-model="localOptions.postShowRouteName"
                 label="post show Route name" />
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
        postShowRouteName: 'Public.Post.Show',
        btnShowPostClassName: null,
        categoryId: null,
        categoryCategoryId: null,
        categoryCategoryCategoryId: null,
        categoryFromQueryParams: false,
        categoryCategoryFromQueryParams: false,
        categoryCategoryCategoryFromQueryParams: false
      }
    }
  }
})
</script>
