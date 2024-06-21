<template>
  <div class="NoticeList"
       :style="localOptions.style">
    <div class="more-action">
      <breadcrumbs />
    </div>
    <q-card flat>
      <q-card-section>
        <q-btn :flat="filterType !== 'all'"
               color="primary"
               @click="setFilterToAll">
          همه پیام ها
        </q-btn>
        <q-btn :flat="filterType !== 'read'"
               color="primary"
               @click="setFilterToRead">
          خوانده نشده
          <q-badge v-if="myNotSeenNotificationsCount !== 0"
                   color="warning">
            {{ myNotSeenNotificationsCount }}
          </q-badge>
        </q-btn>
        <q-btn :flat="filterType !== 'not-read'"
               color="primary"
               @click="setFilterToNotRead">
          خوانده شده
        </q-btn>
      </q-card-section>
      <q-separator />
      <div class="entity-index-wrapper">
        <entity-index v-if="mounted"
                      ref="entityIndex"
                      v-model:value="inputs"
                      title=""
                      :api="api"
                      :table="table"
                      :table-keys="tableKeys"
                      :table-grid-size="true"
                      :create-route-name="createRouteName"
                      :show-search-button="false"
                      :show-expand-button="false"
                      :show-reload-button="false"
                      :default-layout="false">
          <template #entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'action'">
              <q-btn flat
                     color="primary"
                     :to="{name: 'UserPanel.Notice.Show', params: {id: inputData.props.row.id}}">
                مشاهده جزییات
              </q-btn>
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </template>
          <template #entity-index-table-item-cell="{inputData}">
            <div class="entity-index-grid-item"
                 :class="{'notice--read': getNoticeModel(inputData.props.row).state === 'READ'}">
              <div class="entity-index-grid-item__header">
                <div class="entity-index-grid-item__header-title">
                  {{ inputData.props.row.title }}
                </div>
                <div class="entity-index-grid-item__header-meta">
                  <div v-if="getNoticeModel(inputData.props.row).state"
                       class="entity-index-grid-item__header-state"
                       :class="getNoticeModel(inputData.props.row).state">
                    {{ getNoticeModel(inputData.props.row).state_info.label }}
                  </div>
                  <div class="entity-index-grid-item__header-creation-time">
                    {{ getNoticeModel(inputData.props.row).shamsiDate('creation_time').dateTime }}
                  </div>
                </div>
              </div>
              <div class="entity-index-grid-item__content"
                   v-html="inputData.props.row.body" />
              <div v-if="getNoticeModel(inputData.props.row).state !== 'READ'"
                   class="entity-index-grid-item__action">
                <q-btn color="primary"
                       outline
                       @click="updateNoticeToSeen(inputData.props.row.id)">
                  خوانده شود
                </q-btn>
              </div>
            </div>
          </template>
        </entity-index>
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { Notice } from 'src/models/Notice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'NoticeList',
  components: { EntityIndex, Breadcrumbs },
  mixins: [mixinWidget],
  data () {
    return {
      filterType: 'all',
      myNotSeenNotificationsCount: 0,
      api: APIGateway.notice.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'state', value: null }
      ],
      table: {
        columns: [
          {
            name: 'title',
            required: true,
            label: 'موضوع اعلان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'sender',
            required: true,
            label: 'فرستنده',
            align: 'left',
            field: row => row.creator_info ? row.creator_info.firstname + ' ' + row.creator_info.lastname : ''
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Notice(row)).status_info.label
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
    this.mounted = true
    this.updateBreadcrumbs()
    this.getMyNotSeenNotificationsCount()
  },
  methods: {
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'پیام ها',
            to: { name: 'UserPanel.Notice.List' }
          }
        ]
      })
    },
    getNoticeModel (data) {
      return new Notice(data)
    },
    updateNoticeToSeen (noticeId) {
      APIGateway.notice.seen(noticeId)
        .finally(() => {
          this.$refs.entityIndex.search()
        })
    },
    getMyNotSeenNotificationsCount () {
      APIGateway.notice.myNotSeenNotificationsCount()
        .then((count) => {
          this.myNotSeenNotificationsCount = count
        })
        .finally(() => {
          // this.$refs.entityIndex.search()
        })
    },
    setFilterToRead () {
      this.filterType = 'read'
      FormBuilderAssist.setAttributeByName(this.inputs, 'state', 'value', 'READ')
      this.$refs.entityIndex.search()
    },
    setFilterToNotRead () {
      this.filterType = 'not-read'
      FormBuilderAssist.setAttributeByName(this.inputs, 'state', 'value', 'NOT-READ')
      this.$refs.entityIndex.search()
    },
    setFilterToAll () {
      this.filterType = 'all'
      FormBuilderAssist.setAttributeByName(this.inputs, 'state', 'value', null)
      this.$refs.entityIndex.search()
    }
  }
}
</script>

<style scoped lang="scss">
.NoticeList {
  & > .q-card {
    border: solid 1px #DFE1EC;
    .entity-index-wrapper {
      padding-top: 12px;
      margin-right: -16px;
      margin-left: -16px;
      .entity-index-grid-item {
        width: 100%;
        padding: 20px;
        border-bottom: solid 1px #DFE1EC;
        &.notice--read {
          color: #A5A4A4;
        }
        .entity-index-grid-item__header {
          display: flex;
          justify-content: space-between;
          .entity-index-grid-item__header-title {}
          .entity-index-grid-item__header-meta {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 24px;
            .entity-index-grid-item__header-state {
              padding: 4px 8px;
              border-radius: 15px;
              color: #FF9100;
              background: #ffead1;
              &.READ {
                color: #10D078;
                background: #adffd8;
              }
            }
            .entity-index-grid-item__header-creation-time {}
          }
        }
        .entity-index-grid-item__content {

        }
        .entity-index-grid-item__action {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
