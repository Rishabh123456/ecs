import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class NotificationService {

  private baseURL = environment.baseBZURI;
  //private baseURL = 'https://app.astrolive.online/astrolive';
  //private baseURL = 'http://restdev.rockstand.in/astrolive';
  private fetchUsersURL = this.baseURL + '/getuser';
  constructor(private http :Http) { }

  getUsersList(searchStr: string){
    let _getuserListURL = this.fetchUsersURL;
    _getuserListURL = _getuserListURL + '?search=' + searchStr;
    console.log(_getuserListURL);
    return this.http.get(_getuserListURL)
    .map((response:Response) => {
     let data = response.json();
    console.log(data);
      return data;
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));
     
   }

}
