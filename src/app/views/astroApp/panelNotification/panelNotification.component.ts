import { SearchUser } from './../../../shared/model/search-user.model';
import { LandingScreen } from './../../../shared/model/screen.model';
import { AstroforcelogoutService } from './../../../services/astroforcelogout.service';
import { AlertService } from './../../../services/alert.service';
import { NotificationService } from './../../../services/notification.service';
import { NotificationPostService } from './../../../services/notificationPost.service';

import { ScreenService } from './../../../services/screen.service';
import { NgForm } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  templateUrl: 'panelNotification.component.html',
  styleUrls: ['../coupon/coupon.component.css'],
})
export class panelNotificationComponent implements OnInit {
  public allUsers: boolean = false;
  public chosenUserId: number[] = [];
  public title: string = '';
  public body: string = '';
  public saveNotification: boolean = false;
  
  public userInput: string = '';
  astroId: string = '';
  loading: boolean = false;

  allScreen: LandingScreen[] = [];
  dummyScreen: LandingScreen[] = [];
  availableItems: SearchUser[] = [];
  selectedItems: SearchUser[] = [];

  filteredUsers: SearchUser[] = [];
  selectedScreen: LandingScreen;

  transformDate(date, format) {
    return this.datePipe.transform(date, format);
  }
  constructor(private astroforcelogoutService: AstroforcelogoutService,
    private datePipe: DatePipe, private alertService: AlertService,
    private allUserList: NotificationService,
    private screenList: ScreenService,
    private notificationPost: NotificationPostService
  ) {
  }
  ngOnInit() {
    this.selectedScreen = null;
    this.getScreen();
  }

  getUserList(searchStr: string) {
    if (searchStr.length > 3) {
      this.getList(searchStr);
    }
    else {
      this.filteredUsers = [];
      this.selectedItems = [];
    }
  }


  onAddToList() {
    this.selectedItems.forEach(item => {
      var found = false;
      for (var i = 0; i < this.availableItems.length; i++) {
        if (this.availableItems[i].id == item.id) {
          found = true;
          /* alert("Already Added"); */
          break;
        }
      }
      if (!found) {
        this.availableItems.push(item);
        item.selected = true;
      }
    })
    console.log(this.selectedItems);
  }


  removeItem(index) {
    let item = this.availableItems[index];
    console.log(this.availableItems.length);
    for (var i = 0; i < this.filteredUsers.length; i++) {
      if (this.filteredUsers[i].id == item.id) {
        this.filteredUsers[i].selected = false;
        break;
      }
    }
    this.availableItems.splice(index, 1);
  }

  getList(searchStr: string) {
    console.log('User List');
    this.loading = true;
    this.allUserList.getUsersList(searchStr).subscribe(
      data => {
        console.log('data loaded');
        this.loading = false;
        this.filteredUsers = data.userslist;
        for (var i = 0; i < this.filteredUsers.length; i++) {
          for (var j = 0; j < this.availableItems.length; j++) {
            if (this.filteredUsers[i].id == this.availableItems[j].id) {
              this.filteredUsers[i].selected = true;
              break;
            }
          }
        }
      }
    )
  }




  getScreen() {
    console.log('Screen');
    this.loading = true;
    this.screenList.getScreenList().subscribe(
      data => {
        console.log('data loaded');
        this.loading = false;
        this.allScreen = data.fcmscreenlist;
        console.log(this.allScreen[0]);
      }
    )

  }

  printScreen(screen: LandingScreen) {
    if (screen)
      console.log(screen);
  }

  onSubmit() {
    if (!this.validate()) return;
  }

  validate() {
  }

  onNotificationSubmit(form: NgForm) {
    
    if (this.availableItems.length == 0 && this.allUsers == false) {
      this.alertService.errorTimedOut("Please select atleast one User", 3000);
      return false;
    }
    let chosenUserId: number[] = [];
    this.availableItems.forEach(item => {
      chosenUserId.push(item.id);
    });

    let data = {
      allUsers: this.allUsers,
      userIds: chosenUserId,
      screenId: this.selectedScreen.fcmName,
      title: this.title,
      body: this.body,
      saveNotification: this.saveNotification,
      data: {
        packageId: this.astroId
      },
    }
    this.notificationPost.createNotification(data).subscribe(
      data => {
        this.loading = true;
        if (data.success) {
          this.alertService.successTimedOut("Notification Sent", 3000);
        } else {
          this.alertService.errorTimedOut(data.message, 3000);
        }
        this.loading = false;
      },
    )



  }


}
