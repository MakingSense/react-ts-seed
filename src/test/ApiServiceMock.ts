import { of } from 'rxjs';

import { getLoginResponse, getTodo_1 } from './entities';

export class ApiServiceMock {
  public login = jest.fn().mockReturnValue(of(getLoginResponse()));
  public getTodoList = jest.fn().mockReturnValue(of([getTodo_1()]));
}
