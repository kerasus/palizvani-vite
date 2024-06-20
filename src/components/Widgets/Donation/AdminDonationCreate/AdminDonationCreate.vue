<template>
  <div class="AdminDonationCreate"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-create v-if="mounted"
                   ref="entityCreate"
                   v-model:value="inputs"
                   title="ایجاد محتوا"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminDonationCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.donation.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Donation.Show',
      inputs: [
        { type: 'select', name: 'category', responseKey: 'category', label: 'دسته', placeholder: ' ', options: [], col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-12 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تعریف کمک مالی', placeholder: ' ', atClick: () => {}, col: 'col-md-6' }
      ]
    }
  },
  mounted() {
    this.setActionBtn()
    this.loadCategories()
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.onSubmit)
    },
    loadCategories () {
      APIGateway.donationCategory.index({ per_page: 99999 })
        .then(({ list }) => {
          FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'options', list.list.map(item => {
            return {
              label: item.title,
              value: item.id
            }
          }))
        })
    },
    onSubmit () {
      this.create()
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
    }
  }
}
</script>

<style scoped lang="scss">
.AdminDonationCreate {
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
