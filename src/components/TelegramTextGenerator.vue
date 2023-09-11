<template>
  <div class="row">
    <div class="col-2" />
    <div class="col-8">
      <q-card class="telegram-card">
        <q-card-section>
          <div class="card-title">
            پست تلگرام
          </div>
          <q-separator />
          <q-input v-model="mainTemp"
                   class="text-area"
                   filled
                   autogrow />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-2" />
  </div>
</template>

<script>
export default {
  name: 'TelegramTextGenerator',
  props: {
    nameDars: {
      type: String,
      default: '(نام درس *)'
    },
    videoOrder: {
      type: String,
      default: '(شماره ویدیو *)'
    },
    setName: {
      type: String,
      default: '(نام اصلی *)'
    },
    videoName1: {
      type: String,
      default: '(نام ویدیو اول *)'
    },
    videoName2: {
      type: String,
      default: '(نام ویدیو دوم *)'
    },
    contentUrl: {
      type: String,
      default: '(لینک url *)'
    },
    productUrl: {
      type: String,
      default: '(لینک url محصول *)'
    },
    teacherName: {
      type: String,
      default: '(نام دبیر *)'
    }
  },
  data () {
    return {
      mainTemp: null
    }
  },
  computed: {},
  mounted () {
    this.getMainTemplate()
  },
  methods: {
    getMainTemplate () {
      this.mainTemp = '🆔 @alaa_sanatisharif'
    }
  }
}
</script>

<style scoped lang="scss">
.telegram-card {
  .card-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .text-area {
    margin-top: 16px;
  }
}
</style>
