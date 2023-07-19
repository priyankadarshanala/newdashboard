import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JobsdetailsService } from 'src/app/jobsdetails.service';

interface ResumeViewModel {
  applicantName: string;
  applicantEmail: string;
  resumeFileName: string;
  resumeFileData: string; // This will be a base64 encoded string
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
  jobDescription: string;
  resumes: ResumeViewModel[];
  showResumes?: boolean; 
}



@Component({
  selector: 'app-candidatessection',
  templateUrl: './candidatessection.component.html',
  styleUrls: ['./candidatessection.component.scss']
})
export class CandidatessectionComponent implements OnInit {
 

  
  jobResumes: JobResumeViewModel[] = [];

  constructor(private http: HttpClient, private jobsint:JobsdetailsService) { }

  ngOnInit(): void {
    
    this.getResumes()

  }

  
  



    getResumes(): void {
      this.jobsint.getResumes().subscribe(resumes => {
        this.jobResumes = resumes;
        this.jobResumes.forEach(jobResume => jobResume.showResumes = false);
        console.log(this.jobResumes); 
      });
    }

    downloadResume(resume: ResumeViewModel): void {
      const link = document.createElement('a');
      link.href = 'data:application/octet-stream;base64,' + resume.resumeFileData;
      link.download = resume.resumeFileName;
      link.click();
    }
    

    toggleResumes(jobResume: JobResumeViewModel): void {
      jobResume.showResumes = !jobResume.showResumes;
    }

  }












