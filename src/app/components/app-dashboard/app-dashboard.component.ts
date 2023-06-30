import { Component, OnInit } from '@angular/core';
import { AuthnService } from 'src/app/services/authn.service';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {

  constructor(private authn: AuthnService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authn.signOut();
  }

}
