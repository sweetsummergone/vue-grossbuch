<template>
  <div v-if="this.ticket">
    <h4>Ticket</h4>
    <div>
      <label>Name: </label> {{this.ticket.name}}
    </div>
    <div>
      <label>Price: </label> {{this.ticket.items.reduce((acc, item) => acc + item.price, 0)}}
    </div>
    <div>
      <label>Items: </label>
      <li v-for="(item, index) in this.ticket.items" :key="index">

          {{item.name}} : {{item.price}}

      </li>

    </div>

    <span class="button is-small btn-danger" v-on:click="deleteTicket()">Delete</span>
  </div>
  <div v-else>
    <br/>
    <p>Please click on a Ticket...</p>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "ticket",
  props: ["ticket"],
  methods: {
    /* eslint-disable no-console */
    deleteTicket() {
      http
        .delete("/ticket/" + this.ticket._id)
        .then(response => {
          console.log(response.data);
          this.$emit("refreshData");
          this.$router.push('/');
        })
        .catch(e => {
          console.log(e);
        });
    }
    /* eslint-enable no-console */
  }
};
</script>
