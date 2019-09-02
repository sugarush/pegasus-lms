import "../assets/app.sass";

import WebToken from "../bower_components/sugar-data/lib/webtoken.js";
import { store } from "./store/store.js";
import { HOST } from "./settings.js";

import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

import App from "./App.vue";

import Home from "./views/Home.vue";
import Courses from "./views/Courses.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";

import User from "./views/User.vue";

async function main() {

  Vue.use(VueRouter);

  Vue.filter("limit", function(value, limit) {
    if(value.length <= limit) {
      return value;
    }
    return value.substring(0, limit) + "...";
  });

  Vue.filter("date", function(value) {
    let date = new Date(value);
    return date.toDateString();
  });

  const routes = [
    { path: "/", name: "home", component: Home },
    { path: "user", name: "user", component: User, children: [
      { path: "", name: "user-default", component: Login },
      { path: "login", name: "user-login", component: Login },
      { path: "logout", name: "user-logout", component: Logout },
    ]},
    { path: "courses", name: "courses", component: Courses }
  ];

  const router = new VueRouter({
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active-exact"
  });

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");

  function forceUpdateAll(element) {
    for(let child of element.$children) {
      forceUpdateAll(child);
    }
    element.$forceUpdate();
  }

  setInterval(async function() {
    if(WebToken.authenticated) {
      await WebToken.refresh(`${HOST}/v1/authentication`);
      forceUpdateAll(app);
    }
  }, 240000);

  WebToken.expired = function() {
    forceUpdateAll(app);
  };

}

main();
