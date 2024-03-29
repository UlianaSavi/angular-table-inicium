import { Component, OnInit } from '@angular/core';
import { IRowsToShow, ModalType, SortTypes } from 'src/app/types';
import { TableService } from '../../services/table.service';
import { FormControl, Validators } from '@angular/forms';
import { SEARCH_MIN_LEN } from 'src/constants';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { validate as isValidUUID } from 'uuid';
import { setWithoutSort } from 'src/utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  constructor (public tableServise: TableService) {}

  public currSortType = SortTypes.DEFAULT;
  public currSortColumn: string | null = null;
  public sortTypes = SortTypes;

  public validate = isValidUUID;
  public setWithoutSort = setWithoutSort;

  public shownColumnNames: IRowsToShow | null = null;
  public shownColumnNamesMaxLen = 0;
  public shownColumnNamesLen = 0;

  public modalTypes = ModalType;

  public searchInput = new FormControl('', [Validators.minLength(SEARCH_MIN_LEN)]);
  private searchText$ = new Subject<string>();

  private firstFiltering = true;

  public ngOnInit() {
    this.tableServise.getData();

    this.tableServise.shownColumns$.subscribe((value) => {
      this.shownColumnNames = value;
      if (this.shownColumnNames) {
        this.shownColumnNamesMaxLen = Object.keys(this.shownColumnNames).length;
        this.shownColumnNamesLen = Object.values(this.shownColumnNames).filter((item: boolean) => item).length;
      }
      if (this.tableServise.initialData.length) {
        this.tableServise.data$.next(this.tableServise.initialData);
        this.resetTable();
      }
    });

    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((searchStr) => {
      if (this.firstFiltering) {
        this.tableServise.dataWithoutFilter = structuredClone(this.tableServise.data$.value); // save data before filtering
        this.firstFiltering = false;
      }
      if (this.tableServise.dataWithoutFilter.length) {
        const res = this.tableServise.filter(this.tableServise.dataWithoutFilter, searchStr); // filtering
        if (res) {
          this.tableServise.data$.next(res);
        } else {
          this.tableServise.data$.next(this.tableServise.dataWithoutFilter); // if nothing found - return initial data without any filtering
        }
      }
    });
  }

  private resetTable() {
    this.firstFiltering = true;
    this.currSortType = this.sortTypes.DEFAULT;
    this.searchInput.setValue('');
    this.searchText$.next('');
  }

  public sort(name: string) {
    this.currSortColumn = name;
    let type = this.currSortType;
    switch (this.currSortType) {
      case this.sortTypes.DEFAULT:
        type = this.sortTypes.ASC
        break;
      case this.sortTypes.ASC:
        type = this.sortTypes.DESC
        break;
      case this.sortTypes.DESC:
        type = this.sortTypes.DEFAULT
        break;
    }
    this.currSortType = type;
    if (this.tableServise.data$.value && this.tableServise.dataWithoutSort.length) {
      if (type === this.sortTypes.DEFAULT) {
        this.tableServise.data$.next(structuredClone(this.tableServise.sort(this.tableServise.dataWithoutSort, name, type)));
        return;
      }
      this.tableServise.sort(this.tableServise.data$.value, name, type);
    }
  }

  public search() {
    if (this.searchInput.valid) {
      this.searchText$.next(this.searchInput.value || '');
    }
  }

  public select(i: string) {
    this.tableServise.select(i);
  }

  public openModal(type: ModalType, event?: Event, itemForEditId?: string) {
    if (type === ModalType.EDIT) {
      this.tableServise.openTableModal(type, event, itemForEditId)
    }
    this.tableServise.openTableModal(type, event)
  }
}
