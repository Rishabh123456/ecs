import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class AstroLanguageService {

  private baseURL = environment.baseBZURI;
  private fetchUsersURL = this.baseURL + '/languagelist';
  constructor(private http :Http) { }

  getLanguageList(){
    let _getLanguageListURL = this.fetchUsersURL;
    //_getscreebListURL = _getscreebListURL + screenStr;
    console.log(_getLanguageListURL);
    return this.http.get(_getLanguageListURL)
    .map((response:Response) => {
     let data = response.json();
    console.log(data);
      return data;
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));
     
   }

}
