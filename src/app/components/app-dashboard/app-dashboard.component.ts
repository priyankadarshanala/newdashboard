import { Component, OnInit } from '@angular/core';
import { AppStoreService } from 'src/app/app-store.service';
import { JobsdetailsService } from 'src/app/jobsdetails.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthnService } from 'src/app/services/authn.service';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
  public users:any = [];
  public role!:string;
  public fullName : any=[];
  constructor(private api:ApiService ,private authn: AuthnService, private jobsint: JobsdetailsService, private userStore: AppStoreService) { }
applicant:any;
  ngOnInit(): void {

    this.api.getApplicant()
    .subscribe(res=>{
    this.users = res;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.authn.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.authn.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  logout(){
    this.authn.signOut();
  }


}
