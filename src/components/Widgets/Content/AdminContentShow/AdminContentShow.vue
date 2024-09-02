<template>
  <div class="AdminContentShow"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <q-card flat>
      <q-tabs v-model="tab"
              align="left">
        <q-tab name="content"
               label="جزییات محتوا" />
        <q-tab name="contentTag"
               label="فیش برداری" />
      </q-tabs>
    </q-card>
    <q-tab-panels v-if="mounted"
                  v-model="tab">
      <q-tab-panel name="content"
                   class="q-pa-none">
        <entity-edit ref="entityEdit"
                     v-model:value="inputs"
                     title="اطلاعات محتوا"
                     :api="api"
                     :entity-id-key="entityIdKey"
                     :entity-param-key="entityParamKey"
                     :show-route-name="showRouteName"
                     :show-close-button="false"
                     :show-edit-button="false"
                     :show-expand-button="false"
                     :show-save-button="false"
                     :show-reload-button="false"
                     :redirect-after-edit="false"
                     :after-load-input-data="afterLoadInputData" />
      </q-tab-panel>
      <q-tab-panel name="contentTag"
                   class="q-pa-none">
        <admin-content-topic-create :content="contentId"
                                    :redirect="false"
                                    @created="onTopicCreated" />
        <q-separator class="q-my-md" />
        <admin-content-topic-list :key="topicListKey"
                                  :content-id="contentId" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import ContentMedias from 'src/components/FormBuilderCustumComponents/ContentMedias/ContentMedias.vue'
import ContentCategorySelector from 'src/components/FormBuilderCustumComponents/ContentCategorySelector.vue'
import AdminContentTopicList from 'src/components/Widgets/Content/AdminContentTopicList/AdminContentTopicList.vue'
import AdminContentTopicCreate from 'src/components/Widgets/Content/AdminContentTopicCreate/AdminContentTopicCreate.vue'

const BtnControlComp = shallowRef(BtnControl)
const ContentMediasComp = shallowRef(ContentMedias)
const ContentCategorySelectorComp = shallowRef(ContentCategorySelector)

export default {
  name: 'AdminContentShow',
  components: {
    EntityEdit,
    AdminContentTopicList,
    AdminContentTopicCreate
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: true,
      topicListKey: Date.now(),
      api: APIGateway.content.APIAdresses.byId(this.$route.params.id),
      tab: 'content',
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Content.Show',
      indexRouteName: 'Admin.Content.List',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: ContentCategorySelectorComp, name: 'category', responseKey: 'category_info', col: 'col-md-12 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-md-12 col-12' },
        { type: ContentMediasComp, name: 'medias', responseKey: 'medias_info', col: 'col-md-12 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ویرایش محتوا', placeholder: ' ', ignoreValue: true, atClick: this.edit, col: 'col-md-6' }
      ]
    }
  },
  computed: {
    contentId () {
      return parseInt(this.$route.params.id)
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    afterLoadInputData () {
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity(false)
        .finally(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
    },
    onTopicCreated () {
      this.topicListKey = Date.now()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminContentShow {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    display: flex;
    flex-flow: row;
    position: relative;
    .static-title {

    }
    .dynamic-title {

    }
    .back-action {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  :deep(.form) {
    padding: 24px;
  }
}
</style>
