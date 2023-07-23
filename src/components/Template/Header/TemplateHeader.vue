<template>
  <main-header v-if="type === 'main'" />
  <admin-panel-header v-if="type === 'admin'" />
  <user-panel-header v-if="type === 'user-panel'" />
</template>

<script>
import MainHeader from 'src/components/Template/Header/MainHeader.vue'
// import MainHeaderTemplate from 'src/components/Template/Header/Main.vue'
import AdminPanelHeader from 'src/components/Template/Header/AdminPanelHeader.vue'
import UserPanelHeader from 'src/components/Template/Header/UserPanelHeader.vue'

export default {
  name: 'templateHeader',
  components: {
    MainHeader,
    UserPanelHeader,
    AdminPanelHeader
  },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>

<style scoped lang="scss">
.user-panel-bare-layout {
  max-width: 1362px;
  margin: auto;
  padding-top: 30px;
  background: #f4f6f9;
  justify-content: center;
  @media screen and (max-width: 1439px) {
    max-width: 100%;
  }
  @media screen and (max-width: 1439px) {
    padding-left: 32px;
    padding-right: 32px;
  }
  @media screen and (max-width: 1148px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 1023px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media screen and (max-width: 599px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  .user-side-bar {
    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
}
</style>
