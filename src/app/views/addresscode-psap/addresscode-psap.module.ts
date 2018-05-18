import { AddressCodeService } from './../../services/addresscode.service';
import { PSAPMappingService } from './../../services/psap-mapping.service';
import { AddressCodePSAPComponent } from './addresscode-psap.component';
import { AddressCodePSAPRoutingModule } from './addresscode-psap-routing.module';
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
import { BsDatepickerModule, TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AddressCodePSAPRoutingModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    AlertModule,
    DataTableModule,
    PipesModule,
    SelectModule
  ],providers: [
    PSAPMappingService, AddressCodeService
  ],
  declarations: [ AddressCodePSAPComponent
],
  
})  
export class AddressCodePSAPModule { }
