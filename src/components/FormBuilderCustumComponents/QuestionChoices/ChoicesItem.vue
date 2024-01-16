<template>
  <div class="ChoicesItem">
    <template v-if="canEdit || canDelete">
      <div class="title">
        <q-input v-model="choiceText"
                 class="full-width"
                 type="textarea"
                 @update:model-value="onChangeChoiceText" />
      </div>
      <div class="actions">
        <q-btn v-if="canEdit"
               icon="edit"
               outline
               class="viewBtn"
               color="primary"
               @click="onEdit" />
        <q-btn v-if="canDelete"
               class="deleteBtn"
               icon="delete"
               outline
               color="red"
               @click="onDelete" />
      </div>
    </template>
    <div v-else
         v-html="choiceText" />
  </div>
</template>

<script>
import { QuestionChoice } from 'src/models/QuestionChoice.js'

export default {
  name: 'ChoicesItem',
  props: {
    choice: {
      type: QuestionChoice,
      default: new QuestionChoice()
    },
    canEdit: {
      type: Boolean,
      default: true
    },
    canDelete: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:choice', 'onEdit', 'onDelete'],
  data () {
    return {
      choiceText: null,
      entityCreateLoading: false
    }
  },
  mounted() {
    if (this.canEdit || this.canDelete) {
      this.choiceText = this.choice.text.replace(/<br>/g, '\n')
    } else {
      this.choiceText = this.choice.text.replace(/\n/g, '<br>')
    }
  },
  methods: {
    onChangeChoiceText () {
      const oldChoice = this.choice
      oldChoice.text = this.choiceText.replace(/\n/g, '<br>')
      this.$emit('update:choice', oldChoice)
    },
    onEdit () {
      this.$emit('onEdit')
    },
    onDelete () {
      this.$emit('onDelete')
    }
  }
}
</script>

<style lang="scss" scoped>
.ChoicesItem {
  background: #F9F9F9;
  border: 1px solid #DFE1EC;
  border-radius: 10px;
  padding: 10px 16px 10px 21px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  .title {
    width: calc( 100% - 120px );
  }
  .actions {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    .q-btn {
      width: 42px;
      height: 42px;
      &.viewBtn {
      }
      &.deleteBtn {
        margin-left: 16px;
      }
    }
  }
}
</style>
