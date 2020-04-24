import { History } from 'history';

import { IState as IAuthState } from './auth/state';
import { IState as ITodoState } from './todo/state';
import { ApiService } from '../services/ApiService';
import { Logger } from '../services/Logger';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  auth: IAuthState;
  todo: ITodoState;
  router?: { location: { pathname: string; search: string; hard: string; key: string }; action: string };
}

export interface IEpicDependencies {
  history: History;
  apiService: ApiService;
  logger: typeof Logger;
}
