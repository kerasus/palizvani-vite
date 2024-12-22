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
      <div class="show-donation-selector">
        <q-banner class="donation-category-title">
          پرداخت
          صدقه
          آنلاین
        </q-banner>
        <div class="donation-selector-form">
          <entity-create v-if="mounted"
                         ref="entityCreate"
                         v-model:value="donationSelectorInputs"
                         :api="donationSelectorApi"
                         :entity-id-key="donationSelectorEntityIdKey"
                         :entity-param-key="donationSelectorEntityParamKey"
                         :show-route-name="donationSelectorShowRouteName"
                         :default-layout="false"
                         :show-close-button="false"
                         :show-edit-button="false"
                         :show-expand-button="false"
                         :show-save-button="false"
                         :show-reload-button="false" />
        </div>
      </div>
      <div v-if="selectedDonation?.id"
           class="show-donation-section">
        <div class="show-donation-payment-section">
          <q-banner class="donation-category-title">
            شرح مورد استفاده
            <!--            {{selectedDonation.title}}-->
          </q-banner>
        </div>
        <div class="show-donation-info-section">
          <div class="donation-content">
            <div class="donation-description"
                 v-html="selectedDonation.description" />
          </div>
          <div class="donation-thumbnail">
            <q-img :src="selectedDonation.thumbnail" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { DonationList } from 'src/models/Donation.js'
import BtnControl from 'src/components/Control/btn.vue'
import { DonationCategory } from 'src/models/DonationCategory.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'DonationList',
  components: { Breadcrumbs, EntityCreate },
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
      donations: new DonationList(),
      donationCategory: new DonationCategory(),
      mounted: false,
      createRouteName: '',

      donationSelectorApi: 'id',
      donationSelectorInputs: [
        { type: 'select', name: 'donation', responseKey: 'donation', label: 'مورد استفاده', placeholder: ' ', optionValue: 'id', optionLabel: 'title', col: 'col-md-8 col-12' },
        { type: 'input', name: 'amount', responseKey: 'amount', label: 'مبلغ', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'fullName', responseKey: 'fullName', label: 'نام و نام خانوادگی', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'mobile', responseKey: 'mobile', label: 'موبایل(جهت اصلاع رسانی)', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'checkbox', name: 'private', responseKey: 'private', label: 'ناشناس بمانم', placeholder: ' ', value: false, class: 'flex justify-end items-end full-height', col: 'col-md-2 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'پرداخت', placeholder: ' ', atClick: () => {}, class: 'flex justify-end items-end full-height', col: 'col-md-2 col-12' }
      ],
      donationSelectorEntityIdKey: 'id',
      donationSelectorEntityParamKey: 'id',
      donationSelectorShowRouteName: 'Admin.Donation.Show'
    }
  },
  computed: {
    selectedDonation () {
      const donationId = FormBuilderAssist.getInputsByName(this.donationSelectorInputs, 'donation')?.value
      if (!donationId) {
        return null
      }

      return this.donations.list.find(item => item.id === donationId)
    }
  },
  mounted() {
    this.getDonations()
  },
  methods: {
    getDonations () {
      this.donations.loading = true
      APIGateway.donation.index({
        category: this.$route.params.donation_category_id
      })
        .then(({ list }) => {
          this.donations = new DonationList(list)
          FormBuilderAssist.setAttributeByName(this.donationSelectorInputs, 'donation', 'options', this.donations.list)
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
    .show-donation-selector {
      .donation-category-title {
        margin-bottom: 34px;
      }
      .donation-selector-form {
        background: #F5F5F5;
        padding: 44px 24px 24px 24px;
        margin-bottom: 60px;
        :deep(.entity-crud-formBuilder) {
          .form-builder-checkbox {
            .q-checkbox {
              height: 48px !important;
            }
          }
        }
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
