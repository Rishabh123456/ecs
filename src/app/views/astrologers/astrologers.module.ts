import { UserListService } from './../../services/user-list.service';
import { DataTableModule } from './../../components/data-table/index';
import { AstroavailabilityreportComponent } from './astrologeravailabilityreport/astroavailabilityreport.component';
import { AstroforcereportComponent } from './astroforcereport/astroforcereport.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SelectModule } from 'ng2-select';

import { PipesModule } from './../../pipes/pipes.module';
import { AstrologersRoutingModule } from './astrologers-routing.module';
import { AlertModule } from './../../alert/alert.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule}   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TimepickerModule.forRoot(),
    DataTableModule,
    SelectModule,
    CommonModule,
    AstrologersRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PipesModule,
    PaginationModule.forRoot(),
    FormsModule,
    AlertModule
  ],
  providers: [
    UserListService,
  ],
  declarations: [ AstroavailabilityreportComponent, AstroforcereportComponent ],

 
  
})  
export class AstrologerModule {
}
