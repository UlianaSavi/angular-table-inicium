import { Injectable } from "@angular/core";
import { IData, IRowsToShow, SortTypes } from "../types";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableSettingsService {
  private shownColumns: IRowsToShow = {
    isActive: true,
    balance: true,
    picture: true,
    age: true,
    name: true,
    company: true,
    email: true,
    address: true,
    tags: true,
    favoriteFruit: true,
  };
  public shownColumns$ = new BehaviorSubject<IRowsToShow>(this.shownColumns);

  public setShownColumns(newShownColumnsArr: IRowsToShow) {
    this.shownColumns$.next(newShownColumnsArr);
  }

  public filterByShownConfig(data: IData[]): IData[] {
    const dataDeepCopy = structuredClone(data);
    const showNamesArr: string[] = [];
    for (const [key, value] of Object.entries(this.shownColumns$.value)) {
      if (value) {
        showNamesArr.push(key);
      }
    }

    dataDeepCopy.map((item) => {
      for (const [key] of Object.entries(item)) {
        if (!showNamesArr.includes(key)) {
          delete item[key as keyof IData];
        }
      }
    })
    return dataDeepCopy;
  }

  public sort(data: IData[], field: string, type: SortTypes): IData[] {
    if (type === SortTypes.DEFAULT) {
      return data;
    }
    const i = field as keyof IData;
    if(type === SortTypes.DESC) {
      data.sort((a, b) => (a[i] > b[i] ? -1 : 1))
    } else {
      data.sort((a, b) => (a[i] < b[i] ? -1 : 1))
    }
    return data;
  }

  public filter(data: IData[], searchStr: string): IData[] | null {
    if (!searchStr.length) {
      return null;
    }
    const res = data.filter((item) => {
      const test = Object.keys(item).reduce((acc, curr)=>{
            return acc || String(item[curr as keyof IData]).toLowerCase().includes(searchStr.toLowerCase());
      }, false);
      return test;
    });
    return res;
  }
}
