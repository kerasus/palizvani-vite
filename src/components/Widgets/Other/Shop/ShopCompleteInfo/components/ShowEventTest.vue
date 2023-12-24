<template>
  <div class="ShowEventTest"
       :style="localOptions.style">
    <q-card v-if="!localAnswerBook.loading && localAnswerBook.id">
      <q-card-section class="flex justify-between">
        <div>{{ localAnswerBook.test_info.title }}</div>
      </q-card-section>
      <q-separator />
      <template v-if="mounted">
        <all-questions :answer-book="localAnswerBook"
                       @sentsuccess="onAllQuestionsSentSuccess"
                       @sending="onAllQuestionsSending"
                       @sentfailed="onAllQuestionsSentFailed" />
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
    answerBook: {
      type: AnswerBook,
      default: new AnswerBook()
    }
  },
  emits: ['sending', 'sentsuccess', 'sentfailed'],
  data () {
    return {
      mounted: false,
      participateType: null,
      participateTypeDialog: false,
      storeAnswerBook: null,
      remainingTime: 0,
      timerInterval: null
    }
  },
  mounted () {
    this.localAnswerBook = this.answerBook
    this.getTestQuestions()
    this.mounted = true
  },
  methods: {
    onAllQuestionsSending () {
      this.$emit('sending')
      this.localAnswerBook.loading = true
    },
    onAllQuestionsSentSuccess () {
      this.$emit('sentsuccess')
      this.localAnswerBook.loading = false
    },
    onAllQuestionsSentFailed () {
      this.$emit('sentfailed')
      this.localAnswerBook.loading = false
    },
    backToClassList () {
    },
    getAnswerBook () {
      this.localAnswerBook.loading = true
      APIGateway.answerBook.get(this.$route.params.answer_book_id)
        .then((answerBook) => {
          this.localAnswerBook = new AnswerBook(answerBook)
          if (this.localAnswerBook.test_info.test_set_questions_length === 0) {
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
    initPageFromAnswerBook (answerBook, setRemainingTime = true) {
      this.localAnswerBook = new AnswerBook(answerBook)
      this.localAnswerBook.loading = false
    },
    getTestQuestions () {
      this.localAnswerBook.loading = true
      APIGateway.answerBook.getTestQuestions(this.$route.params.answer_book_id)
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
