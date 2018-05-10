/* import { UserPresence } from './../models/presence.model'; */
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router'
import { Injectable } from "@angular/core";

/* import { AstroDetails } from './../models/astro-details.model'; */

const MINUTES_UNITL_AUTO_LOGOUT = 4 // in hrs
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY = 'lastAction';

@Injectable()
export class UserService {
    constructor(private router: Router) {
        console.log('object created');
        // this.auth = authService;
        this.check();
        this.initListener();
        this.initInterval();
        // localStorage.setItem(STORE_KEY,Date.now().toString());
    }


    private subject = new Subject<any>();
    /* private presenceSubject = new Subject<UserPresence>(); */

    getLastAction() {
        return JSON.parse(localStorage.getItem(STORE_KEY));
    }

    setLastAction(lastAction: number) {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    }

    saveUser(admin: any): void {
        localStorage.setItem('currentUserAdmin', JSON.stringify(admin));
        this.subject.next(admin);
    }


    initListener() {
        document.body.addEventListener('click', () => this.reset());
        document.body.addEventListener('mouseover', () => this.reset());
        document.body.addEventListener('mouseout', () => this.reset());
        document.body.addEventListener('keydown', () => this.reset());
        document.body.addEventListener('keyup', () => this.reset());
        document.body.addEventListener('keypress', () => this.reset());
    }
    

    reset() {
        this.setLastAction(Date.now());
    }

    initInterval() {
        setInterval(() => {
            this.check();
        }, CHECK_INTERVAL);
    }
        
    check() {
        const now = Date.now();
        const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60  * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;

        if (isTimeout) {
            localStorage.clear();
            this.router.navigate(['/pages/login']);
        }
    }


    // getToken() {
    //     return sessionStorage.getItem('currentUserToken');
    // }

    clearUser(): void {
        localStorage.removeItem('currentUserAdmin');

    }

    getUser(): any {
        return JSON.parse(localStorage.getItem('currentUserAdmin'));
    }

    /* saveUserDetails(details: AstroDetails) {
        sessionStorage.setItem('currentUserDetails', JSON.stringify(details));
        this.subject.next(details);
    } 

    getUserDetails(): AstroDetails {
        return JSON.parse(sessionStorage.getItem('currentUserDetails'));

    }

    getPresenceStatus(): UserPresence {
        if (sessionStorage.getItem('presenceStatusCombined')) {
            return JSON.parse(sessionStorage.getItem('presenceStatusCombined'));
        } else {
            return null;
        }
        
    } */

    /*  saveUserPresenceStatus(status: string): void {
 
        let presence:UserPresence =  JSON.parse(sessionStorage.getItem('presenceStatusCombined'));
        if (!presence) {
            presence = new UserPresence();
        }
        presence.userStatus = status;
        sessionStorage.setItem('presenceStatusCombined', JSON.stringify(presence));
        this.presenceSubject.next(presence);
     } */

    /* saveSocketPresenceStatus(status: string): void {
       let presence:UserPresence =  JSON.parse(sessionStorage.getItem('presenceStatusCombined'));
       if (!presence) {
           presence = new UserPresence();
       }
       presence.socketStatus = status;
       sessionStorage.setItem('presenceStatusCombined', JSON.stringify(presence));
       this.presenceSubject.next(presence);
    } 

    getInstructionsDisplayStatus(): string {
        return sessionStorage.getItem('instructionsDisplayStatus');
    }

    saveInstructionsDisplayStatus(status: string): void {
        sessionStorage.setItem('instructionsDisplayStatus', status);
    } */

    getUserDetailsSubscription(): Observable<any> {
        return this.subject.asObservable();

    }

    /* getPresenceDetailsSubscription(): Observable<UserPresence> {
         return this.presenceSubject.asObservable();
 
     } */

}