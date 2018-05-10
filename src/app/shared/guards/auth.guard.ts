/* import { ProfileComponent } from './../../profile/profile.component'; */
import { UserService } from '../../services/user.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    access: boolean = false;

    constructor(private router: Router, private userService: UserService) { }
    /* ngOnInit() {
        localStorage.setItem('lastAction', Date.now().toString());
    } */

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        localStorage.setItem('lastAction', Date.now().toString());

        this.access = false;
        if (route && route.routeConfig.path == 'pages/login') {
            if (this.userService.getUser()) {
                // logged in redirect to ProfileComponent
                this.router.navigate(['/dailyUpdate']/*, { queryParams: { returnUrl: state.url }}*/);
                return false;
            } else {
                return true;
            }
        } else if (route) {
            if (this.userService.getUser()) {
                // logged in so return true
                let user = this.userService.getUser();
                if (route.routeConfig.path == 'reports') {
                    //  console.log(user.role.actions);
                    let allowed: boolean = false;
                    user.role.actions.forEach(element => {
                        if (element.name === 'SALES_REPORT_VIEW') {
                            allowed = true;
                        }
                    });
                    if (!allowed) {
                        this.router.navigate(['/']);
                    } else {
                        return true;
                    }
                }
                else if (route.routeConfig.path == 'reports') {
                    let allowed: boolean = false;
                    user.role.actions.forEach(element => {
                        if (element.name === 'CALL_HISTORY_VIEW') {
                            allowed = true;
                        }
                    });
                    if (!allowed) {
                        this.router.navigate(['/']);
                    } else {
                        return true;
                    }
                }
                else if (route.routeConfig.path == 'astrologers') {
                    let allowed: boolean = false;
                    user.role.actions.forEach(element => {
                        if (element.name === 'ASTRO_ATTENDANCE_VIEW') {
                            allowed = true;
                        }
                    });
                    if (!allowed) {
                        this.router.navigate(['/']);
                    } else {
                        return true;
                    }
                }
                else if (route.routeConfig.path == 'banner') {
                    let allowed: boolean = false;
                    /* let access: boolean = false; */
                    user.role.actions.forEach(element => {
                        if (element.name === 'LIST_VIEW' || element.name === 'CREATE_UPDATE') {
                            allowed = true;
                            if (element.name === 'CREATE_UPDATE') {
                                this.access = true;
                            }
                        }
                    });
                    if (!allowed) {
                        this.router.navigate(['/']);
                    } else {
                        return true;
                    }
                }
                else if (route.routeConfig.path == 'astroApp') {
                    let allowed: boolean = false;
                    /* let access: boolean = false; */
                    user.role.actions.forEach(element => {
                        if (element.name === 'LIST_VIEW' || element.name === 'CREATE_UPDATE') {
                            allowed = true;
                            if (element.name === 'CREATE_UPDATE') {
                                this.access = true;
                            }
                        }
                    });
                    if (!allowed) {
                        this.router.navigate(['/']);
                    } else {
                        return true;
                    }
                }
                else {
                    return true;
                }

            }
            else {
                // not logged in so redirect to login page with the return url
                this.router.navigate(['pages/login']/*, { queryParams: { returnUrl: state.url }}*/);
                return false;

            }
        }
    }
}    