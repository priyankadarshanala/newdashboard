import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { JobscountService, RecentApplicantViewModel } from 'src/app/services/jobscount.service';
import { ActivatedRoute } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
selector: 'app-recentapplicants',
templateUrl: './recentapplicants.component.html',
styleUrls: ['./recentapplicants.component.scss']
})
export class RecentapplicantsComponent implements OnInit {
username: string = '';
pieChartData = {
labels: ["Scheduledmeeting", "Nostatus", "Rejectmeeting"],
datasets: [
{
data: [0, 0, 0], // Initialize with zeros
label: 'weekly',
backgroundColor: [
'rgba(255, 0, 25, 0.7)',
'rgba(157, 0, 25, 0.7)',
'rgba(67, 0, 25, 0.7)',
],

  },
],
};
pieChartOption = {
responsive: false,
};

constructor(
private userStore: UserStoreService,
private auth: AuthService,
private jobsCountService: JobscountService,
private route: ActivatedRoute,
private cdr: ChangeDetectorRef
) {}

ngOnInit(): void {
this.userStore.getFullNameFromStore().subscribe(val => {
const fullNameFromToken = this.auth.getfullNameFromToken();
this.username = val || fullNameFromToken;
});

this.getJobsCounts();
}

getJobsCounts(): void {
const schedulingMeetingCount$ = this.jobsCountService.getSchedulingMeetingCount(this.username);
const noStatusCount$ = this.jobsCountService.getNoStatusCount(this.username);
const rejectedCount$ = this.jobsCountService.getRejectedCount(this.username);
const allCounts$ = forkJoin([schedulingMeetingCount$, noStatusCount$, rejectedCount$]);
allCounts$.subscribe(
([schedulingMeetingCount, noStatusCount, rejectedCount]: [number, number, number]) => {
console.log('Fetched Data:', schedulingMeetingCount, noStatusCount, rejectedCount);
this.pieChartData.datasets[0].data = [schedulingMeetingCount, noStatusCount, rejectedCount];
this.cdr.detectChanges(); // Manually trigger change detection
console.log('Updated Pie Chart Data:', this.pieChartData);
},
(error: any) => {
const errorMessage = error.error && error.error.message ? error.error.message : 'An error occurred.';
console.error('Error fetching data: ', errorMessage);
}
);
}
}