import { ENV } from '../../constants';

export abstract class Logger {
  private static shouldLog = !ENV.IS_TEST;
  private static printer = console;

  public static log = (...args) => Logger.logMethod('log', ...args);
  public static info = (...args) => Logger.logMethod('info', ...args);
  public static warn = (...args) => Logger.logMethod('warn', ...args);
  public static error = (...args) => Logger.logMethod('error', ...args); /** using console.error crashes using devtools */
  public static table = (...args) => Logger.logMethod('table', ...args);

  private static logMethod = (level, ...args) => {
    if (!Logger.shouldLog) return;
    Logger.printer[level](...args);
  };
}
