<template>
  <div class="DonationList"
       :style="localOptions.style">
    <div class="more-action">
      <breadcrumbs />
    </div>
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :default-layout="false"
                  :table-grid-size="true"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :to="{name: 'UserPanel.Ticket.Show', params: {id: inputData.props.row.id}}">
            مشاهده جزییات
          </q-btn>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
      <template #entity-index-table-item-cell="{inputData}">
        <div class="col-md-6 col-12 q-pa-sm">
          <donation-item :donation="getDonation(inputData.props.row)" />
        </div>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { Donation } from 'src/models/Donation.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import DonationItem from './components/DonationItem.vue'
import { DonationCategory } from 'src/models/DonationCategory.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'DonationList',
  components: { EntityIndex, DonationItem, Breadcrumbs },
  mixins: [mixinWidget],
  data () {
    return {
      api: APIGateway.donation.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [],
      table: {
        columns: []
      },
      donationCategory: new DonationCategory(),
      mounted: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.mounted = true
    this.getDonationCategory()
  },
  methods: {
    getDonation (donation) {
      return new Donation(donation)
    },
    getDonationCategory () {
      this.donationCategory.loading = true
      APIGateway.donationCategory.get(this.$route.params.donation_category_id)
        .then((donationCategory) => {
          this.donationCategory = new DonationCategory(donationCategory)
          this.updateBreadcrumbs(this.donationCategory)
        })
    },
    updateBreadcrumbs (donationCategory) {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'خانه',
            to: { name: 'Public.Home' }
          },
          {
            label: 'پرداخت کمک مالی',
            to: { name: 'Public.DonationCategory.List' }
          },
          {
            label: donationCategory.title,
            to: { name: 'Public.DonationCategory.Show', params: { donation_category_id: donationCategory.id } }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.DonationList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    margin-bottom: 24px;
  }
}
</style>
