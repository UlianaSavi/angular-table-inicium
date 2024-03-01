import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { ModalType } from 'src/app/types';

@Component({
  selector: 'app-table-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class TableModalComponent implements OnInit {
  constructor (public tableServise: TableService) {}

  public modalTypes = ModalType;
  public modalType = this.modalTypes.NONE;

  public ngOnInit() {
    this.tableServise.modalType$.subscribe((val) => {
      this.modalType = val;
    });
  }

  public close = () => {
    this.tableServise.closeTableModal();
  }

  public delete = () => {
    this.tableServise.delete();
  }
}
