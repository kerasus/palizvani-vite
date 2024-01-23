<template>
  <div class="QuestionChoices">
    <q-linear-progress v-if="fetchLoading"
                       indeterminate />
    <div v-if="canAddChoice && !readonly"
         class="q-mb-md">
      <entity-create ref="entityCreate"
                     v-model:value="inputs"
                     title="تعریف گزینه"
                     :api="api"
                     :entity-id-key="entityIdKey"
                     :entity-param-key="entityParamKey"
                     :show-close-button="false"
                     :show-edit-button="false"
                     :show-expand-button="false"
                     :show-save-button="false"
                     :show-reload-button="false" />
      <q-btn color="primary"
             class="full-width q-mt-md"
             :loading="entityCreateLoading"
             @click="entityCreate">
        افزودن گزینه
      </q-btn>
    </div>
    <div v-for="(choice, choiceIndex) in choices.list"
         :key="choice.id"
         class="choice-item">
      <div class="choice-item-radio">
        <q-radio v-model="localCorrectChoiceIndex"
                 :val="choiceIndex"
                 @update:model-value="onChangeCorrectChoiceIndex" />
      </div>
      <div class="choice-item-component">
        <choices-item :choice="choice"
                      :can-edit="canEdit"
                      :can-delete="canDelete"
                      @onEdit="onEdit(choice)"
                      @onDelete="onDelete(choice)" />
      </div>
    </div>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import ChoicesItem from './ChoicesItem.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { QuestionChoice, QuestionChoiceList } from 'src/models/QuestionChoice.js'

export default {
  name: 'QuestionChoices',
  components: { ChoicesItem, EntityCreate },
  props: {
    value: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    choicesInfo: {
      default: () => [],
      type: [Array, String, Number, Boolean]
    },
    correctChoiceIndex: {
      default: 0,
      type: Number
    },
    disable: {
      default: false,
      type: Boolean
    },
    participateMode: {
      type: Boolean,
      default: false
    },
    canEdit: {
      type: Boolean,
      default: true
    },
    canDelete: {
      type: Boolean,
      default: true
    },
    canAddChoice: {
      type: Boolean,
      default: true
    },
    sourceType: {
      type: String,
      default: 'CONTENT'
    },
    readonly: {
      default: false,
      type: Boolean
    },
    showPageLink: {
      default: true,
      type: Boolean
    },
    showDownloadLink: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:value'],
  data () {
    return {
      fetchLoading: false,
      localCorrectChoiceIndex: 0,
      choices: new QuestionChoiceList(),
      api: APIGateway.questionChoice.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'input', name: 'text', responseKey: 'text', label: 'متن', inputType: 'textarea', placeholder: ' ', col: 'col-12' }
      ],
      entityCreateLoading: false
    }
  },
  watch: {
    value: {
      handler () {
        if (this.participateMode) {
          this.localCorrectChoiceIndex = this.value
          return
        }

        this.inputData = this.value
        if (this.value.length > 0 && this.value[0].id) {
          this.choices = new QuestionChoiceList(this.value)
          this.emitValue(this.choices.list.map(item => item.id))
        }
      },
      immediate: true
    },
    correctChoiceIndex () {
      this.localCorrectChoiceIndex = this.correctChoiceIndex
    }
  },
  created () {
    this.choices = new QuestionChoiceList(this.choicesInfo)
    FormBuilderAssist.setAttributeByName(this.inputs, 'source_type', 'value', this.sourceType)
    this.inputData = this.value
    if (this.participateMode) {
      this.localCorrectChoiceIndex = this.value || 0
    } else {
      this.localCorrectChoiceIndex = this.correctChoiceIndex
    }
  },
  methods: {
    emitValue (value) {
      this.$emit('update:value', value)
    },
    onChangeCorrectChoiceIndex () {
      // this.$emit('update:correctChoiceIndex', this.localCorrectChoiceIndex)
      if (this.participateMode) {
        this.emitValue(this.localCorrectChoiceIndex)
      }
      this.$bus.emit('onChangeCorrectChoiceIndexInQuestionChoicesInput', this.localCorrectChoiceIndex)
    },
    onEdit (choice) {
      this.editChoice(choice)
    },
    onDelete (choice) {
      this.removeChoice(choice.id)
    },
    editChoice (choice) {
      const choiceIndex = this.choices.list.findIndex(item => item.id === choice.id)
      if (choiceIndex === -1) {
        return
      }
      this.entityCreateLoading = true
      APIGateway.questionChoice.put({ data: choice })
        .then((choice) => {
          this.choices.list[choiceIndex].text = choice.text.replace(/<br>/g, '\n')
          this.entityCreateLoading = false
        })
        .catch(() => {
          this.entityCreateLoading = false
        })
    },
    removeChoice (choiceId) {
      const choiceIndex = this.choices.list.findIndex(item => item.id === choiceId)
      if (choiceIndex === -1) {
        return
      }
      this.choices.list.splice(choiceIndex, 1)
      this.emitValue(this.choices.list.map(item => item.id))
    },
    entityCreate () {
      this.entityCreateLoading = true
      this.$refs.entityCreate.createEntity(false)
        .then(response => {
          this.choices.list.push(new QuestionChoice(response.data))
          this.entityCreateLoading = false
          this.emitValue(this.choices.list.map(item => item.id))
        })
        .catch(() => {
          this.entityCreateLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.QuestionChoices {
  width: 100%;
  .choice-item {
    display: flex;
    margin-top: 16px;
    .choice-item-radio {
      width: 60px;
    }
    .choice-item-component {
      width: calc( 100% - 60px );
    }
  }
}
</style>
