import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {
  @Input() close!: () => void;
  @Input() delete!: () => void;
  @Input() deleteNum = 0;
}
