import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class CouponService {

  private baseURL = environment.baseBZURI;
  private fetchUsersURL = this.baseURL + '/astroPackages?stt=0&cnt=1000';
  constructor(private http: Http) { }

  getPackagesList() {
    let _getcouponListURL = this.fetchUsersURL;
    //_getscreebListURL = _getscreebListURL + screenStr;
    console.log(_getcouponListURL);
    return this.http.get(_getcouponListURL)
      .map((response: Response) => {
        let data = response.json();
        console.log(data);
        return data;
      }).catch((error: any) => Observable.throw(error.json().error || 'server error'));

  }

  
}
