<template>
  <div class="AdminTeamShow"
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
                 title="اطلاعات گروه"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-save-button="false"
                 :show-reload-button="false"
                 :redirect-after-edit="false"
                 :after-load-input-data="afterLoadInputData" />

    <q-separator class="q-my-lg" />

    <entity-index v-if="mounted"
                  ref="teamRegistrationList"
                  v-model:value="teamRegistrationListInputs"
                  title="لیست اعضای گروه"
                  :api="teamRegistrationListApi"
                  :table="teamRegistrationListTable"
                  :table-keys="teamRegistrationListTableKeys"
                  :show-search-button="false"
                  :show-reload-button="false"
                  :show-expand-button="false">
      <template #toolbar>
        <form-builder ref="formBuilder"
                      :key="addTeamRegistrationKey"
                      v-model:value="addTeamRegistrationInputs"
                      :loading="addNewTeamRegistrationLoading" />
      </template>
      <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'actions'">
          <div class="action-column-entity-index">
            <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />
          </div>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { Team } from 'src/models/Team.js'
import { User } from 'src/models/User.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EntityEdit, EntityIndex } from 'quasar-crud'
import BtnControl from 'src/components/Control/btn.vue'
import DeleteBtn from 'src/components/Control/DeleteBtn.vue'
import { FormBuilder, inputMixin, FormBuilderAssist } from 'quasar-form-builder'
import EntityInput from 'quasar-crud/src/components/Entity/Attachment/EntityInput.vue'
import { Provinces, Cities, getCitiesOfProvince } from 'src/assets/js/IranianCities.js'
import FormBuilderInputEditor from 'src/components/FormBuilderCustumComponents/FormBuilderInputEditor.vue'

const BtnControlComp = shallowRef(BtnControl)
const EntityInputComp = shallowRef(EntityInput)
const FormBuilderInputEditorComp = shallowRef(FormBuilderInputEditor)

export default {
  name: 'AdminTeamShow',
  components: {
    DeleteBtn,
    EntityEdit,
    EntityIndex,
    FormBuilder
  },
  mixins: [mixinWidget, inputMixin],
  data () {
    const teamId = this.$route.params.team_id
    const classroomId = this.$route.params.classroom_id
    return {
      mounted: false,
      inputDataLoaded: false,
      team: new Team(),
      entityLoading: true,
      api: APIGateway.team.APIAdresses.byId(teamId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان گروه', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', label: 'ظرفیت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'is_joinable', responseKey: 'is_joinable', label: 'قابل پیوستن', placeholder: ' ', value: false, col: 'col-md-3 col-12' },
        { type: 'separator', name: 'space', label: 'مشخصات سرگروه', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'leader_info.firstname', responseKey: 'leader_info.firstname', label: 'نام سرگروه', placeholder: ' ', readonly: true, ignoreValue: true, col: 'col-md-3 col-12' },
        { type: 'input', name: 'leader_info.lastname', responseKey: 'leader_info.lastname', label: 'نام خانوادگی سرگروه', placeholder: ' ', readonly: true, ignoreValue: true, col: 'col-md-3 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-12' },
        {
          type: 'entity',
          name: 'leader',
          responseKey: 'leader_info',
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
                name: 'leader',
                required: true,
                label: 'شناسه',
                align: 'left',
                field: row => row.leader
              },
              {
                name: 'leader_info.gender',
                required: true,
                label: 'جنسیت',
                align: 'left',
                field: row => (row.leader_info.gender === 1) ? 'مذکر' : ((row.leader_info.gender === 2) ? 'مونث' : '-')
              },
              {
                name: 'leader_info.full_name',
                required: true,
                label: 'نام و نام خانوادگی',
                align: 'left',
                field: row => row.leader_info.firstname + ' ' + row.leader_info.lastname
              },
              {
                name: 'leader_info.national_code',
                required: true,
                label: 'کدملی',
                align: 'left',
                field: row => row.leader_info.national_code
              },
              {
                name: 'leader_info.mobile_number',
                required: true,
                label: 'شماره تلفن',
                align: 'left',
                field: row => row.leader_info.mobile_number
              },
              {
                name: 'leader_info.last_academy_name',
                required: true,
                label: 'دانشگاه',
                align: 'left',
                field: row => row.leader_info.last_academy_name
              },
              {
                name: 'leader_info.living_city',
                required: true,
                label: 'شهر',
                align: 'left',
                field: row => row.leader_info.living_city
              }
            ]
          },
          inputs: [
            { type: 'hidden', name: 'classroom', value: classroomId }
          ],
          // itemIndicatorKey: row => row.firstname + ' ' + row.lastname,
          itemIndicatorKey: 'leader_info.id',
          // itemIndicatorKey: 'firstname',
          itemIdentifyKey: 'leader_info.id',
          itemIdentifyKeyOfIndexTable: 'leader',
          indexConfig: {
            itemIndicatorKey: row => row.leader_info.firstname + ' ' + row.leader_info.lastname,
            itemIdentifyKey: 'leader'
            // itemIdentifyKey: 'id'
          },

          value: null,
          selected: null,
          col: 'col-md-3 col-12'
        },
        { type: FormBuilderInputEditorComp, name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-12' },
        { type: 'hidden', name: 'classroom', value: classroomId },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'ویرایش گروه', placeholder: ' ', atClick: () => {}, col: 'col-md-6' }
      ],

      addNewTeamRegistrationLoading: false,
      addTeamRegistrationKey: Date.now(),
      addTeamRegistrationInputs: [
        {
          type: EntityInputComp,
          name: 'leaders',
          selectionMode: 'multiple',
          popUpButtonConfig: {
            label: 'اختصاص عضو جدید',
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

          apiAddress: APIGateway.registration.APIAdresses.base,
          tableTitle: 'لیست کاربران',
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
                name: 'id',
                required: true,
                label: 'شناسه',
                align: 'left',
                field: row => row.owner_info.id
              },
              {
                name: 'fullname',
                required: true,
                label: 'نام و نام خانوادگی',
                align: 'left',
                field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
              },
              {
                name: 'national_code',
                required: true,
                label: 'کد ملی',
                align: 'left',
                field: row => row.owner_info.national_code
              },
              {
                name: 'mobile_number',
                required: true,
                label: 'شماره همراه',
                align: 'left',
                field: row => row.owner_info.mobile_number
              }
            ]
          },
          inputs: [
            { type: 'input', name: 'search', value: null },
            { type: 'hidden', name: 'status', value: 'REGISTERED' },
            { type: 'hidden', name: 'teams__isnull', value: true },
            { type: 'hidden', name: 'classroom', value: classroomId }
          ],
          itemIndicatorKey: row => row.owner_info.firstname + ' ' + row.owner_info.lastname,
          // itemIndicatorKey: 'firstname',
          itemIdentifyKey: 'id',
          onConfirmed: this.onConfirmedSelectedRegistrations,

          value: [],
          selected: [],
          col: 'col-md-12 col-12'
        }
      ],
      teamRegistrationListInputs: [
        { type: 'hidden', name: 'team', value: teamId },
        { type: 'select', name: 'owner__gender', value: null, options: (new User()).genderEnums, col: 'col-md-2 col-12', label: 'جنسیت', placeholder: ' ' },
        {
          type: 'select',
          name: 'owner__living_province',
          options: Provinces,
          optionLabel: 'name',
          optionValue: 'name',
          createNewValue: true,
          newValueMode: 'add-unique',
          value: null,
          col: 'col-md-2 col-12',
          label: 'استان',
          placeholder: ' '
        },
        {
          type: 'select',
          name: 'owner__living_city',
          options: Cities,
          optionLabel: 'name',
          optionValue: 'name',
          createNewValue: true,
          newValueMode: 'add-unique',
          value: null,
          col: 'col-md-2 col-12',
          label: 'شهر',
          placeholder: ' '
        },
        { type: 'input', name: 'search', value: null, col: 'col-md-2 col-12', label: 'جست و جو', placeholder: ' ' },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
      ],
      teamRegistrationListApi: APIGateway.teamRegistrations.APIAdresses.base,
      teamRegistrationListTable: {
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
            field: row => row.registration_info.owner_info.id
          },
          {
            name: 'title',
            required: true,
            label: 'جنسیت',
            align: 'left',
            field: row => (row.registration_info.owner_info.gender === 1) ? 'مذکر' : ((row.registration_info.owner_info.gender === 2) ? 'مونث' : '-')
          },
          {
            name: 'creation_time',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.registration_info.owner_info.firstname + ' ' + row.registration_info.owner_info.lastname
          },
          {
            name: 'creation_time',
            required: true,
            label: 'کدملی',
            align: 'left',
            field: row => row.registration_info.owner_info.national_code
          },
          {
            name: 'creation_time',
            required: true,
            label: 'شماره تلفن',
            align: 'left',
            field: row => row.registration_info.owner_info.mobile_number
          },
          {
            name: 'creation_time',
            required: true,
            label: 'دانشگاه',
            align: 'left',
            field: row => row.registration_info.owner_info.last_academy_name
          },
          {
            name: 'creation_time',
            required: true,
            label: 'شهر',
            align: 'left',
            field: row => row.registration_info.owner_info.living_city
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
      teamRegistrationListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  computed: {
    selectedProvince () {
      return FormBuilderAssist.getInputsByName(this.teamRegistrationListInputs, 'owner__living_province').value
    }
  },
  watch: {
    selectedProvince (newValue) {
      if (!newValue) {
        FormBuilderAssist.setAttributeByName(this.teamRegistrationListInputs, 'owner__living_city', 'disable', true)
        if (this.inputDataLoaded) {
          FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'value', null)
        }
        return
      }

      const filteredCities = getCitiesOfProvince(this.selectedProvince)

      FormBuilderAssist.setAttributeByName(this.teamRegistrationListInputs, 'owner__living_city', 'options', filteredCities)
      FormBuilderAssist.setAttributeByName(this.teamRegistrationListInputs, 'owner__living_city', 'disable', false)
      if (this.inputDataLoaded) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'living_city', 'value', null)
      }
    }
  },
  mounted () {
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    onConfirmedSelectedRegistrations (data) {
      const registrations = data.map(item => item.id)
      this.addNewLeaderLoading = true
      APIGateway.team.appendRegistrations({ teamId: this.$route.params.team_id, registrations })
        .then(() => {
          this.search()
          this.addTeamRegistrationInputs[0].value = []
          this.addTeamRegistrationInputs[0].selected = []
          this.addTeamRegistrationKey = Date.now()
          this.addNewLeaderLoading = false
        })
        .catch(() => {
          this.addTeamRegistrationInputs[0].value = []
          this.addTeamRegistrationInputs[0].selected = []
          this.addTeamRegistrationKey = Date.now()
          this.addNewLeaderLoading = false
        })
    },
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.edit)
      FormBuilderAssist.setAttributeByName(this.teamRegistrationListInputs, 'btn', 'atClick', this.search)
    },
    search () {
      this.$refs.teamRegistrationList.search()
    },
    afterLoadInputData (responseData) {
      this.team = new Team(responseData)
      this.entityLoading = false
      FormBuilderAssist.setAttributeByName(this.inputs, 'leader', 'value', this.team.leader)
      FormBuilderAssist.setAttributeByName(this.inputs, 'leader', 'selected', this.team.leader_info)
      this.$nextTick(() => {
        this.inputDataLoaded = true
      })
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.registration_info.owner_info.firstname + ' ' + row.registration_info.owner_info.lastname + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped lang="scss">
.AdminTeamShow {
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
