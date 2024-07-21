<template>
  <div class="CreateInstallment">
    <entity-create ref="entityCreate"
                   v-model:value="inputs"
                   :api="api"
                   :default-layout="false"
                   :entity-id-key-in-response="entityIdKeyInResponse"
                   :show-route-param-key="showRouteParamKey" />
    <q-btn color="primary"
           class="q-mt-md"
           :loading="entityLoading"
           @click="create">
      تعریف پیشنهاد قسط
    </q-btn>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'CreateInstallment',
  components: {
    EntityCreate
  },
  props: {
    invoiceId: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
      entityLoading: false,
      api: APIGateway.instalmentOffer.APIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      inputs: [
        { type: 'input', name: 'amount', label: 'مبلغ', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'count', label: 'تعداد اقساط', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'due_date_interval', label: 'فاصله هر قسط(روز)', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'date', name: 'starting_date', outsideLabel: 'تاریخ شروع اولین قسط', col: 'col-md-3 col-12' },
        { type: 'hidden', name: 'invoice', value: null }
      ]
    }
  },
  mounted() {
    FormBuilderAssist.setAttributeByName(this.inputs, 'invoice', 'value', this.invoiceId)
  },
  methods: {
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity(false)
        .then(() => {
          this.entityLoading = false
          this.$emit('onCreated')
        })
        .catch(() => {
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.CreateInstallment {
}
</style>
