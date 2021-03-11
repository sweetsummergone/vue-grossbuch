<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Tickets List</h4>
            <ul>
                <li v-for="(ticket, index) in tickets" :key="index">
                    <router-link :to="{
                            name: 'ticket-details',
                            params: { ticket: ticket, id: ticket._id }
                        }">
                            {{ticket.name}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
    </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "ticket-list",
  data() {
    return {
      tickets: []
    };
  },
  methods: {
    /* eslint-disable no-console */
    retrieveTickets() {
      http
        .get("/tickets")
        .then(response => {
          this.tickets = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveTickets();
    }
    /* eslint-enable no-console */
  },
  mounted() {
    this.retrieveTickets();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 450px;
  margin: auto;
}
</style>
