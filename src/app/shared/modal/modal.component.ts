import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { IData, ModalType } from 'src/app/types';

@Component({
  selector: 'app-table-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class TableModalComponent implements OnInit {
  constructor (public tableServise: TableService) {}

  public modalTypes = ModalType;
  public modalType = this.modalTypes.NONE;
  public itemForEdit: IData | null = null;

  public ngOnInit() {
    this.tableServise.modalType$.subscribe((val) => {
      this.modalType = val;
    });
    this.tableServise.itemForEdit$.subscribe((val) => {
      this.itemForEdit = val;
    });
  }

  public close = () => {
    this.tableServise.closeTableModal();
  }

  public delete = () => {
    this.tableServise.delete();
  }

  public add = (newItem: IData) => {
    this.tableServise.add(newItem);
  }

  public edit = (newItem: IData) => {
    this.tableServise.edit(newItem);
  }
}
