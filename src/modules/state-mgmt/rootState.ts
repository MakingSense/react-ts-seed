import { History } from 'history';

import { IAuthState, authState } from './auth';
import { ITodoState, todoState } from './todo';
import { coreState } from './core';
import { ApiService } from '../services/ApiService';
import { Logger } from '../services/Logger';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  auth: IAuthState;
  todo: ITodoState;
}

export interface IEpicDependencies {
  history: History;
  apiService: ApiService;
  logger: typeof Logger;
}

export { coreState, authState, todoState };
