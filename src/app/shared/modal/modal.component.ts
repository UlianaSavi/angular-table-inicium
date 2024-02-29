import { Component, Input } from '@angular/core';
import { ModalType } from 'src/app/types';

@Component({
  selector: 'app-table-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class TableModalComponent {
  @Input() type: ModalType = ModalType.NONE;

  public modalTypes = ModalType;

  private close() {
    console.log('close');
  }
}
