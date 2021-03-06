import { AddServiceIdComponent } from './add-serviceid/add-serviceid.component';
import { ServiceIdComponent } from './serviceid.component';
import { SubscriberService } from './../../services/subscriber.service';
import { ServiceIdRoutingModule } from './serviceid-routing.module';
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

@NgModule({
  imports: [
    CommonModule,
    ServiceIdRoutingModule,
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
    SubscriberService
  ],
  declarations: [ ServiceIdComponent,
  AddServiceIdComponent
],
  
})  
export class ServiceIdModule { }
