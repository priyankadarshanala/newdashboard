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
  itemsPerPage: number = 20; 
  currentPage: number = 1; 
  totalPages: number = 0; 
  pages: number[] = []; 
  displayedJobsList: any[] = [];
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
   

    goBack() {
      this.location.back();
    }
    
}


// ngOnInit(): void {
  
//   this.jobsint.getmethod().subscribe(data=>{
//    this.jobsList=data
//  })
//  console.log(this.jobsList);
//  }
