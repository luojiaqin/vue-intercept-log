export class Log {
    public createTime: string; // 创建时间
    public content?: string; // 打印内容
    public contentGroup?: string[]; // 打印内容，多个参数
    public logType: LogType; // 日志类型
    constructor(con: string | string[], logType: LogType = LogType.Console) {
        this.createTime = new Date().toLocaleString();
        this.logType = logType;
        if (typeof con === 'string') {
            this.content = con;
        } else {
            this.contentGroup = con;
        }

    }
}

export enum LogType {
    Console = 'console',
    ErrorConsole = 'errorConsole',
    HttpRequest = 'httpRequest',
    ErrorHttpRequest = 'errorHttpRequest',
    Event = 'event',
}
