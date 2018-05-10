import { AstroavailabilityreportComponent } from './astrologeravailabilityreport/astroavailabilityreport.component';
import { AstroforcereportComponent } from './astroforcereport/astroforcereport.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationExtras } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: 'astroavailabilityreport',
        component: AstroavailabilityreportComponent,
        data: {
          title: 'Astro Availability Report'
        }
      },
      {
        path: 'astroforcereport',
        component: AstroforcereportComponent,
        data: {
          title: 'Astro Force Report'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AstrologersRoutingModule {



}
