<template>
  <div class="flex justify-end">
    <q-btn flat
           color="grey"
           @click="$router.go(-1)">
      بازگشت
      >
    </q-btn>
  </div>
  <div class="ddd">
    <entity-create v-if="mounted"
                   ref="classroomEntityCreate"
                   v-model:value="inputs"
                   title="مشخصات دسته بندی"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false"
                   @onInputClick="onInputClick">
      <template #after-form-builder>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-3">
            <q-input v-model="newUnitName"
                     label="درس ها"
                     :disable="true" />
          </div>
          <div class="col-md-3">
            <q-input v-model="newUnitSessionCount"
                     label="تعداد جلسات"
                     type="number"
                     :disable="true" />
          </div>
          <div class="col-md-3">
            <q-btn color="primary"
                   label="افزودن"
                   :disable="true" />
          </div>
        </div>
      </template>
    </entity-create>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'Admin.Classroom.Create',
  components: {
    EntityCreate
  },
  data () {
    return {
      mounted: false,
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: APIGateway.unitCategory.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Category.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام دسته بندی', col: 'col-md-6' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', atClick: this.createCategory, label: 'تایید', col: 'col-md-6' }
      ]
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    createCategory () {
      this.$refs.classroomEntityCreate.createEntity()
    }
  }
}
</script>
