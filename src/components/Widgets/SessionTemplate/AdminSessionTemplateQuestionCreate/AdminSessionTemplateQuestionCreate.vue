<template>
  <div class="AdminSessionTemplateQuestionCreate"
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
                 title="ایجاد سوال جدید"
                 :api="api"
                 :loaded-data="loadedData"
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
import { Question } from 'src/models/Question.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminSessionTemplateQuestionCreate',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: true,
      api: APIGateway.sessionTemplate.APIAdresses.appendQuestion(this.$route.params.session_template_id),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Unit.Questions.Show',
      loadedData: new Question(),
      inputs: [
        { type: 'input', name: 'text', responseKey: 'text', label: 'سوال', placeholder: ' ', col: 'col-12' },
        { type: 'inputEditor', name: 'correct_answer', responseKey: 'correct_answer', label: 'پاسخ', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'mark', responseKey: 'mark', label: 'بارم پیشنهادی سوال', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'select', name: 'level', responseKey: 'level', label: 'سطح سوال', placeholder: ' ', options: (new Question()).levelEnums, col: 'col-md-3 col-12' },
        { type: BtnControlComp, name: 'btn', label: 'ذخیره سوال', placeholder: ' ', atClick: () => {}, col: 'col-12 flex justify-end' },
        { type: 'hidden', name: 'type', responseKey: 'type', value: 'QUESTION_BANK' }
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
    afterLoadInputData () {
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity(true)
        .then((response) => {
          this.$router.push({ name: 'Admin.Unit.Questions.Show', params: { session_template_id: this.$route.params.session_template_id, id: response.data.id } })
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
.AdminSessionTemplateQuestionCreate {
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
