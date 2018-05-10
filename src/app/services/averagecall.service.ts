import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class AveragecallService {
       private baseURL = environment.baseBZURI; 
       private getAstrodataURL = this.baseURL + '/averageCallTime';
       constructor(private http: Http)
        {
            console.log("In constructor"+http);
       }  

    getAverageCallReport(startDate:string, endDate:string) {
        let _getAstrodataURL = this.getAstrodataURL;
        _getAstrodataURL = _getAstrodataURL + '?startDate=' + startDate + "&endDate="+endDate; 
        console.log(_getAstrodataURL);
        return this.http.get(_getAstrodataURL)
            .map((response: Response) => {
                console.log("2nd");
                let data = response.json();
                console.log(data);
                return data;
            }).catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }

   

}
