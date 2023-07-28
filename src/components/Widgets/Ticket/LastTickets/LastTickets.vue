<template>
  <q-card class="LastTickets">
    <div class="title">
      پیام ها
    </div>
    <div v-if="mounted"
         class="items">
      <template v-if="tickets.loading">
        کمی صبر کنید ...
      </template>
      <template v-else-if="tickets.list.length > 0">
        <ticket-item v-for="ticket in tickets.list"
                     :key="ticket.id"
                     :ticket="ticket" />
      </template>
      <template v-else>
        موردی وجود ندارد
      </template>
    </div>
  </q-card>
</template>

<script>
import { TicketList } from 'src/models/Ticket.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import TicketItem from 'src/components/Widgets/Ticket/LastTickets/TicketItem.vue'

export default {
  name: 'LastTickets',
  components: { TicketItem },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      tickets: new TicketList()
    }
  },
  mounted() {
    this.mounted = true
    this.loadData()
  },
  methods: {
    loadData () {
      this.getApiRequest()
        .then((data) => {
          this.prefetchServerDataPromiseThen(data)
        })
        .catch(() => {
          this.prefetchServerDataPromiseCatch()
        })
    },
    prefetchServerDataPromiseThen ({ list }) {
      this.tickets = new TicketList(list)
      this.tickets.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.tickets.loading = false
    },

    getApiRequest() {
      this.tickets.loading = true
      return APIGateway.ticket.index()
    }
  }
}
</script>

<style scoped lang="scss">
.LastTickets {
  padding: 27px 24px;
  .title {
    color: #2E2E2E;
    font-size: 20px;
    font-weight: 700;
    line-height: 140%;
  }
}
</style>
