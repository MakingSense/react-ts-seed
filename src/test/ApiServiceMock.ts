import { of } from 'rxjs';

import { getLoginResponse } from './entities';

export class ApiServiceMock {
  public login = jest.fn().mockReturnValue(of(getLoginResponse()));
}
