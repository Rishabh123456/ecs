import { ServiceSettingsComponent } from './service-settings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ServiceSettingsComponent,
    data: {
      title: 'Service Settings'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceSettingsRoutingModule {}
