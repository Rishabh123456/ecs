import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class AstroLocationService {

  private baseURL = environment.baseBZURI;
  private fetchUsersURL = this.baseURL + '/locationList';
  constructor(private http :Http) { }

  getLocationList(){
    let _getLocationListURL = this.fetchUsersURL;
    //_getscreebListURL = _getscreebListURL + screenStr;
    console.log(_getLocationListURL);
    return this.http.get(_getLocationListURL)
    .map((response:Response) => {
     let data = response.json();
    console.log(data);
      return data;
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));
     
   }
   getStateList(id: number){
    let _getStateListURL = this.fetchUsersURL;
    _getStateListURL = _getStateListURL + '?countryId=' + id; 
    //_getscreebListURL = _getscreebListURL + screenStr;
    console.log(_getStateListURL + " State List");
    return this.http.get(_getStateListURL)
    .map((response:Response) => {
     let data = response.json();
    console.log(data);
      return data;
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));
   }
   
   getCityList(id: number){
    let _getCityListURL = this.fetchUsersURL;
    _getCityListURL = _getCityListURL + '?countryId='+ id + '&stateId=' + id; 
    //_getscreebListURL = _getscreebListURL + screenStr;
    console.log(_getCityListURL);
    return this.http.get(_getCityListURL)
    .map((response:Response) => {
     let data = response.json();
    console.log(data);
      return data;
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));
   }

}
