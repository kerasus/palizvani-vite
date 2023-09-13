<template>
  <div class="post printable">
    <template v-if="!post.loading">
      <breadcrumbs class="q-mb-xl"
                   style="margin-top: 29px; margin-bottom: 19px;" />
      <div ref="printArea"
           class="print-area">
        <q-banner v-if="!post.post"
                  class="banner post-banner">
          عنوان
        </q-banner>
        <div class="attributes row">
          <div class="col-md-4 col-12">
            <div class="attribute-item">
              <div class="attribute-item-icon">
                <q-icon name="auto_stories"
                        size="23px" />
              </div>
              <div class="attribute-item-title">
                {{post.title}}
              </div>
            </div>
            <div class="attribute-item">
              <div v-if="post.category_info"
                   class="attribute-item-title">
                {{post.category_info.title}}
              </div>
            </div>
          </div>
          <div class="col-md-4 col-12">
            <div class="attribute-item">
              <div v-if="post.category_info?.parent?.parent"
                   class="attribute-item-title">
                دسته بندی کلی:
                {{post.category_info.parent.parent.title}}
              </div>
            </div>
            <div class="attribute-item">
              <div v-if="post.category_info?.parent"
                   class="attribute-item-title">
                دسته بندی جزئی:
                {{post.category_info.parent.title}}
              </div>
            </div>
          </div>
          <div v-if="false"
               class="col-md-4 col-12 flex justify-end items-start">
            <q-btn color="primary"
                   class="print-btn"
                   @click="print">
              دریافت فایل
            </q-btn>
          </div>
        </div>
        <div class="summary">
          <div class="summary-title">
            خلاصه
          </div>
          <div class="summary-body"
               v-html="post.summary" />
        </div>

        <q-separator />

        <div class="post-body"
             v-html="post.text" />
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
import { Post } from 'src/models/Post.js'
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
            to: { name: 'Public.Post.List' }
          }
        ]
      },
      defaultOptions: {
        profileMode: false
      },
      post: new Post()
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getPost()
    },
    prefetchServerDataPromiseThen (post) {
      this.post = new Post(post)
      this.post.post = false

      this.breadcrumbs.path.push({
        label: this.post.category_info.title,
        to: { name: 'Public.PostCategory.Show', params: { category_id: this.post.category_info.id } }
      })
      this.breadcrumbs.path.push({
        label: this.post.title,
        to: { name: 'Public.Post.Show', params: { id: this.post.id } }
      })
      this.$store.commit('AppLayout/updateBreadcrumbs', this.breadcrumbs)
      this.$emit('onloadn', this.post)
    },
    prefetchServerDataPromiseCatch () {
      this.post.post = false
    },

    getTitledDateTime (dateTime) {
      return ShamsiDate.getTitledDateTime(dateTime)
    },
    getTime (time) {
      return ShamsiDate.getDateTime(time)
    },
    getPost () {
      this.post.post = true
      return APIGateway.post.get(this.$route.params.id)
    },
    print () {
      this.convertPhotosToBase64()
      const html2pdfConfig = {
        margin: [0, 0, 0, 0],
        image: {
          type: 'jpeg',
          quality: 0.6
        },
        filename: this.post.title,
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
.post {
  .post-banner {
    margin-top: 52px;
    margin-bottom: 42px;
  }
  .attributes {
    .attribute-item {
      display: flex;
      flex-flow: row;
      margin-bottom: 46px;
      .attribute-item-icon {
        color: #AAA095;
        margin-right: 8px;
      }
      .attribute-item-title {
        color: #475f4a;
        font-size: 16px;
      }
    }
  }
  .print-btn {
    width: 252px;
  }
  .summary {
    margin-bottom: 16px;
    .summary-title {
      font-size: 18px;
      color: #212121;
      position: relative;
      padding-left: 8px;
      margin-bottom: 33px;
      &:before {
        content: ' ';
        position: absolute;
        top: 11px;
        left: 0;
        background: #EAC38A;
        width: 4px;
        height: 4px;
        border-radius: 2px;
      }
    }
    .summary-body {
      font-size: 20px;
      color: #707070;
    }
  }
  :deep(.post-body) {
    margin-top: 32px;
    .barehtml {
      width: 600px;
      max-width: 100%;
      margin: auto;
    }
  }
}
</style>
