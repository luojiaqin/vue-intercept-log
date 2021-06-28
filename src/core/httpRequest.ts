import store from '@/store';
import { Log, LogType } from './log';
class HttpRequest extends Log {
    public request?: string;
    public requestTime?: string;
    public response?: string;
    public responseTime?: string;
    constructor(con: string, logType: LogType = LogType.HttpRequest) {
        super(con, logType);
    }
    public setRequest(request: string) {
        this.requestTime = new Date().toLocaleString();
        this.request = request;
    }
    public setResponse(response: string) {
        this.responseTime = new Date().toLocaleString();
        this.response = response;
    }
    public setLogType(logType: LogType) {
        this.logType = logType;
    }

}
// class XMLHttp {
//     request = function(param: any){
//         console.log('请求内容',param)
//     };
//     response = function(response: any){
//         console.log('响应内容',response)
//     }
// }


function initXMLHttpRequest() {
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(...args: any) {
        if (args[1].includes('/sockjs-node/info')) {
            return;
        }
        const httpLog = new HttpRequest('请求');
        const send = this.send;
        let _this = this;
        let post_data: any[] = [];
        this.send = function(...data) {
            post_data = data;
            return send.apply(_this, data);
        };

        // 请求前拦截
        httpLog.setRequest(JSON.stringify(args));

        this.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                const config = {
                    url: args[1],
                    status: this.status,
                    method: args[0],
                    data: post_data,
                  };
                // 请求后拦截
                httpLog.setResponse(JSON.stringify({config, response: this.response}));
                if (this.status) {
                    store.commit('appendLogs', {log: httpLog, type: LogType.HttpRequest});
                } else {
                    httpLog.setLogType(LogType.ErrorHttpRequest);
                    store.commit('appendLogs', {log: httpLog, type: LogType.ErrorHttpRequest});
                }


            }

        }, false);
        return open.apply(this, args);
    };
}

export default {
    init: initXMLHttpRequest,
};
