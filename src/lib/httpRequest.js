const store = require('../store/index2');
const { Log, LogType } = require('./log');

function stackTrace(){
    const obj = {}
    store.outWindow.Error.captureStackTrace(obj)
    return obj.stack
}

class HttpRequest extends Log {
    setRequest(request) {
        this.requestTime = new Date().toLocaleString();
        this.request = request;
    }
    setResponse(response) {
        this.responseTime = new Date().toLocaleString();
        this.response = response;
    }
    setLogType(logType) {
        this.logType = logType;
    }

}
function initXMLHttpRequest() {
    const open = store.outWindow.XMLHttpRequest.prototype.open;
    store.outWindow.XMLHttpRequest.prototype.open = function(...args) {
        if (args[1].includes('/sockjs-node/info')) {
            return;
        }
        const httpLog = new HttpRequest('请求',LogType.HttpRequest,stackTrace());
        const send = this.send;
        let _this = this;
        let post_data = [];
        this.send = function(...data) {
            post_data = data;
            return send.apply(_this, data);
        };

        // 请求前拦截
        httpLog.setRequest({
            method: args[0],
            url: args[1],
            isAsync: args[2],
            sendData: post_data
        });

        this.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                // 请求后拦截
                httpLog.setResponse({status: this.status, response: this.response});
                if (this.status === 200) {
                    store.appendLogs(httpLog);
                } else {
                    httpLog.setLogType(LogType.ErrorHttpRequest);
                    store.appendLogs(httpLog);
                }


            }

        }, false);

        this.addEventListener('error', function(){
            httpLog.setLogType(LogType.ErrorHttpRequest);
            store.appendLogs(httpLog);
        })
        return open.apply(this, args);
    };
}

function destory(){
    store.outWindow.XMLHttpRequest.prototype.open = store.outWindow.XMLHttpRequest.prototype.open
}

module.exports  = {
    init: initXMLHttpRequest,
    destory
};
