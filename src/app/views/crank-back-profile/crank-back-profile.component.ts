import { CrankBackProfile } from './../../shared/model/crank-back-profile.model';
import { CrankBackProfileService } from './../../services/crank-back-profile.service';
import { Subscriber } from './../../shared/model/subscriber.model';
import { ServiceId } from './../../shared/model/serviceid.model';
import { Observable } from 'rxjs';
import { SubscriberService } from './../../services/subscriber.service';
import { PSAP } from './../../shared/model/psap.model';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { PSAPService } from './../../services/psap.service';
import { AlertService } from './../../services/alert.service';
import { Category } from './../../shared/model/categories.model';
import { allAstro } from './../../shared/model/astroListing.model';
import { AstroProfile } from './../../shared/model/astroProfile.model';
import { AllLocation } from './../../shared/model/location.model';
import { CategoriesService } from './../../services/categories.service';
import { AstroExpertiseService } from './../../services/astroExpertiseList.service';
import { AstroLanguageService } from './../../services/astroLanguage.service';
/* import { NotificationService } from './../../services/notification.service'; */
import { AstroLocationService } from './../../services/astroLocation.service';
import { DataTableParams } from './../../components/data-table';

import { AstroListingService } from './../../services/astroList.service';
import { AuthGuard } from '../../shared/guards/auth.guard';

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableResource } from './../../components/data-table';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
@Component({

  templateUrl: './crank-back-profile.component.html',
  styleUrls: ['./crank-back-profile.component.css']
})
export class CrankBackProfileComponent implements OnInit {
  loading: boolean = false;

  @ViewChild('f') _form: NgForm;

  totalItems = 0;
  currentPage = 0;
  smallnumPages = 0;
  itemsPerPage = 10;
  saveText = "";
  savingText = "";
  headerText = "";

  exp: string = "1";

  /* allAstro: allAstro[] = []; */
  public imgUrl: File;
  public profile: AstroProfile;
  public selectedCountry = null;
  public selectedState = null;
  public selectedCity = null;
  public gender = null;
  public selectedStatus = null
  public astroId: number;
  public fname: string = '';
  public lName: string = '';
  public email: string = '';
  public contact: number;
  public userName: string = '';
  public password: string = '';
  public experience: number;
  public description: string = '';
  public astroStatus: number = 0;
  public readOnly: boolean;
  public astroDetail: AstroProfile = new AstroProfile();
  public errorCode: CrankBackProfile = new CrankBackProfile(-1, "");

  countryLocation: AllLocation[] = [];

  params: DataTableParams;
  stateLocation: AllLocation[] = [];
  cityLocation: AllLocation[] = [];

  maxDate: Date = new Date();

  validFromTime: Date = new Date();
  validUptoTime: Date = new Date();

  itemCount = 0;
  items = [];

  public image_file: File;
  public filename: string = '';
  public filesize: number;
  public userAccess: boolean;

  public expertiseItems: Array<{ id: string, text: string }> = [];
  public selectedExpertiseItems: Array<{ id: string, text: string }> = [];
  public languageItems: Array<{ id: string, text: string }> = [];
  public selectedLanguageItems: Array<{ id: string, text: string }> = [];


  subscriberInputTxt: string = '';
  subscriberTypeaheadLoading: boolean;
  subscriberTypeaheadNoResults: boolean;
  subscriberDataSource: Observable<any>;

  public serviceIdsList: ServiceId[] = [];
  public selectedServiceId: ServiceId;

  constructor(
    /* private allUserList: NotificationService, */
    private alertService: AlertService,
    private crankBackProfileService: CrankBackProfileService,
    private authGuard: AuthGuard,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.subscriberDataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.subscriberInputTxt);
    }).mergeMap((token: string) => this.getServiceIdsAsObservable(token));

  }
  @ViewChild('couponDetail') portalForm = NgForm;
  //@ViewChild('f') _form: NgForm;
  @ViewChild('subscriberModal') _subscriberModal: any;
  @ViewChild('bannerModal') _bannerModal: any;


  ngOnInit() {
    if (!this.params) {
      this.params = {
        offset: 0,
        limit: 10
      }
    }
    this.reloadItems(this.params);
    this.authGuard.access;
    this.userAccess = this.authGuard.access;
    this.getAllErrorCodes();
  }

  getAllErrorCodes() {
    let data = this.crankBackProfileService.getErrorCodeList();
    this.itemCount = data.length;
    this.items = data;
  }

 
  getServiceIdsAsObservable(token: string): Observable<any> {
    let query = new RegExp(token, 'ig');
 
    return Observable.of(
      this.serviceIdsList.filter((state: any) => {
        return query.test(state.nameKana);
      })
    );
  }

   public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }


 

  public fileChange(event) {
    this.image_file = event.srcElement.files[0];
    this.filename = this.image_file.name;
    this.filesize = this.image_file.size;
  }

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    let startIndex = (event.page - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    // this.displayBanner = this.filteredBanner.slice(startIndex, endIndex)
  }
  onSubmit() {
    console.log(this.expertiseItems);
    if (!this.validate()) return;
  }

  validate() {
  }

 

onAddErrorCode() {
  this.readOnly = false;
  this.errorCode = new CrankBackProfile(-1, "");
  this.saveText = "Save";
  this.savingText = "Saving..."
  // this.selectedBannerTypeId = 0;
  this.headerText = "Add New Error Code"
  this._form.form.markAsPristine();
  this._form.form.markAsUntouched();
  this._form.form.updateValueAndValidity();
  this._subscriberModal.show();
} 

onUpdateErrorCode(item: CrankBackProfile) {
  this.readOnly = false;
  this.errorCode = item;
  this.saveText = "Save";
  this.savingText = "Saving..."
  // this.selectedBannerTypeId = 0;
  this.headerText = "Add New Error Code"
  this._form.form.markAsPristine();
  this._form.form.markAsUntouched();
  this._form.form.updateValueAndValidity();
  this._subscriberModal.show();
} 

subscriberChangeTypeaheadLoading(e: boolean): void {
    this.subscriberTypeaheadLoading = e;
}
 
subscriberChangeTypeaheadNoResults(e: boolean): void {
    this.subscriberTypeaheadNoResults = e;
}
 
subscriberTypeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
    this.selectedServiceId = e.item;
    this.items = e.item.subscribers;
    this.itemCount = e.item.subscribers.length;
   // this.refreshReport();
}

subscriberTextChanged(value: string) {
    console.log(value);
    if (value.length == 0) {
      this.selectedServiceId = null;
      this.items = null;
      this.itemCount = 0;
    }
}

  


  /* onCreateAstro(form: NgForm) {
      //this.createAstro(form);
      this.updateAstro(form);
  } */
  

  reloadItems(params) {
    this.getAllErrorCodes();
  }

  onAddServiceId() {
    let navigationExtras: NavigationExtras = {
      skipLocationChange: true,
      
    };
    this.router.navigate(['/subscriber/add']);
  }

  onUpdatePSAP(item: PSAP) {
    let navigationExtras: NavigationExtras = {
      skipLocationChange: true,
      
    };
    this.router.navigate(['/subscriber', item.id]);
  }

  onBulkUploadDIDs() {
    this._bannerModal.show();
  }

 
}