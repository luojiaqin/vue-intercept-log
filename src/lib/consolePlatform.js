import { Log, LogType } from './log';
import store from '@/store';

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
    store.commit('appendLogs', {log, type: LogType.Console});
}

function consoleError(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        const log = new Log(errorMessage, LogType.ErrorConsole);
        store.commit('appendLogs', {log, type: LogType.ErrorConsole});
}


function vueError(error, vm, info) {
    const log = new Log(info, LogType.ErrorConsole);
    store.commit('appendLogs', {log, type: LogType.ErrorConsole});
}


function init() {
    window.console.log = consoleLog;
    window.onerror = consoleError;
    const outerVue = store.state.outerVue;
    outerVue.config.errorHandler = vueError;
}

module.exports = {
    init,
};
