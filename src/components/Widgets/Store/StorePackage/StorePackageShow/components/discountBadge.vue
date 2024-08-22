<template>
  <div class="ribbon ribbon-top-left"><span>فروش ویژه</span></div>
</template>

<script>
export default {
  name: 'DiscountBadge'
}
</script>

<style scoped lang="scss">
.ribbon {
  width: 124px;
  height: 124px;
  overflow: hidden;
  position: absolute;
}
.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: 0;
  content: '';
  display: block;
  border: 5px solid #b13636;
}
.ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 6px 0;
  z-index: 1;
  background-color: #FF3D3D;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  color: #fff;
  font-size: 18px;
  text-align: center;
}

/* top left*/
.ribbon-top-left {
  top: -10px;
  right: -10px;
}
.ribbon-top-left::before,
.ribbon-top-left::after {
  border-bottom-color: #b13636;
  border-right-color: #b13636;
}
.ribbon-top-left::before {
  top: 0;
  left: 0;
}
.ribbon-top-left::after {
  bottom: 0;
  right: 0;
}
.ribbon-top-left span {
  left: -35px;
  top: 31px;
  transform: rotate(45deg);
}
</style>
