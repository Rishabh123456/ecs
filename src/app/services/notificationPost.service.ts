import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataTableParams } from '../components/data-table';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class NotificationPostService {

  private baseURL = environment.baseBZURI;

  //private fetchUsersURL = this.baseURL + '/couponlisting?stt=0&cnt=100&type=5&_=1518759183116';
  private addNotificationURL = this.baseURL + '/sendFCM';
  
  
  constructor(private http: Http) { }

  createNotification(dataObject: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addNotificationURL, dataObject, options)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  
}
