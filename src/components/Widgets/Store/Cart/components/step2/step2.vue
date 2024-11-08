<template>
  <div class="step2">
    <q-linear-progress v-if="basket.loading"
                       indeterminate />
    <template v-if="!basket.loading">
      <div class="step2__cart-info">
        <cart-items :basket-items="basket.items_info" />
        <cart-address :basket="basket"
                      @set-address="onSetAddress" />
        <delivery-info :basket="basket" />
      </div>
      <div class="step2__sidebar">
        <sidebar :basket="basket"
                 @complete="onComplete" />
      </div>
    </template>
    <q-dialog v-model="dialog">
      <q-card class="step2__confirm-dialog">
        <q-card-section class="step2__confirm-dialog-title-section flex justify-between">
          <div>
            آیین نامه خرید
          </div>
          <q-btn v-close-popup
                 icon="close"
                 flat
                 round
                 dense />
        </q-card-section>
        <q-separator />
        <q-card-section>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="flex justify-between">
            <div>
              <q-checkbox v-model="confirmed"
                          label="آیین نامه خرید محصول را خوانده و قبول دارم"
                          color="primary" />
            </div>
            <div>
              <q-btn v-close-popup
                     outline
                     color="primary"
                     class="q-mr-md"
                     @click="confirmed = false">
                انصراف
              </q-btn>
              <q-btn v-close-popup
                     :disable="!confirmed"
                     color="primary"
                     @click="confirmStep">
                تایید و ادامه
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Sidebar from './sidebar.vue'
import CartItems from './cartItems.vue'
import CartAddress from './cartAddress.vue'
import DeliveryInfo from './deliveryInfo.vue'
import { Basket } from 'src/models/Basket.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'step2',
  components: { CartItems, CartAddress, Sidebar, DeliveryInfo },
  props: {
    type: {
      type: String,
      default: 'product'
    }
  },
  emits: ['complete'],
  data () {
    return {
      dialog: false,
      confirmed: false
    }
  },
  computed: {
    basket: {
      get () {
        return this.$store.getters['Shop/basket']
      },
      set (newValue) {
        this.$store.commit('Shop/updateBasket', newValue)
      }
    }
  },
  mounted() {
    this.checkoutReview()
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    },
    confirmStep () {
      this.$emit('complete')
    },
    checkoutReview () {
      this.basket.loading = true
      APIGateway.basket.checkoutReview()
        .then((basket) => {
          this.basket = new Basket(basket)
        })
        .finally(() => {
          this.basket.loading = false
        })
    },
    onSetAddress () {
      this.checkoutReview()
    },
    onComplete () {
      if (!this.basket.address || !this.basket.province || !this.basket.city || !this.basket.postal_code) {
        this.$q.notify({
          type: 'negative',
          message: 'آدرس را مشخص کنید.'
        })
        return ''
      }
      this.openDialog()
    }
  }
}
</script>

<style scoped lang="scss">
.step2 {
  $gap: 28px;
  display: flex;
  flex-wrap: wrap;
  flex-flow: row;
  gap: $gap;
  $sidebar-width: 312px;
  .step2__cart-info {
    width: calc( 100% - #{$sidebar-width} - #{$gap} );
    display: flex;
    flex-flow: column;
    gap: 24px;
    @media screen and (max-width: 800px) {
      & {
        width: 100%;
      }
    }
  }
  .step2__sidebar {
    width: $sidebar-width;
    @media screen and (max-width: 800px) {
      & {
        width: 100%;
      }
    }
  }
}

:global(.step2__confirm-dialog) {
  width: 900px;
  max-width: 90vw;
}
</style>
