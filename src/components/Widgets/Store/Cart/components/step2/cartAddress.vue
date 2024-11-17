<template>
  <div class="cart-address">
    <div class="cart-address__title">
      <q-icon name="place" />
      آدرس:
    </div>
    <div v-if="mounted"
         class="cart-address__info">
      <div class="cart-address__selected-address">
        <q-radio v-model="addressRadio"
                 :val="1"
                 :label="basket.getFullAddressString()" />
      </div>
      <div class="cart-address__edit-btn">
        <q-btn color="primary"
               outline
               @click="openDialog">
          <q-icon name="edit" />
          ویرایش
        </q-btn>
      </div>
    </div>
    <q-dialog v-if="mounted"
              v-model="dialog">
      <q-card class="cart-address__dialog-cart">
        <q-card-section class="cart-address__dialog-cart-title-section flex justify-between">
          <div>
            ویرایش آدرس
          </div>
          <q-btn v-close-popup
                 icon="close"
                 flat
                 round
                 dense />
        </q-card-section>
        <q-separator />
        <q-card-section class="cart-address__dialog-cart-form-section">
          <form-builder v-model:value="addressInputs"
                        :loading="setAddressLoading" />
          <div class="flex justify-end q-mt-lg">
            <q-btn :loading="setAddressLoading"
                   color="primary"
                   @click="setAddress">
              ویرایش و ثبت
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Basket } from 'src/models/Basket.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilder, FormBuilderAssist } from 'quasar-form-builder'
import { Provinces, Cities, getCitiesOfProvince } from 'src/assets/js/IranianCities.js'

export default {
  name: 'CartAddress',
  components: { FormBuilder },
  props: {
    basket: {
      type: Basket,
      default: new Basket()
    }
  },
  emits: ['set-address'],
  data () {
    return {
      addressRadio: 1,
      mounted: false,
      dialog: false,
      setAddressLoading: false,
      addressInputs: [
        {
          type: 'select',
          name: 'province',
          options: Provinces,
          optionLabel: 'name',
          optionValue: 'name',
          createNewValue: true,
          newValueMode: 'add-unique',
          responseKey: 'province',
          label: 'استان',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'select',
          name: 'city',
          options: Cities,
          optionLabel: 'name',
          optionValue: 'name',
          createNewValue: true,
          newValueMode: 'add-unique',
          responseKey: 'city',
          label: 'شهر',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        { type: 'input', name: 'postal_code', responseKey: 'postal_code', label: 'کد پستی', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'address', responseKey: 'address', label: 'آدرس پستی', placeholder: ' ', col: 'col-12' }
      ]
    }
  },
  computed: {
    addressString () {
      return 'file_download'
    },
    selectedProvince () {
      return FormBuilderAssist.getInputsByName(this.addressInputs, 'province').value
    }
  },
  watch: {
    selectedProvince (newValue) {
      if (!newValue) {
        // FormBuilderAssist.setAttributeByName(this.addressInputs, 'city', 'value', null)
        FormBuilderAssist.setAttributeByName(this.addressInputs, 'city', 'disable', true)
        return
      }

      const filteredCities = getCitiesOfProvince(this.selectedProvince)

      // FormBuilderAssist.setAttributeByName(this.addressInputs, 'city', 'value', null)
      FormBuilderAssist.setAttributeByName(this.addressInputs, 'city', 'options', filteredCities)
      FormBuilderAssist.setAttributeByName(this.addressInputs, 'city', 'disable', false)
    }
  },
  mounted() {
    this.setFormData()
    this.mounted = true
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    },
    setAddress () {
      this.setAddressLoading = true
      APIGateway.basket.setAddress(this.basket.id, this.getFormData())
        .finally(() => {
          this.setAddressLoading = false
          this.closeDialog()
          this.$emit('set-address')
        })
    },
    getFormData () {
      return FormBuilderAssist.getFormData(this.addressInputs)
    },
    setFormData () {
      FormBuilderAssist.setInputValues(this.basket, this.addressInputs)
    }
  }
}
</script>

<style scoped lang="scss">
.cart-address {
  border-radius: 8px;
  background: #F9F9FB;
  border: 1px solid #DFE1EC;
  padding: 20px 30px 46px 38px;
  .cart-address__title {
    color: #727272;
    font-size: 16px;
    margin-bottom: 22px;
  }
  .cart-address__info {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    .cart-address__selected-address {

    }
    .cart-address__edit-btn {

    }
    @media screen and (max-width: 800px) {
      & {
        flex-flow: column;
      }
    }
  }
  :global(.cart-address__dialog-cart) {
    width: 700px;
    max-width: 90vw;
  }
}
</style>
