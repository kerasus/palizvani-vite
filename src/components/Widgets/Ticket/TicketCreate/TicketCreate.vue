<template>
  <div class="TicketCreate"
       :style="localOptions.style">
    <div class="title">
      ارسال پیام
      <div class="back-action">
        <q-btn flat
               :to="{name: 'UserPanel.Ticket.List'}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <q-card class="form"
            flat>
      <q-linear-progress v-if="categoriesLoading"
                         indeterminate />
      <entity-create v-if="mounted"
                     ref="entityCreate"
                     v-model:value="inputs"
                     title="نقش جدید"
                     :api="api"
                     :default-layout="false"
                     :entity-id-key-in-response="entityIdKeyInResponse"
                     :show-route-param-key="showRouteParamKey"
                     :index-route-name="indexRouteName"
                     :show-route-name="showRouteName" />
      <div class="action">
        <div class="row q-mt-lg justify-end">
          <div class="col-md-4 col-12">
            <q-btn color="primary"
                   class="full-width"
                   :loading="entityLoading"
                   @click="create">
              ارسال
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { TicketCategory } from 'src/models/TicketCategory.js'

export default {
  name: 'TicketCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      categoriesLoading: false,
      entityLoading: false,
      api: APIGateway.ticket.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'UserPanel.Ticket.Show',
      indexRouteName: 'UserPanel.Ticket.List',
      inputs: [
        {
          type: 'select',
          name: 'source_type',
          options: [
            { label: 'مالی', value: 'INVOICE' },
            { label: 'آموزش', value: 'TRAINING_CLASSROOM' },
            { label: 'حلقه های مباحثاتی', value: 'DISCUSSION_CIRCLE_CLASSROOM' },
            { label: 'محتوا', value: 'CONTENT' }
          ],
          label: 'دپارتمان',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        { type: 'select', name: 'category', responseKey: 'category', options: [], label: 'دسته', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'separator', name: 'separator', size: '0', label: 'توضیحات عنوان اینجا قرار میگیرد', col: 'col-12' },
        { type: 'inputEditor', name: 'body', label: 'متن درخواست', col: 'col-md-12 col-12' },
        { type: 'file', name: 'attachment', label: 'انتخاب فایل ضمیمه', col: 'col-md-3 col-12' },
        { type: 'hidden', name: 'owner', value: 1 },
        { type: 'hidden', name: 'source_id', value: null }
      ]
    }
  },
  computed: {
    selectedSourceType () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'source_type')?.value
    }
  },
  watch: {
    selectedSourceType () {
      this.loadCategories()
    }
  },
  mounted() {
    this.checkSource()
    this.$nextTick(() => {
      this.mounted = true
    })
  },
  methods: {
    checkSource () {
      const sourceId = this.$route.query.source_id
      const sourceType = this.$route.query.source_type
      if (sourceType && sourceId) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'source_id', 'value', sourceId)
        FormBuilderAssist.setAttributeByName(this.inputs, 'source_type', 'value', sourceType)
        FormBuilderAssist.setAttributeByName(this.inputs, 'source_type', 'readonly', true)
      } else if (this.localOptions.defaultSourceType) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'source_type', 'value', this.localOptions.defaultSourceType)
        FormBuilderAssist.setAttributeByName(this.inputs, 'source_type', 'readonly', true)
      }
    },
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity()
        .then(() => {
          this.entityLoading = false
        })
        .catch(() => {
          this.entityLoading = false
        })
    },
    loadCategories () {
      const type = (new TicketCategory()).getCategoryTypeFromSourceType(this.selectedSourceType)
      if (!type) {
        return
      }
      this.categoriesLoading = true
      APIGateway.ticketCategory.index({ type })
        .then(({ list }) => {
          const ticketCategoryList = list
          this.setInputOptions('category', ticketCategoryList.list.map(item => {
            return {
              value: item.id,
              label: item.title
            }
          }))
          this.categoriesLoading = false
        })
        .catch(() => {
          this.categoriesLoading = false
        })
    },
    setInputOptions (name, options) {
      this.$refs.entityCreate.setInputAttributeByName(name, 'options', options)
    }
  }
}
</script>

<style scoped lang="scss">
.TicketCreate {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    position: relative;
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
