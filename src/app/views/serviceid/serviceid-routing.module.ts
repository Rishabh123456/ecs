import { ServiceIdComponent } from './serviceid.component';
import { AddServiceIdComponent } from './add-serviceid/add-serviceid.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
          path: '',
          data: {
            title: 'Location Info'
          },
          children: [
            {
              path: '',
              component: ServiceIdComponent,
              data: {
                title: ''
              }
            },
            {
              path: 'add',
              
              data: {
                title: 'Add',
               
                
              },
              children: [
                {
                  path: '',
                  component: AddServiceIdComponent,
                  data: {
                    title: '',
                   
                  }
                    
                },
                
              ]
            }, {
              path: ':serviceId',
              
              data: {
                title: 'Edit',
               
                
              },
              children: [
                {
                  path: '',
                  component: AddServiceIdComponent,
                  data: {
                    title: '',
                   
                  }
                    
                },
                
              ]
            }
          ]
        }
      ]
  }
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceIdRoutingModule {}
