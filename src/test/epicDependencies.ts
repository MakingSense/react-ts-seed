import { IEpicDependencies } from '../modules/state-mgmt/rootState';

import { ApiServiceMock } from './ApiServiceMock';
import { LoggerMock } from './LoggerMock';

export const getDeps = (): IEpicDependencies => ({
  history: { push: jest.fn() } as any,
  apiService: new ApiServiceMock() as any,
  logger: LoggerMock as any
});
