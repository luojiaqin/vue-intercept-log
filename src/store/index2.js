const { LogType } = require('../lib/log');

const store = {
  outerVue: {},
  outWindow: window,
  router: {},
  logs: [],
  navigatorInfo: {},
  appendLogs(log){
      this.logs.push(log)
  }
}

module.exports = store