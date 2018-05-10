/* import { LogService } from 'ng2-log-service'; */
import { environment } from './../../environments/environment';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http,
        private userService: UserService,
       /*  private logService: LogService */) { 
        }

        private baseURL = environment.baseBZURI;
        private loginUrl = this.baseURL + '/adminLogin';

    login(username: string, password: string) {
        
        let authObjectData = {
            username : username,
            password: password,
            //type: 1
        };
       
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.loginUrl, JSON.stringify(authObjectData), options)
            .map((response: Response) => {
               let data = response.json();
               if (data) {
                   if (data.success) {
                       this.userService.saveUser(data.admin);
                       //this.userService.saveInstructionsDisplayStatus("false");
                    } 
               }
               return data;
            }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
            
            
    }

    logoutLocally() {
        //remove user from local storage to log user out
        /* this.logService.info('AuthenticationService: Removing Astro from local storage'); */
        this.userService.clearUser();
        
    }
}