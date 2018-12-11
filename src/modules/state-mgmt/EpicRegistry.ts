import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class EpicRegistry {
  private static epic$ = new Subject();
  public static rootEpic: any = (...args) => EpicRegistry.epic$.pipe(mergeMap((epic: any) => epic(...args)));

  public static addEpic(epic) {
    EpicRegistry.epic$.next(epic);
  }
}
