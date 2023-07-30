import { Component, OnInit } from '@angular/core';
import { JobsdetailsService } from '../jobsdetails.service';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStoreService } from '../services/user-store.service';



@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  router: any;
username:string = '';

  constructor(private jobsint:JobsdetailsService ,private location: Location, private auth: AuthService, private http:HttpClient, private userStore:UserStoreService) { }
    jobsList:any
    istrue = false
  
   

      ngOnInit(): void {
        this.userStore.getFullNameFromStore()
        .subscribe(val=>{
          const fullNameFromToken = this.auth.getfullNameFromToken();
          this.username = val || fullNameFromToken
        });

      }
    
    
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

   

    

