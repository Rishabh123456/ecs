import { CouponComponent } from './coupon/coupon.component';
import { BannerComponent } from './banner/banner.component';
import { AstroComponent } from './astrologerList/astroList.component';

import { panelNotificationComponent } from './panelNotification/panelNotification.component';

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
        path: 'astrologerlist',
        component: AstroComponent,
        data: {
          title: 'Astrologer List'
        }
      },
      {
        path: 'coupon',
        component: CouponComponent, 
        data: {
          title: 'Coupon'
        }
      },
      {
        path: 'banner',
        component: BannerComponent,
        data: {
          title: 'Banner'
        }
      },
      {
        path: 'notificationpanel',
        component: panelNotificationComponent,
        data: {
          title: 'Notification Panel'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AstroAppRoutingModule {}
