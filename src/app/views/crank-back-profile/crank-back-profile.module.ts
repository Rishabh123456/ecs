import { CrankBackProfileService } from './../../services/crank-back-profile.service';
import { CrankBackProfileComponent } from './crank-back-profile.component';
import { CrankBackProfileRoutingModule } from './crank-back-profile-routing.module';
import { AddSubscriberComponent } from './add-subscriber/add-subscriber.component';
import { SubscriberService } from './../../services/subscriber.service';
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
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CrankBackProfileRoutingModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    FormsModule,
    AlertModule,
    DataTableModule,
    PipesModule,
    SelectModule
  ],providers: [
    CrankBackProfileService

  ],
  declarations: [ CrankBackProfileComponent,
  AddSubscriberComponent
],
  
})  
export class CrankBackProfileModule { }