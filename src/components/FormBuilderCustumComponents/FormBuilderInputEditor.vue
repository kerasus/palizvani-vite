<template>
  <div class="form-builder-editor"
       :class="customClass">
    <p v-text="label" />
    <q-editor v-if="!disable && !readonly"
              ref="editor"
              v-model="inputData"
              :class="customClass"
              :content-class="customClass"
              :name="name"
              :dense="$q.screen.lt.md"
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
              @update:model-value="change($event)"
              @click="onClick"
              @paste="onPaste">
      <template v-slot:colorpicker>
        <q-btn-dropdown ref="token"
                        dense
                        no-caps
                        no-wrap
                        unelevated
                        color="white"
                        text-color="primary"
                        label="رنگ"
                        size="sm">
          <q-list dense>
            <q-item tag="label"
                    clickable
                    @click="setColor('backColor', highlight)">
              <q-item-section side>
                <q-icon name="highlight" />
              </q-item-section>
              <q-item-section>
                <q-color v-model="highlight"
                         default-view="palette"
                         no-header
                         no-footer
                         :palette="[
                           '#ffccccaa', '#ffe6ccaa', '#ffffccaa', '#ccffccaa',
                           '#ccffe6aa', '#ccffffaa', '#cce6ffaa', '#ccccffaa', '#e6ccffaa', '#ffccffaa', '#ff0000aa', '#ff8000aa', '#ffff00aa', '#00ff00aa', '#00ff80aa', '#00ffffaa', '#0080ffaa', '#0000ffaa', '#8000ffaa', '#ff00ffaa'
                         ]"
                         class="my-picker" />
              </q-item-section>
            </q-item>
            <q-item tag="label"
                    clickable
                    @click="setColor('foreColor', foreColor)">
              <q-item-section side>
                <q-icon name="format_paint" />
              </q-item-section>
              <q-item-section>
                <q-color v-model="foreColor"
                         no-header
                         no-footer
                         default-view="palette"
                         :palette="[
                           '#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff'
                         ]"
                         class="my-picker" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </q-editor>
    <!--eslint-disable-next-line-->
    <div v-else v-html="inputData" />
  </div>
</template>

<script>
import { inputMixin } from 'quasar-form-builder'

export default {
  name: 'FormBuilderInputEditor',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    value: {
      default: '',
      type: [String, Number, Boolean]
    }
  },
  data () {
    return {
      inputData: '',
      foreColor: '#000000',
      highlight: '#ffff00aa'
    }
  },
  watch: {
    value(newValue) {
      if (!newValue) {
        this.inputData = ''
      }
    }
  },
  created() {
    if (!this.inputData) {
      this.inputData = ''
    }
  },
  methods: {
    onPaste () {
      this.inputData = this.inputData.replaceAll(/<!--\[if .*endif\]-->/gms, 'ferret')
    },
    setColor (cmd, name) {
      const edit = this.$refs.editor
      this.$refs.token.hide()
      edit.caret.restore()
      edit.runCmd(cmd, name)
      edit.focus()
    }
  }
}
</script>
