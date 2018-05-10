import { UserService } from './../../services/user.service';
/* import { LogService } from 'ng2-log-service'; */
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AlertService,/*  LogService */]
})
export class LoginComponent implements OnInit {

    public displayMessage: string;
    public username: string = "";
    public password: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        /* private logService: LogService */) {
        /* this.logService.namespace = 'LoginComponent'; */
    }

    ngOnInit() {
        this.displayMessage = this.route.snapshot.params['message'];
        if (this.displayMessage) {
            this.alertService.error(this.displayMessage);
        }
    }

    login(form: NgForm) {

        const _username = form.value.username;
        const _password = form.value.password;

        var admin  = {
            "username": "heena.sheel@handygo.com",
            "role": {
                "name": "SUPERADMIN",
                "actions": [{
                    "name": "LIST_VIEW"
                }, {
                    "name": "ASTRO_ATTENDANCE_VIEW"
                }, {
                    "name": "SALES_REPORT_VIEW"
                }, {
                    "name": "DAILY_UPDATE_VIEW"
                }, {
                    "name": "CREATE_UPDATE"
                }, {
                    "name": "CALL_HISTORY_VIEW"
                }]
            }
        }
        this.userService.saveUser(admin);
        this.router.navigate(['dailyUpdate']);

        // this.authenticationService.login(_username, _password)
        //     .subscribe(
        //     data => {
        //        /*  this.logService.debug('Received login response', data); */
        //         if (data.success) {
        //             this.router.navigate(['dailyUpdate']);
        //         } else {
        //             this.password = "";
        //             this.alertService.errorTimedOut(data.errorMsg, 3000);
        //         }
        //     },
        //     error => {
        //         this.alertService.error('Server Error');
        //         /* this.logService.error(error); */
        //     });
    }
}
