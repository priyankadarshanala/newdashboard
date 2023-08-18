import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

import { JobsdetailsService } from 'src/app/jobsdetails.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

interface ResumeViewModel {
  resumeId:number;
  applicantName: string;
  applicantEmail: string;
  resumeFileName: string;
  resumeFileData: string; // This will be a base64 encoded string
  rejectionReason: string; // Add this property to support rejectionReason
  scheduleMeetingDate: Date;
  status: string; // Add this property to support scheduleMeetingDate
  jobId: number;

  isStatusSelected: boolean;
}

interface JobResumeViewModel {
  jobId: number;
  companyName: string;
  jobTitle: string;
  experience: string;
  skills: string;
  jobType: string;
  postedDate: string;
  location: string;
  salary:number;
  endDate:string;
  positions:number;
  qualification:string;
  jobDescription: string;
  resumes: ResumeViewModel[];
  showResumes?: boolean; 
  statusInput?: string;
}



@Component({
  selector: 'app-candidatessection',
  templateUrl: './candidatessection.component.html',
  styleUrls: ['./candidatessection.component.scss'],
  providers: [LocalStorageService],
})
export class CandidatessectionComponent implements OnInit {
 

  jobResumes: JobResumeViewModel[] = [];
  showResumesPopup: boolean = false;
  selectedResumes: ResumeViewModel[] = [];
  currentPage = 1;
  itemsPerPage = 2;
  totalItems = 0;
  paginatedResumes: any[] = [];
  totalPages!: number ;
username:string='';
  
isDatePickerOpen = false;
  scheduleMeetingDate!: Date;
RejectionReason: string = '';
meetingDates: { [key: number]: Date } = {};
rejectionReasons: { [key: number]: string } = {};
  statusmessage: any;
  serialNumbers: number[] = [];
  constructor(private http: HttpClient,private localStorage: LocalStorageService, private jobsint: JobsdetailsService, private userStore:UserStoreService, private auth:AuthService) {
  
  }

  ngOnInit(): void {

    

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.username = val || fullNameFromToken
    });

  

    this.getResumes(this.username);
    this.serialNumbers = Array.from({ length: this.selectedResumes.length }, (_, index) => index + 1);
  
  }
  paginateResumes() {
    if (this.currentPage === 1) {
      this.paginatedResumes = this.selectedResumes.slice(0, this.itemsPerPage);
    } else if (this.currentPage === 2) {
      this.paginatedResumes = this.selectedResumes.slice(this.itemsPerPage);
    } else {
      this.paginatedResumes = [];
    }
  }
  getResumes(username: string): void {
    this.jobsint.getResumes(username).subscribe(resumes => {
      this.jobResumes = resumes;
    
  });
  }

 downloadResume(resume: ResumeViewModel): void {
    const link = document.createElement('a');
    link.href = 'data:application/octet-stream;base64,' + resume.resumeFileData;
    link.download = resume.resumeFileName;
    link.click();
  }

  openResumesPopup(jobResume: JobResumeViewModel): void {
    this.selectedResumes = jobResume.resumes;
    this.showResumesPopup = true;
    this.totalItems = this.selectedResumes.length;
    this.paginateResumes();
    this.calculateTotalPages();
   }

   calculateTotalPages() {
    this.totalPages = Math.ceil(this.selectedResumes.length / this.itemsPerPage);
  }

  changePage(change: number) {
    const newPage = this.currentPage + change;
    
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.paginateResumes();
    }
  }
  
  closeResumesPopup(): void {
    this.showResumesPopup = false;
    this.selectedResumes = [];
  }

scheduleMeeting(resume: ResumeViewModel) {
    const resumeId = resume.resumeId;
    const selectedDate = this.meetingDates[resumeId]; // Get the selected date for the specific applicant
    const meetingDateTime = new Date(selectedDate).toISOString();

    this.http.post(`https://localhost:7058/api/Resumes/${resumeId}/ScheduleMeeting`, { scheduleMeetingDate: meetingDateTime })
      .subscribe(
        (response: any) => {
          resume.scheduleMeetingDate = selectedDate; // Update the resume.scheduleMeetingDate property with selectedDate
          alert("meeting sheduled")
          resume.isStatusSelected=true;
          resume.status = 'Meeting Scheduled'; // Update the status property name
          // resume.disableActions = true; // Disable other actions
          
        },
        (error: any) => {
          console.error(error);
          // Handle error if needed
        }
      );
  }

  rejectResume(resume: any) {
    const resumeId = resume.resumeId;
    const reason = this.rejectionReasons[resumeId]; // Get the rejection reason for the specific applicant

    this.http.post(`https://localhost:7058/api/Resumes/${resumeId}/Reject`, { RejectionReason: reason }) // Update the property name
      .subscribe(
        (response: any) => {
          resume.RejectionReason = reason; // Update the resume.RejectionReason property with reason
          alert("Rejected ")
          resume.status = 'Rejected'; // Update the status property name
          resume.isStatusSelected=true;
          // resume.disableActions = true; // Disable other actions
         
        },
        (error: any) => {
          console.error(error);
          // Handle error if needed
        }
      );
  }

  getMinMeetingDate(): string {
    const currentDate = new Date().toISOString();
    // Assuming you want to allow scheduling meetings only for dates in the future
    return currentDate.slice(0, 16);
  }

  getMaxMeetingDate(): string {
    // Assuming you want to set some maximum limit for scheduling meetings, e.g., 30 days from the current date
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().slice(0, 16);
  }

  getFormattedStatus(resume: any): string {
    if (resume.status === 'Meeting Scheduled') {
      // Assuming you have a meeting time property in the resume data called `meetingTime`
      return `Meeting scheduled at ${resume.scheduleMeetingDate}`;
    } else if (resume.status === 'Rejected') {
      // Assuming you have a rejection reason property in the resume data called `rejectionReason`
      return `Rejected: ${resume.rejectionReason}`;
    } else {
       return 'Action needed';
      
    } 
  }
  getCurrentUtcDate(): Date {
    return new Date(); // Returns the current date and time
  }




  isDateFormatted(value: string): boolean {
    return !!value && !isNaN(Date.parse(value));
  }
  
}















 
