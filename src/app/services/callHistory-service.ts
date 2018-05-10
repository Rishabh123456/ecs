import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { DatePipe } from "@angular/common";
import { DataTableParams } from '../components/data-table';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class CallHistoryService {
    loading: boolean = false;
    bsValueStart: Date;
    maxDateStart: Date;
    bsValueStrStart: string;
    bsDateAPIStrStart: string;
    param: DataTableParams;
    minDateEnd: Date;
    bsValueEnd: Date;
    maxDateEnd: Date;
    bsValueStrEnd: string;
    bsDateAPIStrEnd: string;
    private baseURL = environment.baseBZURI;
    private getbaseURL = this.baseURL + '/astroMisV1';
    private downloadExcelURL = this.baseURL + '/astroMisV1Excel';

    constructor(private http: Http, private datePipe: DatePipe) {

    }

    private paramsToQueryString(params: DataTableParams) {
        let result = [];
        if (params.offset != null) {
            result.push(['_start', params.offset]);
        }
        if (params.limit != null) {
            result.push(['_limit', params.limit]);
        }
        if (params.sortBy != null) {
            result.push(['_sort', params.sortBy]);
        }
        if (params.sortAsc != null) {
            result.push(['_order', params.sortAsc ? 'ASC' : 'DESC']);
        }
        return result.map(param => param.join('=')).join('&');
    }

    getCallHistory(params: DataTableParams, filterData: any) {
        let _getbaseURL = this.getbaseURL;
        _getbaseURL = _getbaseURL + '?startDate=' + filterData.startDate + "&endDate=" + filterData.endDate;

        if (filterData.status != -1) {
            _getbaseURL = _getbaseURL + '&type=' + filterData.status;
        }

        if (filterData.astrologer != null) {
            _getbaseURL = _getbaseURL + '&astroId=' + filterData.astrologer.id;
        }

        if (filterData.user != null) {
            _getbaseURL = _getbaseURL + '&userId=' + filterData.user.id;
        }

        _getbaseURL = _getbaseURL + '&' + this.paramsToQueryString(params)
 

        return this.http.get(_getbaseURL)
            .map((resp: Response) => {
                let data = resp.json();
                return {
                    items: data.items,
                    count: data.count
                }
            }
        ).catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }

    downloadExcel(params: DataTableParams, filterData: any) {
        let _downloadReportURL = this.downloadExcelURL;
        _downloadReportURL = _downloadReportURL + '?startDate=' + filterData.startDate + "&endDate=" + filterData.endDate;
        let headers = new Headers({ 
            'Accept': 'application/vnd.ms-excel'
         });
         let options = new RequestOptions({ headers: headers });
         // Ensure you set the responseType to Blob.
         options.responseType = ResponseContentType.Blob;
        return this.http.get(_downloadReportURL, options)
            .map((resp: Response) => {
                return resp;
            }
            ).catch((error: any) => { 
               return Observable.throw(error.json().error || 'server error') 
            });
    }

}
