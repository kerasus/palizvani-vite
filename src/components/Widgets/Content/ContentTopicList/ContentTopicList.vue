<template>
  <div class="ContentTopicList"
       :style="localOptions.style">
    <template v-if="mounted">
      <breadcrumbs class="q-mb-lg" />
      <div class="ContentTopicList__header">
        <q-banner>
          جستجوی پیشرفته محتوایی
        </q-banner>
        <q-btn color="primary"
               @click="downloadExcel">
          <q-icon name="file_download" />
          دریافت
        </q-btn>
      </div>
      <div class="ContentTopicList__top-filter">
        <form-builder v-model:value="topFilterInputs"
                      @update:value="onTopFilterChange" />
      </div>
      <div class="ContentTopicList__main">
        <div class="ContentTopicList__sidebar">
          <sidebar @onChangeFilters="onChangeSidebarFilters" />
        </div>
        <div class="ContentTopicList__result">
          <entity-index v-if="mounted"
                        ref="entityIndex"
                        v-model:value="inputs"
                        :api="api"
                        :table="table"
                        :table-keys="tableKeys"
                        :table-grid-size="true"
                        :default-layout="false"
                        :create-route-name="createRouteName"
                        :show-search-button="false"
                        :show-expand-button="false"
                        :show-reload-button="false">
            <template #entity-index-table-item-cell="{inputData}">
              <topic-item class="topic-item"
                          :topic="inputData.props.row" />
            </template>
          </entity-index>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import Sidebar from './components/sidebar.vue'
import TopicItem from './components/TopicItem.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilder, FormBuilderAssist } from 'quasar-form-builder'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import HashtagSelector from 'src/components/FormBuilderCustumComponents/Hashtags/HashtagSelector.vue'

const HashtagSelectorComp = shallowRef(HashtagSelector)

export default {
  name: 'ContentList',
  components: { EntityIndex, Breadcrumbs, Sidebar, FormBuilder, TopicItem },
  mixins: [mixinWidget],
  data () {
    return {
      breadcrumbs: {
        visible: true,
        loading: false,
        path: [
          {
            label: 'خانه',
            to: { name: 'Public.Home' }
          },
          {
            label: 'جستجوی پیشرفته محتوایی',
            to: { name: 'Public.PostTopic.List' }
          }
        ]
      },
      api: APIGateway.contentTopic.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'category__in', value: null },
        { type: 'hidden', name: 'hashtags__id__in', value: null }
      ],
      topFilterInputs: [
        { type: HashtagSelectorComp, name: 'hashtags', responseKey: 'hashtags_info', col: 'col-12' }
      ],
      topFilter: {
        hashtags: null
      },
      table: {
        columns: [
          {
            name: 'title',
            required: true,
            label: 'موضوع پیام',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'sender',
            required: true,
            label: 'فرستنده',
            align: 'left',
            field: row => row.creator_info.firstname + ' ' + row.creator_info.lastname
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Ticket(row)).status_info.label
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: row => ''
          }
        ]
      },
      mounted: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.$store.commit('AppLayout/updateBreadcrumbs', this.breadcrumbs)
    this.mounted = true
  },
  methods: {
    onChangeSidebarFilters (filters) {
      this.sidebarFilters = filters
      this.search()
    },
    onTopFilterChange () {
      this.topFilter = FormBuilderAssist.getFormData(this.topFilterInputs)
      this.search()
    },
    search () {
      this.updateFilters()
      if (!this.$refs.entityIndex) {
        return
      }

      this.$refs.entityIndex.search()
    },
    updateFilters () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'category__in', 'value', this.sidebarFilters.category__in)
      FormBuilderAssist.setAttributeByName(this.inputs, 'hashtags__id__in', 'value', this.topFilter.hashtags)
    },
    downloadExcel () {
    }
  }
}
</script>

<style scoped lang="scss">
.ContentTopicList {
  .ContentTopicList__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .ContentTopicList__top-filter {
    margin-bottom: 24px;
  }
  .ContentTopicList__main {
    display: flex;
    gap: 24px;
    justify-content: flex-start;
    $sidebar-width: 312px;
    .ContentTopicList__sidebar {
      width: $sidebar-width;
    }
    .ContentTopicList__result {
      width: calc( 100% - #{$sidebar-width} );
      .topic-item {
        width: 100%;
      }
    }
  }
}
</style>
