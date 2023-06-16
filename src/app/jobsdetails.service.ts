import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsdetailsService {
 

  constructor(private http:HttpClient) { }


baseUrl = 'https://localhost:7058/api/Jobs/addjobsdata';
Url = 'https://localhost:7058/api/Jobs/Jobs';
getmethod(){
  return this.http.get<any>(this.Url)
}

postmethod(data:any){

  return this.http.post(this.baseUrl,data)
}




}
