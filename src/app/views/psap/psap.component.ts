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
@Component({

  templateUrl: './psap.component.html',
  styleUrls: ['./psap.component.css']
})
export class PSAPComponent implements OnInit {
  loading: boolean = false;

  @ViewChild('newAstroDetail') _form: NgForm;
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
  constructor(
    /* private allUserList: NotificationService, */
    private alertService: AlertService,
    private psapService: PSAPService,
    private authGuard: AuthGuard,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }
  @ViewChild('couponDetail') portalForm = NgForm;
  //@ViewChild('f') _form: NgForm;
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

 

  getPSAPList(params, filterData) {
    // console.log('all coupon list');
   // this.loading = true;
    let data = this.psapService.getPSAPList(params, filterData);
    this.items = data;
    this.itemCount = data.length;
    // this.psapService.getAstroList(params, filterData).subscribe(
    //   data => {
    //     console.log('data loaded');
    //     this.loading = false;
    //     this.items = data.items;
    //     this.itemCount = data.count;
    //     this.loading = false;

    //   }
    // )
    this.params = params;
  }

  


  /* onCreateAstro(form: NgForm) {
      //this.createAstro(form);
      this.updateAstro(form);
  } */
  

  reloadItems(params) {
    this.getPSAPList(params, null);
  }

  onAddPSAP() {
    let navigationExtras: NavigationExtras = {
      skipLocationChange: true,
      
    };
    this.router.navigate(['/psap/add']);
  }

  onUpdatePSAP(item: PSAP) {
    let navigationExtras: NavigationExtras = {
      skipLocationChange: true,
      
    };
    this.router.navigate(['/psap', item.id]);
  }

  onBulkUploadPSAP() {
    this._bannerModal.show();
  }

 
}