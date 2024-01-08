// logger.js
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'info' : 'error',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  //logger.add(new transports.File({ level: 'debug' }));
}

export default logger;
