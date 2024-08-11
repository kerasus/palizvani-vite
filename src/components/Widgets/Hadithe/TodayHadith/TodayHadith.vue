<template>
  <div class="today-hadith">
    <q-banner class="banner">
      حدیث روز
    </q-banner>
    <q-linear-progress v-if="hadithes.loading"
                       indeterminate />
    <div v-if="!hadithes.loading && todayHadith?.id"
         class="today-hadith-item">
      <div class="today-hadith-item-thumbnail">
        <q-img src="/assets/images/web/today-hadith-thumbnail.png" />
      </div>
      <div class="today-hadith-item-data">
        <div class="today-hadith-item-narrator">
          {{ todayHadith.narrator }}
        </div>
        <div class="today-hadith-item-arabian-text"
             v-html="todayHadith.arabian_text" />
        <div class="today-hadith-item-persian-text"
             v-html="todayHadith.persian_text" />
        <div class="today-hadith-item-source">
          {{ todayHadith.source }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { APIGateway } from 'src/api/APIGateway.js'
import { Hadith, HadithList } from 'src/models/Hadith.js' //  using Classroom instead of Event to prevent props warning
import { mixinPrefetchServerData, mixinAuth } from 'src/mixin/Mixins.js'
import { EventRegistrationList } from 'src/models/EventRegistration.js'

export default {
  name: 'TodayHadith',
  mixins: [mixinPrefetchServerData, mixinAuth],
  data () {
    return {
      userRegistrations: new EventRegistrationList(),
      todayHadith: new Hadith(),
      hadithes: new HadithList()
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getHadith()
    },
    prefetchServerDataPromiseThen (hadithes) {
      this.hadithes = new HadithList(hadithes.list)
      this.todayHadith = this.hadithes.list[0]
      this.hadithes.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.hadithes.loading = false
    },

    getHadith () {
      this.hadithes.loading = true
      // return APIGateway.event.index()
      return APIGateway.hadith.index({
        status: 'TODAY',
        per_page: 9999
      })
    }
  }
}
</script>

<style scoped lang="scss">
.today-hadith {
  .q-banner {
    margin-bottom: 32px;
  }
  .today-hadith-item {
    background: #F6F6F6;
    display: flex;
    justify-content: flex-start;
    border-radius: 20px;
    .today-hadith-item-thumbnail {
      width: 416px;
      @media only screen and (max-width: 1024px){
        & {
          display: none;
        }
      }
    }
    .today-hadith-item-data {
      width: calc( 100% - 416px );
      padding: 42px 40px;
      .today-hadith-item-narrator {
        font-size: 16px;
        letter-spacing: 0;
        color: #212121;
        margin-bottom: 29px;
      }
      .today-hadith-item-arabian-text {
        font-size: 20px;
        letter-spacing: 0;
        color: #475F4A;
        margin-bottom: 31px;
      }
      .today-hadith-item-persian-text {
        font-size: 18px;
        letter-spacing: 0;
        color: #212121;
        margin-bottom: 30px;
      }
      .today-hadith-item-source {
        font-size: 18px;
        letter-spacing: 0;
        color: #AAA095;
        text-align: right;
      }
      @media only screen and (max-width: 1024px){
        & {
          width: 100%;
        }
      }
    }
  }
}
</style>
