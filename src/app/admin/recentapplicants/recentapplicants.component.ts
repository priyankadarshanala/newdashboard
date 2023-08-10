import { Component, OnInit } from '@angular/core';
import { JobscountService, RecentApplicantViewModel } from 'src/app/services/jobscount.service';

@Component({
  selector: 'app-recentapplicants',
  templateUrl: './recentapplicants.component.html',
  styleUrls: ['./recentapplicants.component.scss']
})
export class RecentapplicantsComponent implements OnInit {
  recentApplicants: RecentApplicantViewModel[] = [];
  visibleApplicantCount = 10; // Number of applicants to show initially

  constructor(private jobsCountService: JobscountService) { }

  ngOnInit(): void {
    this.getRecentApplicants();
  }


  getRecentApplicants(): void {
    this.jobsCountService.getRecentApplicants().subscribe(
      applicants => {
        // Sort the applicants based on the most recent ones first (using the 'applicationDate' property)
        applicants.sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());
        // Limit the number of applicants to show
        this.recentApplicants = applicants.slice(0, this.visibleApplicantCount); // Use 'visibleApplicantCount' instead of 'maxRecentApplicantsToShow'
      },
      error => {
        console.error('Error fetching recent applicants:', error);
      }
    );
  }
  
  



}
