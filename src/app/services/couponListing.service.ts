import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataTableParams } from '../components/data-table';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class CouponListingService {

  private baseURL = environment.baseBZURI;

  //private fetchUsersURL = this.baseURL + '/couponlisting?stt=0&cnt=100&type=5&_=1518759183116';
  private fetchCouponList = this.baseURL + '/getAstroCouponList';
  private addCouponURL = this.baseURL + '/createCouponV2';
  private fetchCouponDetail = this.baseURL + '/astroCouponDetail';
  private updateCouponURL = this.baseURL + '/updateCouponV2';
  
  
  constructor(private http: Http) { }

  private paramsToQueryString(params: DataTableParams) {
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
  
  

  getAllCouponListing(params: DataTableParams, filterData: any) {
    let _getAllCouponListURL = this.fetchCouponList;
    _getAllCouponListURL = _getAllCouponListURL + '?' + this.paramsToQueryString(params)
    console.log(_getAllCouponListURL);
    return this.http.get(_getAllCouponListURL)
      .map((response: Response) => {
        let data = response.json();
        return {
          items: data.astroCouponList,
          count: data.count
        }
      }).catch((error: any) => Observable.throw(error.json().error || 'server error'));
  }


  getCouponDetail(id: number) {
    let _getAllCouponDetailURL = this.fetchCouponDetail;
    _getAllCouponDetailURL = _getAllCouponDetailURL + '?' + "id=" + id;
    console.log(_getAllCouponDetailURL);
    return this.http.get(_getAllCouponDetailURL)
      .map((response: Response) => {
        let data = response.json();
        return {
          items: data.astroCouponDetail,
        }
      }).catch((error: any) => Observable.throw(error.json().error || 'server error'));
  }

  
  createCoupon(dataObject: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addCouponURL, dataObject, options)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  updateCoupon(dataObject: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateCouponURL, dataObject, options)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
