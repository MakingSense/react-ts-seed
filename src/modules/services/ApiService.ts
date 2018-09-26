import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, retry } from 'rxjs/operators';

import { ENV } from '../../constants';
import { GeneralModel, TodoModel } from '../models';

export class ApiService {
  private http = ajax;
  private apiUrl: string = ENV.API.URL;
  private maxRetries: number = ENV.API.MAX_RETRIES;

  public login(body: { username: string; password: string }): Observable<GeneralModel.ILoginResponse> {
    // return this.request<GeneralModel.ILoginResponse>(`${ENV.API.ENTITY.AUTH}/login`, { method: 'POST', body });
    return of({ id: 'fake-id', token: 'fake-token' });
  }

  public getTodoList(): Observable<TodoModel.ITodo[]> {
    return of([
      { id: '1', name: 'first', description: 'first todo on the list' },
      { id: '2', name: 'second', description: 'second todo on the list' },
      { id: '3', name: 'third', description: 'third todo on the list' }
    ]);
  }

  public request<T = any>(path: string, options: { method: string; body?: any; headers?: { [key: string]: any } } = { method: 'GET' }): Observable<T> {
    options.headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    if (options.body) options.body = this.parseBody(options.body);
    return this.http({ url: `${this.apiUrl}/${path}`, ...options }).pipe(
      map(data => data.response as T),
      retry(this.maxRetries)
    );
  }

  private parseBody(body: { [key: string]: any }): string {
    try {
      return JSON.stringify(body);
    } catch {
      /* istanbul ignore next line */
      return '';
    }
  }
}
