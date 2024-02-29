import { Injectable } from "@angular/core";
import { IData, IRowsToShow, ModalType, SortTypes } from "../types";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  // TODO: сделать чтобы последовательность в таблице была как тут у колонок
  private shownColumns: IRowsToShow = {
    name:	true,
    surname:	true,
    email:	true,
    phone:	true,
  };
  public shownColumns$ = new BehaviorSubject<IRowsToShow>(this.shownColumns); // if we need to hide some of the colums - change shownColumns

  public modalType$ = new BehaviorSubject<ModalType>(ModalType.NONE);

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

  public openTableModal(type: ModalType, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.modalType$.next(type);
  }

  public closeTableModal() {
    this.modalType$.next(ModalType.NONE);
  }

  public add(item: IData) {
    console.log(item);
  }

  public edit(item: IData) {
    console.log(item);
  }

  public delete(ids: number[]) {
    console.log(ids);
  }
}
