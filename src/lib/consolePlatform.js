const { Log, LogType } = require('./log');
const store = require('../store/index2');

let oldConsoleFn = null
let oldErrorFn = null
let oldVueErrorFn = null

function stackTrace(){
    // const obj = {}
    // store.outWindow.Error.captureStackTrace(obj)
    // return obj.stack
    return true
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
function recordOldBindfn(){
    oldConsoleFn = store.outWindow.console.log
    oldErrorFn = store.outWindow.onerror
    oldVueErrorFn = store.outerVue.config.errorHandler
}

function init() {
    store.outWindow.console.log = consoleLog;
    // store.outWindow.onerror = consoleError;
    // store.outerVue.config.errorHandler = vueError;
}

function destory(){
    if(oldConsoleFn){
        store.outWindow.console.log = oldConsoleFn
    }
    if(oldErrorFn){
        store.outWindow.onerror = window.onerror
    }
    if(oldVueErrorFn){
        store.outerVue.config.errorHandler = store.outerVue.config.errorHandler;
    }
}

module.exports = {
    init,
    destory,
    recordOldBindfn
};
