<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'UserPanel.Classroom.MyAsGraderClassroom.AnswerBooks.SubmitGrade',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'AdminSendTestGrade' }] }] }] } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
