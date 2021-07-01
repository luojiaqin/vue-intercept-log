const store = require('../store/index2');
const { Log, LogType } = require('./log');
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
    const log = new DOMEventLog('按钮点击', EventName.CLICK, event.target);
    store.appendLogs(log);

}

function init() {
    store.outWindow.document.addEventListener('click',clickHandle, true)
}

function destory(){
    // document.removeEventListener('click',clickHandle, true)
}


module.exports = {
    init,
    destory
};
