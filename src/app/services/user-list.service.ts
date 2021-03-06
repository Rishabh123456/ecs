import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class UserListService {

  private baseURL = environment.baseBZURI;
  private fetchUsersURL = this.baseURL + '/getuser';
  constructor(private http: Http) { }

  getUsersList(searchStr: string) {
    let _getuserListURL = this.fetchUsersURL;
    _getuserListURL = _getuserListURL + '?search=' + searchStr;
    return this.http.get(_getuserListURL)
      .map((response: Response) => {
        let data = response.json();
        return data.userslist;
      }).catch((error: any) => Observable.throw(error.json().error || 'server error'));

  }

}
