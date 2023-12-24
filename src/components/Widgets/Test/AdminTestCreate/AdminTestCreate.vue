<template>
  <div class="AdminTestCreate"
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
                   :title="$route.query.classroom_type === 'EVENT' ? 'مشخصات پرسشنامه' : 'مشخصات آزمون'"
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
import { TestSet } from 'src/models/TestSet.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import UsersOfTestSelector from 'src/components/FormBuilderCustumComponents/UsersOfTestSelector/UsersOfTestSelector.vue'

const BtnControlComp = shallowRef(BtnControl)
const UsersOfTestSelectorComp = shallowRef(UsersOfTestSelector)

export default {
  name: 'AdminTestCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      testSet: new TestSet(),
      entityLoading: false,
      api: APIGateway.test.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Unit.TestSet.Show',
      classroomInputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات آزمون', col: 'col-12' },
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
      ],
      eventInputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات آزمون', col: 'col-12' },
        { type: 'hidden', name: 'event', responseKey: 'event', value: this.$route.params.classroom_id },
        { type: 'hidden', name: 'test_set', responseKey: 'test_set', value: this.$route.params.test_set_id },
        { type: 'hidden', name: 'classroom', responseKey: 'classroom', value: this.$route.params.classroom_id },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'تعیین جزییات', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-end' }
      ],
      inputs: []
    }
  },
  created() {
    if (this.$route.query.classroom_type === 'EVENT') {
      this.inputs = this.eventInputs
    } else {
      this.inputs = this.classroomInputs
    }
  },
  mounted() {
    this.setActionBtn()
    this.getTestSet()
    this.mounted = true
  },
  methods: {
    getTestSet () {
      this.testSet.loading = true
      APIGateway.testSet.get(this.$route.params.test_set_id)
        .then((testSet) => {
          this.testSet.loading = false
          this.testSet = new TestSet(testSet)
          FormBuilderAssist.setAttributeByName(this.inputs, 'title', 'value', this.testSet.title)
          FormBuilderAssist.setAttributeByName(this.inputs, 'description', 'value', this.testSet.description)
        })
        .catch(() => {
          this.testSet.loading = false
        })
    },
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.create)
    },
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity(false)
        .then((response) => {
          this.$router.push({
            name: 'Admin.Classroom.TestSet.Test.Show',
            params: { classroom_id: this.$route.params.classroom_id, test_set_id: this.$route.params.test_set_id, id: response.data.id },
            query: this.$route.query
          })
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
.AdminTestCreate {
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
