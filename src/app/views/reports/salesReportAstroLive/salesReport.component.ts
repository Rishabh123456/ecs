import { Component, OnInit } from '@angular/core';
import { SalesReportService } from './../../../services/salesReport-service';
import { HttpModule } from '@angular/http';
import { DatePipe } from "@angular/common";
import { AlertService } from './../../../services/alert.service';
import { DataTableParams } from './../../../components/data-table';
import { stagger } from '@angular/core/src/animation/dsl';
import { Coupon } from './../../../shared/model/coupon.model';
import { paymentMethod } from './../../../shared/model/payment.model';
import { CouponService } from './../../../services/coupon.service';
import { PaymentService } from './../../../services/payment.service';
import { saveAs } from 'file-saver/FileSaver';

@Component({
    selector: 'salesreport',
    providers: [SalesReportService, CouponService, PaymentService],
    templateUrl: './salesReport.html',
    styleUrls: ['./salesReport.css']
})
export class salesReport {
    loading: boolean = false;
    bsRangeValue: Date[] = [];
    //allTransaction: string[] = ['All','Paid','Free'];

    allTransactions = [{ name: 'All', value: -1 }, { name: 'Free', value: 0 }, { name: 'Paid', value: 1 }];
    selectedTransaction = this.allTransactions[2];

    maxDate = new Date();

    params: DataTableParams;

    allPackage: Coupon[] = [];

    paymentModeList: paymentMethod[] = [];
    selectedPaymentId: number = -1;

    selectedCoupon: string = '';



    items = [];
    itemCount = 0;
    userData: any;


    constructor(private salesReportService: SalesReportService,
        private packageList: CouponService,
        private paymentList: PaymentService,
        private datePipe: DatePipe,
        private alertService: AlertService) {
        var endDate = new Date();
        var startDate = new Date();
        /* startDate.setDate(endDate.getDate() - 21); */
        this.bsRangeValue.push(startDate);
        this.bsRangeValue.push(endDate);
    }
    
    onCouponChange(searchStr: string) {
        if (searchStr.length > 3 || searchStr.length == 0) {
            this.refreshReport();
        } 
    }

    ngOnInit() {
        this.getPackage();
        this.getPayment();
    }
    
    onSelectedTransaction(data) {
        console.log(this.selectedTransaction);
        this.refreshReport();

    }

    onSelectedPayment(data) {
        console.log(this.selectedPaymentId);
        this.refreshReport();
    }

    getPayment() {
        this.paymentList.getPaymentList().subscribe(
            data => {
                this.paymentModeList = data.paymentmethodlist;
            }
        )
    }

    getPackage() {
        this.packageList.getPackagesList().subscribe(
            data => {
                this.allPackage = data.list;
            }
        )
    }

    reloadItems(params) {
        this.loading = true;
        var filterData = {
            startDate: this.transformDate(this.bsRangeValue[0], 'yyyy-MM-dd'),
            endDate: this.transformDate(this.bsRangeValue[1], 'yyyy-MM-dd'),
            status: this.selectedTransaction.value,
            payment: this.selectedPaymentId,
            coupon: this.selectedCoupon
        }
        this.salesReportService.query(params, filterData).then(result => {
            this.items = result.items;
            this.itemCount = result.count;
            let data = { 'Free Transactions': result.freeTransaction, 'Paid Transactions': result.paidTransaction, 'Total Revenue': result.totalRevenue };
            this.userData = data;
            this.loading = false;
        });
        this.params = params;
    }

    loadItemsByDate(dateRange: Date[], params) {
        this.loading = true;
        var filterData = {
            startDate: this.transformDate(dateRange[0], 'yyyy-MM-dd'),
            endDate: this.transformDate(dateRange[1], 'yyyy-MM-dd'),
            status: this.selectedTransaction.value,
            payment: this.selectedPaymentId,
            coupon: this.selectedCoupon
        }
        this.salesReportService.query(params, filterData).then(result => {
            this.items = result.items;
            this.itemCount = result.count;
            let data = { 'Free Transactions': result.freeTransaction, 'Paid Transactions': result.paidTransaction, 'Total Revenue': result.totalRevenue };
            this.userData = data;
            this.loading = false;
        });
        this.params = params;
    }

    refreshReportOnDateChange(date) {
        if (!this.params) {
            this.params = {
                offset: 0,
                limit: 10
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

    downloadReport() {
        if (this.itemCount > 0) {
            var filterData = {
                startDate: this.transformDate(this.bsRangeValue[0], 'yyyy-MM-dd'),
                endDate: this.transformDate(this.bsRangeValue[1], 'yyyy-MM-dd'),
                status: this.selectedTransaction.value,
                payment: this.selectedPaymentId,
                coupon: this.selectedCoupon
            }
            this.salesReportService.downloadExcel(this.params, filterData).subscribe(response => {
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



    transformDate(date, format) {
        return this.datePipe.transform(date, format);
    }
    onChangeValue(date: Date[]) {
        if (date != null) {
            this.refreshReportOnDateChange(date);
        }

    }
}
