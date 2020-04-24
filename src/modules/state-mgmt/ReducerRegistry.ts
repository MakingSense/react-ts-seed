import { Reducer, ReducersMapObject } from 'redux';

export class ReducerRegistry {
  private static emitChange: any = null;
  private static reducers: { [stateName: string]: Reducer } = { initRedux: () => true };

  public static getReducers(): ReducersMapObject {
    return { ...ReducerRegistry.reducers };
  }

  public static register(stateName: string, reducer: Reducer): void {
    ReducerRegistry.reducers = { ...ReducerRegistry.reducers, [stateName]: reducer };
    if (ReducerRegistry.emitChange) ReducerRegistry.emitChange(ReducerRegistry.getReducers());
  }

  public static setChangeListener(listener: (reducers: ReducersMapObject) => void): void {
    ReducerRegistry.emitChange = listener;
  }
}
