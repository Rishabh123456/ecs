import { salesReport  } from './salesReportAstroLive/salesReport.component';
import { CallHistoryComponent  } from './callHistoryReport/callHistory.component';
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
        path: 'salesReport',
        component: salesReport,
        data: {
          title: 'Sales Report'
        }
      },
      {
        path: 'callHistoryReport',
        component: CallHistoryComponent,
        data: {
          title: 'Call History'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ReportsRoutingModule {}
