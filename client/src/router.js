import Vue from "vue";
import Router from "vue-router";
import TicketList from "./components/TicketList.vue";
import AddTicket from "./components/AddTicket.vue";
import SearchCustomers from "./components/SearchCustomers.vue";
import Ticket from "./components/Ticket.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "tickets",
      alias: "/tickets",
      component: TicketList,
      children: [
        {
          path: "/ticket/:id",
          name: "ticket-details",
          component: Ticket,
          props: true
        }
      ]
    },
    {
      path: "/add",
      name: "add",
      component: AddTicket
    },
    {
      path: "/search",
      name: "search",
      component: SearchCustomers
    }
  ]
});
