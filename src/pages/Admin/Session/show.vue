<template>
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <div class="AdminSessionShow">
    <entity-edit v-if="mounted"
                 ref="sessionEntityEdit"
                 v-model:value="inputs"
                 title="جزییات جلسه"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-route-name="showRouteName"
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
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import ContentMedias from 'src/components/FormBuilderCustumComponents/ContentMedias/ContentMedias.vue'
import ContentsSelector from 'src/components/FormBuilderCustumComponents/ContentsSelector/ContentsSelector.vue'

const ContentMediasComp = shallowRef(ContentMedias)
const ContentsSelectorComp = shallowRef(ContentsSelector)

export default {
  name: 'Admin.Session.Show',
  components: {
    EntityEdit
  },
  data () {
    return {
      mounted: false,
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.SessionTemplate.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام جلسه', placeholder: ' ', col: 'col-md-9 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-12' },
        { type: 'dateTime', name: 'beginning_time', responseKey: 'beginning_time', outsideLabel: 'زمان شروع جلسه', col: 'col-md-6 col-12' },
        { type: 'dateTime', name: 'ending_time', responseKey: 'ending_time', outsideLabel: 'زمان پایان جلسه', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'syllabus', responseKey: 'syllabus', label: 'مقرری', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: ContentsSelectorComp, name: 'contents', responseKey: 'contents_info', col: 'col-12' },
        { type: ContentMediasComp, name: 'medias', responseKey: 'medias_info', sourceType: 'SESSION', col: 'col-12' },
        { type: 'inputEditor', name: 'assignment_description', responseKey: 'assignment_description', label: 'تکلیف', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'inputEditor', name: 'assignment_answer', responseKey: 'assignment_answer', label: 'پاسخ تکلیف', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-12' }
      ]
    }
  },
  mounted () {
    this.api = APIGateway.session.APIAdresses.byId(this.$route.params.id)
    this.mounted = true
  },
  methods: {
    updateSessionTemplates () {
      this.$refs.sessionEntityEdit.editEntity(false)
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>

<style>
.fit-to-card {
  margin: -16px;
}
</style>
