import store from '@/store';
import { Log, LogType } from './log';
const EventName =  {
    CLICK: 'click',
}
class DOMEventLog extends Log {
    constructor(con, eventName, dom, logType = LogType.EventLog) {
        super(con, logType);
        this.eventName = eventName;
        this.dom = dom;
    }
}

function clickHandle(event) {
    const log = new DOMEventLog('元素事件触发', EventName.CLICK, event.target);
    store.commit('appendLogs', {log, type: LogType.EventLog});
}

function init() {
    document.addEventListener('click', clickHandle);
}


module.exports = {
    init,
};
