import Vue from "vue";
import UUID from "vue-uuid";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(UUID);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
require("dotenv").config({ path: "./.env.development" || "./.env.production" });