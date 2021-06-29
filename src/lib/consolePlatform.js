const { Log, LogType } = require('./log');
const store = require('../store/index2');

function consoleLog() {
    let log = null;
    if (arguments.length === 1) {
        log = new Log(JSON.stringify(arguments[0]));
    } else {
        const contentGroup = [];
        for (let i = 0; i < arguments.length; i++) {
            contentGroup.push(JSON.stringify(arguments[i]));
        }
        log = new Log(contentGroup);
    }
    store.appendLogs({log, type: LogType.Console});
}

function consoleError(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        const log = new Log(errorMessage, LogType.ErrorConsole);
        store.appendLogs({log, type: LogType.ErrorConsole});
}


function vueError(error, vm, info) {
    const log = new Log(info, LogType.ErrorConsole);
    store.appendLogs({log, type: LogType.ErrorConsole});
}


function init() {
    window.console.log = consoleLog;
    window.onerror = consoleError;
    const outerVue = store.outerVue;
    outerVue.config.errorHandler = vueError;
}

module.exports = {
    init,
};
