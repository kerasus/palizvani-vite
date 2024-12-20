<template>
  <div class="ContentTopic"
       :style="localOptions.style">
    <div class="ContentTopic-title">
      <div>
        <q-banner class="banner">
          دسته‌بندی موضوعی
        </q-banner>
      </div>
      <div>
        <q-btn flat
               :to="{name: 'Public.PostTopic.List'}">
          مشاهده همه
          <svg xmlns="http://www.w3.org/2000/svg"
               width="18.387"
               height="11.502"
               viewBox="0 0 18.387 11.502"
               class="q-ml-sm">
            <path id="Combined_Shape"
                  data-name="Combined Shape"
                  d="M-9.338,11.408a.748.748,0,0,0,.388-.656V6.5h8.2A.751.751,0,0,0,0,5.75.75.75,0,0,0-.75,5h-8.2V.75A.751.751,0,0,0-9.338.093.769.769,0,0,0-9.7,0a.735.735,0,0,0-.4.115l-7.938,5a.747.747,0,0,0-.35.635.742.742,0,0,0,.35.634l7.938,5a.751.751,0,0,0,.4.116A.746.746,0,0,0-9.338,11.408ZM-10.45,9.392l-5.78-3.641,5.78-3.642Z"
                  transform="translate(18.387)"
                  fill="#eac38a" />
          </svg>
        </q-btn>
      </div>
    </div>
    <div class="ContentTopic-list">
      <div class="row q-col-gutter-md">
        <div v-for="post in contentTopicList.list"
             :key="post.id"
             class="col-md-6 col-12">
          <topic-item :content-topic="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopicItem from './TopicItem.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { ContentTopicList } from 'src/models/ContentTopic.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'LastPosts',
  components: {
    TopicItem
  },
  mixins: [mixinWidget, mixinPrefetchServerData],
  data () {
    return {
      mounted: false,
      contentTopicList: new ContentTopicList()
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getApiRequest()
    },
    prefetchServerDataPromiseThen ({ list }) {
      this.contentTopicList = new ContentTopicList(list)
      this.contentTopicList.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.contentTopicList.loading = false
    },

    getApiRequest() {
      this.contentTopicList.loading = true
      return APIGateway.contentTopic.index()
    }
  }
}
</script>

<style scoped lang="scss">
.ContentTopic {
  .ContentTopic-title {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-bottom: 33px;
  }
}
</style>
