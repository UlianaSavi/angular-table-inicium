import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModalComponent } from './modal/modal.component';
import { ModalDeleteComponent } from './modal/modal-delete/modal-delete.component';
import { ModalAddEditComponent } from './modal/modal-add-edit/modal-add-edit.component';



@NgModule({
  declarations: [
    TableComponent,
    TableModalComponent,
    ModalDeleteComponent,
    ModalAddEditComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    TableComponent,
  ],
})
export class SharedModule { }
