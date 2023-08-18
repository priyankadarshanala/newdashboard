import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { JobscountService, WeekJobsCount } from 'src/app/services/jobscount.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {
  @Input() jobLabels!: string[]; // Labels for job categories (e.g., packages)
  @Input() applicantData!: number[]; // Number of applicants for each job category

  // lineChartLabels: string[] = [];
  // lineChartData: any[] = [];
  // lineChartOptions: ChartOptions = {
  //   responsive: true
  // };
  // lineChartLegend = true;
  // lineChartType = 'line';
 // constructor(private jobscount:JobscountService) { }

  // ngOnInit(): void {
  //   //this.lineChartLabels = this.jobLabels;
  //   //this.lineChartData = [{ data: this.applicantData, label: 'Applicants vs Jobs' }];
  // }

  username:string=''
  lineChartData: any = {
    labels: [],
    datasets: [{
      data: [],
      label: 'JobsPosting Pecentage weekly',
      fill: true
    }],
    options: {
      scales: {
        y: {
          beginAtZero: true // This ensures the y-axis starts from 0
        }
      }
    }
  };
  
  constructor( private fb: FormBuilder,   private auth: AuthService, private jobsCountService: JobscountService, private userStore: UserStoreService,
    private cdr: ChangeDetectorRef) {  }

  ngOnInit(): void {
    this.userStore.getFullNameFromStore()
      .subscribe(val => {
        const fullNameFromToken = this.auth.getfullNameFromToken();
        this.username = val || fullNameFromToken;
      
       this.populateChartData();
      });
  }
  async populateChartData(): Promise<void> {
    const username = this.username;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentWeek = this.getWeekNumber(currentDate);
    const numberOfWeeksToShow = 5;
  
    const weekData: WeekJobsCount[] = await this.jobsCountService.getJobsCountPerWeek(username, currentYear, currentWeek).toPromise() || [];
    console.log("Week Data:", weekData);
    const upcomingWeek = (currentWeek + 1) % 53;
    console.log("Upcoming Week:", upcomingWeek);
  
    const weekLabels = [];
    const weekCounts: number[] = new Array(numberOfWeeksToShow).fill(0); // Initialize the array with zeros
  
    for (let i = 0; i < numberOfWeeksToShow; i++) {
      const week = upcomingWeek - i >= 1 ? upcomingWeek - i : 53 + (upcomingWeek - i);
      const weekEntry = weekData.find(entry => entry.weekNumber === week);
  
      weekLabels.unshift(`Week ${week}`);
      if (weekEntry) {
        weekCounts[i] = weekEntry.jobsCount; // Assign the count to the corresponding index
      }
    }
  
    console.log("Week Labels:", weekLabels);
    console.log("Week Counts:", weekCounts);
  
    this.lineChartData.labels = weekLabels;
    this.lineChartData.datasets[0].data = weekCounts;
  }
  private getWeekNumber(date: Date): number {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil(((+d - +new Date(d.getFullYear(), 0, 1)) / 86400000 + 1) / 7);
  }
}
