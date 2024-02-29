import { Injectable } from "@angular/core";
import { IData, IRowsToShow, SortTypes } from "../types";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableSettingsService {
  private shownColumns: IRowsToShow = {
    name:	true,
    surname:	true,
    email:	true,
    phone:	true,
  };
  public shownColumns$ = new BehaviorSubject<IRowsToShow>(this.shownColumns); // if we need to hide some of the colums - change shownColumns

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
