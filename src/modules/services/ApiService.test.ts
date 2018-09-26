import { Observable, of } from 'rxjs';

import { ApiService } from './ApiService';

describe('ApiService', () => {
  let apiService: ApiService;
  beforeEach(() => {
    apiService = new ApiService();
    (apiService as any).http = jest.fn().mockReturnValue(of({ response: null }));
  });

  it('should make a request', done => {
    const req = (apiService as any).request('url');
    expect(req instanceof Observable).toBe(true);
    req.subscribe(res => {
      expect(res).toBe(null);
      done();
    });
  });

  it('should parse a body', () => {
    const body = { a: 1 };
    const parsed = (apiService as any).parseBody(body);
    expect(parsed).toEqual(JSON.stringify({ a: 1 }));
  });

  it('should login', () => {
    const username = 'username';
    const password = 'password';
    const res = apiService.login({ username, password });
    expect(res instanceof Observable).toBe(true);
  });
});
