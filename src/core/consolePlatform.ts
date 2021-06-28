import { Log, LogType } from './log';
import store from '@/store';

function consoleLog(): any {
    let log = null;
    if (arguments.length === 1) {
        log = new Log(JSON.stringify(arguments[0]));
    } else {
        const contentGroup: string[] = [];
        for (let i = 0; i < arguments.length; i++) {
            contentGroup.push(JSON.stringify(arguments[i]));
        }
        log = new Log(contentGroup);
    }
    store.commit('appendLogs', {log, type: LogType.Console});
}

function consoleError(errorMessage: any, scriptURI: any, lineNumber: any, columnNumber: any, errorObj: any) {
        const log = new Log(errorMessage, LogType.ErrorConsole);
        store.commit('appendLogs', {log, type: LogType.ErrorConsole});
}


function vueError(error: any, vm: any, info: string) {
    const log = new Log(info, LogType.ErrorConsole);
    store.commit('appendLogs', {log, type: LogType.ErrorConsole});
}


function init() {
    window.console.log = consoleLog;
    window.onerror = consoleError;
    const outerVue: any = store.state.outerVue;
    outerVue.config.errorHandler = vueError;
}

export default {
    init,
};
