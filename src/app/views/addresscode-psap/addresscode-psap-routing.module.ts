import { AddAddressCodePSAPComponent } from './add-addresscode-psap/add-addresscode-psap.component';
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
                {
                  path: '',
                  component: AddAddressCodePSAPComponent,
                  data: {
                    title: '',
                   
                  }
                    
                },
                
              ]
            }, {
              path: ':mappingId',
              
              data: {
                title: 'Edit',
               
                
              },
              children: [
                {
                  path: '',
                  component: AddAddressCodePSAPComponent,
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
export class AddressCodePSAPRoutingModule {}
