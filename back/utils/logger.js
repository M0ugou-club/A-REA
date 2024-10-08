import { createLogger, format, transports } from 'winston';

const logLevel = process.env.LOG_LEVEL || 'debug';

const devFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  format.printf(({ timestamp, level, message, stack }) => {
    let logMessage = `${timestamp} ${level}: ${message}`;
    if (stack) {
      logMessage += `\n${stack}`;
    }
    return logMessage;
  })
);

const logger = createLogger({
  level: logLevel,
  format: devFormat,
  transports: [new transports.Console()]
});

export default logger;
