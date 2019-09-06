export interface ILoginResponse {
  id: string;
  token: string;
}

export type IEntityMap<T> = { [id: string]: T };
