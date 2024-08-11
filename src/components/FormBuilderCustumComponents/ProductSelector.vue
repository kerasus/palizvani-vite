<template>
  <entity-index v-model:table-selected-values="selected"
                :value="inputs"
                :title="label"
                :api="api"
                :table="table"
                :table-keys="tableKeys"
                :table-selection-mode="selectionMode"
                :show-close-button="false"
                :show-expand-button="false"
                :show-reload-button="false"
                :show-search-button="true"
                :row-key="itemIdentifyKey"
                :item-indicator-key="itemIndicatorKey"
                @onInputClick="onInputClick"
                @update:table-selected-values="onSelectedUpdate" />
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import { Product } from 'src/models/Product.js'
import { inputMixin } from 'quasar-form-builder'
import { APIGateway } from 'src/api/APIGateway.js'
import ContentCategorySelector from 'src/components/FormBuilderCustumComponents/ContentCategorySelector.vue'

const ContentCategorySelectorComp = shallowRef(ContentCategorySelector)

export default {
  name: 'EntityInput',
  components: {
    EntityIndex
  },
  mixins: [inputMixin],
  props: {
    value: {
      default: null
    },
    selectionMode: {
      type: String,
      default: 'single'
    }
  },
  emits: ['onInputClick'],
  data () {
    return {
      selected: [],
      api: APIGateway.product.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: ContentCategorySelectorComp, name: 'store_category', responseKey: 'store_category_info', categoryType: 'store', col: 'col-md-12 col-12' },
        { type: 'select', name: 'is_physical', label: 'جنس محصول', options: (new Product()).is_physicalEnums, placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'select', name: 'physical_type', label: 'نوع محصول فیزیکی', options: (new Product()).physical_typeEnums, placeholder: ' ', col: 'col-md-6 col-12' }
      ],
      table: {
        columns: [
          {
            name: 'number',
            required: true,
            label: 'شناسه',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'title',
            required: true,
            label: 'نام محصول',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'is_physical_info',
            required: true,
            label: 'جنس',
            align: 'left',
            field: row => (new Product(row)).is_physical_info.label
          },
          {
            name: 'content_category',
            required: true,
            label: 'دسته',
            align: 'left',
            field: row => row.store_category_info?.parent?.parent?.title + '، ' + row.store_category_info?.parent?.title + '، ' + row.store_category_info?.title
          },
          {
            name: 'unit_price',
            required: true,
            label: 'قیمت',
            align: 'left',
            field: row => parseInt(row.unit_price.toString()).toLocaleString('fa')
          // },
          // {
          //   name: 'is_visible',
          //   required: true,
          //   label: 'نمایش',
          //   align: 'left',
          //   field: '-'
          }
        ]
      },
      itemIdentifyKey: 'id',
      itemIndicatorKey: (product) => product ? product.title + '(' + product.id + ')' : '-'
    }
  },
  watch: {
    value: {
      handler (newValue) {
        if (newValue) {
          this.selected = newValue
        }
      },
      immediate: true
    }
  },
  methods: {
    onInputClick(event) {
      this.$emit('onInputClick', event)
    },
    onSelectedUpdate (values) {
      let selected = (this.selectionMode === 'multiple') ? [] : null
      values.forEach(vlue => {
        if (this.selectionMode === 'multiple') {
          selected.push(vlue)
        } else {
          selected = vlue
        }
      })
      this.selected = selected
      this.inputData = selected
      if (this.selectionMode === 'multiple') {
        this.$emit('update:value', selected.map(product => product.id))
      } else {
        this.$emit('update:value', selected.id)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
