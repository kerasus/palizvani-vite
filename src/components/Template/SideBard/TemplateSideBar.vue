<template>
  <admin-panel-side-bar v-if="type === 'admin'" />
  <main-side-bar-template v-if="type === 'main'" />
  <user-panel-side-bar v-if="type === 'user-panel'" />
</template>

<script>
import MainSideBarTemplate from 'src/components/Template/SideBard/Main.vue'
import UserPanelSideBar from 'src/components/Template/SideBard/UserPanelSideBar.vue'
import AdminPanelSideBar from 'src/components/Template/SideBard/AdminPanelSideBar.vue'

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
