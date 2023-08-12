<template>
  <q-card class="auth-template-card">
    <div class="header">
      <div class="title-image">
        <router-link :to="{name: 'Public.Home'}">
          <q-img src="/assets/images/auth/login-image-right.png" />
        </router-link>
      </div>
      <div class="image">
        <q-img src="/assets/images/auth/login-image-left.png" />
      </div>
    </div>
    <div class="body">
      <slot name="body" />
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'TemplateComponent'
}
</script>

<style lang="scss" scoped>
.auth-template-card {
  min-width: 524px;
  background: #F9F9F9 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px #00000029;
  border-radius: 10px;
  opacity: 1;

  @media screen and (max-width: 599px) {
    min-width: 90%;
    max-width: 90%;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding-top: 36px;
    .image {
      width: 59px;
    }
    .title-image {
      width: 217px;
    }
  }
  .body {
    margin-top: 20px;
    padding-right: 67px;
    padding-left: 67px;
    padding-bottom: 61px;
    @media screen and (max-width: 599px) {
      $padding: 20px;
      padding-right: $padding;
      padding-left: $padding;
    }
  }
}
</style>
