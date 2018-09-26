import { Logger } from './Logger';

describe('Logger', () => {
  beforeEach(() => {
    (Logger as any).shouldLog = true;
    (Logger as any).printer = { log: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn(), table: jest.fn() };
  });

  it('should log with all logging methods', () => {
    const data = 'well hello..';
    Logger.log(data);
    expect((Logger as any).printer.log).toHaveBeenCalledWith(data);
    Logger.info(data);
    expect((Logger as any).printer.info).toHaveBeenCalledWith(data);
    Logger.warn(data);
    expect((Logger as any).printer.warn).toHaveBeenCalledWith(data);
    Logger.error(data);
    expect((Logger as any).printer.warn).toHaveBeenCalledWith(data);
    Logger.table(data);
    expect((Logger as any).printer.table).toHaveBeenCalledWith(data);
  });

  afterAll(() => {
    (Logger as any).shouldLog = false;
  });
});
