<template>
  <div class="PanelFooter">
    <div class="copy-right">
      تمام حقوق این سایت متعلق به
      <span class="brand-text">
        بنیاد فرهنگی شهید پالیزوانی
      </span>
      می باشد
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelFooter'
}
</script>

<style scoped lang="scss">
.PanelFooter {
  border-top: 1px solid #DFE1EC;
  background: #FFFFFF;
  height: 60px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  .copy-right {
    font-size: 16px;
    color: #212121;
    letter-spacing: 0;
    .brand-text {
      color: #5B7A5F;
    }
  }
}
</style>
