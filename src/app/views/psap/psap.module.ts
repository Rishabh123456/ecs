import { PSAPService } from './../../services/psap.service';
import { SelectModule } from 'ng2-select';
import { PipesModule } from './../../pipes/pipes.module';
import { DataTableModule } from './../../components/data-table/index';
import { AlertModule } from './../../alert/alert.module';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { PSAPRoutingModule } from './psap-routing.module';
import { PSAPComponent } from './psap.component';

@NgModule({
  imports: [
    CommonModule,
    PSAPRoutingModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    AlertModule,
    DataTableModule,
    PipesModule,
    SelectModule
  ],providers: [
    PSAPService
  ],
  declarations: [ PSAPComponent ],
  
})  
export class PSAPModule { }
