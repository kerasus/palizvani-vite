<template>
  <div class="AdminTestShow"
       :style="localOptions.style">
    <q-skeleton v-if="!unit.id || !transcriptSheetHistory.id"
                type="text"
                width="200px" />
    <breadcrumbs v-else
                 style="margin-top: 29px; margin-bottom: 19px;" />
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
                 title="مشخصات تاریخچه نمره"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-save-button="false"
                 :show-reload-button="false"
                 :redirect-after-edit="false" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { Unit } from 'src/models/Unit.js'
import { TranscriptSheetHistory } from 'src/models/TranscriptSheetHistory.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminTestShow',
  components: { EntityEdit, Breadcrumbs },
  mixins: [mixinWidget],
  data () {
    const unitId = this.$route.params.unit_id
    const transcriptSheetHistoryId = this.$route.params.id
    return {
      mounted: false,
      unit: new Unit(),
      TranscriptSheetHistory: new TranscriptSheetHistory(),
      entityLoading: false,
      api: APIGateway.transcriptSheetHistory.APIAdresses.byId(transcriptSheetHistoryId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'input', name: 'national_code', responseKey: 'national_code', label: 'کد ملی', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'input', name: 'score', responseKey: 'score', label: 'نمره', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'hidden', name: 'unit', responseKey: 'unit', value: unitId },
        { type: 'hidden', name: 'id', responseKey: 'id' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تایید نهایی', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-end' }
      ]
    }
  },
  mounted() {
    this.setActionBtn()
    this.mounted = true
    Promise.all([
      this.getUnit(),
      this.getTranscriptSheetHistory()
    ])
      .then(() => {
        this.updateBreadcrumbs()
      })
      .catch(() => {
      })
  },
  methods: {
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.edit)
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity()
        .then(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
        .catch(() => {
          this.entityLoading = false
        })
    },
    getUnit () {
      return new Promise((resolve, reject) => {
        this.unit.loading = true
        APIGateway.unit.get(this.$route.params.unit_id)
          .then((unit) => {
            this.unit = new Unit(unit)
            this.unit.loading = false
            resolve()
          })
          .catch(() => {
            this.unit.loading = false
            reject()
          })
      })
    },
    getTranscriptSheetHistory () {
      return new Promise((resolve, reject) => {
        this.transcriptSheetHistory.loading = true
        APIGateway.transcriptSheetHistory.get(this.$route.params.id)
          .then((transcriptSheetHistory) => {
            this.transcriptSheetHistory = new TranscriptSheetHistory(transcriptSheetHistory)
            this.transcriptSheetHistory.loading = false
            resolve()
          })
          .catch(() => {
            this.transcriptSheetHistory.loading = false
            reject()
          })
      })
    },
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'درس ها و چارت آموزشی',
            to: { name: 'Admin.Category.Index' }
          },
          {
            label: this.unit.category_info.title,
            to: { name: 'Admin.Category.Show', params: { id: this.unit.category_info.id } }
          },
          {
            label: this.unit.title,
            to: { name: 'Admin.Unit.Show', params: { id: this.unit.id } }
          },
          {
            // label: this.testSet.title
            label: 'تاریخچه نمره'
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminTestShow {
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
