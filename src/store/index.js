import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const pomodoroModule = {
  state: {
    startTime: null,
  },
  mutations: {},
  getter: {},
  actions: {},
};

export default new Vuex.Store({
  state: { pomodoroModule: pomodoroModule },
  mutations: {},
  actions: {},
  modules: {},
});
