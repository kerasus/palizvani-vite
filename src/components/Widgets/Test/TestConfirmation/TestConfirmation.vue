<template>
  <div class="TestConfirmation"
       :style="localOptions.style">
    <q-card v-if="!answerBook.loading">
      <q-card-section>
        {{ answerBook.test_info.title }}
      </q-card-section>
      <q-separator />
      <q-card-section>
        {{ answerBook.test_info.description }}
      </q-card-section>
      <q-card-actions class="flex justify-end">
        <q-btn color="primary"
               label="شرکت در آزمون"
               @click="showParticipateTypeDialog" />
      </q-card-actions>
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
                     label="مایلم پاسخ سوالات را به صورت یک فایل جامع بارگزاری کنم" />
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
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { AnswerBook } from 'src/models/AnswerBook.js'

export default {
  name: 'TestConfirmation',
  mixins: [mixinWidget],
  data () {
    return {
      participateType: null,
      participateTypeDialog: false,
      answerBook: new AnswerBook()
    }
  },
  mounted() {
    this.getAnswerBook()
  },
  methods: {
    showParticipateTypeDialog () {
      this.participateTypeDialog = true
    },
    startTest () {
      this.$router.push({ name: this.participateType, params: { question_number: 1 } })
    },
    getAnswerBook () {
      this.answerBook.loading = true
      APIGateway.answerBook.get(this.$route.params.answer_book_id)
        .then((answerBook) => {
          this.answerBook = new AnswerBook(answerBook)
          this.answerBook.loading = false
        })
        .catch(() => {
          this.answerBook.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.TestConfirmation {
}
</style>
