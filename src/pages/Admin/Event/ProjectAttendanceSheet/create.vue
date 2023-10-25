<template>
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <div class="AdminClassroomCreate">
    <q-linear-progress v-if="unitsLoading"
                       indeterminate />
    <entity-create v-if="mounted"
                   ref="entityCreate"
                   :key="classroomEntityCreateKey"
                   v-model:value="inputs"
                   title="مشخصات پروژه"
                   :api="api"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false">
      <template #after-form-builder>
        <div class="flex justify-end q-mt-md">
          <q-btn color="primary"
                 label="ایجاد پروژه جدید"
                 @click="create" />
        </div>
      </template>
    </entity-create>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { Project } from 'src/models/Project.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import ContentsSelector from 'src/components/FormBuilderCustumComponents/ContentsSelector/ContentsSelector.vue'

const ContentsSelectorComp = shallowRef(ContentsSelector)

export default {
  name: 'Admin.Classroom.Create',
  components: {
    EntityCreate
  },
  data () {
    const classroomId = this.$route.params.classroom_id
    return {
      mounted: false,
      unitsLoading: false,
      classroomEntityCreateKey: Date.now(),
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: APIGateway.classroom.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان پروژه', placeholder: ' ', col: 'col-md-6 col-12' },
        {
          type: 'select',
          name: 'type',
          responseKey: 'type',
          label: 'نوع پروژه',
          options: (new Project()).typeEnums,
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: 'dateTime', name: 'beginning_doing_period', responseKey: 'beginning_doing_period', label: 'زمان شروع', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_doing_period', responseKey: 'ending_doing_period', label: 'زمان پایان', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        { type: 'inputEditor', name: 'correct_answer', responseKey: 'description', label: 'پاسخ صحیح', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات پروژه', placeholder: ' ', col: 'col-12' },
        { type: ContentsSelectorComp, name: 'contents', responseKey: 'contents_info', col: 'col-12' },
        { type: 'hidden', name: 'classroom', responseKey: 'classroom', value: parseInt(classroomId) }
      ]
    }
  },
  computed: {
    selectedCategoryId () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'category')?.value
    }
  },
  watch: {
    selectedCategoryId () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'unit', 'value', null)
      FormBuilderAssist.setAttributeByName(this.inputs, 'unit', 'options', [])
      this.getUnits(this.selectedCategoryId)
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    create () {
      this.$refs.entityCreate.createEntity(false)
        .then((response) => {
          const classroomId = this.$route.params.classroom_id
          const projectId = response.data.id
          this.$router.push({ name: 'Admin.Classroom.Project.Show', params: { classroom_id: classroomId, project_id: projectId } })
        })
        .catch(() => {})
    }
  }
}
</script>
