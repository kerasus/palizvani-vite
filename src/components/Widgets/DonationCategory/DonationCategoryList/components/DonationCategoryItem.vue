<template>
  <q-card flat
          class="donation-categoty__item">
    <q-card-section class="donation-categoty__wrapper">
      <div class="row">
        <div class="col-md-5 col-12 donation-categoty__thumbnail-col">
          <q-img class="donation-categoty__thumbnail"
                 :src="donationCategory.thumbnail" />
        </div>
        <div class="col-md-7 col-12">
          <div class="donation-categoty__title">
            {{ donationCategory.title }}
          </div>
          <div class="donation-categoty__description ellipsis-3-lines"
               v-html="donationCategory.description" />
          <div class="donation-categoty__actions">
            <q-btn flat
                   :to="{name: 'Public.DonationCategory.Show', params: {donation_category_id: donationCategory.id}}">
              جزییات بیشتر
              <q-icon name="keyboard_backspace" />
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { DonationCategory } from 'src/models/DonationCategory'

export default {
  name: 'DonationCategoryItem',
  props: {
    donationCategory: {
      type: DonationCategory,
      default: new DonationCategory()
    }
  }
}
</script>

<style scoped lang="scss">
.donation-categoty__item {
  border-radius: 8px;
  background-color: #FBF4EA;
  .donation-categoty__wrapper {
    position: relative;
    padding-bottom: 48px;
    .donation-categoty__thumbnail-col {
      padding-right: 16px;
      .donation-categoty__thumbnail {
        width: 100%;
      }
    }
    .donation-categoty__actions {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      right: 16px;
      bottom: 16px;
    }
  }
}
</style>
