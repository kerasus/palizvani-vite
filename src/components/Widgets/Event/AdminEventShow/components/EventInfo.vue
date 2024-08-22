<template>
  <entity-edit v-if="mounted"
               ref="eventEntityEdit"
               :key="eventEntityEditKey"
               v-model:value="inputs"
               title="مشخصات رویداد"
               :api="api"
               :show-close-button="false"
               :show-edit-button="false"
               :show-expand-button="false"
               :show-save-button="false"
               :show-reload-button="false"
               :after-load-input-data="afterLoadInputData">
    <template #after-form-builder>
      <div class="flex justify-end q-mt-md">
        <q-btn color="primary"
               label="بروزرسانی اطلاعات"
               @click="updateClassroom" />
      </div>
    </template>
  </entity-edit>
  <q-skeleton v-else
              type="rect"
              height="200px" />
</template>

<script>
import { shallowRef } from 'vue'
import { EntityEdit } from 'quasar-crud'
import { Event } from 'src/models/Event.js'
// import Enums from 'src/assets/Enums/Enums.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import FormBuilderDateTime from 'src/components/FormBuilderCustumComponents/FormBuilderDateTime.vue'
import ContentMedias from 'src/components/FormBuilderCustumComponents/ContentMedias/ContentMedias.vue'
import FormBuilderInputEditor from 'src/components/FormBuilderCustumComponents/FormBuilderInputEditor.vue'

const ContentMediasComp = shallowRef(ContentMedias)
const FormBuilderDateTimeComp = shallowRef(FormBuilderDateTime)
const FormBuilderInputEditorComp = shallowRef(FormBuilderInputEditor)

export default {
  name: 'ClassroomInfo',
  components: {
    EntityEdit
  },
  props: {
    eventId: {
      type: Number,
      default: null
    },
    event: {
      type: Classroom,
      default: new Classroom()
    }
  },
  data () {
    const eventId = this.eventId
    return {
      inputs: [
        { type: 'separator', name: 'space', label: 'مشخصات رویدادها', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان رویداد', placeholder: ' ', col: 'col-12' },
        { type: 'file', name: 'thumbnail', responseKey: 'thumbnail', label: 'آپلود عکس رویدادها', col: 'col-md-3 col-12' },
        { type: 'file', name: 'codes', responseKey: 'codes', label: 'آیین نامه رویدادها', col: 'col-md-3 col-12' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        { type: 'select', name: 'category', responseKey: 'category', options: (new Event()).categoryEnums, value: null, placeholder: ' ', label: 'دسته بندی', col: 'col-md-3 col-12' },
        { type: 'select', name: 'holding_type', responseKey: 'holding_type', options: (new Event()).holding_typeEnums, value: null, placeholder: ' ', label: 'نوع برگزاری', col: 'col-md-3 col-12' },
        { type: 'input', name: 'price', responseKey: 'price', placeholder: ' ', label: 'هزینه برگزاری', col: 'col-md-3 col-12' },
        { type: 'input', name: 'live_streaming_url', responseKey: 'live_streaming_url', placeholder: ' ', label: 'لینک مکان مجازی رویدادها', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'event_address', responseKey: 'event_address', placeholder: ' ', label: 'آدرس مکان فیزیکی رویدادها', col: 'col-12' },

        { type: 'separator', name: 'space', label: 'مشخصات اندیشه جو', className: 'custom-separator', col: 'col-12' },
        // { type: 'select', name: 'audience_status_wwwww', responseKey: 'audience_status_wwwww', options: [], placeholder: ' ', label: 'وضعیت(؟)', col: 'col-md-3 col-12' },
        // { type: 'select', name: 'category', responseKey: 'category', options: [], placeholder: ' ', label: 'مجموعه(؟)', col: 'col-md-3 col-12' },
        { type: 'select', name: 'audience_gender_type', responseKey: 'audience_gender_type', options: (new Event()).audience_gender_typeEnums, placeholder: ' ', label: 'جنسیت', col: 'col-md-3 col-12' },
        // { type: 'select', name: 'audience_bashgah_wwwww', responseKey: 'audience_bashgah_wwwww', options: [], placeholder: ' ', label: 'باشگاه(؟)', col: 'col-md-3 col-12' },

        { type: ContentMediasComp, name: 'medias', responseKey: 'medias_info', sourceType: 'EVENT', col: 'col-md-12 col-12' },

        { type: 'separator', name: 'space', label: 'تنظیمات رویدادها', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', placeholder: ' ', label: 'ظرفیت گروه درسی', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'ثبت نام و حذف و اضافه', className: 'custom-separator', col: 'col-12' },
        { type: FormBuilderDateTimeComp, name: 'beginning_enrollment_period', responseKey: 'beginning_enrollment_period', outsideLabel: 'تاریخ شروع پیش ثبت نام', col: 'col-md-6 col-12' },
        { type: FormBuilderDateTimeComp, name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', outsideLabel: 'تاریخ پایان پیش ثبت نام', col: 'col-md-6 col-12' },
        { type: FormBuilderDateTimeComp, name: 'beginning_registration_period', responseKey: 'beginning_registration_period', outsideLabel: 'تاریخ شروع ثبت نام', col: 'col-md-6 col-12' },
        { type: FormBuilderDateTimeComp, name: 'ending_registration_period', responseKey: 'ending_registration_period', outsideLabel: 'تاریخ پایان ثبت نام', col: 'col-md-6 col-12' },

        { type: 'input', name: 'registration_period_refund_percent', responseKey: 'registration_period_refund_percent', placeholder: ' ', label: 'درصد برگشت هزینه انصراف در بازه ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_enrollment_period', responseKey: 'allow_dropping_on_enrollment_period', label: 'امکان حذف در بازه پیش ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_adding_on_registration_period', responseKey: 'allow_adding_on_registration_period', label: 'امکان اضافه کردن در بازه ثبت نام', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_registration_period', responseKey: 'allow_dropping_on_registration_period', label: 'امکان حذف ثبت نام در بازه ثبت نام', col: 'col-md-3 col-12' },

        { type: FormBuilderDateTimeComp, name: 'beginning_drop_add_period', responseKey: 'beginning_drop_add_period', outsideLabel: 'تاریخ شروع حذف و اضافه', col: 'col-md-6 col-12' },
        { type: FormBuilderDateTimeComp, name: 'ending_drop_add_period', responseKey: 'ending_drop_add_period', outsideLabel: 'تاریخ پایان حذف و اضافه', col: 'col-md-6 col-12' },

        { type: 'input', name: 'drop_add_period_refund_percent', responseKey: 'drop_add_period_refund_percent', placeholder: ' ', label: 'درصد برگشت هزینه انصراف در بازه حذف و اضافه', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_adding_on_drop_add_period', responseKey: 'allow_adding_on_drop_add_period', label: 'امکان اضافه شدن در بازه حذف و اضافه', col: 'col-md-3 col-12' },
        { type: 'checkbox', name: 'allow_dropping_on_drop_add_period', responseKey: 'allow_dropping_on_drop_add_period', label: 'امکان حذف در بازه حذف و اضافه', col: 'col-md-3 col-12' },

        { type: FormBuilderDateTimeComp, name: 'publish_time', responseKey: 'publish_time', outsideLabel: 'تاریخ انتشار', col: 'col-md-6 col-12' },

        { type: 'separator', name: 'space', label: 'قوانین', className: 'custom-separator', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'rules', responseKey: 'rules', label: 'قوانین رویداد', col: 'col-12' },

        { type: FormBuilderInputEditorComp, name: 'description', responseKey: 'description', label: 'توضیحات', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'specification', responseKey: 'specification', label: 'مشخصات', col: 'col-12' },
        { type: FormBuilderInputEditorComp, name: 'bulletin', responseKey: 'bulletin', label: 'تابلو اعلانات', col: 'col-12' },

        // -----------------------------------------------------------------------------------------------------------

        // { type: 'separator', name: 'space', label: 'موارد زیر در طرح نبودند', className: 'custom-separator', col: 'col-12' },
        // { type: 'select', name: 'audience_role', responseKey: 'audience_role', options: Enums.groups, placeholder: ' ', label: 'نقش', col: 'col-md-4 col-12' },

        { type: 'hidden', name: 'id', responseKey: 'id', label: 'id', col: 'col-md-3 col-12' }
      ],
      mounted: false,
      eventEntityEditKey: Date.now(),
      api: APIGateway.event.APIAdresses.byId(eventId)
    }
  },
  computed: {
    localClassroom: {
      get () {
        return this.event
      },
      set (newValue) {
        this.$emit('update:event', newValue)
      }
    }
  },
  mounted () {
    this.localClassroom.loading = true
    this.preLoadData()
      .then(() => {
        this.mounted = true
      })
      .catch(() => {
        this.mounted = true
      })
  },
  methods: {
    afterLoadInputData (data) {
      this.localClassroom = new Classroom(data)
      this.localClassroom.loading = false
      // const gg = data.beginning_enrollment_period.replace('T', ' ')
      // this.setInputAttr('beginning_enrollment_period', 'value', gg)
    },
    setInputAttr (name, attr, value) {
      FormBuilderAssist.setAttributeByName(this.inputs, name, attr, value)
    },
    preLoadData () {
      return new Promise((resolve, reject) => {
        APIGateway.event.get(this.eventId)
          .then((event) => {
            this.setInputAttr('category', 'value', event.category)
            this.beforeLoadInputData(event)
              .then((event) => {
                resolve(event)
              })
              .catch(() => {
                reject()
              })
          })
          .catch(() => {
            reject()
          })
      })
    },
    beforeLoadInputData (/* responseData */) {
      return new Promise((resolve, reject) => {
        const promise1 = this.getProfessors()
        this.$nextTick(() => {
          Promise.all([promise1])
            .then(() => {
              // this.setInputAttr('category', 'value', responseData.unit_info.category)
              this.eventEntityEditKey = Date.now()
              resolve()
            })
            .catch(() => {
              reject()
            })
        })
      })
    },
    getProfessors () {
      return APIGateway.user.index({ per_page: 9999, role: 'professor' })
        .then((users) => {
          this.setInputAttr('professor', 'options', users.list.list.map(item => {
            return {
              value: item.id,
              label: this.getUserFullname(item)
            }
          }))
        })
        .catch(() => {})
    },
    getUserFullname (user) {
      return user.firstname + ' ' + user.lastname
    },
    updateClassroom () {
      this.$refs.eventEntityEdit.editEntity()
    }
  }
}
</script>
