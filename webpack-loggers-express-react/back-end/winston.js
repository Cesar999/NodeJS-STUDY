const winston = require('winston');

const { format } = winston;
const { combine, timestamp, printf } = format;

const filePrint = printf(({ level, message, timestamp, ...args }) => {
    return `${level} ${timestamp}: ${message}`;
});

const fileFormat = combine(
    timestamp(),
    filePrint
);

const consolePrint = printf(({ level, message, timestamp, ...meta }) => {
    let metaStr = ' ';
    for(let key in meta){
        metaStr += `[${key}:${meta[key]}]`;
    }
    return `${level} ${timestamp}${metaStr}: ${message}`
});

const consoleFormat = combine(
    format.colorize(),
    timestamp(),
    consolePrint
)

// creates a new Winston Logger
const logger = new winston.createLogger({
  level: 'info', 
  format: fileFormat,
  transports: [
    new winston.transports.File({ 
        filename: './logs/error.log', 
        level: 'error',
        json: true
    }),
    new winston.transports.File({
        filename: './logs/info.log',
        level: 'info'
      })
  ],
  exitOnError: false
});

if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({
        format: consoleFormat
    }));
}

const LogInfo = (file) => (msg)=> logger.info(msg, {file});
const LogError = (file) => (msg)=> logger.error(msg, {file});

module.exports = {logger, LogInfo, LogError}