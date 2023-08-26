<template>
  <div class="ShowSource">
    <admin-invoice-show v-if="sourceType === 'INVOICE' && sourceId"
                        :options="{invoiceId: sourceId, showBackBtn: false}"
                        class="q-mt-lg" />

    <!--    <q-card v-if="sourceType === 'INVOICE' && sourceId"-->
    <!--            class="q-mt-lg">-->
    <!--      <q-card-section>-->
    <!--        اقساط-->
    <!--      </q-card-section>-->
    <!--      <q-separator />-->
    <!--      <q-card-section>-->
    <!--        <installment-offers :installment-offers="instalmentOffers"-->
    <!--                            :loading="entityLoading"-->
    <!--                            @onReject="onReject"-->
    <!--                            @onAccept="onAccept" />-->
    <!--      </q-card-section>-->
    <!--      <q-separator />-->
    <!--      <q-card-section>-->
    <!--        <create-installment :invoice-id="sourceId"-->
    <!--                            @onCreated="onCreateInstallmentOffer" />-->
    <!--      </q-card-section>-->
    <!--    </q-card>-->
  </div>
</template>

<script>
import Assist from 'src/assets/js/Assist.js'
import { InstalmentOfferList } from 'src/models/InstalmentOffer.js'
import AdminInvoiceShow from 'src/components/Widgets/Invoice/AdminInvoiceShow/AdminInvoiceShow.vue'

export default {
  name: 'ShowSource',
  components: {
    AdminInvoiceShow
  },
  props: {
    source: {
      type: Object,
      default: null
    },
    sourceType: {
      type: String,
      default: null
    },
    sourceId: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
    }
  },
  computed: {
    instalmentOffers () {
      return new InstalmentOfferList(this.source?.instalment_offers_info)
    }
  },
  methods: {
    toShamsi (miladi) {
      return Assist.miladiToShamsi(miladi, 'jYYYY/jMM/jDD')
    },
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
    },
    onReject (offer) {
      this.$emit('onReject', offer)
    },
    onAccept (offer) {
      this.$emit('onAccept', offer)
    }
  }
}
</script>

<style scoped lang="scss">
.ShowSource {

}
</style>
