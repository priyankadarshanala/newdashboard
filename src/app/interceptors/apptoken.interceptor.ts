import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthnService } from '../services/authn.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenuserApiModel } from '../models/tokenuser-api.model';

@Injectable()
export class ApptokenInterceptor implements HttpInterceptor {

 
  constructor(private auth: AuthnService, private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    
    // this.start.load();

    
    if(myToken){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`}  // "Bearer "+myToken
      });
    } 
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            if (myToken){
              return this.handleUnAuthorizedError(request, next);
            }
            //this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
            //this.router.navigate(['login'])
            //handle
          
          }
        }
        return throwError(()=> err)
      })
    );
  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    let tokeuserApiModel = new TokenuserApiModel();
    tokeuserApiModel.accessToken = this.auth.getToken()!;
    tokeuserApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokeuserApiModel)
    .pipe(
      switchMap((data:TokenuserApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization:`Bearer ${data.accessToken}`}  // "Bearer "+myToken
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
          this.router.navigate(['app-login'])
        })
      })
    )   
}
}
