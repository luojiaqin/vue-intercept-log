const { Log, LogType } = require('./log');
const store = require('../store/index2');

function stackTrace(){
    const obj = {}
    store.outWindow.Error.captureStackTrace(obj)
    return obj.stack
}

function consoleLog() {
    let log = null;
    
    if (arguments.length === 1) {
        const param = arguments[0]
        log = new Log(param,LogType.Console, stackTrace())
    } else {
        log = new Log(arguments,LogType.Console,stackTrace());
    }
    store.appendLogs(log);
}

function consoleError(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        const log = new Log(errorMessage, LogType.ErrorConsole, stackTrace());
        store.appendLogs(log);
}


function vueError(error, vm, info) {
    const errorMsg = `提示:${info},信息：${error.name}${error.message}`
    const log = new Log(errorMsg, LogType.ErrorConsole, error.stack,stackTrace());
    store.appendLogs(log);
    
}


function init() {
    store.outWindow.console.log = consoleLog;
    store.outWindow.onerror = consoleError;
    store.outerVue.config.errorHandler = vueError;
}

function destory(){
    store.outWindow.console.log = window.console.log
    store.outWindow.onerror = window.onerror
    store.outerVue.config.errorHandler = store.outerVue.config.errorHandler;
}

module.exports = {
    init,
    destory
};
