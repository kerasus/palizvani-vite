<template>
  <q-card flat
          class="content-item">
    <div class="thumbnail">
      <img class="thumbnail-img"
           :src="content.thumbnail"
           @click="goToPage">
    </div>
    <div class="infos">
      <div class="title ellipsis-2-lines">
        <router-link :to="{name: 'Public.Content.Show', params: {id: content.id}}">
          {{ content.title }}
        </router-link>
      </div>
      <div class="date">
        <q-icon name="calendar_month"
                size="20px" />
        {{ miladiToShamsi() }}
      </div>
    </div>
    <q-card-actions class="action-section">
      <q-btn color="primary"
             class="btn-show-content"
             :to="{name: 'Public.Content.Show', params: {id: content.id}}">
        مشاهده و ثبت نام
        <svg xmlns="http://www.w3.org/2000/svg"
             width="18.387"
             height="11.502"
             viewBox="0 0 18.387 11.502">
          <path id="Combined_Shape"
                data-name="Combined Shape"
                d="M-9.338,11.408a.748.748,0,0,0,.388-.656V6.5h8.2A.751.751,0,0,0,0,5.75.75.75,0,0,0-.75,5h-8.2V.75A.751.751,0,0,0-9.338.093.769.769,0,0,0-9.7,0a.735.735,0,0,0-.4.115l-7.938,5a.747.747,0,0,0-.35.635.742.742,0,0,0,.35.634l7.938,5a.751.751,0,0,0,.4.116A.746.746,0,0,0-9.338,11.408ZM-10.45,9.392l-5.78-3.641,5.78-3.642Z"
                transform="translate(18.387)"
                fill="#fff" />
        </svg>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import Assist from 'src/assets/js/Assist.js'
import { Content } from 'src/models/Content.js'

export default defineComponent({
  name: 'ContentItem',
  props: {
    content: {
      type: Content,
      default: new Content()
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goToPage () {
      this.$router.push({ name: 'Public.Content.Show', params: { id: this.content.id } })
    },
    miladiToShamsi () {
      return Assist.miladiToShamsi(this.content.creation_time, 'jD jMMMM jYYYY ساعت HH:mm')
    }
  }
})
</script>

<style lang="scss" scoped>
.content-item {
  width: 100%;
  background-color: #F6F6F6;
  border-radius: 8px;
  position: relative;
  z-index: 1;

  .thumbnail {
    padding: 0;
    cursor: pointer;
    .thumbnail-img {
      width: 100%;
      height: auto;
    }
  }
  .infos {
    position: absolute;
    left: 0;
    padding-top: 12px;
    bottom: 60px;
    width: 100%;
    z-index: 2;
    -webkit-box-shadow: inset 0px -200px 55px -90px rgba(0,0,0,0.32);
    -moz-box-shadow: inset 0px -200px 55px -90px rgba(0,0,0,0.32);
    box-shadow: inset 0px -200px 55px -90px rgba(0,0,0,0.32);
    .title {
      padding: 0 15px;
      text-align: left;
      margin-bottom: 49px;
      a {
        color: white;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .date {
      padding: 0 15px;
      text-align: left;
      margin-bottom: 24px;
      color: white;
      font-size: 16px;
      font-weight: normal;
      .q-icon {
        color: #EAC38A;
        margin-right: 12.5px;
      }
    }
  }
  .action-section {
    padding: 0;
    .btn-show-content {
      width: 100%;
      height: 60px;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
  }
}
</style>
