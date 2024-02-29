import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TableSettingsService } from 'src/app/services/table-settings.service';
import { IRowsToShow } from 'src/app/types';

@Component({
  selector: 'app-table-columns-settings-modal',
  templateUrl: './table-columns-settings-modal.component.html',
  styleUrls: ['./table-columns-settings-modal.component.css']
})
export class TableColumnsSettingsModalComponent implements OnInit {
  constructor (private tableSettingsServise: TableSettingsService, private formBuilder: FormBuilder) {}

  public shownColumnNames: IRowsToShow | null = null;

  public namesForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.tableSettingsServise.shownColumns$.subscribe((value) => {
      this.shownColumnNames = value;
    });
    if (this.shownColumnNames) {
      for (const [key, value] of Object.entries(this.shownColumnNames)) {
        if (key) {
          this.namesForm.addControl(key, new FormControl(value, []));
        }
      }
    }
  }

  public updateNamesList(name: string, e: Event) {
    const value = (e.target as HTMLInputElement).checked;
    this.namesForm.controls[name].setValue(value);
    const newShownColumnsArr = this.namesForm.value;
    this.tableSettingsServise.setShownColumns(newShownColumnsArr);
  }
}
