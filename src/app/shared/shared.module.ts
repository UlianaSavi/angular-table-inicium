import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableColumnsSettingsModalComponent } from './table-columns-settings-modal/table-columns-settings-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    TableComponent,
    TableColumnsSettingsModalComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  exports: [
    TableComponent,
    TableColumnsSettingsModalComponent
  ],
})
export class SharedModule { }
