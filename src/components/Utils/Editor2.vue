<template>
  <q-editor ref="editor"
            v-model="editorValue"
            min-height="10rem"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify']
                }
              ],
              ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'colorpicker'],
              ['token', 'hr', 'link', 'custom_btn'],
              ['print', 'fullscreen'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7'
                  ]
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana'
                  ]
                },
                'removeFormat'
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource']
            ]"
            :fonts="{
              IRANSans: 'IRANSans',
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana',
            }"
            @update:model-value="onChangeText"
            @paste="onPaste">
    <template v-slot:token>
      <q-btn-dropdown ref="colorPicker"
                      dense
                      unelevated
                      icon="colorize"
                      size="sm">
        <q-list dense>
          <q-item tag="label"
                  clickable>
            <q-item-section>
              <q-btn icon="check"
                     @click="color('foreColor', foreColor)" />
              <q-color v-model="foreColor"
                       class="my-picker" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-editor>
</template>

<script>
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      foreColor: '#000000'
    }
  },
  computed: {
    editorValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('update:value', newValue)
      }
    }
  },
  methods: {
    onPaste(evt) {
      const str = evt.clipboardData.getData('text')
      const replace = str.replace(/(<([^>]+)>)/ig, '')
      this.editorValue = replace
    },
    color(cmd, name) {
      const edit = this.$refs.editor
      this.$refs.colorPicker.hide()
      edit.caret.restore()
      edit.runCmd(cmd, name)
      edit.focus()
    }
  }
}
</script>

<style scoped>

</style>
