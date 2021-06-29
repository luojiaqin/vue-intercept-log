const { LogType } = require('../lib/log');

const store = {
  outerVue: {},
  router: {},
  logs: {
      [LogType.Console]: [],
      [LogType.ErrorConsole]: [],
      [LogType.ErrorHttpRequest]: [],
      [LogType.HttpRequest]: [],
      [LogType.EventLog]: [],
  },
  appendLogs({log,type}){
      const typeLogs = this.logs[type];
      if (typeof log === 'object') {
        typeLogs.push(log);
      } else if (log.constructor === Array) {
        typeLogs.push(...log);
      }
  }
}

module.exports = store