<template>
  <div class="AdminHadithShow"
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
                 title="اطلاعات حدیث"
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
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminHadithShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: true,
      api: APIGateway.hadith.APIAdresses.byId(this.$route.params.id),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Hadith.Show',
      indexRouteName: 'Admin.Hadith.List',
      inputs: [
        { type: 'inputEditor', name: 'persian_text', responseKey: 'persian_text', label: 'متن فارسی', col: 'col-12' },
        { type: 'inputEditor', name: 'arabian_text', responseKey: 'arabian_text', label: 'متن عربی', col: 'col-12' },
        { type: 'input', name: 'narrator', responseKey: 'narrator', label: 'گوینده', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'source', responseKey: 'source', label: 'منبع', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'date', name: 'publish_date', responseKey: 'publish_date', outsideLabel: 'تاریخ انتشار', col: 'col-md-4 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ویرایش حدیث', placeholder: ' ', atClick: this.edit, col: 'col-md-6' }
      ]
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    afterLoadInputData () {
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
    }
  }
}
</script>

<style scoped lang="scss">
.AdminHadithShow {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    display: flex;
    flex-flow: row;
    position: relative;
    .static-title {

    }
    .dynamic-title {

    }
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
