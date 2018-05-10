import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from './../../services/user.service';
/* import { LogService } from 'ng2-log-service'; */
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent { 
  public user: any;
  subscription: Subscription;


  constructor(
    private userService: UserService,
    private router: Router,
    /* private logService: LogService, */
    ) {
    // subscribe to User Details
   /*  this.logService.namespace = 'AppHeaderComponent'; */
    this.user = this.userService.getUser();
    this.subscription = this.userService.getUserDetailsSubscription().subscribe(admin => { this.user = admin; });
    
   
}
  logOut(){
    this.user = this.userService.clearUser();
    this.router.navigate(['pages/login']);
  }

}
