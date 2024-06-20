<template>
  <div class="AdminDonationCategoryCreate"
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
                   :title="title"
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
  name: 'AdminDonationCategoryCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  props: {
    title: {
      type: String,
      default: 'ایجاد دسته کمک های مالی'
    },
    parent: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.donationCategory.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.DonationCategory.Show',
      indexRouteName: 'Admin.DonationCategory.List',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', placeholder: ' ', col: 'col-md-12 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تایید', placeholder: ' ', atClick: () => {}, col: 'col-12' }
      ]
    }
  },
  mounted() {
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.onSubmit)
    },
    onSubmit () {
      this.create()
    },
    create() {
      const redirect = !this.parent
      this.entityLoading = true
      this.$refs.entityCreate.createEntity(redirect)
        .then(() => {
          this.entityLoading = false
          this.$emit('onCreated')
        })
        .catch(() => {
          this.entityLoading = false
        })
    },
    setInputOptions (name, options) {
      FormBuilderAssist.setAttributeByName(this.inputs, name, 'options', options)
    }
  }
}
</script>

<style scoped lang="scss">
.AdminDonationCategoryCreate {
  :deep(.q-card.entity-create) {
    .q-card__section {
      .q-expansion-item {
        .q-expansion-item__container {
          .q-item {
            display: none;
          }
        }
      }
    }
  }
}
</style>
