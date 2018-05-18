import { AddAddressCodeComponent } from './add-addresscode/add-addresscode.component';
import { AddressCodeComponent } from './addresscode.component';
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
            title: 'Address Code'
          },
          children: [
            {
              path: '',
              component: AddressCodeComponent,
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
                  component: AddAddressCodeComponent,
                  data: {
                    title: '',
                   
                  }
                    
                },
                
              ]
            }, {
              path: ':addressCodeId',
              
              data: {
                title: 'Edit',
               
                
              },
              children: [
                {
                  path: '',
                  component: AddAddressCodeComponent,
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
export class AddressCodeRoutingModule {}
