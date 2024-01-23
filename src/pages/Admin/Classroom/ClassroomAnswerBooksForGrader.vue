<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'UserPanel.Classroom.MyAsGraderClassroom.AnswerBooks',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'ClassroomAnswerBookList' }] }] }] } }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
