<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'Admin.Classroom.Show',
  mixins: [mixinPageOptions],
  data () {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'AdminClassroomShow',
                        options: { classroomType: 'TRAINING' }
                      }
                    ]
                  }
                ],
                options: {
                  className: '',
                  height: 'auto',
                  boxed: true,
                  boxedWidth: 1200,
                  gutterXSize: 'md',
                  gutterYSize: 'md',
                  absolute: 'none',
                  paddingOfBoxedInFullWidth: '10px',
                  style: { maxWidth: '1200px', width: '1200px' }
                }
              }
            ]
          }
        }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
}
</script>
