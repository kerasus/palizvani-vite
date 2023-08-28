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
               :to="{name: 'Admin.Invoice.Ticket'}"
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
                   :before-load-input-data="beforeLoadInputData" />

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

    <!--    <show-source :source-type="ticket.source_type"-->
    <!--                 :source-id="ticket.source_id"-->
    <!--                 :source="ticket.source" />-->

    <admin-invoice-show v-if="ticket.source_type === 'INVOICE' && ticket.source_id"
                        :options="{invoiceId: ticket.source_id, showBackBtn: false}"
                        class="q-mt-lg" />

    <q-card v-if="ticket.source_type === 'INVOICE' && ticket.source_id"
            class="q-mt-lg">
      <q-card-section>
        اقساط
      </q-card-section>
      <q-separator />
      <q-card-section>
        <installment-offers :installment-offers="instalmentOffers"
                            :loading="entityLoading"
                            :can-accept="false"
                            :can-reject="false"
                            @onReject="onReject"
                            @onAccept="onAccept" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <create-installment :invoice-id="ticket.source_id"
                            @onCreated="onCreateInstallmentOffer" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import { User } from 'src/models/User.js'
import { Ticket } from 'src/models/Ticket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { TicketCategoryList } from 'src/models/TicketCategory.js'
import { InstalmentOfferList } from 'src/models/InstalmentOffer.js'
// import ShowSource from 'src/components/Widgets/Ticket/AdminTicketShow/ShowSource.vue'
import AdminInvoiceShow from 'src/components/Widgets/Invoice/AdminInvoiceShow/AdminInvoiceShow.vue'
import InstallmentOffers from 'src/components/Widgets/Ticket/AdminTicketShow/InstallmentOffers.vue'
import CreateInstallment from 'src/components/Widgets/Ticket/AdminTicketShow/CreateInstallment.vue'

export default {
  name: 'AdminTicketShow',
  components: {
    EntityEdit,
    // ShowSource,
    AdminInvoiceShow,
    CreateInstallment,
    InstallmentOffers
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      replyText: null,
      mounted: false,
      entityLoading: true,
      packageTitle: '',
      ticket: new Ticket(),
      authenticatedUser: new User(),
      api: APIGateway.ticket.APIAdresses.base,
      ticketCategoryList: new TicketCategoryList(),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Ticket.Show',
      indexRouteName: 'Admin.Ticket.List',
      inputs: [
        {
          type: 'select',
          name: 'source_type',
          responseKey: 'category_info.type',
          options: [
            { label: 'مالی', value: 'FINANCIAL' },
            { label: 'آموزش', value: 'EDUCATIONAL' },
            { label: 'محتوا', value: 'CONTENT' },
            { label: 'عمومی', value: 'GENERAL' }
          ],
          label: 'معاونت',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        { type: 'select', name: 'category', responseKey: 'category', placeholder: ' ', options: [], label: 'دسته', col: 'col-md-4 col-12' },
        { type: 'select', name: 'status', responseKey: 'status', options: (new Ticket()).statusEnums, multiple: false, label: 'وضعیت', placeholder: ' ', readonly: true, col: 'col-md-4 col-12' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', readonly: true, col: 'col-md-12 col-12' },
        { type: 'inputEditor', name: 'body', responseKey: 'body', label: 'متن', placeholder: ' ', readonly: true, col: 'col-md-12 col-12' },
        { type: 'hidden', name: 'source_id', responseKey: 'source_id', value: null },
        { type: 'hidden', name: 'id', responseKey: 'id' },
        { type: 'hidden', name: 'owner', responseKey: 'owner' },
        { type: 'hidden', name: 'replies_info', responseKey: 'replies_info' }
      ]
    }
  },
  computed: {
    instalmentOffers () {
      return new InstalmentOfferList(this.ticket.source?.instalment_offers_info)
    },
    repliesInfo () {
      return this.inputs.find(input => input.name === 'replies_info').value
    }
  },
  created() {
    this.api = this.api + '/' + this.$route.params.id
  },
  mounted() {
    this.checkSource()
    this.loadOptions()
      .then(() => {
        this.loadAuthData()
        FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'options', this.ticketCategoryList.list.map(item => {
          return {
            value: item.id,
            label: item.title
          }
        }))
        this.$nextTick(() => {
          this.mounted = true
        })
      })
      .catch(() => {
        this.mounted = true
      })
  },
  methods: {
    onReject (offer) {
      this.entityLoading = true
      APIGateway.instalmentOffer.reject(offer.id)
        .then(() => {
          this.$refs.entityEdit.getData()
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
        })
    },
    onAccept (offer) {
      this.entityLoading = true
      APIGateway.instalmentOffer.accept(offer.id)
        .then(() => {
          this.$refs.entityEdit.getData()
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
        })
    },
    onCreateInstallmentOffer () {
      this.$refs.entityEdit.getData()
    },
    checkSource () {
      if (this.localOptions.defaultSourceType) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'source_type', 'value', this.localOptions.defaultSourceType)
      }
    },
    loadAuthData () {
      this.authenticatedUser = this.$store.getters['Auth/user']
    },
    beforeLoadInputData (data) {
      this.entityLoading = false
      this.ticket = new Ticket(data)
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity()
        .then(() => {
          this.$refs.entityEdit.getData()
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
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
            })
            .catch(() => {
              this.$refs.entityEdit.getData()
            })
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
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
