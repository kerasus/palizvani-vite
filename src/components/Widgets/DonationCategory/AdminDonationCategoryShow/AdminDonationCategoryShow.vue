<template>
  <div class="AdminDonationCategoryShow"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-edit v-if="mounted"
                 ref="entityEdit"
                 v-model:value="inputs"
                 title="مشخصات دسته بندی کلی"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-route-name="showRouteName"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-save-button="false"
                 :show-reload-button="false"
                 :redirect-after-edit="false"
                 :after-load-input-data="afterLoadInputData" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EntityEdit, EntityCreate } from 'quasar-crud'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { DonationCategory } from 'src/models/DonationCategory.js'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminDonationCategoryShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget, EntityCreate],
  data: () => {
    return {
      listKey: Date.now(),
      replyText: null,
      mounted: false,
      entityLoading: true,
      donationCategory: new DonationCategory(),
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.DonationCategory.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', value: null, placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'عکس', value: null, placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', value: null, placeholder: ' ', col: 'col-md-12 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تایید', placeholder: ' ', ignoreValue: false, atClick: () => {}, col: 'col-12' },
        { type: 'hidden', name: 'parent', responseKey: 'parent', value: null },
        { type: 'hidden', name: 'id', responseKey: 'id', value: null }
      ]
    }
  },
  computed: {
    repliesInfo () {
      return this.inputs.find(input => input.name === 'replies_info').value
    }
  },
  created() {
    this.donationCategory.loading = true
    this.api = APIGateway.donationCategory.APIAdresses.byId(this.$route.params.id)
  },
  mounted() {
    this.mounted = true
    this.setActionBtn()
  },
  methods: {
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.edit)
    },
    afterLoadInputData (data) {
      this.donationCategory = new DonationCategory(data)
      this.donationCategory.loading = false
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
    },
    onCreated () {
      this.listKey = Date.now()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminDonationCategoryShow {
}
</style>
