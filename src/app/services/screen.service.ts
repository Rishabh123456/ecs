import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class ScreenService {

  private baseURL = environment.baseBZURI;
  private fetchUsersURL = this.baseURL + '/fcmscreenlist';
  constructor(private http :Http) { }

  getScreenList(){
    let _getscreenListURL = this.fetchUsersURL;
    //_getscreebListURL = _getscreebListURL + screenStr;
    console.log(_getscreenListURL);
    return this.http.get(_getscreenListURL)
    .map((response:Response) => {
     let data = response.json();
    console.log(data);
      return data;
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));
     
   }

}
