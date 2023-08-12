<template>
  <div class="InstallmentOffers">
    <q-list separator>
      <q-item v-for="offer in installmentOffers.list"
              :key="offer.id"
              dense>
        <q-item-section>
          <div class="row q-col-gutter-md">
            <div class="col-md-3 col-12">
              مبلغ:
              {{ offer.amount ? offer.amount.toLocaleString('fa') : 0 }}
            </div>
            <div class="col-md-3 col-12">
              تعداد اقساط:
              {{ offer.count }}
            </div>
            <div class="col-md-3 col-12">
              فاصله هر فسط(روز):
              {{ offer.due_date_interval }}
            </div>
            <div class="col-md-3 col-12">
              تاریخ شروع اولین قسط:
              {{ toShamsi(offer.starting_date) }}
              <q-badge v-if="offer.is_accepted === true"
                       color="green">
                تایید شده
              </q-badge>
              <q-badge v-if="offer.is_accepted === false"
                       color="red">
                رد شده
              </q-badge>
            </div>
            <div v-if="offer.is_accepted === null"
                 class="col-12 flex justify-end">
              <q-btn color="red"
                     :loading="loading"
                     @click="onReject(offer)">
                رد درخواست
              </q-btn>
              <q-btn color="green"
                     class="q-ml-xl"
                     :loading="loading"
                     @click="onAccept(offer)">
                تایید درخواست
              </q-btn>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import Assist from 'src/assets/js/Assist.js'
import { InstalmentOfferList } from 'src/models/InstalmentOffer.js'

export default {
  name: 'InstallmentOffers',
  props: {
    installmentOffers: {
      type: InstalmentOfferList,
      default: new InstalmentOfferList()
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
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
.InstallmentOffers {
  .q-btn {
    padding: 5px;
    height: 40px;
  }
}
</style>
