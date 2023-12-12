<template>
  <div class="AdminTestShow"
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
                 title="مشخصات آزمون"
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
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import UsersOfTestSelector from 'src/components/FormBuilderCustumComponents/UsersOfTestSelector/UsersOfTestSelector.vue'

const BtnControlComp = shallowRef(BtnControl)
const UsersOfTestSelectorComp = shallowRef(UsersOfTestSelector)

export default {
  name: 'AdminTestShow',
  components: { EntityEdit },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.test.APIAdresses.byId(this.$route.params.id),
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'detail', responseKey: 'detail', label: 'توضیحات آزمون', col: 'col-12' },
        { type: 'dateTime', name: 'start_time', responseKey: 'start_time', label: 'زمان شروع آزمون', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'end_time', responseKey: 'end_time', label: 'زمان پایان آزمون', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'input', name: 'duration_deadline', responseKey: 'duration_deadline', label: 'مدت زمان پاسخ دهی (دقیقه)', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'announcement_time', responseKey: 'announcement_time', label: 'زمان اعلام نتایج', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'objection_start_time', responseKey: 'objection_start_time', label: 'زمان شروع اعتراض', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'objection_end_time', responseKey: 'objection_end_time', label: 'زمان پایان اعتراض', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'hidden', name: 'test_set', responseKey: 'test_set', value: this.$route.params.test_set_id },
        { type: 'hidden', name: 'classroom', responseKey: 'classroom', value: this.$route.params.classroom_id },
        { type: UsersOfTestSelectorComp, name: 'examinees', responseKey: 'examinees', classroomId: this.$route.params.classroom_id, col: 'col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تعیین جزییات', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-end' }
      ]
    }
  },
  mounted() {
    this.setActionBtn()
    this.mounted = true
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
