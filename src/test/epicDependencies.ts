import { IEpicDependencies } from '../modules/state-mgmt/rootState';

import { ApiServiceMock } from './ApiServiceMock';
import { LoggerMock } from './LoggerMock';

export const getDeps = (): IEpicDependencies => ({
  apiService: new ApiServiceMock() as any,
  logger: LoggerMock as any
});
