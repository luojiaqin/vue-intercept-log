class Log {
    constructor(con, logType,stack = null) {
        const curTime = new Date()
        this.createTime = curTime.getHours()+':'+curTime.getMinutes()+':'+curTime.getSeconds();
        this.logType = logType;
        this.content = con;
        this.stack = stack

    }
}

const LogType = {
    Console: 'console',
    ErrorConsole: 'errorConsole',
    HttpRequest: 'httpRequest',
    ErrorHttpRequest: 'errorHttpRequest',
    EventLog: 'event',
}
module.exports = {
    Log,
    LogType
}