import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IData, IRowsToShow, SortTypes } from 'src/app/types';
import { TableSettingsService } from '../../services/table-settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SEARCH_MIN_LEN, START_TABLE_PAGE } from 'src/constants';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor (private apiService: ApiService, private tableSettingsServise: TableSettingsService) {}

  public data$ = new BehaviorSubject<IData[]>([]);
  public initialData: IData[] = [];
  private dataWithoutSort: IData[] = [];
  private dataWithoutFilter: IData[] = [];
  private firstFiltering = true;

  public currSortType = SortTypes.DEFAULT;
  public currSortColumn: string | null = null;
  public sortTypes = SortTypes;

  public shownColumnNames: IRowsToShow | null = null;
  public shownColumnNamesMaxLen = 0;
  public shownColumnNamesLen = 0;

  public pageGoForm: FormGroup = new FormGroup({
    itemsPerPage: new FormControl(START_TABLE_PAGE, [
        Validators.max(this.data$.value?.length || START_TABLE_PAGE),
        Validators.min(START_TABLE_PAGE)
      ]),
  });
  public searchInput = new FormControl('', [Validators.minLength(SEARCH_MIN_LEN)]);
  private searchText$ = new Subject<string>();
  public currPage = START_TABLE_PAGE;
  public isModalSettingsOpen = false;

  public ngOnInit() {
    this.apiService.getData().subscribe((data) => {
      this.data$.next(this.tableSettingsServise.filterByShownConfig(data));
      this.initialData = structuredClone(this.data$.value);
      this.dataWithoutSort = structuredClone(this.data$.value);

      this.data$.subscribe((data) => {
        this.pageGoForm.patchValue({
          itemsPerPage: data?.length || START_TABLE_PAGE,
        });
      });
    });

    this.tableSettingsServise.shownColumns$.subscribe((value) => {
      this.shownColumnNames = value;
      if (this.shownColumnNames) {
        this.shownColumnNamesMaxLen = Object.keys(this.shownColumnNames).length;
        this.shownColumnNamesLen = Object.values(this.shownColumnNames).filter((item: boolean) => item).length;
      }
      if (this.initialData.length) {
        this.data$.next(this.tableSettingsServise.filterByShownConfig(this.initialData));
        this.resetTable();
      }
    });

    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((searchStr) => {
      if (this.firstFiltering) {
        this.dataWithoutFilter = structuredClone(this.data$.value); // save data before filtering
        this.firstFiltering = false;
      }
      if (this.dataWithoutFilter.length) {
        const res = this.tableSettingsServise.filter(this.dataWithoutFilter, searchStr);
        if (res) {
          this.data$.next(res);
        } else {
          this.data$.next(this.dataWithoutFilter); // if nothing found - return initial data without any filtering
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

  public openColumnsSettingsModal() {
    this.isModalSettingsOpen = !this.isModalSettingsOpen;
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
    if (this.data$.value && this.dataWithoutSort.length) {
      if (type === this.sortTypes.DEFAULT) {
        this.data$.next(structuredClone(this.tableSettingsServise.sort(this.dataWithoutSort, name, type)));
        return;
      }
      this.tableSettingsServise.sort(this.data$.value, name, type);
    }
  }

  public search() {
    if (this.searchInput.valid) {
      this.searchText$.next(this.searchInput.value || '');
    }
  }
}
