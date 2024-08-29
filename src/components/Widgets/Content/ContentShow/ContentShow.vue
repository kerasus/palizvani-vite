<template>
  <div class="content-show"
       :style="localOptions.style">
    <breadcrumbs class="q-mb-md" />
    <div class="content-show__summery">
      <div class="content-show__summery-info">
        <div class="content-show__thumbnail">
          <q-img :src="content.thumbnail" />
        </div>
        <div class="content-show__meta">
          <div class="content-show__title">
            {{ content.title }}
          </div>
          <div class="content-show__attrs">
            <div class="content-show__attrs-title">
              ویژگی ها:
            </div>
            <div class="content-show__attrs-items">
              <div v-if="content.is_physical"
                   class="content-show__attrs-item">
                <div class="content-show__attrs-item-label">
                  نوع:
                </div>
                <div class="content-show__attrs-item-value">
                  {{ content.is_physical_info.label }}
                </div>
              </div>
              <div v-if="content.physical_type"
                   class="content-show__attrs-item">
                <div class="content-show__attrs-item-label">
                  جنس:
                </div>
                <div class="content-show__attrs-item-value">
                  {{ content.physical_type_info.label }}
                </div>
              </div>
              <div v-if="content.weight"
                   class="content-show__attrs-item">
                <div class="content-show__attrs-item-label">
                  وزن:
                </div>
                <div class="content-show__attrs-item-value">
                  {{ content.weight }}
                  گرم
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="content.description"
         class="content-show__descriptions">
      <q-banner class="content-show__descriptions-title">
        توضیحات:
      </q-banner>
      <div class="content-show__descriptions-data"
           v-html="content.description" />
    </div>
    <div v-if="content.medias_info"
         class="content-show__medias">
      <medias-component :medias="content.medias_info" />
    </div>
  </div>
</template>

<script>
import ShamsiDate from 'assets/ShamsiDate'
import { Content } from 'src/models/Content.js'
import { APIGateway } from 'src/api/APIGateway.js'
import MediasComponent from './components/Medias.vue'
import { ContentCategory } from 'src/models/ContentCategory.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

let html2pdf

export default {
  name: 'ContentShow',
  components: { Breadcrumbs, MediasComponent },
  mixins: [mixinPrefetchServerData, mixinWidget],
  data () {
    return {
      content: new Content(),
      contentCategory: new ContentCategory(),
      contentCategoryParent: new ContentCategory(),
      contentCategoryParentParent: new ContentCategory(),
      addToCartLoading: false
    }
  },
  computed: {
    contentId () {
      return this.$route.params.id
    },
    breadcrumbsPath () {
      const path = [
        {
          label: 'خانه',
          to: { name: 'Public.Home' }
        },
        {
          label: 'آرشیو محتوا',
          to: { name: 'Public.ContentCategoryParentParent.List' }
        }
      ]

      if (this.contentCategoryParentParent.id) {
        path.push({
          label: this.contentCategoryParentParent.title,
          to: { name: 'Public.ContentCategoryParentParent.Show', params: { category_id: this.contentCategoryParentParent.id } }
        })
      }
      if (this.contentCategoryParent.id) {
        path.push({
          label: this.contentCategoryParent.title,
          to: { name: 'Public.ContentCategoryParent.Show', params: { category_id: this.contentCategoryParent.id } }
        })
      }
      if (this.contentCategory.id) {
        path.push({
          label: this.contentCategory.title,
          to: { name: 'Public.ContentCategory.Show', params: { category_id: this.contentCategory.id } }
        })
      }
      if (this.content.id) {
        path.push({
          label: this.content.title,
          to: { name: 'Public.Content.Show', params: { id: this.content.id } }
        })
      }
      return path
    }
  },
  methods: {

    prefetchServerDataPromise () {
      return this.getContent()
    },
    prefetchServerDataPromiseThen (content) {
      this.content = new Content(content)
      this.content.content = false
      this.loadContentCategory()
    },
    prefetchServerDataPromiseCatch () {
      this.content.content = false
    },

    getTitledDateTime (dateTime) {
      return ShamsiDate.getTitledDateTime(dateTime)
    },
    getTime (time) {
      return ShamsiDate.getDateTime(time)
    },
    getContent () {
      this.content.content = true
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
    },
    getContentCategoryInfo (contentCategoryId) {
      return APIGateway.contentCategory.get({ data: { id: contentCategoryId } })
    },
    loadContentCategory () {
      this.contentCategory.loading = true
      this.getContentCategoryInfo(this.content.category)
        .then((contentCategory) => {
          this.contentCategory = new ContentCategory(contentCategory)
          this.updateBreadcrumbs()
          if (this.contentCategory.parent) {
            this.getContentCategoryInfo(this.contentCategory.parent)
              .then((parentContentCategory) => {
                this.contentCategoryParent = new ContentCategory(parentContentCategory)
                this.updateBreadcrumbs()
                if (this.contentCategoryParent.parent) {
                  this.getContentCategoryInfo(this.contentCategoryParent.parent)
                    .then((parentParentContentCategory) => {
                      this.contentCategoryParentParent = new ContentCategory(parentParentContentCategory)
                      this.updateBreadcrumbs()
                    })
                    .finally(() => {
                      this.contentCategoryParentParent.loading = false
                    })
                }
              })
              .finally(() => {
                this.contentCategoryParent.loading = false
              })
          }
        })
        .finally(() => {
          this.contentCategory.loading = false
        })
    },
    updateBreadcrumbs () {
      const breadcrumbs = {
        visible: true,
        loading: false,
        path: this.breadcrumbsPath
      }

      this.$store.commit('AppLayout/updateBreadcrumbs', breadcrumbs)
    }
  }
}
</script>

<style scoped lang="scss">
.content-show {
  $price-section-with: 312px;
  .content-show__summery {
    $gap: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: $gap;
    align-items: stretch;
    justify-content: flex-start;
    margin-bottom: 24px;
    .content-show__summery-info {
      border-radius: 8px;
      background: #F6F6F6;
      border: 1px solid #DFE1EC;
      padding: 24px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 74px;
      align-items: flex-start;
      justify-content: flex-start;
      .content-show__thumbnail {
        width: 239px;
        @media screen and (max-width: 600px) {
          & {
            width: 100%;
          }
        }
      }
      .content-show__meta {
        .content-show__title {
          font-size: 22px;
          margin-bottom: 35px;
        }
        .content-show__attrs {
          .content-show__attrs-title {
            color: #727272;
            font-size: 16px;
            margin-bottom: 16px;
          }
          .content-show__attrs-items {
            .content-show__attrs-item {
              font-size: 16px;
              display: flex;
              gap: 4px;
              align-items: center;
              margin-bottom: 20px;
              justify-content: flex-start;
              &:before {
                content: ' ';
                width: 8px;
                height: 8px;
                border-radius: 100%;
                background: #475F4A;
                margin-right: 6px;
              }
              .content-show__attrs-item-label {
                color: #797979;
              }
              .content-show__attrs-item-value {
                color: #212121;
              }
            }
          }
        }
        @media screen and (max-width: 600px) {
          & {
            width: 100%;
          }
        }
      }
      @media screen and (max-width: 900px) {
        & {
          width: 100%;
        }
      }
      @media screen and (max-width: 600px) {
        & {
          gap: 16px;
          padding-bottom: 0;
        }
      }
    }
  }
  .content-show__contents {
    margin-bottom: 47px;
    :deep(.q-expansion-item) {
      .q-expansion-item__container {
        .q-item {
          background: #F6F6F6;
          border: 1px solid #DFE1EC;
          border-radius: 8px;
          .q-item__section--avatar {
            padding-right: 8px;
            font-size: 36px;
            min-width: 36px;
            color: #AAA095;
          }
          .q-item__label {
            font-size: 18px;
            color: #212121;
          }
        }
        .q-expansion-item__content {
          border: 1px solid #DFE1EC;
          border-top: none;
        }
      }
      &.q-expansion-item--expanded {
        .q-expansion-item__container {
          .q-item {
            border-radius: 8px 8px 0 0;
          }
        }
      }
    }
    .content-item-component {
      border-bottom: 1px solid #DFE1EC;
      &:last-child {
        border: none;
      }
    }
  }
  .content-show__descriptions {
    padding: 32px 32px 70px 32px;
    border: 1px solid #DFE1EC;
    border-radius: 8px;
    background: #F6F6F6;
    margin-bottom: 20px;
    .content-show__descriptions-title{
      color: #727272;
      font-size: 16px;
      margin-bottom: 21px;
    }
    .content-show__descriptions-data {
      color: #212121;
      font-size: 16px;
    }
  }
  .content-show__medias {
    background: #FFFFFF;
    border: 1px solid #DFE1EC;
    border-radius: 8px;
    padding: 36px 46px;
  }
}
</style>
