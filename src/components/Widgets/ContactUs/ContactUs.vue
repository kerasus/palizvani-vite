<template>
  <div class="ContactUs"
       :style="localOptions.style"
       :class="localOptions.className">
    <q-banner class="q-mb-md">
      ارسال تیکت
    </q-banner>
    <div class="box">
      <div class="message">
        {{ message }}
      </div>
      <div class="action">
        <q-btn color="primary"
               :to="{name: 'UserPanel.Ticket.Create'}">
          {{ btnText }}
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'

export default {
  name: 'ContactUs',
  mixins: [mixinWidget, mixinAuth],
  data() {
    return {
      message: 'جهت ارتباط با ما عضو سایت شوید و در قسمت تیکت با ما ارتباط برقرار کنید',
      btnText: 'ورود / ثبت نام',
      defaultOptions: {
      }
    }
  },
  mounted() {
    if (this.isUserLogin) {
      this.message = 'جهت ارتباط با ما در قسمت تیکت با ما ارتباط برقرار کنید'
      this.btnText = 'ارسال تیکت'
    }
  }
}
</script>

<style scoped lang="scss">
.ContactUs {
  .box {
    padding: 30px;
    background: #F5F5F5;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    .message {
      font-size: 18px;
      color: #212121;
    }
    .action {}
  }
}
</style>
