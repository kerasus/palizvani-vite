<template>
  <div class="TicketCategorySelector row q-col-gutter-md">
    <div class="col-md-6 col-12">
      <div>
        معاونت
      </div>
      <q-select v-model="ticketCategoryType"
                map-options
                emit-value
                :disable="disable"
                :options="ticketCategoryTypeOptions"
                :loading="ticketCategoryTypeOptions.laoding" />
    </div>
    <div class="col-md-6 col-12">
      <div>
        دسته
      </div>
      <q-select v-model="ticketCategory"
                map-options
                emit-value
                :disable="disable"
                :options="ticketCategoryOptions"
                :loading="ticketCategoryTypeOptions.laoding" />
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { TicketCategory } from 'src/models/TicketCategory.js'

export default {
  name: 'TicketCategorySelector',
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean, Object]
    },
    disable: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:value'],
  data () {
    return {
      ticketCategoryTypeFirstChanged: false,
      ticketCategoryType: null,
      ticketCategory: null,
      ticketCategoryTypeOptions: (new TicketCategory()).typeEnums,
      ticketCategoryOptions: []
    }
  },
  watch: {
    value: {
      handler: function (newValue) {
        if (newValue?.type && newValue.id) {
          this.ticketCategoryType = newValue.type
          this.getCategories(this.ticketCategoryType)
        } else {
          this.inputData = this.value
        }
      },
      immediate: true
    },
    ticketCategoryType (newValue) {
      this.ticketCategory = null
      this.ticketCategoryOptions = []
      if (this.ticketCategoryTypeFirstChanged && newValue) {
        this.getCategories(newValue)
      } else {
        this.ticketCategoryTypeFirstChanged = true
      }
    },
    ticketCategory (newValue) {
      this.$emit('update:value', newValue)
    }
  },
  methods: {
    getCategories (type) {
      this.ticketCategoryTypeOptions.laoding = true

      APIGateway.ticketCategory.index({ type, per_page: 99999 })
        .then(categories => {
          this.ticketCategoryOptions = categories.list.list.map(item => {
            return {
              item,
              label: item.title,
              value: item.id
            }
          })

          let ticketCategory = null
          if (this.value?.type && this.value.id) {
            ticketCategory = this.value.id
          }
          if (this.value && !isNaN(this.value)) {
            ticketCategory = this.value
          }

          this.$emit('update:value', ticketCategory)
          this.ticketCategory = ticketCategory
        })
        .finally(() => {
          this.ticketCategoryTypeOptions.laoding = false
        })
    }
  }

}
</script>
