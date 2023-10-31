<template>
  <div class="LeaderTeamShow"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-show v-if="mounted"
                 ref="entityShow"
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
                 :show-index-button="false"
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
      <template v-slot:entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'actions'">
          <div class="action-column-entity-index">
            <!--            <delete-btn @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))" />-->
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
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EntityShow, EntityIndex } from 'quasar-crud'

export default {
  name: 'LeaderTeamShow',
  components: {
    EntityShow,
    EntityIndex
  },
  mixins: [mixinWidget],
  data () {
    const teamId = this.$route.params.team_id
    return {
      mounted: false,
      entityLoading: true,
      api: APIGateway.team.APIAdresses.byId(teamId),
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان گروه', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', label: 'ظرفیت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'used_capacity', responseKey: 'used_capacity', label: 'ظرفیت استفاده شده', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-12' }
      ],

      teamRegistrationListInputs: [
        { type: 'hidden', name: 'team', value: teamId }
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
  mounted() {
    this.mounted = true
  },
  methods: {
    onConfirmedSelectedRegistrations (data) {
      const registrations = data.map(item => item.id)
      this.addNewLeaderLoading = true
      APIGateway.team.appendRegistrations({ teamId: this.$route.params.team_id, registrations })
        .then(() => {
          this.$refs.teamRegistrationList.search()
          this.addNewLeaderLoading = false
        })
        .catch(() => {
          this.addNewLeaderLoading = false
        })
    },
    afterLoadInputData () {
      this.entityLoading = false
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.registration_info.owner_info.firstname + ' ' + row.registration_info.owner_info.lastname + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped lang="scss">
.LeaderTeamShow {
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
