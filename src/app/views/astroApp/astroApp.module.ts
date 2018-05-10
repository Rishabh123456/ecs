import { BannerComponent } from './banner/banner.component';
import { AstroComponent } from './astrologerList/astroList.component';
import { AstroListingService } from './../../services/astroList.service';

import { panelNotificationComponent } from './panelNotification/panelNotification.component';
import { NotificationService } from './../../services/notification.service';
import { ScreenService } from './../../services/screen.service';
import { NotificationPostService } from './../../services/notificationPost.service';



import { UserListService } from './../../services/user-list.service';
import { AlertModule } from './../../alert/alert.module';
import { DataTableModule } from './../../components/data-table/index';
import { AstroAppRoutingModule } from './astroApp-routing.module';
import { CouponComponent} from './coupon/coupon.component';
import { CouponListingService } from './../../services/couponListing.service';
import { NgModule } from '@angular/core';
import { SelectModule } from 'ng2-select';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule}   from '@angular/forms';
import { PipesModule } from './../../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    AstroAppRoutingModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    AlertModule,
    DataTableModule,
    PipesModule,
    SelectModule
  ],
  providers: [
    UserListService,
    CouponListingService,
    NotificationService,
    ScreenService,
    AstroListingService,
    NotificationPostService
  ],
  declarations: [ CouponComponent, BannerComponent, panelNotificationComponent, AstroComponent ],

 
  
})  
export class AstroAppModule {
}
