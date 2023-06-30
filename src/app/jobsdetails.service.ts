import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsdetailsService {
  selectedJob: any;

  constructor(private http:HttpClient) { }


baseUrl = 'https://localhost:7058/api/Jobs/Addjobsdata';
Url = 'https://localhost:7058/api/Jobs/Jobs';

applyjobsurl = "https://localhost:7058/api/Applied/ApplyForJob";
getappliedurl = "https://localhost:7058/api/Applied/AppliedJobs";

// editurl = "https://localhost:7058/api/Jobs/editjobsdata"
// deleteurl = "https://localhost:7058/api/Jobs/deletejobsdata"
getmethod(): Observable<any>{
  return this.http.get<any>(this.Url)
}

postmethod(data:any): Observable<any>{

  return this.http.post(this.baseUrl,data)
}

getapplied(){
  return this.http.get(this.getappliedurl)
}
editmethod(jobId: number, data: any): Observable<any> {
  const editurl = `https://localhost:7058/api/Jobs/editjobsdata/${jobId}`;
  return this.http.put(editurl, data);
}

deletemethod(jobId: number){
  const deleteurl = `https://localhost:7058/api/Jobs/deletejobsdata/${jobId}`;
  return this.http.delete(deleteurl)
}

}
