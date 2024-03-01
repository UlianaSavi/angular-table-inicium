import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IData, ModalType } from 'src/app/types';
import { MIN_INPUT_LEN, RUS_PHONE_REGEXP } from 'src/constants';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-table-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.css']
})
export class ModalAddEditComponent implements OnInit {
  @Input() type: ModalType = ModalType.NONE;
  @Input() itemForEdit: IData | null = null;
  @Input() close!: () => void;
  @Input() add!: (newItem: IData) => void;
  @Input() edit!: (newItem: IData) => void;

  public modalTypes = ModalType;

  public ngOnInit() {
    if (this.type === ModalType.EDIT) {
      this.form.setValue({
        name: this.itemForEdit?.name || '',
        surname: this.itemForEdit?.surname || '',
        email: this.itemForEdit?.email || '',
        phone: this.itemForEdit?.phone || '',
        id: this.itemForEdit?.id || '',
      })
    }
  }

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(MIN_INPUT_LEN)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(MIN_INPUT_LEN)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(RUS_PHONE_REGEXP)]),
    id: new FormControl(this.itemForEdit ? '' : uuidv4(), []),
  });

  public addNewItem = () => {
    this.add(this.form.value as IData);
  }

  public editItem = () => {
    this.edit(this.form.value as IData);
  }
}
