import { GeneralModel } from '../../models';

export enum ActionType {
  START = '[auth] start',
  SUCCESS = '[auth] success'
}

export const actions = {
  start: (username: string, password: string) => ({ type: ActionType.START, payload: { username, password } }),
  success: (loginResponse: GeneralModel.ILoginResponse) => ({ type: ActionType.SUCCESS, payload: { loginResponse } })
};
