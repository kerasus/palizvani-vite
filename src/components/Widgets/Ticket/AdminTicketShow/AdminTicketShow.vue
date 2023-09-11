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
               color="grey"
               @click="$router.go(-1)">
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
                   :before-load-input-data="beforeLoadInputData"
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
            <div class="full-width">
              <q-skeleton v-if="entityLoading"
                          type="rect"
                          width="100%"
                          height="200px" />
              <template v-else>
                <q-chat-message v-for="message in repliesInfo"
                                :key="message.id"
                                :avatar="message.creator_info.picture ? message.creator_info.picture : 'assets/images/web/sample-avatar.svg'"
                                :name="message.creator_info.firstname + ' ' + message.creator_info.lastname"
                                :text="[message.body]"
                                :sent="!isUserMessage(authenticatedUser, message)">
                  <template v-slot:stamp>
                    <div>
                      {{ miladiToShamsi(message.creation_time) }}
                    </div>
                    <q-btn icon="clear"
                           round
                           color="red"
                           flat
                           size="xs"
                           @click="removeMessage(message.id)" />
                    <q-icon v-if="isUserMessage(authenticatedUser, message)"
                            :name="message.read ? 'done_all' : 'done'" />
                  </template>
                </q-chat-message>
                <div>
                  <q-input v-model="replyText"
                           bottom-slots
                           autogrow
                           :loading="entityLoading">
                    <template v-slot:after>
                      <q-btn round
                             dense
                             flat
                             icon="send"
                             :loading="entityLoading"
                             @click="sendReply" />
                    </template>
                  </q-input>
                </div>
              </template>
            </div>
          </div>
        </q-card-section>
      </q-card>
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
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { User } from 'src/models/User.js'
import Assist from 'src/assets/js/Assist.js'
import { Ticket } from 'src/models/Ticket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { InstalmentOfferList } from 'src/models/InstalmentOffer.js'
import { TicketCategory, TicketCategoryList } from 'src/models/TicketCategory.js'
// import ShowSource from 'src/components/Widgets/Ticket/AdminTicketShow/ShowSource.vue'
import AdminInvoiceShow from 'src/components/Widgets/Invoice/AdminInvoiceShow/AdminInvoiceShow.vue'
import InstallmentOffers from 'src/components/Widgets/Ticket/AdminTicketShow/InstallmentOffers.vue'
import CreateInstallment from 'src/components/Widgets/Ticket/AdminTicketShow/CreateInstallment.vue'

const BtnControlComp = shallowRef(BtnControl)

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
      api: null,
      ticketCategoryList: new TicketCategoryList(),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Ticket.Show',
      indexRouteName: 'Admin.Ticket.List',
      inputs: [
        { type: 'separator', name: 'space', label: 'مشخصات کاربر', className: 'custom-separator', col: 'col-12' },
        { type: 'hidden', name: 'userId', responseKey: 'creator_info.id', disable: true },
        { type: 'input', name: 'creator_info.firstname', responseKey: 'creator_info.firstname', label: 'نام', placeholder: ' ', disable: true, col: 'col-md-2 col-12' },
        { type: 'input', name: 'creator_info.lastname', responseKey: 'creator_info.lastname', label: 'نام خانوادگی', placeholder: ' ', disable: true, col: 'col-md-2 col-12' },
        { type: 'input', name: 'creator_info.mobile_number', responseKey: 'creator_info.mobile_number', label: 'شماره موبایل', placeholder: ' ', disable: true, col: 'col-md-3 col-12' },
        { type: 'input', name: 'creator_info.email', responseKey: 'creator_info.email', label: 'ایمیل', placeholder: ' ', disable: true, col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'مشخصات کاربر', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' },

        { type: 'separator', name: 'space', label: 'مشخصات تیکت', className: 'custom-separator', col: 'col-12' },
        {
          type: 'select',
          name: 'category_info__type',
          responseKey: 'category_info.type',
          options: (new TicketCategory()).typeEnums,
          label: 'معاونت',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        { type: 'select', name: 'category', responseKey: 'category', placeholder: ' ', options: [], label: 'دسته', col: 'col-md-6 col-12' },
        { type: 'select', name: 'status', responseKey: 'status', options: (new Ticket()).statusEnums, multiple: false, label: 'وضعیت', placeholder: ' ', readonly: true, col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'creation_time', responseKey: 'creation_time', placeholder: ' ', label: 'تاریخ ایجاد', readonly: true, col: 'col-md-6 col-12' },

        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', readonly: true, col: 'col-md-12 col-12' },
        { type: 'inputEditor', name: 'body', responseKey: 'body', label: 'متن', placeholder: ' ', readonly: true, col: 'col-md-12 col-12' },
        { type: 'hidden', name: 'source_type', responseKey: 'source_type', value: null },
        { type: 'hidden', name: 'source_id', responseKey: 'source_id', value: null },
        { type: 'hidden', name: 'id', responseKey: 'id' },
        { type: 'hidden', name: 'owner', responseKey: 'owner' },
        { type: 'hidden', name: 'replies_info', responseKey: 'replies_info' }
      ]
    }
  },
  computed: {
    selectedCategoryInfoType () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'category_info__type')?.value
    },
    instalmentOffers () {
      return new InstalmentOfferList(this.ticket.source?.instalment_offers_info)
    },
    repliesInfo () {
      return this.inputs.find(input => input.name === 'replies_info').value
    }
  },
  watch: {
    selectedCategoryInfoType () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'value', null)
      this.loadCategories()
    }
  },
  created() {
    const ticketId = this.$route.params.id
    this.api = APIGateway.ticket.APIAdresses.byId(ticketId)
    FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', () => {
      const userId = FormBuilderAssist.getInputsByName(this.inputs, 'userId').value
      this.$router.push({ name: 'Admin.User.Show', params: { id: userId } })
    })
  },
  mounted() {
    this.loadAuthData()
    this.checkSource()
    this.loadOptions()
      .then(() => {
        this.$nextTick(() => {
          this.mounted = true
        })
      })
      .catch(() => {
        this.mounted = true
      })
  },
  methods: {
    miladiToShamsi (miladi) {
      return Assist.miladiToShamsi(miladi)
    },
    isUserMessage (authenticatedUser, message) {
      return authenticatedUser.id === message.creator_info.id
    },
    removeMessage (replyMessageId) {
      this.$q.dialog({
        title: 'توجه',
        message: 'آیا از حذف پیام اطمینان دارید؟',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.entityLoading = true
        APIGateway.ticket.deleteReplyMessage(replyMessageId)
          .then(() => {
            this.$refs.entityEdit.getData()
          })
          .catch(() => {
            this.entityLoading = true
          })
      })
    },
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
    afterLoadInputData () {
      this.$nextTick(() => {
        FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'value', this.ticket.category)
      })
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
        const type = this.selectedCategoryInfoType
        // if (!type) {
        //   return
        // }
        this.categoriesLoading = true
        APIGateway.ticketCategory.index({ type })
          .then(({ list }) => {
            const ticketCategoryList = list
            FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'options', ticketCategoryList.list.map(item => {
              return {
                value: item.id,
                label: item.title
              }
            }))
            this.categoriesLoading = false
            this.$nextTick(() => {
              resolve()
            })
          })
          .catch(() => {
            this.categoriesLoading = false
            this.$nextTick(() => {
              reject()
            })
          })
      })
    },
    sendReply() {
      this.entityLoading = true
      APIGateway.ticket.reply({
        id: this.$route.params.id,
        body: this.replyText
      })
        .then(() => {
          this.$refs.entityEdit.getData()
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
