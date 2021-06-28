import store from '@/store';
import { Log, LogType } from './log';
enum EventName {
    CLICK = 'click',
}
class DOMEventLog extends Log {
    public eventName: EventName;
    public dom: EventTarget | null;
    constructor(con: string, eventName: EventName, dom: EventTarget|null, logType: LogType = LogType.Event) {
        super(con, logType);
        this.eventName = eventName;
        this.dom = dom;
    }
}

function clickHandle(event: MouseEvent) {
    const log = new DOMEventLog('元素事件触发', EventName.CLICK, event.target);
    store.commit('appendLogs', {log, type: LogType.Event});
}

function init() {
    document.addEventListener('click', clickHandle);
}


export default{
    init,
};
