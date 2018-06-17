import { TestSubscriberComponent } from './test-subscriber.component';
import { AddSubscriberComponent } from './add-subscriber/add-subscriber.component';
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
            title: 'Test Subscribers'
          },
          children: [
            {
              path: '',
              component: TestSubscriberComponent,
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
                  component: AddSubscriberComponent,
                  data: {
                    title: '',
                   
                  }
                    
                },
                
              ]
            }, {
              path: ':subscriberId',
              
              data: {
                title: 'Edit',
               
                
              },
              children: [
                {
                  path: '',
                  component: AddSubscriberComponent,
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
export class TestSubscriberRoutingModule {}
