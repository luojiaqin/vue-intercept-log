export interface Params {
    router: any; // 路由
    routePath?: string;
    isDefaultRecord: false; // 是否开启默认记录
}

export enum LogType {
    Console = 'console',
    ErrorConsole = 'errorConsole',
    HttpRequest = 'httpRequest',
    ErrorHttpRequest = 'errorHttpRequest',
    Event = 'event',
}

export class Log {
    public createTime: string; // 创建时间
    public content?: string; // 打印内容
    public contentGroup?: string[]; // 打印内容，多个参数
    public logType: LogType; // 日志类型
} 

export class Navigator {
    public name: string; //设备名称
}

export class HttpRequest extends Log {
    public request?: string;
    public requestTime?: string;
    public response?: string;
    public responseTime?: string;
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
// declare const 

// export default 