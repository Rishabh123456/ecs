import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { NgForm } from '@angular/forms';
import { P404Component } from './404.component';
import { P500Component } from './500.component';
/* import { LoginComponent } from './login.component'; */
import { RegisterComponent } from './register.component';
import { AlertModule } from './../../alert/alert.module';

import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  imports: [ PagesRoutingModule, FormsModule, AlertModule ],
  declarations: [
    /* LoginComponent, */
    P404Component,
    P500Component,
    RegisterComponent
  ]
})
export class PagesModule { }
