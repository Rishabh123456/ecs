import { AddressCodePSAPComponent } from './addresscode-psap.component';
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
            title: 'Serving PSAP'
          },
          children: [
            {
              path: '',
              component: AddressCodePSAPComponent,
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
                // {
                //   path: '',
                //   component: AddPSAPComponent,
                //   data: {
                //     title: '',
                   
                //   }
                    
                // },
                
              ]
            }, {
              path: ':psapId',
              
              data: {
                title: 'Edit',
               
                
              },
              children: [
                // {
                //   path: '',
                //   component: AddPSAPComponent,
                //   data: {
                //     title: '',
                   
                //   }
                    
                // },
                
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
export class AddressCodePSAPRoutingModule {}
