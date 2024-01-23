<template>
  <div class="CompletionPage">
    <q-card v-if="!answerBook.loading && answerBook.id">
      <q-card-section class="flex justify-between">
        <div>{{ answerBook.test_info.title }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="flex column items-center justify-center">
        <div class="q-mb-lg">
          <q-icon name="check_circle"
                  size="xl"
                  color="green" />
        </div>
        <div class="q-mb-md">
          {{ user.firstname }}
          {{ user.lastname }}
          عزیز آزمون شما با موفقیت انجام شد
        </div>
        <div v-if="answerBook.test_info.announcement_time"
             class="q-mb-md">
          زمان اعلام نتایج آزمون :
          {{ toShamsi(answerBook.test_info.announcement_time) }}
        </div>
        <div v-if="answerBook.test_info.objection_start_time && answerBook.test_info.objection_end_time"
             class="q-mb-md">
          بازه اعتراض به نتایج آزمون :
          {{ toShamsi(answerBook.test_info.objection_start_time) }}
          لغایت
          {{ toShamsi(answerBook.test_info.objection_end_time) }}
        </div>
        <div class="q-mb-md">
          <q-btn color="primary"
                 label="بازگشت"
                 :to="{name: 'UserPanel.Profile.AllClassrooms'}" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Assist from 'src/assets/js/Assist.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import { AnswerBook } from 'src/models/AnswerBook.js'

export default {
  name: 'SingleQuestion',
  mixins: [mixinAuth],
  props: {
    answerBook: {
      type: AnswerBook,
      default: new AnswerBook()
    },
    questionNumber: {
      type: Number,
      default: 1
    }
  },
  emits: ['sending', 'sentSuccess', 'sentFailed'],
  data () {
    return {
      mounted: false
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    toShamsi (miladi) {
      return Assist.miladiToShamsi(miladi)
    }
  }
}
</script>

<style scoped lang="scss">
.SingleQuestion {
  .q-badge {
    background: #ACBCAE 0 0 no-repeat padding-box;
    border-radius: 18px;
    height: 32px;
    padding: 4px 16px;
  }
}
</style>
