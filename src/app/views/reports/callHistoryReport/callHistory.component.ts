import { UserListService } from './../../../services/user-list.service';
import { SearchUser } from './../../../shared/model/search-user.model';
import { AstroListingService } from './../../../services/astroList.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CallHistoryService } from './../../../services/callHistory-service';
import { HttpModule } from '@angular/http';
import { DatePipe } from "@angular/common";
import { AlertService } from './../../../services/alert.service';
import { DataTableParams } from './../../../components/data-table';
import { stagger } from '@angular/core/src/animation/dsl';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { saveAs } from 'file-saver/FileSaver';

@Component({
    selector: 'callhistory',
    providers: [CallHistoryService],
    templateUrl: './callHistory.html',
    styleUrls: ['./callHistory.css']
})
export class CallHistoryComponent implements OnInit {
    loading: boolean = false;
    bsRangeValue: Date[] = [];

    maxDate = new Date();

    params: DataTableParams;

    items = [];
    itemCount = 0;

    allTransactions = [{ name: 'All', value: -1 }, { name: 'Free', value: 0 }, { name: 'Paid', value: 1 }];
    selectedTransaction = this.allTransactions[0];

    public selectedAstrologer: { id: string, name: string } = null;
    public selectedUser: SearchUser = null;

    constructor(private callHistoryService: CallHistoryService,
        private datePipe: DatePipe, 
        private alertService: AlertService,
        private userListService: UserListService,
        private astroListService: AstroListingService) {
        var endDate = new Date();
        var startDate = new Date();
       // startDate.setDate(endDate.getDate() - 30); 
        this.bsRangeValue.push(startDate);
        this.bsRangeValue.push(endDate);

        this.astroDataSource = Observable.create((observer: any) => {
            // Runs on every search
            observer.next(this.astroInputTxt);
          }).mergeMap((token: string) => this.getAstrologerList(token));

        this.userDataSource = Observable.create((observer: any) => {
        // Runs on every search
        observer.next(this.userInputTxt);
        }).mergeMap((token: string) => this.getUserList(token));
       
    }

    astroInputTxt: string = '';
    astroTypeaheadLoading: boolean;
    astroTypeaheadNoResults: boolean;
    astroDataSource: Observable<any>;

    userInputTxt: string = '';
    userTypeaheadLoading: boolean;
    userTypeaheadNoResults: boolean;
    userDataSource: Observable<any>;

    

    downloadReport() {
        if (this.itemCount > 0) {
            var filterData = {
                startDate: this.transformDate(this.bsRangeValue[0], 'yyyy-MM-dd'),
                endDate: this.transformDate(this.bsRangeValue[1], 'yyyy-MM-dd'),
                //status: this.selectedTransaction.value,
                //payment: this.selectedPaymentId,
                //coupon: this.selectedCoupon
            }
            this.callHistoryService.downloadExcel(this.params, filterData).subscribe(response => {
                this.saveToFileSystem(response);
                this.loading = false;
            }, error => {
                this.loading = false;
                this.alertService.errorTimedOut(error, 3000);
            }); 
        } else {
            this.alertService.errorTimedOut('Empty Report', 3000);
        }
    }
    private saveToFileSystem(response) {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const parts: string[] = contentDispositionHeader.split(';');
        let filename = parts[1].split('=')[1];
        filename = filename.replace(/"/g, "");
        const blob = new Blob([response._body], { type: 'application/vnd.ms-excel' });
        saveAs(blob, filename);
      }



    getAstrologerList(token) {
        //console.log('Value' + token);
        return this.astroListService.getAstroListByName(token);
    }

    getUserList(token) {
        //console.log('Value' + token);
        return this.userListService.getUsersList(token);
    }

    
    astroChangeTypeaheadLoading(e: boolean): void {
        this.astroTypeaheadLoading = e;
    }
     
    astroChangeTypeaheadNoResults(e: boolean): void {
        this.astroTypeaheadNoResults = e;
    }
     
    astroTypeaheadOnSelect(e: TypeaheadMatch): void {
        console.log('Selected value: ', e.value);
        this.selectedAstrologer = e.item;
        this.refreshReport();
    }

    astroTextChanged(value: string) {
        console.log(value);
        if (value.length == 0) {
            this.selectedAstrologer = null;
            this.refreshReport();
        }
    }

    userChangeTypeaheadLoading(e: boolean): void {
        this.userTypeaheadLoading = e;
    }
     
    userChangeTypeaheadNoResults(e: boolean): void {
        this.userTypeaheadNoResults = e;
    }
     
    userTypeaheadOnSelect(e: TypeaheadMatch): void {
        console.log('Selected value: ', e.value);
        this.selectedUser = e.item;
        this.refreshReport();
    }

    userTextChanged(value: string) {
        console.log(value);
        if (value.length == 0) {
            this.selectedUser = null;
            this.refreshReport();
        }
    }

    ngOnInit() {
    }

    fetchCallHistory(params, filterData) {
        this.loading = true;
        this.callHistoryService.getCallHistory(params, filterData).subscribe(result => {
            this.items = result.items;
            this.itemCount = result.count;
            this.loading = false;
        }, error => {
          this.loading = false;
          this.alertService.errorTimedOut('something went wrong!', 3000);
        });
        
        this.params = params;
    }

    reloadItems(params) {
        // called when datatable params are updated
        var filterData = {
            startDate: this.transformDate(this.bsRangeValue[0], 'yyyy-MM-dd'),
            endDate: this.transformDate(this.bsRangeValue[1], 'yyyy-MM-dd'),
            status: this.selectedTransaction.value,
            astrologer: this.selectedAstrologer,
            user: this.selectedUser
        }
        this.fetchCallHistory(params, filterData);
    }


    loadItemsByDate(dateRange: Date[], params) {
        // called when Date Range is changed
        var filterData = {
            startDate: this.transformDate(dateRange[0], 'yyyy-MM-dd'),
            endDate: this.transformDate(dateRange[1], 'yyyy-MM-dd'),
            status: this.selectedTransaction.value,
            astrologer: this.selectedAstrologer,
            user: this.selectedUser
        }
        this.fetchCallHistory(params, filterData);
    }

    refreshReportOnDateChange(date) {
        // called when Date Range is changed
        if (!this.params) {
            this.params = {
                offset: 0,
                limit: 10,
            }
        }
        this.loadItemsByDate(date, this.params);
    }

    refreshReport() {
        if (!this.params) {
            this.params = {
                offset: 0,
                limit: 10
            }
        }
        this.reloadItems(this.params);
    }

    onChangeDateValue(date: Date[]) {
        if (date != null) {
            // Only fetch when both start date and end date are available
            this.refreshReportOnDateChange(date);
        }
     }

    onSelectedTransaction(data) {
        // called when transaction type is changed
        this.refreshReport();
    }

    transformDate(date, format): string {
        return this.datePipe.transform(date, format);
    }
    
}

