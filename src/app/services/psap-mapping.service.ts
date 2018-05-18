import { Subscriber } from './../shared/model/subscriber.model';
import { ServiceId } from './../shared/model/serviceid.model';
import { PSAP } from './../shared/model/psap.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { DataTableParams } from '../components/data-table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class PSAPMappingService {


  private serviceIdList: ServiceId[] = [];  

  private baseURL = environment.baseBZURI;
  private fetchUsersURL = this.baseURL + '/astroListV2';
  private fetchUsersByNameURL = this.baseURL + '/astroListByName';
  private createAstroURL = this.baseURL + '/createAstro';
  private updateAstroURL = this.baseURL + '/updateAstro';
  constructor(private http: Http) {
    // Initialize PSAP Listing
    let si1 = new ServiceId();
    si1.nameKana = 'Building 1'
    si1.id = 1;
    si1.nameKanji = 'Building One'


    si1.subscribers = [];
    si1.subscribers.push(new Subscriber('987654321', false));
    si1.subscribers.push(new Subscriber('987654320', false));
    si1.subscribers.push(new Subscriber('987654319', false));
    si1.subscribers.push(new Subscriber('987654322', true));
    
    this.serviceIdList.push(si1);


    let si2 = new ServiceId();
    si2.nameKana = 'Building 2'
    si2.id = 2;
    si2.nameKanji = 'Building Two'
    
    si2.subscribers = [];
    si2.subscribers.push(new Subscriber('7894328444', false));
    si2.subscribers.push(new Subscriber('7894328445', true));
    si2.subscribers.push(new Subscriber('7894328447', false));
    si2.subscribers.push(new Subscriber('7894328446', true));

    this.serviceIdList.push(si2);


    let si3 = new ServiceId();
    si3.nameKana = 'Building 3'
    si3.id = 3;
    si3.nameKanji = 'Building Three'
    
    si3.subscribers = [];
    si3.subscribers.push(new Subscriber('0120-3287912', false));
    si3.subscribers.push(new Subscriber('0120-3287913', true));
    si3.subscribers.push(new Subscriber('0120-3287914', false));
    

    this.serviceIdList.push(si3);


    let si4 = new ServiceId();
    si4.nameKana = 'Building 4'
    si4.id = 4;
    si4.nameKanji = 'Building Four'
    
    si4.subscribers = [];
    si4.subscribers.push(new Subscriber('011-496239843', false));
    si4.subscribers.push(new Subscriber('011-496239844', true));
    si4.subscribers.push(new Subscriber('011-496239845', false));
    

    this.serviceIdList.push(si4);

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

  getServiceIdList(params: DataTableParams, filterData: any) {
   return this.serviceIdList;

  }

  getServiceIdById(id: number) {
    let item:ServiceId;  
    for (var i = 0; i < this.serviceIdList.length; i++) {
          if (this.serviceIdList[i].id == id) {
                item = this.serviceIdList[i];
                  break;
            } 
      }
    return item;
  }

  getAstroList(params: DataTableParams, filterData: any) {
    let _getastroListURL = this.fetchUsersURL;
    _getastroListURL = _getastroListURL + '?' + this.paramsToQueryString(params)
    console.log(_getastroListURL);
    return this.http.get(_getastroListURL)
      .map((response: Response) => {
        let data = response.json();
        return {
          items: data.items,
          count: data.count
      }
      }).catch((error: any) => Observable.throw(error.json().error || 'server error'));

  }






  getAstroListByName(name: string) {
    let _getastroListURL = this.fetchUsersByNameURL;
    _getastroListURL = _getastroListURL + '?name=' + name;
    return this.http.get(_getastroListURL)
      .map((response: Response) => {
        let data = response.json();
        return data;
      }).catch((error: any) => Observable.throw(error.json().error || 'server error'));

  }

  createAstro(dataObject: any) {
    const formData = new FormData();
    formData.append('firstName', dataObject.fName);
    formData.append('lastName', dataObject.lName);
    formData.append('email', dataObject.email);
    formData.append('contact', dataObject.contactNo);
    formData.append('isActive', dataObject.isActive);
    formData.append('userName', dataObject.name);
    formData.append('password', dataObject.password);
    formData.append('gender', dataObject.gender);
    formData.append('countryId', dataObject.country);
    formData.append('stateId', dataObject.state);
    formData.append('cityId', dataObject.city);
    formData.append('imageFile', dataObject.image);
    formData.append('expertiseIds', dataObject.expertiseItems);
    formData.append('languageIds', dataObject.languageItems);
    formData.append('yearsOfExperience', dataObject.experience);
    formData.append('description', dataObject.description);
    return this.http.post(this.createAstroURL, formData)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUpdateAstro(dataObject: any) {
    const formData = new FormData();
    formData.append('id', dataObject.id);
    formData.append('firstName', dataObject.fName);
    formData.append('lastName', dataObject.lName);
    formData.append('email', dataObject.email);
    formData.append('contact', dataObject.contactNo);
    //formData.append('active', dataObject.astroStatus);
    formData.append('isActive', dataObject.isActive);
    formData.append('gender', dataObject.gender);
    if(dataObject.country){
        formData.append('countryId', dataObject.country);
    }
    if(dataObject.state){
        formData.append('stateId', dataObject.state);
    }
    if(dataObject.city){
        formData.append('cityId', dataObject.city);
    }
    if(dataObject.image){
        formData.append('imageFile', dataObject.image);
    }
    formData.append('expertiseIds', dataObject.expertiseItems);
    formData.append('languageIds', dataObject.languageItems);
    formData.append('yearsOfExperience', dataObject.experience);
    formData.append('description', dataObject.description);
    return this.http.post(this.updateAstroURL, formData)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
