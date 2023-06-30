import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppliedJobsService {
  private appliedJobs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  getAppliedJobs() {
    return this.appliedJobs.asObservable();
  }

  addAppliedJob(job: any) {
    const appliedJobs = this.appliedJobs.getValue();
    appliedJobs.push(job);
    this.appliedJobs.next(appliedJobs);
  }
}
