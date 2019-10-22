import { Observable } from 'rxjs';

export const runEpic = <Action>(obs$: Observable<Action>, callback: (actionList: Action[]) => void, delay: number = 0): Promise<void> =>
  new Promise(resolve => {
    const actionList: Action[] = [];
    obs$.subscribe(action => actionList.push(action));
    setTimeout(() => {
      callback(actionList);
      resolve();
    }, delay);
  });
