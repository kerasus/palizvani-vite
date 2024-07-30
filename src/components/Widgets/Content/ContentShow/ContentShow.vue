<template>
  <div class="content printable">
    <template v-if="!content.loading">
      <div class="breadcrumbs">
        <breadcrumbs />
      </div>
      <div ref="printArea"
           class="print-area">
        <div class="content-title">
          {{content.title}}
        </div>

        <q-separator class="q-mt-md" />

        <div class="content-body"
             v-html="content.description" />

        <div class="attributes">
          <q-btn v-if="content.category_info?.parent?.parent?.id"
                 :to="{name: 'Public.PostCategoryParentParent.Show', params: {category_id: content.category_info.parent.parent.id}}"
                 class="attribute-item">
            {{content.category_info.parent.parent.title}}
          </q-btn>
          <q-btn v-if="content.category_info?.parent?.id"
                 :to="{name: 'Public.PostCategoryParent.Show', params: {category_id: content.category_info.parent.id}}"
                 class="attribute-item">
            {{content.category_info.parent.title}}
          </q-btn>
          <q-btn v-if="content.category_info?.id"
                 :to="{name: 'Public.PostCategory.Show', params: {category_id: content.category_info.id}}"
                 class="attribute-item">
            {{content.category_info.title}}
          </q-btn>
        </div>
      </div>
    </template>

    <template v-else>
      <q-skeleton type="circle"
                  size="100px"
                  class="q-mt-md" />
      <q-skeleton width="150px"
                  class="q-mt-md" />
      <q-skeleton height="150px"
                  class="q-mt-md" />
    </template>
  </div>
</template>

<script>
import { Content } from 'src/models/Content.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

let html2pdf
// if (typeof window !== 'undefined') {
//   import('html2pdf.js')
//     .then((html2pdfLib) => {
//       html2pdf = html2pdfLib.default
//     })
// }

export default {
  name: 'ShowClassroomInfo',
  components: { Breadcrumbs },
  mixins: [mixinWidget, mixinPrefetchServerData],
  emits: ['onloadn'],
  data () {
    return {
      breadcrumbs: {
        visible: true,
        loading: false,
        path: [
          {
            label: 'خانه',
            to: { name: 'Public.Home' }
          },
          {
            label: 'یادداشت ها و مقالات',
            to: { name: 'Public.Content.List' }
          }
        ]
      },
      defaultOptions: {
        profileMode: false,
        contentShowRouteName: 'Public.Content.Show'
      },
      content: new Content()
    }
  },
  computed: {
    contentId () {
      return this.$route.params.id ?? this.$route.params.content_id
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getContent()
    },
    prefetchServerDataPromiseThen (content) {
      this.content = new Content(content)
      this.breadcrumbs.path.push({
        label: this.content.title,
        to: { name: this.localOptions.contentShowRouteName, params: { id: this.content.id } }
      })
      this.$store.commit('AppLayout/updateBreadcrumbs', this.breadcrumbs)
      this.$emit('onloadn', this.content)
    },
    prefetchServerDataPromiseCatch () {
    },

    getTitledDateTime (dateTime) {
      return ShamsiDate.getTitledDateTime(dateTime)
    },
    getTime (time) {
      return ShamsiDate.getDateTime(time)
    },
    getContent () {
      return APIGateway.content.get(this.contentId)
    },
    print () {
      this.convertPhotosToBase64()
      const html2pdfConfig = {
        margin: [0, 0, 0, 0],
        image: {
          type: 'jpeg',
          quality: 0.6
        },
        filename: this.content.title,
        html2canvas: {
          dpi: 1,
          scale: 2.5,
          letterRendering: true,
          useCORS: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      html2pdf()
        .set(html2pdfConfig)
        .from(this.$refs.printArea)
        .save()
        .thenExternal(() => {
          this.downloadLoading = false
        })
    },
    toDataURL(src, callback, outputFormat) {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function() {
        const canvas = document.createElement('CANVAS')
        const ctx = canvas.getContext('2d')
        canvas.height = this.naturalHeight
        canvas.width = this.naturalWidth
        ctx.drawImage(this, 0, 0)
        const dataURL = canvas.toDataURL(outputFormat)
        callback(dataURL)
      }
      if (src.includes('?')) {
        img.src = src
      } else {
        img.src = src + '?test=123'
      }
      if (img.complete || img.complete === undefined) {
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
        img.src = src
      }
    },
    convertPhotosToBase64 () {
      this.convertSvgToBase64()
      this.convertImagesToBase64()
    },
    convertImagesToBase64 () {
      if (!this.$refs.printArea) {
        return
      }
      const images = this.$refs.printArea.getElementsByTagName('img')
      images.forEach(image => {
        this.toDataURL(image.src, function(dataUrl) {
          image.src = dataUrl
        })
      })
    },
    convertSvgToBase64 () {
      if (!this.$refs.printArea) {
        return
      }
      const svgs = this.$refs.printArea.getElementsByTagName('svg')
      svgs.forEach(svg => {
        // Convert the SVG node to HTML.
        const div = document.createElement('div')
        div.appendChild(svg.cloneNode(true))

        // Encode the SVG as base64
        const b64 = 'data:image/svg+xml;base64,' + window.btoa(div.innerHTML)
        const url = 'url("' + b64 + '")'
        svg.style.backgroundImage = url
        svg.style.backgroundSize = 'cover'
        if (svg.parentElement.classList.contains('brace-left')) {
          svg.style.backgroundPosition = 'left'
        }
        if (svg.parentElement.classList.contains('brace-center')) {
          svg.style.backgroundPosition = 'bottom'
        }
        if (svg.parentElement.classList.contains('brace-right')) {
          svg.style.backgroundPosition = 'right'
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/HTMLContent.scss";
.content {
  .breadcrumbs {
    margin-bottom: 40px;
  }
  .content-title {
    font-weight: 900;
    font-size: 1.4rem;
  }
  .attributes {
    display: flex;
    flex-flow: row;
    .attribute-item {
      color: #475f4a;
      background-color: #eaeaea;
      border-radius: 8px;
      padding: 4px 8px;
      margin: 0 4px;
      font-size: 16px;
    }
  }
  .print-btn {
    width: 252px;
  }
  :deep(.content-body) {
    margin-top: 32px;
    @include HTMLContent;
  }
}
</style>
