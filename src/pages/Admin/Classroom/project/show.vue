<template>
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <entity-edit v-if="mounted"
               ref="projectEntityEdit"
               v-model:value="inputs"
               title="جزییات پروژه"
               :api="api"
               :show-close-button="false"
               :show-edit-button="false"
               :show-expand-button="false"
               :show-save-button="false"
               :show-reload-button="false">
    <template #after-form-builder>
      <div class="flex justify-end q-mt-md">
        <q-btn color="primary"
               label="ذخیره جزییات"
               @click="updateSessionTemplates" />
      </div>
    </template>
  </entity-edit>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { Project } from 'src/models/Project.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ContentsSelector from 'src/components/FormBuilderCustumComponents/ContentsSelector/ContentsSelector.vue'

const ContentsSelectorComp = shallowRef(ContentsSelector)

export default {
  name: 'Admin.Classroom.Project.Show',
  components: {
    EntityEdit
  },
  data () {
    const projectId = this.$route.params.project_id
    return {
      mounted: false,
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: APIGateway.project.APIAdresses.byId(projectId),
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
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات پروژه', placeholder: ' ', col: 'col-12' },
        { type: ContentsSelectorComp, name: 'contents', responseKey: 'contents_info', col: 'col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id' },
        { type: 'hidden', name: 'classroom', responseKey: 'classroom' }
      ]
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    updateSessionTemplates () {
      this.$refs.projectEntityEdit.editEntity(false)
    }
  }
}
</script>
