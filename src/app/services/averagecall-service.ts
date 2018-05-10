import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataTableParams } from '../components/data-table';
import 'rxjs/add/operator/toPromise';


const BASE_URL = 'http://localhost:8080/astrolive/averageCallTime?startDate=2017-01-01&endDate=2018-01-16';

function paramsToQueryString(params: DataTableParams) {
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


@Injectable()
export class RemoteService {

    constructor (private http: Http) {}

    query(params: DataTableParams) {
        console.log("params"+params);
        return this.http.get(BASE_URL+'&' + paramsToQueryString(params)).toPromise()
            .then((resp: Response) => {
                let data = resp.json();
                return {
                    items:data.items,
                    count:data.count
            }}
        );
    }
}
