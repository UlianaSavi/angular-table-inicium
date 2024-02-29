export interface IData {
  name:	string;
  surname:	string;
  email:	string;
  phone:	string;
}

export type IResponse = {
  users: IData[]
}
export interface IRowsToShow {
  name:	boolean;
  surname:	boolean;
  email:	boolean;
  phone:	boolean;
}

export enum SortTypes {
  DEFAULT = 'default',
  ASC = 'asc',
  DESC = 'desc',
}

export enum ModalType {
  NONE = 'none',
  DELETE = 'delete',
  ADD = 'add',
  EDIT = 'edit',
}
