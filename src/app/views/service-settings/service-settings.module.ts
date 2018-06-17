import { AlertModule } from './../../alert/alert.module';
import { FormsModule } from '@angular/forms';
import { ServiceSettingsComponent } from './service-settings.component';
import { ServiceSettingsRoutingModule } from './service-settings-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ServiceSettingsRoutingModule,
    FormsModule,
    AlertModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [ ServiceSettingsComponent ],
  
})  
export class ServiceSettingsModule { }
