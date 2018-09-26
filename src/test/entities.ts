import { GeneralModel, TodoModel } from '../modules/models';

export const getLoginResponse = (): GeneralModel.ILoginResponse => ({
  token: '1234',
  id: '5647'
});

export const getTodo_1 = (): TodoModel.ITodo => ({
  id: '1',
  name: 'some todo',
  description: 'some desc'
});
