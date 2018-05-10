import { Routes, RouterModule } from '@angular/router';
import { ReportsRoutingModule } from './reports-routing.module';
import { salesReport} from './salesReportAstroLive/salesReport.component';
import { CouponListingService } from './../../services/couponListing.service';
import { CallHistoryComponent} from './callHistoryReport/callHistory.component';


import { TypeaheadModule } from 'ngx-bootstrap';

import { UserListService } from './../../services/user-list.service';
import { DataTableModule } from './../../components/data-table/index';
import { AstroListingService } from './../../services/astroList.service';
import { SelectModule } from 'ng2-select';

import { PipesModule } from './../../pipes/pipes.module';
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
    DataTableModule,
    SelectModule,
    ReportsRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    PipesModule,
    PaginationModule.forRoot(),
    FormsModule,
    AlertModule
  ],
  providers: [
    CouponListingService,
    UserListService,
    AstroListingService
  ],
  declarations: [ salesReport, CallHistoryComponent ],

 
  
})  
export class ReportsModule {
}
