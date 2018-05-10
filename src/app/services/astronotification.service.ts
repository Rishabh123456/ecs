import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class AstronotificationService {
       private baseURL = environment.baseBZURI; 
      //private baseURL = 'http://rest.rockasap.com/astrolive'
       private getAstronotificationURL = this.baseURL + '/getNotificationData';
       constructor(private http: Http)
        {
            console.log("In constructor"+http);
       }  

    getAstroNotificationReport(Date:string) {
        let _getAstronotificationURL = this.getAstronotificationURL;
        _getAstronotificationURL = _getAstronotificationURL + '?date=' + Date; 
        console.log(_getAstronotificationURL);
        return this.http.get(_getAstronotificationURL)
            .map((response: Response) => {
                console.log("2nd");
                let data = response.json();
                console.log(data);
                return data;
            }).catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }

   

}
