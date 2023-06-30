import { Component, OnInit } from '@angular/core';
import { JobsdetailsService } from '../jobsdetails.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-jobssection',
  templateUrl: './jobssection.component.html',
  styleUrls: ['./jobssection.component.scss']
})
export class JobssectionComponent implements OnInit {
  jobsList: any[] = [];
  itemsPerPage: number = 6; 
  currentPage: number = 1; 
  totalPages: number = 0; 
  pages: number[] = []; 
  displayedJobsList: any[] = [];
  selectedJob: any = {};
 
  showEditFormFlag = false;

  
  constructor(private jobsint:JobsdetailsService , private location: Location) { 
    this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
    this.generatePageNumbers();
  }
  updateDisplayedJobs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedJobsList = this.jobsList.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
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
  
  // onSubmit(){
  //   console.log(this.selectedJob)
  // }
  showEditForm(job: any) {
    this.selectedJob = { ...job }; // Create a copy of the selected job to avoid modifying the original data directly
    this.showEditFormFlag = true;
  }
 
  hideEditForm(): void {
    this.showEditFormFlag = false;
  }

  cancelEditForm(): void {
    this.showEditFormFlag = false;

  }


// editdata(data:any){
//   this.jobsint.edit(jobId,data).subscribe

onSubmit() {
  this.jobsint.editmethod(this.selectedJob.jobId, this.selectedJob).subscribe(
    (response) => {
      // Handle success response
      alert("Job updated successfully");
      console.log('Job updated successfully:', response);
      this.hideEditForm(); // Hide the edit form after successful update
      window.location.reload();
    }
  );
}

delete(jobId:number){
  if (confirm('Are you sure you want to delete this job?')){
  this.jobsint.deletemethod(jobId).subscribe(
    (response) =>{
      alert("Job Deleted Successfully")
      console.log("deleted", response)
      window.location.reload();
    }
  )
}
}

}



