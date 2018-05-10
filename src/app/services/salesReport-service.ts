import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
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
        result.push(['length', params.limit]);
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
export class SalesReportService {

    /*  loading: boolean = false;
     bsValueStart: Date;
     maxDateStart: Date;
     bsValueStrStart: string;
     bsDateAPIStrStart: string;
     param: DataTableParams;
 
     minDateEnd: Date;
     bsValueEnd: Date;
     maxDateEnd: Date;
     bsValueStrEnd: string;
     bsDateAPIStrEnd: string; */
    private baseURL = environment.baseBZURI;
    private getbaseURL = this.baseURL + '/SalesReportdetailsV1';
    private downloadExcelURL = this.baseURL + '/excelSalesReportDetailsV1';
  
    constructor(private http: Http, private datePipe: DatePipe) {
        console.log("In constructor service");
    }
    /* ngOnInit() {
        console.log("ng on init");
        this.bsValueStart = new Date();
        this.bsValueStrStart = this.transformDate(this.bsValueStart, 'd/M/y');
        this.bsDateAPIStrStart = this.transformDate(this.bsValueStart, 'dd/MM/yyyy');

        this.bsValueEnd = new Date();
        this.bsValueStrEnd = this.transformDate(this.bsValueEnd, 'd/M/y');
        this.bsDateAPIStrEnd = this.transformDate(this.bsValueEnd, 'dd/MM/yyyy');
        //this.reloadItems(this.,this.bsDateAPIStrStart,this.bsDateAPIStrEnd);      
    } */
    transformDate(date, format) {
        return this.datePipe.transform(date, format);
    }

    query(params: DataTableParams, filterData: any) {
        let _getbaseURL = this.getbaseURL;
        _getbaseURL = _getbaseURL + '?startdate=' + filterData.startDate + "&enddate=" + filterData.endDate + "&transaction_status=" + filterData.status;

        if (filterData.payment != -1) {
            _getbaseURL = _getbaseURL + '&paymentMethodId=' + filterData.payment
        }

        if (filterData.coupon != '') {
            _getbaseURL = _getbaseURL + '&coupon=' + filterData.coupon
        }


        console.log("url going to hit " + _getbaseURL + '&' + paramsToQueryString(params));
        return this.http.get(_getbaseURL + '&' + paramsToQueryString(params)).toPromise()
            .then((resp: Response) => {
                let data = resp.json();
                let sales = data.sales == null ? [] : data.sales;
                let count = data.count == null ? 0 : data.count;
                let freeTransaction = data.freeTransaction == null ? 0 : data.freeTransaction;
                let totalRevenue = data.totalRevenue == null ? 0 : data.totalRevenue;
                let paidTransaction = data.paidTransaction == null ? 0 : data.paidTransaction;
                return {
                    items: sales,
                    count: count,
                    freeTransaction: freeTransaction,
                    totalRevenue: totalRevenue,
                    paidTransaction: paidTransaction
                }
            }
            );
    }

    downloadExcel(params: DataTableParams, filterData: any) {
        let _downloadReportURL = this.downloadExcelURL;
        _downloadReportURL = _downloadReportURL + '?startdate=' + filterData.startDate + "&enddate=" + filterData.endDate + "&transaction_status=" + filterData.status;

        if (filterData.payment != -1) {
            _downloadReportURL = _downloadReportURL + '&paymentMethodId=' + filterData.payment
        }

        if (filterData.coupon != '') {
            _downloadReportURL = _downloadReportURL + '&coupon=' + filterData.coupon
        }

        if (params.sortBy != null) {
            _downloadReportURL = _downloadReportURL + '&sort=' + params.sortBy
        }
        /* if (params.sortAsc != null) {
            _downloadReportURL = _downloadReportURL + '&order=' + params.sortAsc ? 'ASC' : 'DESC';
        } */

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
