import { UserListService } from './../../../services/user-list.service';
import { AlertService } from './../../../services/alert.service';
import { CouponService } from './../../../services/coupon.service';
import { SearchUser } from './../../../shared/model/search-user.model';
import {  Category } from './../../../shared/model/categories.model';
import {  Coupon } from './../../../shared/model/coupon.model';
import {  AddCoupon } from './../../../shared/model/addCoupon.model';

import {  allCoupon } from './../../../shared/model/couponListing.model';
import { CategoriesService } from './../../../services/categories.service';
import { CouponListingService } from './../../../services/couponListing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableResource } from './../../../components/data-table';
import { DataTableParams } from './../../../components/data-table';
import { UserService } from '../../../services/user.service';
import { Injectable } from '@angular/core';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import {  CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({

  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'],
  providers: [CouponService, AlertService, CouponListingService ]

})

/* @Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    alert();
    if (this.userService.getUser()) {
      // logged in so return true
      let user = this.userService.getUser();
      if (route.routeConfig.path == 'salesReport') {
          //  console.log(user.role.actions);
          let allowed: boolean = false;
          user.role.actions.forEach(element => {
              if (element.name === 'SALES_REPORT_VIEW') {
                  allowed = true;
              }
          });
          if (!allowed) {
              this.router.navigate(['/']);
          } else {
              return true;
          }
      }
    }
  }
} */

export class CouponComponent implements OnInit {
  
  
  
  @ViewChild('couponForm') _form: NgForm;

  loading: boolean = false;

  public couponCode: string = '';
  public couponTitle: string = '';
  public couponStatus: boolean = true;
  public saving: boolean;
  public isActive: boolean = true;
  public allUsersList: boolean;
  public allProducts: boolean = false;
  public users: string = '';
  public products: string = '';
  public readOnly: boolean;
  public readOnlyProduct: boolean;
  public readOnlyUser: boolean;
  public getPackageList: boolean;
  public getUser: boolean;
  public userAccess: boolean;
  //public noAccess: boolean;
  
  public usesPerUser: number;
  public id: number;
  //public couponDetail: AddCoupon = new AddCoupon();
  public deductionValue: number;
  params: DataTableParams;

  public couponType: string = '';
  public chosenProductId: number[] = [];
  public chosenUserId: number[] = [];

  totalItems = 0;
  currentPage = 0;
  smallnumPages = 0;
  itemsPerPage = 10;
  saveText = "";
  savingText = "";
  headerText = "";
  allPackages: boolean = false;
  allUsers: boolean = false;
  code: string = "";
  usage: number;
  minAmt: string = "";
  maxAmt: string = "";
  userInput: string = "";
  reductionValue: number;
  reduction =  [
                {name: 'By Percentage', id: 0},
                {name: 'By Amount', id: 1},
                {name: 'By Minutes', id: 2},
              ];
  
  validFromDate: Date = new Date();
  validUptoDate: Date = new Date();
  minDate = new Date();
  fromMinDate = new Date();

  selected: boolean;
  /* validUptoDate.setDate(endDate.getDate() - 7); */
  
  filteredCoupon: Coupon[] = [];
  choosenCoupon: Coupon[] = [];
  productId: Coupon[] = [];
  selectedProducts: Coupon[] = [];
  addCoupon: AddCoupon[] = [];
  filteredUsers: SearchUser[] = [];
  selectedItems: SearchUser[] = [];
  availableItems: SearchUser[] = [];

  allCoupon: allCoupon[] = [];

  maxDate: Date = new Date();
  validFromTime: Date = new Date();
  validUptoTime: Date = new Date();

  itemResource:any;
  itemCount = 0;
  items = [];


  

  constructor(
    private couponList: CouponService,
    private allUserList: UserListService,
    private alertService: AlertService,
    private allCouponList: CouponListingService,
    private authGuard: AuthGuard
    /* private router: Router,
    private route: ActivatedRouteSnapshot */
  ){
  }

   
   //@ViewChild('couponDetail') portalForm = NgForm;
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
    this.getPackage();
    //this.getCouponList();
  }
  public fileChange(event) {
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
  onSubmit(){
    if(!this.validate()) return;
  }

  validate() {
  }

  onAddCoupon(){
    this.couponType = null;
    this.readOnly = false;
    this.readOnlyProduct = false;
    this.readOnlyUser = false;
    this.couponCode = '';
    this.couponTitle = '';
    this.choosenCoupon = [];
    this.availableItems = [];
    this.deductionValue = null;
    this.minAmt = null;
    this.maxAmt = null;
    this.usesPerUser = null;
    this.validFromDate = new Date();
    this.validUptoDate = new Date();
    this.couponStatus = true;
    this.allProducts = false;
    this.allUsers = false;
    this.id = null;
    this.getPackageList = false;

    this.filteredCoupon.forEach(item => {
          item.selected = false;
    });
    this.selected = false
    
    this.productId.forEach(item => {
        item.selected = false;
    });
    this.selectedItems.forEach(item => {
       item.selected = false;
    });

    this.headerText = "Astro Live Coupon Portal"
    this.saveText = "Submit";
    //this.couponDetail = new AddCoupon();
    this.allPackages = false;
    this.allUsers = false;
    this._form.form.markAsUntouched();
    this._bannerModal.show();
  }

  addClass(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("datepickerOpen");
  }

  getCouponListing(params, filterData) {
    console.log('all coupon list');
    this.loading = true;
    this.allCouponList.getAllCouponListing(params, filterData).subscribe(
      data => {
        console.log('data loaded');
        this.loading = false;
        this.items = data.items;
        this.itemCount = data.count;
        this.loading = false;
      }
    )
  }

  reloadItems(params) {
    this.getCouponListing(params, null)
  }
  

  getUserList(searchStr: string) {
    if (searchStr.length > 3) {
      this.getList(searchStr);
    }
    else {
      this.filteredUsers = [];
      this.selectedItems = [];
    }
  }

  getList(searchStr: string) {
    console.log('User List');
    this.loading = true;
    this.allUserList.getUsersList(searchStr).subscribe(
      data => {
        console.log('data loaded');
        this.loading = false;
        this.filteredUsers = data;
        for (var i = 0; i < this.filteredUsers.length; i++) {
          for (var j = 0; j < this.availableItems.length; j++) {
            if (this.filteredUsers[i].id == this.availableItems[j].id) {
              this.filteredUsers[i].selected = true;
              break;
            }
          }
        }
      }
    )
  }

  getPackage() {
    this.couponList.getPackagesList().subscribe(
      data => {
        console.log('coupon loaded');
        this.filteredCoupon = data.list;
      }
    )
  }

  onUserToList() {
    console.log(this.selectedItems);
    this.selectedItems.forEach(item => {
      var found = false;
      for (var i = 0; i < this.availableItems.length; i++) {
        if (this.availableItems[i].id == item.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        this.availableItems.push(item);
        item.selected = true;
      }
    })
  }

  onAddToList() {
    console.log(this.productId);
    this.productId.forEach(item => {
      console.log(item.id);
      var found = false;
      for (var i = 0; i < this.choosenCoupon.length; i++) {
        if (this.choosenCoupon[i].id == item.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        this.choosenCoupon.push(item);
        item.selected = true;
        //this.getPackageList = false;
      }
    })
  }

  onRemoveToList(index) {
    let item = this.choosenCoupon[index];
    console.log(this.choosenCoupon.length);
    for (var i = 0; i < this.filteredCoupon.length; i++) {
      if (this.filteredCoupon[i].id == item.id) {
        this.filteredCoupon[i].selected = false;
        break;
      }
    }
    this.choosenCoupon.splice(index, 1);
  }

  removeUserItem(index) {
    let item = this.availableItems[index];
    console.log(this.availableItems.length);
    for (var i = 0; i < this.filteredUsers.length; i++) {
      if (this.filteredUsers[i].id == item.id) {
        this.filteredUsers[i].selected = false;
        break;
      }
    }
    this.availableItems.splice(index, 1);
  }

  checkFromDate(event){
    let fromDate = this.validFromDate;
    this.minDate = fromDate;
  }

  OnUpdateCoupon(id: number) {
    this.loading = true;
    this.couponType = null;
    this.choosenCoupon = [];
    this.filteredUsers = [];
    this.availableItems = [];
    this.userInput = '';
    this.productId.forEach(item => {
      item.selected = false;
    })
    this.filteredCoupon.forEach(item => {
      item.selected = false;
    })
    this.allCouponList.getCouponDetail(id).subscribe(
      data => {
        console.log('data loaded');
        this.loading = false;
        this.id = data.items.id;
        this.couponCode = data.items.code;
        this.couponTitle = data.items.title;
        this.deductionValue = data.items.deductionValue;
        this.minAmt = data.items.minAmt;
        this.maxAmt = data.items.maxAmt;
        this.usesPerUser = data.items.usesPerUser;
        
        this.allProducts = data.items.allProducts;
        this.couponType = data.items.couponType;

        this.allUsers = data.items.allUsers;
        this.couponStatus = data.items.active;

        /* this.productId.forEach(item => {
          item.selected = true;
        }) */
        
        if(this.allProducts){
          this.readOnlyProduct = true;
          this.filteredCoupon.forEach(item => {
            item.selected = false;
          })
        }
        else{
          this.readOnlyProduct = false;
        }

        if(this.allUsers){
          this.readOnlyUser = true;
          this.filteredUsers.forEach(item => {
            item.selected = false;
          })
          this.filteredUsers = [];
          this.userInput = null;
        }
        else{
          this.readOnlyUser = false;
        }
    
        data.items.packageslist.forEach(new_item => {
          this.filteredCoupon.forEach(item => {
            if (new_item.id === item.id) {
              var found = false;
              for (var i = 0; i < this.choosenCoupon.length; i++) {
                if (this.choosenCoupon[i].id == item.id) {
                  found = true;
                  break;
                }
              }
              if (!found) {
                this.choosenCoupon.push(item);
                item.selected = true;
                this.getPackageList = true;
              }
            }
          })
            
        });
        
        data.items.userslist.forEach(item => {
              this.availableItems.push(item);
              this.getUser = true;
        });

        var fromDate = new Date(data.items.validFrom);
        this.validFromDate = fromDate;

        var toDate = new Date(data.items.validTo);
        this.validUptoDate = toDate;

        this.minDate = new Date(data.items.validTo);
      }
    )

    
    
    this.readOnly = true;
    this.saveText = "Update";
    this.savingText = "Udating...";
    this.headerText = "Update Coupon";
    this.loading = false;
    this._form.form.markAsUntouched();
    this._bannerModal.show();
  }
  

  onCouponSubmit(form: NgForm) {
    if (this.id) {
        this.updateCoupon(form);
    }
    else{
      this.createCoupon(form);
    }
    //this.createCoupon(form);
    //this.updateCoupon(form);
  }

  createCoupon(form: NgForm){
    if(!this.allProducts && this.productId.length == 0) {
      this.alertService.errorTimedOut("Please select atleast one package", 3000);
      return false;
    }
 
    if(!this.allUsers && this.selectedItems.length == 0) {
      this.alertService.errorTimedOut("Please select atleast one User", 3000);
      return false;
    }
    let chosenProductId: number[] = [];
    let chosenUserId: number[] = [];
    this.productId.forEach(item => {
      chosenProductId.push(item.id);
    });
    this.selectedItems.forEach(item => {
      chosenUserId.push(item.id);
    });

    function toTimestamp(strDate){
      var datum = Date.parse(strDate);
      return datum;
    }
    //alert(toTimestamp(this.validFromDate.toString()));
    let validFromTime = toTimestamp(this.validFromDate.toString()); /* toLocaleDateString */
    //alert((this.validFromDate.toString()));

    //alert(toTimestamp(this.validUptoDate.toString()));
    let validUptoTime = toTimestamp(this.validUptoDate.toString()); /* toLocaleDateString */
    //alert((this.validUptoDate.toString()));

    let data = {
      couponCode: this.couponCode,
      isActive: this.couponStatus,
      couponTitle: this.couponTitle,
      allProducts: this.allProducts,
      productId: chosenProductId,
      allUsers  : this.allUsers,
      usersId: chosenUserId,
      couponType: this.couponType,
      deductionValue: this.deductionValue,
      minAmt: this.minAmt,
      maxAmt: this.maxAmt,
      usesPerUser: this.usesPerUser,
      
      validFrom: validFromTime,
      validTo: validUptoTime,
    
    }
    this.allCouponList.createCoupon(data).subscribe(
			data => {
        this.loading = true;
				if (data.success) {

				  this.alertService.successTimedOut("Coupon saved successfully", 3000);
				} else {
				  this.alertService.errorTimedOut(data.message, 3000);
				}
        this.loading = false;
        this._bannerModal.hide();
        this.reloadItems(this.params);
      },
    )
    
  }

  updateCoupon(form: NgForm){
    let chosenProductId: number[] = [];
    let chosenUserId: number[] = [];
    this.productId.forEach(item => {
      chosenProductId.push(item.id);
    });
    this.selectedItems.forEach(item => {
      chosenUserId.push(item.id);
    });

    function toTimestamp(strDate){
      var datum = Date.parse(strDate);
      return datum;
    }
    //alert(toTimestamp(this.validFromDate.toString()));
    let validFromTime = toTimestamp(this.validFromDate.toString()); /* toLocaleDateString */
    //alert((this.validFromDate.toString()));

    //alert(toTimestamp(this.validUptoDate.toString()));
    let validUptoTime = toTimestamp(this.validUptoDate.toString()); /* toLocaleDateString */
    //alert((this.validUptoDate.toString()));

    let data = {
      id: this.id,
      couponCode: this.couponCode,
      isActive: this.couponStatus,
      couponTitle: this.couponTitle,
      allProducts: this.allProducts,
      productId: chosenProductId,
      allUsers  : this.allUsers,
      usersId: chosenUserId,
      couponType: this.couponType,
      deductionValue: this.deductionValue,
      minAmt: this.minAmt,
      maxAmt: this.maxAmt,
      usesPerUser: this.usesPerUser,
      validFrom: validFromTime,
      validTo: validUptoTime,
    }
    this.allCouponList.updateCoupon(data).subscribe(
			data => {
        this.loading = true;
				if (data.success) {

				  this.alertService.successTimedOut("Coupon updated successfully", 3000);
				} else {
				  this.alertService.errorTimedOut(data.message, 3000);
				}
        this.loading = false;
        this._bannerModal.hide();
        this.reloadItems(this.params);
      },
    )
    
  }
  
}
