import { Component, Input } from '@angular/core';
import { ModalType } from 'src/app/types';

@Component({
  selector: 'app-table-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.css']
})
export class ModalAddEditComponent {
  @Input() type: ModalType = ModalType.NONE;

  public modalTypes = ModalType;
}
