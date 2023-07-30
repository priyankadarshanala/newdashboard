import { Component, OnInit } from '@angular/core';
import { AppStoreService } from 'src/app/app-store.service';

import { JobsdetailsService } from 'src/app/jobsdetails.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthnService } from 'src/app/services/authn.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-app-applied',
  templateUrl: './app-applied.component.html',
  styleUrls: ['./app-applied.component.scss']
})
export class AppAppliedComponent implements OnInit {
  appliedJobs: any[]=[];
  itemsPerPage: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  displayedAppliedJobs: any[] = [];

appliedUsername:string='';
  constructor(private jobsint: JobsdetailsService, private authn:AuthnService, private userStore:AppStoreService) {
    this.totalPages = Math.ceil(this.appliedJobs.length / this.itemsPerPage);
    this.generatePageNumbers();
  }
  ngOnInit() {

    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.authn.getfullNameFromToken();
      this.appliedUsername = val || fullNameFromToken;

      if (this.appliedUsername) {
        this.jobsint.getAppliedJobsByUser(this.appliedUsername).subscribe((data: any) => {
          console.log('Applied Username:', this.appliedUsername);

          this.appliedJobs = data;
          this.totalPages = Math.ceil(this.appliedJobs.length / this.itemsPerPage);
          this.generatePageNumbers();
          this.updateDisplayedAppliedJobs();
        });
      }
    });
  





}
updateDisplayedAppliedJobs() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.displayedAppliedJobs = this.appliedJobs.slice(startIndex, endIndex);
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updateDisplayedAppliedJobs();
    this.generatePageNumbers();
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updateDisplayedAppliedJobs();
    this.generatePageNumbers();
  }
}

goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updateDisplayedAppliedJobs();
  }
}

generatePageNumbers() {
  this.pages = [];
  for (let i = 1; i <= this.totalPages; i++) {
    this.pages.push(i);
  }
}

  
}
