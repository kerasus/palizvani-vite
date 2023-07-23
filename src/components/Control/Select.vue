<template>
  <q-select v-model="inputData"
            transition-show="jump-down"
            transition-hide="jump-up"
            :option-value="optionValue"
            :option-label="optionLabel"
            :option-disable="optionDisable"
            :options="filteredOptions"
            :label="label"
            :multiple="multiple"
            :use-chips="useChips"
            use-input
            input-debounce="500"
            :disable="disable"
            :loading="loading"
            emit-value
            map-options
            clearable
            class="custom-SelectControl"
            @update:model-value="change($event)"
            @new-value="createValue"
            @filter="filterFn">
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          موردی یافت نشد
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  name: 'SelectControl',
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    options: {
      default: () => [],
      type: Array
    },
    optionDisable: {
      default: 'disable',
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
    optionValue: {
      default: 'value',
      type: String
    },
    optionLabel: {
      default: 'label',
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    useChips: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:value', 'input', 'change'],
  data () {
    return {
      inputData: null,
      model: null,
      filteredOptions: this.options
    }
  },
  watch: {
    value () {
      this.inputData = this.value
    }
  },
  created () {
    this.inputData = this.value
  },
  methods: {
    change (val) {
      this.$emit('update:value', val)
    },
    getValues () {
      function getFlatInputs (inputs) {
        let values = []
        inputs.forEach(input => {
          if (input.type !== 'formBuilder') {
            values.push(input)
          } else {
            const formBuilderInputs = getFlatInputs(input.value)
            values = values.concat(formBuilderInputs)
          }
        })
        return values
      }

      return getFlatInputs(this.inputData)
    },
    filterFn (val, update) {
      const isObjectList = (this.options.length > 0 && typeof this.options[0] === 'object')

      if (val === '') {
        update(() => {
          this.filteredOptions = this.options
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredOptions = this.options.filter(v => {
          const itemLabel = (isObjectList) ? v[this.optionLabel] : v
          return itemLabel.toString().toLowerCase().indexOf(needle) > -1
        })
      })
    },
    createValue (val, done) {
      if (!this.createNewValue) {
        return
      }
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      if (val.length > 0) {
        if (!this.filteredOptions.includes(val)) {
          this.filteredOptions.push(val)
        }
        done(val, 'toggle')
      }
    }
  }

}
</script>

<style lang="scss">
.custom-SelectControl.q-field {
  .q-field__native {
    padding-left: 23px;
  }
}

.q-menu.q-position-engine {
  .q-item.q-item--active {
    background-color: #c6c6c6;
    color: white;
    border-bottom: solid 1px #a2a2a2;
  }
}

</style>
