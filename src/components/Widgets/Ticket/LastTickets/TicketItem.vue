<template>
  <div class="TicketItem">
    <div class="bullet"
         :style="{background: ticket.status_info.color}" />
    <div class="title ellipsis">
      {{ ticket.title }}
    </div>
    <div class="status ellipsis"
         :style="{color: ticket.status_info.color}">
      {{ ticket.status_info.label }}
    </div>
  </div>
</template>

<script>
import { Ticket } from 'src/models/Ticket.js'

export default {
  name: 'TicketItem',
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    }
  }
}
</script>

<style scoped lang="scss">
.TicketItem {
  border-bottom: solid 1px #EDEDED;
  padding: 16px 0;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  .bullet {
    position: relative;
    width: 10px;
    height: 10px;
    margin-right: 8px;
    border-radius: 100%;
    &:before {
      position: absolute;
      content: ' ';
      left: 0;
      top: 0;
      width: 10px;
      height: 10px;
      //background: $primary;
      border-radius: 100%;
    }
  }
  .title {
    width: calc( 100% - 118px);
    color: #747474;
    font-size: 14px;
    font-weight: 500;
    line-height: 140%;
  }
  .status {
    width: 100px;
  }
}
</style>
