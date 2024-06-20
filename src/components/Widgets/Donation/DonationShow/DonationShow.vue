<template>
  <div class="DonationShow"
       :style="localOptions.style">
    <div class="more-action">
      <breadcrumbs />
    </div>
    <div class="main-section">
      <div v-if="donationCategory.id"
           class="show-donation-category-section">
        <div class="donation-category-content">
          <q-banner class="donation-category-title">
            {{donationCategory.title}}
          </q-banner>
          <div class="donation-category-description"
               v-html="donationCategory.description" />
        </div>
        <div class="donation-category-thumbnail">
          <q-img :src="donationCategory.thumbnail" />
        </div>
      </div>
      <div v-if="donation.id"
           class="show-donation-section">
        <div class="show-donation-payment-section">
          <q-banner class="donation-category-title">
            پرداخت
            {{donation.title}}
          </q-banner>
        </div>
        <div class="show-donation-info-section">
          <div class="donation-content">
            <q-banner class="donation-title">
              {{donation.title}}
            </q-banner>
            <div class="donation-description"
                 v-html="donation.description" />
          </div>
          <div class="donation-thumbnail">
            <q-img :src="donation.thumbnail" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Donation } from 'src/models/Donation.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { DonationCategory } from 'src/models/DonationCategory.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'DonationList',
  components: { Breadcrumbs },
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
      donation: new Donation(),
      donationCategory: new DonationCategory(),
      mounted: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.getDonation()
  },
  methods: {
    getDonation () {
      this.donation.loading = true
      APIGateway.donation.get(this.$route.params.donation_category_id)
        .then((donation) => {
          this.donation = new Donation(donation)
          console.log('this.donation', this.donation)
          this.getDonationCategory()
        })
    },
    getDonationCategory () {
      this.donationCategory.loading = true
      APIGateway.donationCategory.get(this.$route.params.donation_category_id)
        .then((donationCategory) => {
          this.donationCategory = new DonationCategory(donationCategory)
          this.updateBreadcrumbs(this.donationCategory, this.donation)
        })
    },
    updateBreadcrumbs (donationCategory, donation) {
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
          },
          {
            label: donation.title,
            to: { name: 'Public.DonationCategory.Donation.Show', params: { donation_category_id: donationCategory.id, donation_id: donation.id } }
          }
        ]
      })
      this.mounted = true
    }
  }
}
</script>

<style scoped lang="scss">
.DonationShow {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    margin-bottom: 24px;
  }
  .main-section {
    .show-donation-category-section {
      display: flex;
      justify-content: flex-start;
      gap: 16px;
      .donation-category-thumbnail {
        width: 30%;
      }
      .donation-category-content {
        width: 70%;
        .donation-category-title {
          margin-bottom: 16px;
        }
        .donation-category-description {}
      }
    }
    .show-donation-section {
      .show-donation-payment-section {
        margin-bottom: 16px;
      }
      .show-donation-info-section {
        display: flex;
        justify-content: flex-start;
        gap: 16px;
        .donation-thumbnail {
          width: 30%;
        }
        .donation-content {
          width: 70%;
          .donation-title {
            margin-bottom: 16px;
          }
          .donation-description {}
        }
      }
    }
  }
}
</style>
