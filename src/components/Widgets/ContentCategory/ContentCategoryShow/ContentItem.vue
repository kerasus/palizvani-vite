<template>
  <div class="col-md-4 col-sm-6 col-12">
    <q-card flat
            class="ContentItem"
            @click="goToContentPage">
      <div class="thumbnail">
        <q-img :src="content.thumbnail" />
      </div>
      <div class="title ellipsis-2-lines">
        <router-link :to="{name: 'Public.Content.Show', params: {id: content.id}}">
          {{content.title}}
        </router-link>
      </div>
      <q-card-actions class="action-section">
        <q-btn color="primary"
               class="btn-show-content"
               :to="{name: 'Public.Content.Show', params: {id: content.id}}">
          مشاهده جزئیات
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Content } from 'src/models/Content.js'

export default defineComponent({
  name: 'ContentItem',
  props: {
    content: {
      type: Content,
      default: new Content()
    }
  },
  methods: {
    goToContentPage () {
      this.$router.push({ name: 'Public.Content.Show', params: { id: this.content.id } })
    }
  }
})
</script>

<style lang="scss" scoped>
.ContentItem {
  background: #F6F6F6;
  border-radius: 8px;
  border: 1px solid #DFE1EC;
  padding: 11px 24px 24px 24px;
  margin: 8px;
  position: relative;
  .thumbnail {
    padding: 0 34px;
    margin-bottom: 8px;
    .q-img {
    }
  }
  .title {
    font-size: 18px;
    color: #212121;
    text-align: center;
    margin-bottom: 8px;
    max-height: 48px;
    min-height: 48px;
    a {
      color: #212121;
    }
  }
  .action-section {
    .btn-show-content {
      width: 100%;
      height: 48px;
    }
  }
}
</style>
