import { Log, LogType } from '@/core/log';
// import Vue from 'vue';
import Vuex from 'vuex';
import {Vue} from 'vue-property-decorator';


Vue.use(Vuex);
interface Logs {
  [LogType.Console]: Log[];
  [LogType.ErrorConsole]: Log[];
  [LogType.ErrorHttpRequest]: Log[];
  [LogType.HttpRequest]: Log[];
  [LogType.Event]: Log[];
}
interface StoreVal {
  outerVue: Vue;
  router: any;
  logs: Logs;
}

export default new Vuex.Store({
  state: {
    outerVue: {},
    router: {},
    logs: {
      [LogType.Console]: [],
      [LogType.ErrorConsole]: [],
      [LogType.ErrorHttpRequest]: [],
      [LogType.HttpRequest]: [],
      [LogType.Event]: [],
    } as Logs,
  },
  mutations: {
    setOuterVue(state, outerVue) {
      state.outerVue = outerVue;
    },
    setRouter(state, router) {
      state.router = router;
    },
    appendLogs(state, {log, type}) {
      const logs = state.logs;
      const typeLogs = logs[type as LogType];
      if (typeof log === 'object') {
        typeLogs.push(log);
      } else if (log.constructor === Array) {
        typeLogs.push(...log);
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
