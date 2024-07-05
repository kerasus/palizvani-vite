<template>
  <admin-panel-side-bar v-if="type === 'admin'" />
  <main-side-bar-template v-if="type === 'main'" />
  <user-panel-side-bar v-if="type === 'user-panel'" />
</template>

<script>
import MainSideBarTemplate from 'src/components/Template/SideBar/Main.vue'
import UserPanelSideBar from 'src/components/Template/SideBar/UserPanelSideBar.vue'
import AdminPanelSideBar from 'src/components/Template/SideBar/AdminPanelSideBar.vue'

export default {
  name: 'TemplateSideBar',
  components: {
    UserPanelSideBar,
    AdminPanelSideBar,
    MainSideBarTemplate
  },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>
