import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { JobsComponent } from './jobs/jobs.component';
import { JobssectionComponent } from './jobssection/jobssection.component';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppSignupComponent } from './components/app-signup/app-signup.component';
import { AuthnGuard } from './guard/authn.guard';




const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'app-login', component:AppLoginComponent},
  {path: 'dashboard', component:DashboardComponent, canActivate:[ AuthnGuard], children:[
    
    {path: 'home', component:JobssectionComponent},
    { path: 'jobs', component: JobsComponent }
  ]},
  {path:'signup', component:SignupComponent},
  {path:'app-signup', component:AppSignupComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard], children:[
    
    {path: 'home', component:JobssectionComponent},
    { path: 'jobs', component: JobsComponent }
  ]
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
