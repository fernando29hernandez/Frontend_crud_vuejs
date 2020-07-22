import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/list",
      name: "list",
      component: () => import("./components/list.component")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/add.component")
    }
  ]
});