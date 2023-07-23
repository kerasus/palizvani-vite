<template>
  <div>
    <div class="q-mb-md">
      <q-banner class="banner q-mb-md">
        پیش نیازها
      </q-banner>
      <div class="row q-col-gutter-md">
        <div class="col-md-3">
          <select-control v-model:value="prerequisite.category"
                          :options="categories"
                          :disable="categoriesLoading"
                          :loading="categoriesLoading"
                          optionValue="id"
                          optionLabel="title"
                          label="دسته بندی"
                          @update:model-value="getUnits" />
        </div>
        <div class="col-md-3">
          <select-control v-model:value="prerequisite.unit"
                          :options="units"
                          :disable="unitsLoading"
                          :loading="unitsLoading"
                          optionValue="id"
                          optionLabel="title"
                          label="درس" />
        </div>
        <div class="col-md-3">
          <q-btn color="primary"
                 label="افزودن"
                 class="btn-add-unit"
                 @click="addPostRequisites" />
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div v-for="(prerequisite, key) in prerequisites"
           :key="key"
           class="col-md-3">
        <div class="preItem">
          <div class="preItem-title">
            {{ prerequisite.category.title }},
            {{ prerequisite.unit.title }}
          </div>
          <div class="preItem-actions">
            <div class="view">
              <svg data-name="Component 14 – 2"
                   xmlns="http://www.w3.org/2000/svg"
                   width="42"
                   height="42"
                   viewBox="0 0 42 42"
                   @click="showUnit(prerequisite.unit.id)">
                <g data-name="Rectangle 3232"
                   fill="#fff"
                   stroke="#475f4a"
                   stroke-width="1">
                  <rect width="42"
                        height="42"
                        rx="7"
                        stroke="none" />
                  <rect x="0.5"
                        y="0.5"
                        width="41"
                        height="41"
                        rx="6.5"
                        fill="none" />
                </g>
                <g transform="translate(11 13)">
                  <path data-name="Combined Shape"
                        d="M10,16.1H10c-4.136,0-7.85-2.9-9.936-7.757a.765.765,0,0,1,0-.591C2.147,2.9,5.861,0,10,0H10c4.136,0,7.851,2.9,9.937,7.757a.75.75,0,0,1,0,.591C17.853,13.2,14.139,16.1,10,16.1ZM1.57,8.051c1.857,4.1,5.009,6.552,8.43,6.554s6.574-2.452,8.429-6.554C16.573,3.951,13.422,1.5,10,1.5S3.427,3.951,1.57,8.051Zm4.519,0A3.911,3.911,0,1,1,10,11.963,3.916,3.916,0,0,1,6.089,8.053Zm1.5,0A2.412,2.412,0,1,0,10,5.641,2.413,2.413,0,0,0,7.589,8.053Z"
                        transform="translate(0 0.001)"
                        fill="#475f4a" />
                </g>
              </svg>
            </div>
            <div class="remove">
              <svg data-name="Component 13 – 43"
                   xmlns="http://www.w3.org/2000/svg"
                   width="42"
                   height="42"
                   viewBox="0 0 42 42"
                   @click="removeUnit(prerequisite.unit.id)">
                <g data-name="Rectangle 3219"
                   fill="#fff"
                   stroke="#f83a3a"
                   stroke-width="1">
                  <rect width="42"
                        height="42"
                        rx="7"
                        stroke="none" />
                  <rect x="0.5"
                        y="0.5"
                        width="41"
                        height="41"
                        rx="6.5"
                        fill="none" />
                </g>
                <g data-name="Group 11788"
                   transform="translate(-1245.85 -1161.843)">
                  <path data-name="Fill 3"
                        d="M10.569,12a1.418,1.418,0,0,1-1.01-.419L.419,2.439A1.428,1.428,0,0,1,2.439.419l9.14,9.142A1.429,1.429,0,0,1,10.569,12"
                        transform="translate(1260.851 1176.843)"
                        fill="#f83a3a" />
                  <path data-name="Fill 3"
                        d="M10.569,12a1.418,1.418,0,0,1-1.01-.419L.419,2.439A1.428,1.428,0,0,1,2.439.419l9.14,9.142A1.429,1.429,0,0,1,10.569,12"
                        transform="translate(1272.85 1176.844) rotate(90)"
                        fill="#f83a3a" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import SelectControl from 'components/Control/Select'

export default {
  name: 'PostRequisites',
  components: { SelectControl },
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
      prerequisites: [],

      prerequisite: {
        category: null,
        unit: null
      },
      categoriesLoading: false,
      categories: [],
      unitsLoading: false,
      allUnits: [],
      units: []
    }
  },
  watch: {
    value () {
      this.inputData = this.value
      this.loadPrerequisitesFromInputData()
    }
  },
  created () {
    this.inputData = this.value
    this.getCategories()
    this.getAllUnits()
  },
  methods: {
    loadPrerequisitesFromInputData () {
      this.prerequisites = this.inputData.map(item => {
        return {
          category: this.getCategoryObjectByUnitId(item),
          unit: this.getUnitObject(item)
        }
      })
    },
    showUnit (unitId) {
      this.$router.push({ name: 'Admin.Unit.Show', params: { id: unitId } })
    },
    removeUnit (unitId) {
      const target = this.inputData.findIndex(item => item === unitId)
      if (target === -1) {
        return
      }
      const prerequisitesTarget = this.prerequisites.findIndex(item => item.unit.id === unitId)
      if (prerequisitesTarget === -1) {
        return
      }

      this.inputData.splice(target, 1)
      this.prerequisites.splice(prerequisitesTarget, 1)
      this.change()
    },
    getCategoryObject (categoryId) {
      return this.categories.find(cat => cat.id === categoryId)
    },
    getUnitObjectByCategoryId (categoryId) {
      return this.allUnits.find(unit => unit.category_info.id === categoryId)
    },
    getCategoryObjectByUnitId (unitId) {
      const target = this.allUnits.find(unit => unit.id === unitId)
      if (!target) {
        return null
      }

      return target.category_info
    },
    getUnitObject (unitId) {
      return this.allUnits.find(unit => unit.id === unitId)
    },
    addPostRequisites () {
      if (!this.prerequisite.category || !this.prerequisite.unit) {
        return
      }
      if (this.inputData.find(item => item === this.prerequisite.unit)) {
        return
      }
      this.prerequisites.push({
        category: this.getCategoryObject(this.prerequisite.category),
        unit: this.getUnitObject(this.prerequisite.unit)
      })
      this.change()
    },
    getCategories () {
      this.categoriesLoading = true
      this.$axios.get(API_ADDRESS.category.base)
        .then(response => {
          this.categoriesLoading = false
          this.categories = response.data.results
        })
        .catch(() => {
          this.categoriesLoading = false
        })
    },
    getAllUnits () {
      this.unitsLoading = true
      this.$axios.get(API_ADDRESS.unit.base)
        .then(response => {
          this.unitsLoading = false
          this.allUnits = response.data.results
          this.loadPrerequisitesFromInputData()
        })
        .catch(() => {
          this.unitsLoading = false
        })
    },
    getUnits () {
      this.unitsLoading = true
      this.units = []
      this.prerequisite.unit = null
      this.$axios.get(API_ADDRESS.unit.base + '?category=' + this.prerequisite.category)
        .then(response => {
          this.unitsLoading = false
          this.units = response.data.results
        })
        .catch(() => {
          this.unitsLoading = false
        })
    },
    change () {
      this.inputData = this.prerequisites.map(item => item.unit.id)
      this.$emit('update:value', this.inputData)
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

<style lang="scss" scoped>
.btn-add-unit {
  height: 56px;
}
.preItem {
  border: solid 1px #DFE1EC;
  background-color: #F9F9F9;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  .preItem-title {}
  .preItem-actions {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    .view {
      margin-right: 16px;
    }
    .view,
    .remove {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
