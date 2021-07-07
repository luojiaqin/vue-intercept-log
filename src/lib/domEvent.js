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
    const target = event.target
    let str = target.nodeName+target.id+target.classList
    if(target.innerText && target.innerText.length<20){
        str+=target.innerText
    }
    const log = new DOMEventLog('按钮点击:'+str, EventName.CLICK, event.target);
    store.appendLogs(log);

}

function init() {
    store.outWindow.document.addEventListener('click',clickHandle, true)
}

function destory(){
    store.outWindow.document.removeEventListener('click',clickHandle, true)
}


module.exports = {
    init,
    destory
};
