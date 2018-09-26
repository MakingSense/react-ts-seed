export abstract class LoggerMock {
  public static log = jest.fn();
  public static info = jest.fn();
  public static warn = jest.fn();
  public static error = jest.fn();
  public static table = jest.fn();
}
