import { PSAP } from './../shared/model/psap.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { DataTableParams } from '../components/data-table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class PSAPService {


  private psapList: PSAP[] = [];  

  private baseURL = environment.baseBZURI;
  private fetchUsersURL = this.baseURL + '/astroListV2';
  private fetchUsersByNameURL = this.baseURL + '/astroListByName';
  private createAstroURL = this.baseURL + '/createAstro';
  private updateAstroURL = this.baseURL + '/updateAstro';
  constructor(private http: Http) {
    // Initialize PSAP Listing
    let psap1 = new PSAP();
    psap1.code = 'KEI001';
    psap1.id = 1;
    psap1.name = 'XX Fire Station';
    psap1.kinkukikanname = 'XX消防署'
    psap1.type = 3;
    psap1.accessnumber1 = '+819017901357';
    psap1.accessnumber1enabled = true;
    psap1.accessnumber2 = '+819017901358';
    psap1.accessnumber2enabled = false;
    psap1.accessnumberroundrobin = true;

    psap1.asideipvpn = '10.32.0.4:8080';
    psap1.asideipvpnenabled = false;
    psap1.bsideipvpn = '10.32.0.5:8080';
    psap1.bsideipvpnenabled = true;
    psap1.ipvpnroundrobin = true;

    //psap1.test = true;

    this.psapList.push(psap1);

    let psap2 = new PSAP();
    psap2.code = 'KEI002';
    psap2.id = 2;
    psap2.name = 'YY Police Station';
    psap2.kinkukikanname = 'YY警察署'
    psap2.type = 1;
    psap2.accessnumber1 = '+819017901367';
    psap2.accessnumber1enabled = true;
    psap2.accessnumber2 = '+819017901368';
    psap2.accessnumber2enabled = false;
    psap2.accessnumberroundrobin = true;

    psap2.asideipvpn = '192.168.0.4:8080';
    psap2.asideipvpnenabled = false;
    psap2.bsideipvpn = '192.168.0.5:8080';
    psap2.bsideipvpnenabled = true;
    psap2.ipvpnroundrobin = true;

    this.psapList.push(psap2);

    let psap3 = new PSAP();
    psap3.code = 'KEI003';
    psap3.id = 3;
    psap3.name = 'ZZ Sea Station';
    psap3.kinkukikanname = 'ZZシーサービス'
    psap3.type = 2;
    psap3.accessnumber1 = '+819017901387';
    psap3.accessnumber1enabled = true;
    psap3.accessnumber2 = '+819017901388';
    psap3.accessnumber2enabled = false;
    psap3.accessnumberroundrobin = true;

    psap3.asideipvpn = '192.168.0.7:8080';
    psap3.asideipvpnenabled = false;
    psap3.bsideipvpn = '192.168.0.8:8080';
    psap3.bsideipvpnenabled = true;
    psap3.ipvpnroundrobin = true;
    //psap3.test = true;
    this.psapList.push(psap3);

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

  getPSAPList(params: DataTableParams, filterData: any) {
   return this.psapList;

  }

  getPSAPById(id: number) {
    let item:PSAP;  
    for (var i = 0; i < this.psapList.length; i++) {
          if (this.psapList[i].id == id) {
                item = this.psapList[i];
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
