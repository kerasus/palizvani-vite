<template>
  <div class="AdminTicketShow"
       :style="localOptions.style">
    <div class="title">
      <div class="static-title">
        مشاهده پیام
      </div>
      <div class="dynamic-title">
        <template v-if="entityLoading">
          <q-skeleton type="text"
                      class="q-ml-lg"
                      width="100px" />
        </template>
        <template v-else>
          {{ packageTitle }}
        </template>
      </div>
      <div class="back-action">
        <q-btn flat
               :to="{name: 'AdminPanel.Ticket.List'}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <q-card class="form"
            flat>
      <entity-edit v-if="mounted"
                   ref="entityEdit"
                   v-model:value="inputs"
                   title="اطلاعات کاربری"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false"
                   :default-layout="false"
                   :redirect-after-edit="false"
                   :after-load-input-data="afterLoadInputData" />

      <div class="row q-mt-lg justify-end">
        <div class="col-md-4 col-12">
          <q-btn color="primary"
                 class="full-width"
                 :loading="entityLoading"
                 @click="edit">
            ثبت تغییرات
          </q-btn>
        </div>
      </div>

      <q-card v-if="mounted"
              class="q-mt-md">
        <q-card-section>
          <div class="row justify-center">
            <div style="width: 100%;">
              <q-chat-message v-for="message in repliesInfo"
                              :key="message.id"
                              :avatar="message.creator_info.picture ? message.creator_info.picture : 'assets/images/web/sample-avatar.svg'"
                              :name="message.creator_info.firstname + ' ' + message.creator_info.lastname"
                              :text="[message.body]"
                              :sent="authenticatedUser.id !== message.creator_info.id" />
              <!--                  <div>-->
              <!--                    <q-input v-model="replyBody"-->
              <!--                             bottom-slots-->
              <!--                             :loading="replyBodyLoading">-->
              <!--                      <template v-slot:after>-->
              <!--                        <q-btn round-->
              <!--                               dense-->
              <!--                               flat-->
              <!--                               icon="send"-->
              <!--                               :loading="replyBodyLoading"-->
              <!--                               @click="sendReplyBody" />-->
              <!--                      </template>-->
              <!--                    </q-input>-->
              <!--                  </div>-->
            </div>
          </div>
        </q-card-section>
      </q-card>

      <div class="action">
        <div class="row q-mt-lg justify-end">
          <div class="col-md-12 col-12">
            متن پیام
          </div>
          <div class="col-md-12 col-12 q-mb-md">
            <q-input v-model="replyText"
                     type="textarea" />
          </div>
          <div class="col-md-4 col-12">
            <q-btn color="primary"
                   class="full-width"
                   :loading="entityLoading"
                   @click="sendReply">
              ارسال پاسخ
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import { User } from 'src/models/User.js'
import { Ticket } from 'src/models/Ticket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { TicketCategoryList } from 'src/models/TicketCategory'

export default {
  name: 'AdminTicketShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      replyText: null,
      mounted: false,
      entityLoading: true,
      packageTitle: '',
      authenticatedUser: new User(),
      api: APIGateway.ticket.APIAdresses.base,
      ticketCategoryList: new TicketCategoryList(),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Ticket.Show',
      indexRouteName: 'AdminPanel.Ticket.List',
      inputs: [
        {
          type: 'select',
          name: 'category',
          responseKey: 'category',
          options: [],
          label: 'دسته',
          col: 'col-md-6 col-12'
        },
        {
          type: 'select',
          name: 'state',
          responseKey: 'state',
          options: (new Ticket()).statusEnums,
          multiple: false,
          label: 'وضعیت',
          col: 'col-md-6 col-12'
        },
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', col: 'col-12' },
        { type: 'inputEditor', name: 'body', responseKey: 'body', label: 'متن', col: 'col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id' },
        { type: 'hidden', name: 'owner', responseKey: 'owner' },
        { type: 'hidden', name: 'replies_info', responseKey: 'replies_info' }
      ]
    }
  },
  computed: {
    repliesInfo () {
      return this.inputs.find(input => input.name === 'replies_info').value
    }
  },
  created() {
    this.api = this.api + '/' + this.$route.params.id
  },
  mounted() {
    this.loadOptions()
      .then(() => {
        this.mounted = true
        this.loadAuthData()
        this.$nextTick(() => {
          this.setInputOptions('category', this.ticketCategoryList.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
        })
      })
      .catch(() => {
        this.mounted = true
      })
  },
  methods: {
    loadAuthData () {
      this.authenticatedUser = this.$store.getters['Auth/user']
    },
    afterLoadInputData () {
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity()
        .then(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
    },
    loadOptions () {
      return this.loadCategories()
    },
    loadCategories () {
      return new Promise((resolve, reject) => {
        APIGateway.ticketCategory.index()
          .then(({ list }) => {
            this.ticketCategoryList = list
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    setInputOptions (name, options) {
      this.$refs.entityEdit.setInputAttributeByName(name, 'options', options)
    },
    sendReply() {
      this.entityLoading = true
      APIGateway.ticket.reply({
        id: this.$route.params.id,
        body: this.replyText
      })
        .then(() => {
          this.$refs.entityEdit.editEntity()
            .then(() => {
              this.$refs.entityEdit.getData()
              this.entityLoading = false
            })
            .catch(() => {
              this.$refs.entityEdit.getData()
              this.entityLoading = false
            })
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminTicketShow {
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
