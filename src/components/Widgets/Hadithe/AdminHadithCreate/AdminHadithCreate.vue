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
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminDonationCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.hadith.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Hadith.Show',
      inputs: [
        { type: 'inputEditor', name: 'persian_text', responseKey: 'persian_text', label: 'متن فارسی', col: 'col-12' },
        { type: 'inputEditor', name: 'arabian_text', responseKey: 'arabian_text', label: 'متن عربی', col: 'col-12' },
        { type: 'input', name: 'narrator', responseKey: 'narrator', label: 'گوینده', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'source', responseKey: 'source', label: 'منبع', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'date', name: 'publish_date', responseKey: 'publish_date', outsideLabel: 'تاریخ انتشار', col: 'col-md-4 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تایید', placeholder: ' ', atClick: this.create, col: 'col-md-6' }
      ]
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
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
