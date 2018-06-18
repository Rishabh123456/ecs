import { SubscriberService } from './../../../services/subscriber.service';
import { PSAPType } from './../../../shared/model/psap-type.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthGuard } from './../../../shared/guards/auth.guard';
import { PSAPService } from './../../../services/psap.service';
import { AlertService } from './../../../services/alert.service';
import { PSAP } from './../../../shared/model/psap.model';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewChild } from '@angular/core';
@Component({
  templateUrl: './add-subscriber.component.html'
})
export class AddSubscriberComponent implements OnInit {
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
  public agencyTypes: PSAPType[] = [];
  
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
  public psap: PSAP = new PSAP();;



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
    private subsciberService: SubscriberService,
    private authGuard: AuthGuard,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }
  @ViewChild('couponDetail') portalForm = NgForm;
  //@ViewChild('f') _form: NgForm;
  @ViewChild('bannerModal') _bannerModal: any;


  ngOnInit() {
    this.agencyTypes.push({"id": 1, "name":  "Police", "description": "Police"});
    this.agencyTypes.push({"id": 2, "name":  "Marine", "description": "Marine"});
    this.agencyTypes.push({"id": 3, "name":  "Fire Services", "description": "Fire Services"});
    
    this.route.params.subscribe(
      (params: Params) => {
        const psapId = params['psapId'];
        console.log('Selected PSAP Id ' + psapId);
       // this.getAstroconsolidatedList(selectedYear, selectedMonth, astroid);

        if (!psapId) {
          this.psap = new PSAP();
        } else {
          //this.psap = this.psapService.getPSAPById(psapId)
        }

      }

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

 

  getPSAPList(params, filterData) {
    // console.log('all coupon list');
   // this.loading = true;
  //  let data = this.psapService.getPSAPList(params, filterData);
  //  this.items = data;
  //  this.itemCount = data.length;
    // this.psapService.getAstroList(params, filterData).subscribe(
    //   data => {
    //     console.log('data loaded');
    //     this.loading = false;
    //     this.items = data.items;
    //     this.itemCount = data.count;
    //     this.loading = false;

    //   }
    // )
   // this.params = params;
  }

  


  /* onCreateAstro(form: NgForm) {
      //this.createAstro(form);
      this.updateAstro(form);
  } */
  

  reloadItems(params) {
    this.getPSAPList(params, null);
  }

  

 
}