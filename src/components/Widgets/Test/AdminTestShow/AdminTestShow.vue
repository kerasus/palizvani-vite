<template>
  <div class="AdminTestShow"
       :style="localOptions.style">
    <q-skeleton v-if="!classroom.id"
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
    <entity-edit v-if="mounted && classroom.id"
                 ref="entityEdit"
                 v-model:value="inputs"
                 :title="$route.query.classroom_type === 'EVENT' ? 'مشخصات پرسشنامه' : 'مشخصات آزمون'"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :after-load-input-data="afterLoadInputData"
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
import { Test } from 'src/models/Test.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import BtnControl from 'src/components/Control/btn.vue'
import { UnitCategory } from 'src/models/UnitCategory.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import QuestionsCreateAndAppend from 'src/components/FormBuilderCustumComponents/QuestionsCreateAndAppend/QuestionsCreateAndAppend.vue'
import UsersOfTestSelector from 'src/components/FormBuilderCustumComponents/UsersOfTestSelector/UsersOfTestSelector.vue'

const BtnControlComp = shallowRef(BtnControl)
const UsersOfTestSelectorComp = shallowRef(UsersOfTestSelector)
const QuestionsCreateAndAppendComp = shallowRef(QuestionsCreateAndAppend)

export default {
  name: 'AdminTestShow',
  components: { Breadcrumbs, EntityEdit },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: true,
      test: new Test(),
      classroom: new Classroom(),
      api: APIGateway.test.APIAdresses.byId(this.$route.params.id),
      entityIdKey: 'id',
      entityParamKey: 'id',
      classroomInputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات آزمون', col: 'col-12' },
        { type: 'dateTime', name: 'start_time', responseKey: 'start_time', label: 'زمان شروع آزمون', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'end_time', responseKey: 'end_time', label: 'زمان پایان آزمون', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'input', name: 'duration_deadline', responseKey: 'duration_deadline', label: 'مدت زمان پاسخ دهی (دقیقه)', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'announcement_time', responseKey: 'announcement_time', label: 'زمان اعلام نتایج', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'objection_start_time', responseKey: 'objection_start_time', label: 'زمان شروع اعتراض', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'objection_end_time', responseKey: 'objection_end_time', label: 'زمان پایان اعتراض', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'select', name: 'level', responseKey: 'level', label: 'سطح آزمون', placeholder: ' ', options: (new Test()).levelEnums, col: 'col-md-3 col-12' },
        { type: 'hidden', name: 'test_set', responseKey: 'test_set', value: this.$route.params.test_set_id },
        { type: 'hidden', name: 'classroom', responseKey: 'classroom', value: this.$route.params.classroom_id },
        { type: QuestionsCreateAndAppendComp, name: 'test_questions', responseKey: 'test_questions_info', testId: this.$route.params.id, questionType: 'QUESTION_BANK', ignoreValue: true, col: 'col-md-12 col-12' },
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
  computed: {
    classroomTypeTitle () {
      const unitCategory = new UnitCategory({ type: this.$route.query.classroom_type })
      return unitCategory.type_info.label
    },
    indexPageRouteName () {
      if (this.$route.query.classroom_type === 'TRAINING') {
        return 'Admin.Classroom.Index'
      }
      if (this.$route.query.classroom_type === 'EVENT') {
        return 'Admin.Event.Index'
      }
      return 'Admin.Classroom.Index'
    },
    showPageRouteName () {
      if (this.$route.query.classroom_type === 'TRAINING') {
        return 'Admin.Classroom.Show'
      }
      if (this.$route.query.classroom_type === 'EVENT') {
        return 'Admin.Event.Show'
      }
      return 'Admin.Classroom.Show'
    }
  },
  created () {
    if (this.$route.query.classroom_type === 'EVENT') {
      this.inputs = this.eventInputs
    } else {
      this.inputs = this.classroomInputs
    }
  },
  mounted () {
    this.getClassroom()
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
    },
    afterLoadInputData (responseData) {
      this.test = new Test(responseData)
      this.entityLoading = false
    },
    getClassroom () {
      this.classroom.loading = true
      APIGateway.classroom.get(this.$route.params.classroom_id)
        .then((classroom) => {
          this.classroom = new Classroom(classroom)
          this.classroom.loading = false
          this.updateBreadcrumbs()
        })
        .catch(() => {
          this.classroom.loading = false
        })
    },
    updateBreadcrumbs () {
      this.$store.commit('AppLayout/updateBreadcrumbs', {
        visible: true,
        loading: false,
        path: [
          {
            label: 'لیست ' + this.classroomTypeTitle,
            to: { name: this.indexPageRouteName }
          },
          {
            label: this.classroom.title,
            to: { name: this.showPageRouteName, params: { id: this.$route.params.classroom_id } }
          },
          {
            label: 'آزمون ها'
          },
          {
            label: this.test.title
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
