<template>
  <div class="NoticeItem">
    <div class="title ellipsis-3-lines">
      {{ notice.title }}
    </div>
  </div>
</template>

<script>
import { Notice } from 'src/models/Notice.js'

export default {
  name: 'NoticeItem',
  props: {
    notice: {
      type: Notice,
      default: new Notice()
    }
  }
}
</script>

<style scoped lang="scss">
.NoticeItem {
  border-bottom: solid 1px #EDEDED;
  padding: 16px 0;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  .title {
    width: 100%;
    color: #747474;
    font-size: 14px;
    font-weight: 500;
    line-height: 140%;
  }
}
</style>
