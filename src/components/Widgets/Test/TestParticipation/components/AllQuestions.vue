<template>
  <div class="AllQuestions">
    <q-list separator>
      <q-item v-for="(question, questionIndex) in answerBook.test_info.test_set_info.test_set_questions"
              :key="questionIndex"
              clickable>
        <q-item-section v-html="question.question_info.text" />
        <q-item-section side>
          <q-badge>
            {{ question.mark }}
            نمره
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator class="q-my-lg" />
    <q-card-actions class="flex justify-end">
      <entity-create v-if="mounted"
                     ref="entityCreate"
                     v-model:value="inputs"
                     :api="api"
                     :default-layout="false"
                     :show-close-button="false"
                     :show-edit-button="false"
                     :show-expand-button="false"
                     :show-save-button="false"
                     :show-reload-button="false" />
    </q-card-actions>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { AnswerBook } from 'src/models/AnswerBook.js'
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AllQuestions',
  components: { EntityCreate },
  props: {
    answerBook: {
      type: AnswerBook,
      default: new AnswerBook()
    }
  },
  emits: ['sending', 'sentSuccess', 'sentFailed'],
  data () {
    return {
      mounted: false,
      api: APIGateway.answerBook.APIAdresses.submitOverallAnswer(this.$route.params.answer_book_id),
      inputs: [
        { type: 'inputEditor', name: 'answer_text', label: 'متن پاسخ', placeholder: ' ', col: 'col-12' },
        { type: 'file', name: 'answer_attachment', label: 'فایل جامع پاسخ سوالات', placeholder: ' ', col: 'col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'اتمام آزمون', placeholder: ' ', atClick: () => {}, col: 'col-12' }
      ]
    }
  },
  mounted () {
    this.setBtnAction()
    this.mounted = true
  },
  methods: {
    setBtnAction () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.sendAnswers)
    },
    sendAnswers () {
      const answerText = FormBuilderAssist.getInputsByName(this.inputs, 'answer_text').value
      if (!answerText) {
        this.$q.notify({
          type: 'negative',
          message: 'لطفا متن پاسخ را کامل کنید.'
        })
        return
      }

      this.$emit('sending')
      this.$refs.entityCreate.createEntity(false)
        .then(() => {
          this.$emit('sentSuccess')
        })
        .catch(() => {
          this.$emit('sentFailed')
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AllQuestions {
  :deep(.q-list) {
    .q-item {
      .q-badge {
        background: #ACBCAE 0 0 no-repeat padding-box;
        border-radius: 18px;
        height: 32px;
        padding: 4px 16px;
      }
    }
  }
}
</style>
