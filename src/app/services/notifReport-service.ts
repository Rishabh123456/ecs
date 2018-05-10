import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { DatePipe } from "@angular/common";
import { DataTableParams } from '../components/data-table';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


function paramsToQueryString(params: DataTableParams) {
    let result = [];
    if (params.offset != null) {
        result.push(['start', params.offset]);
    }
    if (params.limit != null) {
        result.push(['limit', params.limit]);
    }
    if (params.sortBy != null) {
        result.push(['sort', params.sortBy]);
    }
    if (params.sortAsc != null) {
        result.push(['order', params.sortAsc ? 'ASC' : 'DESC']);
    }     
     return result.map(param => param.join('=')).join('&');
}


@Injectable()
export class NotifReportService implements OnInit {

    loading : boolean = false;
    bsValueStart: Date;
    maxDateStart: Date; 
    bsValueStrStart: string;
    bsDateAPIStrStart: string;
    param : DataTableParams;
  
    minDateEnd:Date;
    bsValueEnd: Date;
    maxDateEnd: Date; 
    bsValueStrEnd: string;
    bsDateAPIStrEnd: string;
    private baseURL = environment.baseBZURI; 
   // private getbaseURL= "http://localhost:8080/astrolive/getGenericNotificationData"
    private getbaseURL = this.baseURL + '/getGenericNotificationData';
   
    constructor (private http: Http,private datePipe: DatePipe) 
    {
    } 
    ngOnInit(){
            this.bsValueStart = new Date();
            this.bsValueStrStart = this.transformDate(this.bsValueStart, 'd/M/y');
            this.bsDateAPIStrStart = this.transformDate(this.bsValueStart, 'dd/MM/yyyy');
          }
          transformDate(date, format) {
            return this.datePipe.transform(date, format);
          }
    query(params: DataTableParams,startDate:string) {
        let _getbaseURL = this.getbaseURL;
        _getbaseURL = _getbaseURL+ '?date=' + startDate; 
        console.log("url going to hit "+_getbaseURL+'&' + paramsToQueryString(params));
        return this.http.get(_getbaseURL+'&' + paramsToQueryString(params)).toPromise()
            .then((resp: Response) => {
                let data = resp.json();
                return {
                    items:data.items,
                    count:data.count
            }}
        );
    }
}
