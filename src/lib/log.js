class Log {
    constructor(con, logType) {
        this.createTime = new Date().toLocaleString();
        this.logType = logType;
        if (typeof con === 'string') {
            this.content = con;
        } else {
            this.contentGroup = con;
        }

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