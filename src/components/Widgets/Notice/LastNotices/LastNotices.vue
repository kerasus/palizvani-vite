<template>
  <q-card class="LastNotices">
    <div class="title">
      اعلان‌ها
    </div>
    <div v-if="mounted"
         class="items">
      <template v-if="notices.loading">
        کمی صبر کنید ...
      </template>
      <template v-else-if="notices.list.length > 0">
        <notice-item v-for="notice in notices.list"
                     :key="notice.id"
                     :notice="notice" />
      </template>
      <template v-else>
        موردی وجود ندارد
      </template>
    </div>
  </q-card>
</template>

<script>
import { NoticeList } from 'src/models/Notice.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import NoticeItem from 'src/components/Widgets/Notice/LastNotices/NoticeItem.vue'

export default {
  name: 'LastNotices',
  components: { NoticeItem },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      notices: new NoticeList()
    }
  },
  mounted() {
    this.mounted = true
    this.loadData()
  },
  methods: {
    loadData () {
      this.getApiRequest()
        .then((data) => {
          this.prefetchServerDataPromiseThen(data)
        })
        .catch(() => {
          this.prefetchServerDataPromiseCatch()
        })
    },
    prefetchServerDataPromiseThen ({ list }) {
      this.notices = new NoticeList(list)
      this.notices.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.notices.loading = false
    },

    getApiRequest() {
      this.notices.loading = true
      return APIGateway.notice.index()
    }
  }
}
</script>

<style scoped lang="scss">
.LastNotices {
  padding: 27px 24px;
  .title {
    color: #2E2E2E;
    font-size: 20px;
    font-weight: 700;
    line-height: 140%;
  }
}
</style>
