import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppliedJobsService } from 'src/app/applied-jobs.service';
import { JobsdetailsService } from 'src/app/jobsdetails.service';

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
  
id:any;
  showUploadPopupFlag: boolean = false;
  constructor(private jobsint:JobsdetailsService, private appliedJobsService: AppliedJobsService, private http: HttpClient) { 
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
    this.jobsint.getmethod().subscribe(data => {
      this.jobsList = data;
      
      this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
      this.generatePageNumbers();
      this.updateDisplayedJobs();

      
    });
  }

  
  apply(item: any) {
    const endpoint = 'https://localhost:7058/api/Applied/ApplyForJob';
  
    this.http.post(endpoint, { jobsObj: item }).subscribe(
      response => {
        console.log('Applied for the job:', response);
        alert("Job applied success")
      
         item.applied=true
  
        
       
      }
    );

       }
      




       showUploadPopup() {
        this.showUploadPopupFlag = true;
      }
    
      cancelUploadPopup() {
        this.showUploadPopupFlag = false;
      }
    
      // saveUploadedResume(file: File) {
      //   // Handle the uploaded file here
      //   console.log(file);
      //   this.showUploadPopupFlag = false;
      // }

      // saveResume(fileInput: any) {
      //   const file: File = fileInput.files[0];
      //   this.jobsint.uploadResume(file).subscribe(
      //     response => {
           
      //       console.log('Resume uploaded successfully:', response);
      //       alert("Resemue uploaded sucessfully")
         
      //     },
        
      //   );
      // }

      saveResume(fileInput: any) {
        const file: File = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
      
        this.http.post('https://localhost:7058/api/ResumeClass', formData).subscribe(
          (response: any) => {
            const resumeId = response.resumeId;
            if (resumeId) {
              console.log('Resume uploaded successfully. Resume ID:', resumeId);
              alert("Resume uploaded successfully. Resume ID: " + resumeId);
              this.downloadResume(resumeId);
            } else {
              console.error('Resume ID not found in the response.');
              alert("Resume ID not found in the response. Please try again.");
            }
          },
          (error: any) => {
            console.error('Error uploading resume:', error);
            alert("Error uploading resume. Please try again.");
          }
        );
      }
      
      downloadResume(resumeId: number) {
        if (resumeId) {
          const url = `https://localhost:7058/api/ResumeClass/${resumeId}`;
      
          this.http.get(url, { responseType: 'blob' }).subscribe(
            (response: Blob) => {
              const downloadUrl = window.URL.createObjectURL(response);
              const link = document.createElement('a');
              link.href = downloadUrl;
              link.download = `resume_${resumeId}.pdf`; // Replace with the appropriate file name and extension
              link.click();
              window.URL.revokeObjectURL(downloadUrl);
            },
            (error: any) => {
              console.error('Error downloading resume:', error);
              alert('Error downloading resume. Please try again.');
            }
          );
        } else {
          console.error('Invalid resumeId');
          alert('Invalid resumeId. Please try again.');
        }
      
  }
}
