import { AstroAvailabilityReport } from './../../../shared/model/astro-availability-report.model';

import { AstroavailabilityService } from './../../../services/astroavailability.service';

import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  templateUrl: 'astroavailabilityreport.component.html',
  providers: [AstroavailabilityService]
})
export class AstroavailabilityreportComponent implements OnInit {
  public astroAvailabilityreport:AstroAvailabilityReport;
  loading : boolean;
  bsValue: Date;
  maxDate: Date;
 
  bsValueStr: string;
  bsDateAPIStr: string;
 
  transformDate(date, format) {
   return this.datePipe.transform(date, format);
 }
  constructor(private astroavailabilityService:AstroavailabilityService,
    private datePipe: DatePipe,
    ) {
      this.maxDate = new Date();
    }
    ngOnInit(){
      this.loading = true;
      this.bsValue = new Date();
      this.bsValueStr = this.transformDate(this.bsValue, 'M/d/y');
      this.bsDateAPIStr = this.transformDate(this.bsValue, 'y-M-d');
    }
    
    getastroavailability(date:string){
      this.loading = true;
     this.astroavailabilityService.getAstroAvailabilityReport(date).subscribe(      
           data => {
            this.loading = false;
            console.log(data);
             this.astroAvailabilityreport = data;
                         
           }
         )
   }
   onChangeGetDetail(){
     this.bsDateAPIStr = this.transformDate(this.bsValue, 'y-M-d');
     this.getastroavailability(this.bsDateAPIStr);
   }
  
}
