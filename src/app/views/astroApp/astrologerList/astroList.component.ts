import { AlertService } from './../../../services/alert.service';
import { Category } from './../../../shared/model/categories.model';
import { allAstro } from './../../../shared/model/astroListing.model';
import { AstroProfile } from './../../../shared/model/astroProfile.model';
import { AllLocation } from './../../../shared/model/location.model';
import { CategoriesService } from './../../../services/categories.service';
import { AstroExpertiseService } from './../../../services/astroExpertiseList.service';
import { AstroLanguageService } from './../../../services/astroLanguage.service';
/* import { NotificationService } from './../../services/notification.service'; */
import { AstroLocationService } from './../../../services/astroLocation.service';
import { DataTableParams } from './../../../components/data-table';

import { AstroListingService } from './../../../services/astroList.service';
import { AuthGuard } from '../../../shared/guards/auth.guard';

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableResource } from './../../../components/data-table';
@Component({

  templateUrl: './astroList.component.html',
  styleUrls: ['./astroList.component.css'],
  providers: [AlertService, AstroListingService, AstroExpertiseService, AstroLanguageService, AstroLocationService]

})
export class AstroComponent implements OnInit {
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
    private allAstroList: AstroListingService,
    private astroExpertiseService: AstroExpertiseService,
    private astroLanguageList: AstroLanguageService,
    private astroLocationService: AstroLocationService,
    private authGuard: AuthGuard
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
   // this.reloadItems(this.params);
    this.authGuard.access;
    this.userAccess = this.authGuard.access;
  }

  ngAfterViewInit() {
    /* this.getExpertiseList(); */
    /* this.updateSelectedExpertiseList(); */
  }

  public refreshSelectedLanguages(value: any): void {
    this.selectedLanguageItems = value;
  }

  public refreshSelectedExpertises(value: any): void {
    this.selectedExpertiseItems = value;
  }
  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }


  getExpertiseList() {
    this.selectedExpertiseItems = [];
    this.astroExpertiseService.getExpertiseList().subscribe(
      data => {
        this.expertiseItems = [];
        data.categoryList.forEach((entry) => {
          this.expertiseItems.push({
            id: entry.id,
            text: entry.name
          });
        });

        console.log(this.expertiseItems);
      },
      error => {
        /* this.logService.error(error); */
      });
  }
  getLanguageList() {
    this.selectedLanguageItems = [];
    this.astroLanguageList.getLanguageList().subscribe(
      data => {
        this.languageItems = [];
        data.forEach((entry) => {
          this.languageItems.push({
            id: entry.id,
            text: entry.name
          });
        });

        console.log(this.expertiseItems);
      },
      error => {
        /* this.logService.error(error); */
      });
  }
  addCountry() {
    console.log('all coupon list');
    this.loading = true;
    this.astroLocationService.getLocationList().subscribe(
      data => {
        console.log('data loaded');
        this.loading = false;
        this.countryLocation = data.cat;


      }
    )
  }
  addState(id: number) {
    console.log(this.selectedCountry);
    this.astroLocationService.getStateList(this.selectedCountry).subscribe(
      data => {
        console.log('data loaded');
        this.loading = false;
        this.stateLocation = data.cat;
      }
    )
  }
  addCity(id: number) {
    console.log(this.selectedState);
    this.astroLocationService.getCityList(this.selectedState).subscribe(
      data => {
        console.log('data loaded');
        this.loading = false;
        this.cityLocation = data.cat;
      }
    )
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

  onAddAstro() {
    this.readOnly = false;
    this.gender = null;
    this.selectedState = null;
    this.selectedCity = null;

    this.image_file = null;
    this.filename = '';
    this.filesize = undefined;
    document.getElementById('image_file').nodeValue = '';


    this.headerText = "Add New PSAP";
    this.saveText = "Submit";
    this.astroStatus = 0;
    this.astroDetail = new AstroProfile();
    this.astroDetail.isActive = 0;
    this._bannerModal.show();
  //  this.getExpertiseList();
  //  this.getLanguageList();
  //  this.addCountry();
    this.selectedCountry = null;
  }


  getAstrologerList(params, filterData) {
    // console.log('all coupon list');
    this.loading = true;
    this.allAstroList.getAstroList(params, filterData).subscribe(
      data => {
        console.log('data loaded');
        this.loading = false;
        this.items = data.items;
        this.itemCount = data.count;
        this.loading = false;

      }
    )
    this.params = params;
  }

  OnUpdateAstro(profile: AstroProfile) {
    this.readOnly = true;
    this.astroDetail = Object.assign({}, profile);

    this.image_file = null;
    this.filename = '';
    this.filesize = undefined;
    document.getElementById('image_file').nodeValue = '';

    this.saveText = "Update";
    this.savingText = "Udating...";
    this.headerText = "Update Astrologer";
    this.gender = this.astroDetail.gender;
    this.astroStatus = this.astroDetail.isActive;
    this.selectedCountry = this.astroDetail.countryId;
    this.selectedState = this.astroDetail.stateId;
    this.selectedCity = this.astroDetail.cityId;

    this.getExpertiseList();
    this.getLanguageList();
    this.addCountry();

    if (this.selectedCountry) {
      this.addState(this.selectedCountry);
    }

    if (this.selectedState) {
      this.addCity(this.selectedState);
    }

    this.updateSelectedExpertiseList();
    this.updateSelectedLanguagesList();

    console.log(this.astroDetail);
    this._form.form.markAsUntouched();
    this._bannerModal.show();
  }


  /* onCreateAstro(form: NgForm) {
      //this.createAstro(form);
      this.updateAstro(form);
  } */
  onAstroSubmit(form: NgForm) {
    if (this.astroDetail.astroId) {
      this.updateAstro(form);
    }
    else{
      this.createAstro(form);
    }
  }

  updateAstro(form: NgForm) {
    let expertiseStr: string[] = [];
    let languageStr: string[] = [];
    this.selectedLanguageItems.forEach((entry) => {
      languageStr.push(entry.id);
    });

    this.selectedExpertiseItems.forEach((entry) => {
      expertiseStr.push(entry.id);
    });

    let astroData = {
      id: this.astroDetail.astroId,
      fName: this.astroDetail.fName,
      lName: this.astroDetail.lName,
      email: this.astroDetail.email,
      contactNo: this.astroDetail.contactNo,
      gender: this.gender,
      isActive: this.astroStatus,
      //astroStatus: this.astroStatus,
      country: this.selectedCountry,
      state: this.selectedState,
      city: this.selectedCity,
      image: this.image_file,
      expertiseItems: expertiseStr.toString(),
      languageItems: languageStr.toString(),
      experience: this.astroDetail.experience,
      description: this.astroDetail.description
    }
    this.allAstroList.getUpdateAstro(astroData).subscribe(
      data => {
        if (data.success) {
          this.loading = true;
          this.alertService.successTimedOut("Astrologer has been updated", 3000);
          this._bannerModal.hide();
        } else {
          this.alertService.errorTimedOut(data.errorMsg, 3000);
        }
        this.loading = false;
        this.reloadItems(this.params);
        console.log(data);
      },
      error => {
        this.alertService.errorTimedOut(error, 3000);
        this._bannerModal.hide();
        this.loading = false;
      });
  }

  createAstro(form: NgForm) {
    let expertiseStr: string[] = [];
    let languageStr: string[] = [];
    this.selectedLanguageItems.forEach((entry) => {
      languageStr.push(entry.id);
    });

    this.selectedExpertiseItems.forEach((entry) => {
      expertiseStr.push(entry.id);
    });

    let astroData = {
      id: this.astroDetail.astroId,
      fName: this.astroDetail.fName,
      lName: this.astroDetail.lName,
      email: this.astroDetail.email,
      contactNo: this.astroDetail.contactNo,
      name: this.astroDetail.name,
      password: this.astroDetail.password,
      gender: this.gender,
      isActive: this.astroStatus,
      astroStatus: this.astroStatus,
      //active: this.astroDetail.active,
      country: this.selectedCountry,
      state: this.selectedState,
      city: this.selectedCity,
      image: this.image_file,
      expertiseItems: expertiseStr.toString(),
      languageItems: languageStr.toString(),
      experience: this.astroDetail.experience,
      description: this.astroDetail.description
    }

    this.allAstroList.createAstro(astroData).subscribe(
      data => {
        if (data.success) {
          this.loading = true;
          this.alertService.successTimedOut("Astrologer has been added", 3000);
          this._bannerModal.hide();
          //this.getAstrologerList(this.params, this.filterData);
        } else {
          this.alertService.errorTimedOut(data.errorMsg, 3000);
        }
        this.reloadItems(this.params);
      },
      error => {
        this.alertService.errorTimedOut(error, 3000);
        this._bannerModal.hide();
        this.loading = false;
      });

  }

  reloadItems(params) {
    this.getAstrologerList(params, null);
  }

  updateSelectedExpertiseList() {
    this.selectedExpertiseItems = [];
    this.astroDetail.expertise.forEach((entry) => {
      this.selectedExpertiseItems.push({
        id: entry.id,
        text: entry.name
      });
    });
  }

  updateSelectedLanguagesList() {
    this.selectedLanguageItems = [];
    this.astroDetail.language.forEach((entry) => {
      this.selectedLanguageItems.push({
        id: entry.id,
        text: entry.name
      });
    });
  }
}