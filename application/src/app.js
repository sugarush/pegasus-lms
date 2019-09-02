import "../assets/app.sass";

import WebToken from "../bower_components/sugar-data/lib/webtoken.js";

import { router } from "./router/router.js";
import { store } from "./store/store.js";
import "./filters/filters.js";
import App from "./App.vue";

import { HOST } from "./settings.js";

import Vue from "vue";


async function main() {

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
