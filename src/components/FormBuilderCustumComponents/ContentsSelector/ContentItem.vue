<template>
  <div class="ContentItem">
    <q-expansion-item expand-separator
                      :label="content.title">
      <q-card>
        <q-card-section>
          <div class="content-info">
            <div class="title-and-thumbnail">
              <div class="thumbnail">
                <q-img :src="content.thumbnail"
                       width="100px" />
              </div>
              <div class="title ellipsis-2-lines">
                {{ content.title }}
              </div>
            </div>
            <div class="actions">
              <q-btn icon="isax:eye"
                     outline
                     color="primary"
                     class="viewBtn"
                     @click="onView(content)" />
              <q-btn icon="isax:trash4"
                     outline
                     color="red"
                     @click="onDelete(content)" />
            </div>
          </div>
          <div class="content-medias">
            <content-medias :value="content.medias_info"
                            :can-delete="false"
                            :can-add-media="false" />
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
import { Content } from 'src/models/Content.js'
import ContentMedias from 'src/components/FormBuilderCustumComponents/ContentMedias/ContentMedias.vue'

export default {
  name: 'ContentItem',
  components: { ContentMedias },
  props: {
    content: {
      type: Content,
      default: new Content()
    }
  },
  emits: ['update:value'],
  data () {
    return {
      mediasInfo: [],
      entityCreateLoading: false
    }
  },
  methods: {
    onView (content) {
      this.$emit('onView', content)
    },
    onDelete (content) {
      this.$emit('onDelete', content)
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentItem {
  :deep(.q-expansion-item__container) {
    .q-item {
      display: flex !important;
      border: solid 1px rgba(0, 0, 0, 0.12);
      border-radius: 6px;
    }
    .q-expansion-item__content {
      border: solid 1px rgba(0, 0, 0, 0.12);
      border-radius: 6px;
    }
  }
  .content-info {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    .title-and-thumbnail {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      .thumbnail {
        width: 100px;
        margin-right: 10px;
      }
      .title {
        font-size: 15px;
        letter-spacing: 0;
        color: #212121;
      }
    }
    .actions {
      display: flex;
      flex-flow: row;
      justify-content: flex-end;
      .q-btn {
        width: 42px;
        height: 42px;
        &.viewBtn {
          margin-right: 16px;
        }
      }
    }
    .content-medias {

    }
  }
}
</style>
