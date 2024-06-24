<template>
  <div class="AdminNoticeShow"
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
                 :title="'ویرایش' + ' ' + entityTitle "
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
  name: 'AdminNoticeShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data () {
    const noticeId = this.$route.params.id
    return {
      mounted: false,
      entityLoading: true,
      entityTitle: '',
      api: APIGateway.notice.APIAdresses.byId(noticeId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Notice.Show',
      indexRouteName: 'AdminPanel.Notice.List',
      inputs: [
        {
          type: 'input',
          name: 'title',
          responseKey: 'title',
          label: 'عنوان',
          placeholder: ' ',
          col: 'col-12'
        },
        // {
        //   type: 'input',
        //   name: 'url',
        //   responseKey: 'url',
        //   label: 'لینک',
        //   placeholder: ' ',
        //   col: 'col-12'
        // },
        {
          type: 'inputEditor',
          name: 'body',
          responseKey: 'body',
          label: 'متن',
          placeholder: ' ',
          col: 'col-12'
        },
        {
          type: 'hidden',
          name: 'id',
          responseKey: 'id'
        },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ثبت تغییرات', placeholder: ' ', atClick: this.edit, col: 'col-md-6' }
      ]
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    onUpdateServices () {
      this.$refs.entityEdit.getData()
    },
    afterLoadInputData (response) {
      this.entityTitle = response.title
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity()
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
.AdminNoticeShow {

}
</style>
