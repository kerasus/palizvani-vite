<template>
  <div class="TestParticipation"
       :style="localOptions.style">
    <completion-page v-if="isCompletionPage"
                     :answer-book="answerBook" />
    <q-card v-else-if="!answerBook.loading && answerBook.id">
      <q-card-section class="flex justify-between">
        <div>{{ answerBook.test_info.title }}</div>
        <div>
          زمان باقیمانده تا پایان آزمون
          {{ formattedRemainingTime }}
        </div>
      </q-card-section>
      <q-separator />
      <q-banner>
        <div class="row">
          <div class="col-md-4 col-12">
            {{ toShamsi(answerBook.attending_start_time) }}
          </div>
          <div class="col-md-4 col-12">
            {{ answerBook.test_info.test_questions_info.list.length }}
            سوال
          </div>
        </div>
      </q-banner>
      <template v-if="mounted">
        <all-questions v-if="$route.name === 'UserPanel.Test.AnswerBook.Participate.AllQuestions'"
                       :answer-book="answerBook"
                       @sentsuccess="onAllQuestionsSentSuccess"
                       @sending="onAllQuestionsSending"
                       @sentfailed="onAllQuestionsSentFailed" />
        <single-question v-else-if="$route.name === 'UserPanel.Test.AnswerBook.Participate.SingleQuestion'"
                         :answer-book="answerBook"
                         :question-number="parseInt($route.params.question_number)"
                         @sending="onSingleQuestionsSending"
                         @sentSuccess="onSingleQuestionsSentSuccess"
                         @sentFailed="onSingleQuestionsSentFailed" />
        <div class="flex justify-end q-pa-lg">
          <q-btn color="primary"
                 outline
                 @click="confirmAnswers">
            اتمام آزمون
          </q-btn>
        </div>
      </template>
    </q-card>
    <div v-else>
      کمی صبر کنید...
    </div>
    <q-dialog v-model="participateTypeDialog">
      <q-card>
        <q-card-actions>
          نحوه پاسخ به آزمون
        </q-card-actions>
        <q-separator />
        <q-card-actions>
          <div>
            اندیشه جوی عزیز لطفا نحوه پاسخ به سوالات آزمون را مشخص کنید
          </div>
          <div>
            <q-radio v-model="participateType"
                     val="UserPanel.Test.AnswerBook.Participate.AllQuestions"
                     label="مایلم پاسخ سوالات را به صورت یک فایل جامع بارگذاری کنم" />
            <q-radio v-model="participateType"
                     val="UserPanel.Test.AnswerBook.Participate.SingleQuestion"
                     label="مایلم پاسخ سوالات را به صورت جداگانه ذیل همان سوال وارد کنم" />
          </div>
        </q-card-actions>
        <q-card-actions>
          <q-btn v-close-popup
                 outline
                 label="انصراف از آزمون"
                 color="red" />
          <q-btn :disable="!participateType"
                 label="تایید و شروع آزمون"
                 color="primary"
                 @click="startTest" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Assist from 'src/assets/js/Assist.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { AnswerBook } from 'src/models/AnswerBook.js'
import AllQuestions from './components/AllQuestions.vue'
import SingleQuestion from './components/SingleQuestion.vue'
import CompletionPage from './components/CompletionPage.vue'

export default {
  name: 'TestParticipation',
  components: { AllQuestions, SingleQuestion, CompletionPage },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      participateType: null,
      participateTypeDialog: false,
      storeAnswerBook: null,
      answerBook: new AnswerBook(),
      remainingTime: 0,
      timerInterval: null
    }
  },
  computed: {
    isCompletionPage () {
      return this.$route.name === 'UserPanel.Test.AnswerBook.Participate.SingleQuestion' && this.$route.params.question_number === 'complete'
    },
    formattedRemainingTime () {
      const hours = Math.max(Math.floor(this.remainingTime / 3600), 0)
      const minutes = Math.max(Math.floor((this.remainingTime % 3600) / 60), 0)
      const seconds = Math.max(this.remainingTime % 60, 0)

      // Add zero padding for hours, minutes, and seconds
      const formattedHours = hours.toString().padStart(2, '0')
      const formattedMinutes = minutes.toString().padStart(2, '0')
      const formattedSeconds = seconds.toString().padStart(2, '0')

      return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds
    }
  },
  mounted () {
    this.getTestQuestions()
    this.mounted = true

    this.$bus.on('test-participate-single-question-sent-success', () => {
      this.onAllQuestionsSentSuccess()
    })
    this.$bus.on('test-participate-single-question-sent-failed', () => {
      this.onAllQuestionsSentFailed()
    })
  },
  beforeUnmount() {
    this.stopTimer()
  },
  methods: {
    loadAnswerBookFromStore () {
      this.storeAnswerBook = this.$store.getters['Test/answerBook']
    },
    onAllQuestionsSending () {
      this.answerBook.loading = true
    },
    onAllQuestionsSentSuccess () {
      this.answerBook.loading = false
    },
    onAllQuestionsSentFailed () {
      this.answerBook.loading = false
    },
    onSingleQuestionsSending () {
      this.answerBook.loading = true
    },
    onSingleQuestionsSentSuccess () {
      this.answerBook.loading = false
      this.backToClassList()
    },
    onSingleQuestionsSentFailed () {
      this.answerBook.loading = false
    },
    toShamsi (miladi) {
      return Assist.miladiToShamsi(miladi)
    },

    startTest () {
      this.$router.push({ name: this.participateType, params: { question_number: 1 } })
    },
    confirmAnswers () {
      this.$q.dialog({
        title: 'اتمام آزمون',
        message: 'آیا از اتمام آزمون و تایید پاسخ های خود اطمینان دارید؟',
        cancel: true,
        persistent: true
      }).onOk(() => {
        APIGateway.answerBook.confirmAnswers(this.answerBook.id)
          .then(() => {
            this.$q.notify({
              message: 'تایید آزمون با موفقیت انجام شد.',
              type: 'positive'
            })
            this.$router.push({
              name: 'UserPanel.Test.AnswerBook.Participate.SingleQuestion',
              params: {
                test_id: this.$route.params.test_id,
                answer_book_id: this.$route.params.answer_book_id,
                question_number: 'complete'
              }
            })
          })
          .catch(() => {})
      }).onCancel(() => {})
    },
    getRemainingTimeInSeconds (serverTimeStr, attendingStartTimeStr, durationInMinutes) {
      // Convert the strings to Date objects
      const serverTime = new Date(serverTimeStr)
      const attendingStartTime = new Date(attendingStartTimeStr)

      // Calculate the difference in milliseconds
      const timeDiffInMilliseconds = serverTime - attendingStartTime

      // Convert the difference to seconds
      const timeDiffInSeconds = timeDiffInMilliseconds / 1000

      // Calculate the remaining time in seconds considering the duration
      return Math.floor((durationInMinutes * 60) - timeDiffInSeconds)
    },
    startTimer () {
      this.timerInterval = setInterval(() => {
        if (this.remainingTime <= 0) {
          this.stopTimer()
        } else {
          this.remainingTime--
          this.answerBook.remainingTime = this.remainingTime
          this.$store.commit('Test/updateAnswerBook', this.answerBook)
        }
      }, 1000)
    },
    stopTimer () {
      if (!this.timerInterval) {
        return
      }

      clearInterval(this.timerInterval)
    },
    backToClassList () {
      this.$router.push({ name: 'UserPanel.Profile.AllClassrooms' })
    },
    initPageFromAnswerBook (answerBook) {
      this.answerBook = new AnswerBook(answerBook)
      this.answerBook.loading = false
      if (this.answerBook.remainingTime === null) {
        this.answerBook.remainingTime = this.getRemainingTimeInSeconds(this.answerBook.server_time, this.answerBook.attending_start_time, this.answerBook.test_info.duration_deadline)
      }
      this.remainingTime = this.answerBook.remainingTime
      this.$store.commit('Test/updateAnswerBook', this.answerBook)
      this.startTimer()
    },
    getTestQuestions () {
      this.loadAnswerBookFromStore()
      if (this.storeAnswerBook && this.storeAnswerBook.id) {
        this.initPageFromAnswerBook(this.storeAnswerBook, false)
        return
      }
      this.answerBook.loading = true
      APIGateway.answerBook.getTestQuestions(this.$route.params.answer_book_id)
        .then((answerBook) => {
          this.initPageFromAnswerBook(answerBook)
        })
        .catch(() => {
          this.answerBook.loading = false
          this.backToClassList()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.TestParticipation {
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
