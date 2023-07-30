import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AppStoreService } from 'src/app/app-store.service';
import { AppliedJobsService } from 'src/app/applied-jobs.service';
import { JobsdetailsService } from 'src/app/jobsdetails.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthnService } from 'src/app/services/authn.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-app-jobs',
  templateUrl: './app-jobs.component.html',
  styleUrls: ['./app-jobs.component.scss']
})
export class AppJobsComponent implements OnInit {
  jobsList: any[] = [];
  itemsPerPage: number = 12; 
  currentPage: number = 1; 
  totalPages: number = 0; 
  pages: number[] = []; 
  
  
  displayedJobsList: any[] = [];

  showUploadPopupFlag: boolean = false;
 
  resumeData: any = {};
  
  appliedUsername:string='';
id:any;

  constructor( private toast: NgToastService,private jobsint:JobsdetailsService, private appliedJobsService: AppliedJobsService, private http: HttpClient, private authn:AuthnService, private userStore:AppStoreService) { 
    this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
    this.generatePageNumbers();
  }
  updateDisplayedJobs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedJobsList = this.jobsList.slice(startIndex, endIndex);

  

  }
  toggleDetails(item: any) {
    item.showDetails = !item.showDetails;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
      window.scrollTo(0, 0);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
      window.scrollTo(0, 0);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedJobs();
      // this.generatePageNumbers(); 
    }
  }
 
  generatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  
  istrue = false
  ngOnInit(): void {

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.authn.getfullNameFromToken();
      this.appliedUsername = val || fullNameFromToken
    });

    this.jobsint.getmethod(this.appliedUsername).subscribe(data => {
      this.jobsList = data;
      
      this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
      this.generatePageNumbers();
      this.updateDisplayedJobs();

      
    });
  }

  apply(username: string, item: any) {
    // Assuming you have a way to get the username (e.g., from authentication or user input)
    // If not, you'll need to obtain the username before calling this method
  
    this.jobsint.postappliedByUser(this.appliedUsername, item).subscribe(
      response => {
        console.log('Applied for the job:', response);
        alert("Job applied successfully");
        this.toast.success({detail:"Job applied successfully", duration: 3000});
        item.ischecked = true;
      }
    );
  
    }
  
  
   
  
  
      

       cancelUpload() {
        this.showUploadPopupFlag = false;
       
       }

       openUploadPopup(jobId: number) {
        this.showUploadPopupFlag = true;
        this.resumeData.jobId = jobId; 
      }



      onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.resumeData.resumeFile = file;
      }

      uploadResume() {
        const formData = new FormData();
        formData.append('Name', this.resumeData.name);
        formData.append('Email', this.resumeData.email);
        formData.append('ResumeFile', this.resumeData.resumeFile);
      
        const jobId = this.resumeData.jobId; 
      
        this.http.post(`https://localhost:7058/api/Resumes/${jobId}`, formData)
          .subscribe(
            response => {
             
              console.log('Resume uploaded successfully.');
              alert("Resume uploaded sucessfully")
             
              
            }
          );
      }


   
      
    
}
