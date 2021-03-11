<template>
  <div class="submitform">
    <div v-if="!submitted">
        <div class="form-group">
          <div class="deal-name-input">
            <input placeholder="Deal Name" type="text" class="form-control" id="dealName" required v-model="items[0]" name="name">
          </div>
          <div class="product-info">
            <input placeholder="Product Name" type="text" class="form-control" id="name" required v-model="item.name" name="name">
            <input placeholder="Price" type="number" class="form-control" id="price" required v-model="item.price" name="price">
            <button v-on:click="addItem" class="btn btn-outline-primary">+</button>
          </div>

        </div>

        <ul id="example-1">
          <li v-for="(i, index) in items.slice(1,items.length)" :key="i.id">
            Name: {{ i.name }},  Price: {{ i.price }} <button v-on:click="deleteItem(index)">Удалить</button>
          </li>
        </ul>

      <button v-on:click="saveTicket" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" v-on:click="newTicket">Add</button>
    </div>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "add-ticket",
  data() {
    return {
      item: {
        id: 0,
        name: "",
        price: ""
      },
      items: [],
      nextTodoId: 0,
      submitted: false
    };
  },
  methods: {
    /* eslint-disable no-console */
    saveTicket() {
      let data = this.items;
      if(data.length !== 1) {
        http
            .post("/ticket", data)
            .then(response => {
              this.items = response.data.items;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });

        this.submitted = true;
      }
    },
    newTicket() {
      this.submitted = false;
      this.items = [];
    },
    addItem(){
      this.items.push({
        id: this.nextTodoId++,
        name: this.item.name,
        price: this.item.price
      })
      console.log(this.items)
    },
    deleteItem(index){
      this.items.splice(index,1)
    }
    /* eslint-enable no-console */
  }
};
</script>

<style>
.submitform {
  max-width: 300px;
  margin: auto;
}

.form-group{
  display: block;
}

.product-info {
  display: flex;
}

ul {
  display: table;
}
</style>
