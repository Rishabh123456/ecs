import { PipesModule } from './../../pipes/pipes.module';
import { DaywisereportComponent } from './daywisereport/daywisereport.component';
import { DaywisesessionreportComponent } from './astroconsolidatedreport/daywisesessionreport/daywisesessionreport.component';
import { AstrowisereportComponent } from './astroconsolidatedreport/astrowisereport.component';
import { MonthlydayreportComponent } from './astroconsolidatedreport/monthlydayreport/monthlydayreport.component';
import { ConsolidatedreportRoutingModule } from './consolidatedreport-routing.module';
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
    ConsolidatedreportRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PipesModule,
    PaginationModule.forRoot(),
    FormsModule,
    AlertModule
  ],
  declarations: [ AstrowisereportComponent, 
    MonthlydayreportComponent,DaywisesessionreportComponent,  DaywisereportComponent ],

 
  
})  
export class ConsolidatedreportModule {
  

  

 }
