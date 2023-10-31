<template>
  <div class="AdminTeamCreate"
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
                   title="ایجاد گروه"
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
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import { FormBuilderAssist } from 'quasar-form-builder'
import FormBuilderInputEditor from 'src/components/FormBuilderCustumComponents/FormBuilderInputEditor.vue'

const BtnControlComp = shallowRef(BtnControl)
const FormBuilderInputEditorComp = shallowRef(FormBuilderInputEditor)

export default {
  name: 'AdminTeamCreate',
  components: { EntityCreate },
  mixins: [mixinWidget],
  data () {
    const classroomId = this.$route.params.classroom_id
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.team.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Classroom.Team.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان گروه', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', label: 'ظرفیت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'is_joinable', responseKey: 'is_joinable', label: 'قابل پیوستن', placeholder: ' ', value: false, col: 'col-md-3 col-12' },
        {
          type: 'entity',
          name: 'leader',
          selectionMode: 'single',
          popUpButtonConfig: {
            label: 'انتخاب سرگروه',
            outline: true,
            buttonColor: 'deep-purple',
            buttonTextColor: 'white',
            buttonBadgeColor: 'pink'
          },
          dialogConfirmButtonConfig: {
            label: 'تایید',
            buttonColor: 'deep-purple',
            buttonTextColor: 'white',
            buttonBadgeColor: 'pink'
          },

          apiAddress: APIGateway.classroomLeaders.APIAdresses.base,
          tableTitle: 'لیست کل سرگروه ها',
          showTableItemsRouteName: 'Admin.BlockManagement.Show',
          tableKeys: {
            data: 'results',
            total: 'count',
            currentPage: 'current',
            perPage: 'per_page',
            pageKey: 'page'
          },
          table: {
            columns: [
              {
                name: 'number',
                required: true,
                label: 'شماره',
                align: 'left',
                field: () => ''
              },
              {
                name: 'id',
                required: true,
                label: 'شناسه',
                align: 'left',
                field: row => row.leader_info.id
              },
              {
                name: 'title',
                required: true,
                label: 'جنسیت',
                align: 'left',
                field: row => (row.leader_info.gender === 1) ? 'مذکر' : ((row.leader_info.gender === 2) ? 'مونث' : '-')
              },
              {
                name: 'creation_time',
                required: true,
                label: 'نام و نام خانوادگی',
                align: 'left',
                field: row => row.leader_info.firstname + ' ' + row.leader_info.lastname
              },
              {
                name: 'creation_time',
                required: true,
                label: 'کدملی',
                align: 'left',
                field: row => row.leader_info.national_code
              },
              {
                name: 'creation_time',
                required: true,
                label: 'شماره تلفن',
                align: 'left',
                field: row => row.leader_info.mobile_number
              },
              {
                name: 'creation_time',
                required: true,
                label: 'دانشگاه',
                align: 'left',
                field: row => row.leader_info.last_academy_name
              },
              {
                name: 'creation_time',
                required: true,
                label: 'شهر',
                align: 'left',
                field: row => row.leader_info.living_city
              },
              {
                name: 'actions',
                required: true,
                label: 'عملیات',
                align: 'left',
                field: ''
              }
            ]
          },
          inputs: [
            { type: 'hidden', name: 'classroom', value: classroomId }
          ],
          itemIndicatorKey: row => row.leader_info.firstname + ' ' + row.leader_info.lastname,
          // itemIndicatorKey: 'firstname',
          itemIdentifyKey: 'leader',
          indexConfig: {
            itemIdentifyKey: 'leader'
          },

          value: null,
          selected: null,
          col: 'col-md-3 col-12'
        },
        { type: FormBuilderInputEditorComp, name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-12' },
        { type: 'hidden', name: 'classroom', value: classroomId },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ایجاد گروه', placeholder: ' ', atClick: () => {}, col: 'col-md-6' }
      ]
    }
  },
  mounted() {
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.create)
    },
    create() {
      this.entityLoading = true
      this.$refs.entityCreate.createEntity(false)
        .then((response) => {
          this.entityLoading = false
          this.$router.push({ name: 'Admin.Classroom.Team.Show', params: { classroom_id: this.$route.params.classroom_id, team_id: response.data.id } })
        })
        .catch(() => {
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminTeamCreate {
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
