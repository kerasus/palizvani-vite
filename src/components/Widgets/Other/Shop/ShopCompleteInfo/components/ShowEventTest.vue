<template>
  <div class="ShowEventTest">
    <q-card v-if="!localAnswerBook.loading && localAnswerBook.id">
      <q-card-section class="flex justify-between">
        <div>{{ localAnswerBook.test_info.title }}</div>
      </q-card-section>
      <q-separator />
      <template v-if="mounted">
        <all-questions :answer-book="localAnswerBook" />
      </template>
    </q-card>
    <div v-else>
      کمی صبر کنید...
    </div>
  </div>
</template>

<script>
import AllQuestions from './AllQuestions.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { AnswerBook } from 'src/models/AnswerBook.js'

export default {
  name: 'ShowEventTest',
  components: { AllQuestions },
  props: {
    answerBookId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      mounted: false,
      participateType: null,
      localAnswerBook: new AnswerBook(),
      participateTypeDialog: false,
      storeAnswerBook: null,
      remainingTime: 0,
      timerInterval: null
    }
  },
  mounted () {
    this.getTestQuestions()
    this.mounted = true
    this.$bus.on('event-confirmation-step-test-sent-answer-sending', () => {
      this.onAllQuestionsSending()
    })
    this.$bus.on('event-confirmation-step-test-sent-answer-success', () => {
      this.onAllQuestionsSentSuccess()
    })
    this.$bus.on('event-confirmation-step-test-sent-answer-failed', () => {
      this.onAllQuestionsSentFailed()
    })
  },
  methods: {
    onAllQuestionsSending () {
      this.localAnswerBook.loading = true
    },
    onAllQuestionsSentSuccess () {
      this.localAnswerBook.loading = false
    },
    onAllQuestionsSentFailed () {
      this.localAnswerBook.loading = false
    },
    backToClassList () {
      this.$bus.emit('event-confirmation-step-get-test-failed')
    },
    getAnswerBook () {
      this.localAnswerBook.loading = true
      APIGateway.answerBook.get(this.answerBookId)
        .then((answerBook) => {
          this.localAnswerBook = new AnswerBook(answerBook)
          if (this.localAnswerBook.test_info.test_questions_length === 0) {
            this.$q.notify({
              type: 'negative',
              message: 'لیست سوالات پرسشنامه خالی است.'
            })
            this.backToClassList()
          }
          this.localAnswerBook.loading = false
        })
        .catch(() => {
          this.localAnswerBook.loading = false
          this.backToClassList()
        })
    },
    initPageFromAnswerBook (answerBook) {
      this.localAnswerBook = new AnswerBook(answerBook)
      this.localAnswerBook.loading = false
    },
    getTestQuestions () {
      this.localAnswerBook.loading = true
      APIGateway.answerBook.getTestQuestions(this.answerBookId)
        .then((answerBook) => {
          this.initPageFromAnswerBook(answerBook)
        })
        .catch(() => {
          this.localAnswerBook.loading = false
          this.backToClassList()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.ShowEventTest {
  :deep(.q-banner) {
    background: #FCF9F4 0 0 no-repeat padding-box;
    padding: 20px;
    .q-banner__content {
      font-size: 16px;
      font-weight: normal;
    }
  }
}
</style>
