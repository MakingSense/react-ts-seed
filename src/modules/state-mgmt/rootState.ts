import { IAuthState, authState } from './auth';
import { coreState } from './core';
import { ApiService } from '../services/ApiService';
import { Logger } from '../services/Logger';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  auth: IAuthState;
}

export interface IEpicDependencies {
  apiService: ApiService;
  logger: typeof Logger;
}

export { authState, coreState };
