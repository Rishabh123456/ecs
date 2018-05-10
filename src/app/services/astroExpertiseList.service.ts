import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class AstroExpertiseService {

  private baseURL = environment.baseBZURI;
  private fetchUsersURL = this.baseURL + '/videoChat/categoryList';
  constructor(private http :Http) { }

  getExpertiseList(){
    let _getExpertiseListURL = this.fetchUsersURL;
    //_getscreebListURL = _getscreebListURL + screenStr;
    console.log(_getExpertiseListURL);
    return this.http.get(_getExpertiseListURL)
    .map((response:Response) => {
     let data = response.json();
    console.log(data);
      return data;
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));
     
   }

}
