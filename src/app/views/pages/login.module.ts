import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { NgForm } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AlertModule } from './../../alert/alert.module';

import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  imports: [ LoginRoutingModule, FormsModule, AlertModule ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
