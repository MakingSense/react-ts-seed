export enum ActionType {
  EPIC_ERROR = '[core] epic error'
}

export const actions = {
  epicError: (error: any) => ({ type: ActionType.EPIC_ERROR, payload: { error } })
};
