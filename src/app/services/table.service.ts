import { Injectable } from "@angular/core";
import { IData, IRowsToShow, ModalType, SortTypes } from "../types";
import { BehaviorSubject } from "rxjs";
import { ApiService } from "./api.service";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor (private apiService: ApiService) {}

  public data$ = new BehaviorSubject<IData[]>([]);
  public initialData: IData[] = [];
  public dataWithoutSort: IData[] = [];
  public dataWithoutFilter: IData[] = [];
  public selectedRows: string[] = [];

  // TODO: сделать чтобы последовательность в таблице была как тут у колонок
  private shownColumns: IRowsToShow = {
    name:	true,
    surname:	true,
    email:	true,
    phone:	true,
  };
  public shownColumns$ = new BehaviorSubject<IRowsToShow>(this.shownColumns); // if we need to hide some of the colums - change shownColumns

  public modalType$ = new BehaviorSubject<ModalType>(ModalType.NONE);
  public itemForEdit$ = new BehaviorSubject<IData | null>(null);

  public getData() {
    const dataFromLocalStorage: IData[] | null = JSON.parse(localStorage.getItem('data') || 'null') || null;
    console.log(dataFromLocalStorage);
    if (dataFromLocalStorage) {
      this.data$.next(dataFromLocalStorage);
      this.initialData = structuredClone(dataFromLocalStorage);
      this.dataWithoutSort = structuredClone(dataFromLocalStorage);
      return;
    }
    this.apiService.getData().subscribe((data) => {
      data.users.forEach((item) => {
        item.id = uuidv4()
      }); // add ids for every item
      this.data$.next(data.users);
      this.initialData = structuredClone(this.data$.value);
      this.dataWithoutSort = structuredClone(this.data$.value);
      localStorage.setItem('data', JSON.stringify(this.data$.value));
    });
  }

  public select(i: string) {
    if(this.selectedRows.includes(i)) {
      this.selectedRows = this.selectedRows.filter((item) => item !== i);
      return;
    }
    this.selectedRows.push(i);
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

  public openTableModal(type: ModalType, event?: Event, itemForEditId?: string) {
    if (event) {
      event.preventDefault();
    }
    if (itemForEditId) {
      this.itemForEdit$.next(this.data$.value.find((item) => item.id === itemForEditId) || null);
    }
    this.modalType$.next(type);
  }

  public closeTableModal() {
    this.modalType$.next(ModalType.NONE);
  }

  public add(item: IData) {
    console.log('add', item);
    this.data$.next(this.data$.getValue().concat(item));
    localStorage.setItem('data', JSON.stringify(this.data$.value));
    this.closeTableModal();
    this.updateDataArrays();
  }

  public edit(item: IData) {
    const arr = this.data$.value.filter((itemInArr) => itemInArr.id !== item.id);
    arr.push(item);
    this.data$.next(arr);
    localStorage.setItem('data', JSON.stringify(this.data$.value));
    this.closeTableModal();
    this.updateDataArrays();
  }

  public delete() {
    const dataCopy: IData[] = structuredClone(this.data$.value);
    this.selectedRows.forEach((id: string) => {
      const candidateIdx = dataCopy.findIndex((item) => {
        return item.id === id;
      });
      dataCopy.splice(candidateIdx, 1);
    });
    this.data$.next(dataCopy);
    localStorage.setItem('data', JSON.stringify(this.data$.value));
    this.selectedRows = [];
    this.closeTableModal();
    this.updateDataArrays();
  }

  private updateDataArrays() {
    this.initialData = structuredClone(this.data$.value);
    this.dataWithoutSort = structuredClone(this.data$.value);
    this.dataWithoutFilter = structuredClone(this.data$.value);
  }
}
