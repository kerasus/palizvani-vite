<template>
  <div class="AdminUserShow"
       :style="localOptions.style">
    <div class="title">
      <div class="static-title">
        ویرایش
      </div>
      <div class="dynamic-title">
        <template v-if="entityLoading">
          <q-skeleton type="text"
                      class="q-ml-lg"
                      width="100px" />
        </template>
        <template v-else>
          {{ entityTitle }}
        </template>
      </div>
      <div class="back-action">
        <q-btn flat
               :to="{name: 'AdminPanel.User.List'}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <q-card class="form"
            flat>
      <entity-edit v-if="mounted"
                   ref="entityEdit"
                   v-model:value="inputs"
                   title="اطلاعات کاربری"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false"
                   :default-layout="false"
                   :redirect-after-edit="false"
                   :after-load-input-data="afterLoadInputData" />
      <div class="action">
        <div class="row q-mt-lg justify-end">
          <div class="col-md-4 col-12">
            <q-btn color="primary"
                   class="full-width"
                   :loading="entityLoading"
                   @click="edit">
              ثبت تغییرات
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { User } from 'src/models/User'

export default {
  name: 'AdminUserShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      entityTitle: '',
      api: APIGateway.user.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Package.Show',
      indexRouteName: 'AdminPanel.Package.List',
      inputs: [
        {
          type: 'file',
          name: 'picture',
          responseKey: 'picture',
          label: 'تصویر پروفایل',
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        {
          type: 'input',
          name: 'firstname',
          responseKey: 'firstname',
          label: 'نام',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'input',
          name: 'lastname',
          responseKey: 'lastname',
          label: 'نام خانوادگی',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'select',
          name: 'roles',
          responseKey: 'roles',
          options: (new User()).totalRoles,
          multiple: true,
          label: 'نقش ها',
          col: 'col-md-6 col-12'
        },
        {
          type: 'input',
          name: 'mobile_number',
          responseKey: 'mobile_number',
          label: 'شماره موبایل',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'hidden',
          name: 'id',
          responseKey: 'id'
        }
      ]
    }
  },
  created() {
    this.api = this.api + '/' + this.$route.params.id
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    onUpdateServices () {
      this.$refs.entityEdit.getData()
    },
    afterLoadInputData (response) {
      this.entityTitle = response.firstname + ' ' + response.lastname
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity()
        .then(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminUserShow {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    display: flex;
    flex-flow: row;
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
