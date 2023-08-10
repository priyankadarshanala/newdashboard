
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

export interface RecentApplicantViewModel {
  applicantName: string;
  applicantEmail: string;
  jobTitle: string;
  companyLocation: string;
  skills: string;
  applicationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobscountService {
  private apiUrl = 'https://localhost:7058/api/Jobs';
  private ApiUrl = 'https://localhost:7058/api/Resumes';
  private RecentApplicant = 'https://localhost:7058/api/Resumes/RecentApplicants';

  constructor(private http: HttpClient) {}

  getRecentApplicants(): Observable<RecentApplicantViewModel[]> {
    return this.http.get<RecentApplicantViewModel[]>(this.RecentApplicant).pipe(
      catchError((error: any) => {
        console.error('Error fetching recent applicants:', error);
        return [];
      })
    );
  }

  getTotalJobsCount(username: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/${username}`);
  }

  getTotalApplicantsCount(username: string): Observable<number> {
    return this.http.get<number>(`${this.ApiUrl}/TotalApplicantsCount/${username}`);
  }

  getTotalAppliedJobsCount(username: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/TotalAppliedJobsCount/${username}`);
  }

  getNotAppliedJobsCount(username: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/NotAppliedJobsCount/${username}`);
  }

}