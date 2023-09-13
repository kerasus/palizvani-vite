<template>
  <div class="section">
    <q-img src="assets/images/web/homepage-first-section-logo.png"
           class="logo" />
    <div>
      اینجا با مطالعه، پرسش‌گری و گفتگو، روشن‌تر فکر کن!
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePageFirstSection'
}
</script>

<style scoped lang="scss">
.section {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .logo {
    max-width: 500px;
    margin-bottom: 74px;
  }
}
</style>
