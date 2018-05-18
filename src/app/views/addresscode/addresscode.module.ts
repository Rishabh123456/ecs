import { AddressCodeService } from './../../services/addresscode.service';
import { AddAddressCodeComponent } from './add-addresscode/add-addresscode.component';
import { AddressCodeComponent } from './addresscode.component';
import { AddressCodeRoutingModule } from './addresscode-routing.module';
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

@NgModule({
  imports: [
    CommonModule,
    AddressCodeRoutingModule,
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
    AddressCodeService
  ],
  declarations: [ AddressCodeComponent,
  AddAddressCodeComponent
],
  
})  
export class AddressCodeModule { }
