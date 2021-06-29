import { Log, LogType } from '@/lib/log';
import Vuex from 'vuex'


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
    },
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
      const typeLogs = logs[type];
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
