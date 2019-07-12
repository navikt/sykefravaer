const Logger = function () {
    this.error = (...args) => window.frontendlogger.error(...args);
    this.info = (...args) => window.frontendlogger.info(...args);
    this.warn = (...args) => window.frontendlogger.warn(...args);
    this.event = (...args) => window.frontendlogger.event(...args);
};

export default new Logger();
