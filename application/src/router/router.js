import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "../views/Home.vue";
import Courses from "../views/Courses.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

import User from "../views/User.vue";


export const router = new VueRouter({
  linkActiveClass: "active",
  linkExactActiveClass: "exact",
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "user", name: "user", component: User, children: [
      { path: "", name: "user-default", component: Login },
      { path: "login", name: "user-login", component: Login },
      { path: "logout", name: "user-logout", component: Logout },
    ]},
    { path: "courses", name: "courses", component: Courses }
  ]
})
