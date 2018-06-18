import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dailyUpdate',
  //   pathMatch: 'full',
  // },
   {
    path: '',
    redirectTo: 'psap',
    pathMatch: 'full',
  },
  {
    path: 'pages/login',
    loadChildren: './views/pages/login.module#LoginModule',
   // canActivate: [AuthGuard]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      // },
      // {
      //   path: 'components',
      //   loadChildren: './views/components/components.module#ComponentsModule'

      // },
      // {
      //   path: 'icons',
      //   loadChildren: './views/icons/icons.module#IconsModule'
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: './views/widgets/widgets.module#WidgetsModule',
      // },

      // {
      //   path: 'charts',
      //   loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      // },
     
      {
        path: 'dailyUpdate',
        loadChildren: './views/dailyUpdates/dailyUp.module#DailyUpModule'
  //      canActivate: [AuthGuard]
      },
      {
        path: 'addresscode',
        loadChildren: './views/addresscode/addresscode.module#AddressCodeModule'
  //      canActivate: [AuthGuard]
      },
      {
        path: 'psap',
        loadChildren: './views/psap/psap.module#PSAPModule'
  //      canActivate: [AuthGuard]
      },
      {
        path: 'serviceid',
        loadChildren: './views/serviceid/serviceid.module#ServiceIdModule'
  //      canActivate: [AuthGuard]
      },
      {
        path: 'subscriber',
        loadChildren: './views/subscriber/subscriber.module#SubscriberModule'
  //      canActivate: [AuthGuard]
      },
      {
        path: 'operator',
        loadChildren: './views/admin/admin.module#AdminModule'
  //      canActivate: [AuthGuard]
      },
      {
        path: 'servicesettings',
        loadChildren: './views/service-settings/service-settings.module#ServiceSettingsModule'
  //      canActivate: [AuthGuard]
      },
      {
        path: 'testcase',
        loadChildren: './views/testcase/testcase.module#TestCaseModule'
  //      canActivate: [AuthGuard]
      },
      {
        path: 'crankbackprofile',
        loadChildren: './views/crank-back-profile/crank-back-profile.module#CrankBackProfileModule'
  //      canActivate: [AuthGuard]
      },
      {
        path: 'testsubscriber',
        loadChildren: './views/test-subscriber/test-subscriber.module#TestSubscriberModule'
  //      canActivate: [AuthGuard]
      },
      {
        path: 'addresscodepsap',
        loadChildren: './views/addresscode-psap/addresscode-psap.module#AddressCodePSAPModule'
  //      canActivate: [AuthGuard]
      },
      // {
      //   path: 'astroavailabilityreport',
      //   loadChildren: './views/astrologeravailabilityreport/astroavailabilityreport.module#AstroavailabilityreportModule',
      //   canActivate: [AuthGuard]
      // },
      {
        path: 'astroReports',
        loadChildren: './views/consolidatedreport/consolidatedreport.module#ConsolidatedreportModule'
       // canActivate: [AuthGuard]
      },
      // {
      //   path: 'astroforcereport',
      //   loadChildren: './views/astroforcereport/astroforcereport.module#AstroforcereportModule',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'notificationpanel',
      //   loadChildren: './views/panelNotification/panelNotification.module#panelNotificationModule',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'coupon',
      //   loadChildren: './views/coupon/coupon.module#CouponModule',
      //   canActivate: [AuthGuard]
      // },
      {
        path: 'astrologers',
        loadChildren: './views/astrologers/astrologers.module#AstrologerModule'
        //loadChildren: './views/astrologerList/astroList.module#AstroModule',
       // canActivate: [AuthGuard]
      },
      {
        path: 'astroApp',
        loadChildren: './views/astroApp/astroApp.module#AstroAppModule',
        //loadChildren: './views/astrologerList/astroList.module#AstroModule',
      //  canActivate: [AuthGuard]
      },
      // {
      //   path: 'notificationreport',
      //   loadChildren: './views/astronotificationreport/astronotificationreport.module#AstronotificationreportModule',
      // },
      // {
      //   path: 'averagecallreport',
      //   loadChildren: './views/averagecallreport/averagecallreport.module#AveragecallreportModule',
      // },
      // {
      //   path: 'firstcallreport',
      //   loadChildren: './views/firstcallreport/firstcallreport.module#FirstcallreportModule',
      // },
      //  {
      //  path: 'averageTimeReport',
      //    loadChildren: './views/averagecall/averagecall.module#AveragecallModule'
      //  },
      // {
      //   path: 'callHistoryReport',
      //   loadChildren: './views/callHistoryReport/callHistory.module#CallHistoryModule',
      //   canActivate: [AuthGuard]
      // },
      {
        //path: 'salesReport',
        path: 'reports',
        //loadChildren: './views/salesReportAstroLive/salesReport.module#SalesReportModule',
        loadChildren: './views/reports/reports.module#ReportsModule',
        canActivate: [AuthGuard]
      }
      //   ,
      // {
      //   path: 'notifReport',
      //   loadChildren: './views/genericNotificationReport/notifReport.module#NotifReportModule'
      // }

      // {
      //   path: 'categories',
      //   loadChildren: './views/categories/categories.module#CategoriesModule'
      // },
      // {
      //   path: 'packages',
      //   loadChildren: './views/packages/packages.module#PackagesModule'
      // },
      // ,{
      //   path: 'banner',
      //   loadChildren: './views/banner/banner.module#BannerModule',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'astroconsolidatedreport',
      //   loadChildren: './views/astroconsolidatedreport/astroconsolidatedreport.module#AstroconsolidatedreportModule',

      // }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
