export interface IData {
    _id: string,
    isActive: boolean,
    balance: string,
    picture: string,
    age: number,
    name: {
        first: string,
        last: string
    },
    company: string,
    email: string,
    address: string,
    tags: string[],
    favoriteFruit: string
}
export interface IRowsToShow {
    isActive: boolean,
    balance: boolean,
    picture: boolean,
    age: boolean,
    name: boolean,
    company: boolean,
    email: boolean,
    address: boolean,
    tags: boolean,
    favoriteFruit: boolean
}

export enum SortTypes {
  DEFAULT = 'default',
  ASC = 'asc',
  DESC = 'desc',
}
