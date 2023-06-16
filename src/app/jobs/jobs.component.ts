import { Component, OnInit } from '@angular/core';
import { JobsdetailsService } from '../jobsdetails.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {


  constructor(private jobsint:JobsdetailsService ,private location: Location) { }
    jobsList:any
    istrue = false
  
   

      ngOnInit(): void {}
    
    
      postcontact(data: any){
    
        this.jobsint.postmethod(data).subscribe(result=>{
          this.istrue=true;
          console.log(result);
          location.reload();
      
        
      })
     
        
    }

    goBack() {
      this.location.back();
    }

  }

   

    

