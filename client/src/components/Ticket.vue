<template>
  <div v-if="this.ticket">
    <h4>Ticket</h4>
    <div>
      <label>Name: </label> {{this.ticket.name}}
    </div>
    <div>
      <label>Price: </label> {{this.ticket.price}}
    </div>
    <div>
      <label>Items: </label> {{this.ticket.items}}
    </div>

    <span v-if="this.customer.active"
      v-on:click="updateActive(false)"
      class="button is-small btn-primary">Inactive</span>
    <span v-else
      v-on:click="updateActive(true)"
      class="button is-small btn-primary">Active</span>

    <span class="button is-small btn-danger" v-on:click="deleteCustomer()">Delete</span>
  </div>
  <div v-else>
    <br/>
    <p>Please click on a Customer...</p>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "ticket",
  props: ["ticket"],
  methods: {
    /* eslint-disable no-console */
    updateActive(status) {
      var data = {
        id: this.ticket._id,
        name: this.ticket.name,
        items: this.ticket.items,
        active: status
      };

      http
        .put("/ticket/" + this.ticket._id, data)
        .then(response => {
          this.ticket.active = response.data.active;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteCustomer() {
      http
        .delete("/ticket/" + this.customer._id)
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
