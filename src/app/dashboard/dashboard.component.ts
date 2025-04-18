import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/@url-shortner/services/authentication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav) sideNav: MatSidenav; //Through this we can get reference of sidenav
  navTableContent: boolean = false;
  navDashboardContent: boolean = true;
  navProfileContent: boolean = false;
  navQrContent: boolean = false;
  navSecurityContent: boolean = false;
  currentSideNavItem: string = " / " + "Dashboard";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService:AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  navigate(sideNavContent: string) {
    if(sideNavContent === 'Tables') {
      this.navTableContent = true;
      this.navDashboardContent = false;
      this.navProfileContent = false;
      this.navQrContent = false;
      this.navSecurityContent = false;
      this.currentSideNavItem = " / " + "URL Shortner Table";
    } else if(sideNavContent === 'Dashbaord') {
      this.navTableContent = false;
      this.navDashboardContent = true;
      this.navProfileContent = false;
      this.navQrContent = false;
      this.navSecurityContent = false;
      this.currentSideNavItem = " / " + "Dashboard";
    } else if(sideNavContent === 'Profile') {
      this.navTableContent = false;
      this.navDashboardContent = false;
      this.navProfileContent = true;
      this.navQrContent = false;
      this.navSecurityContent = false;
      this.currentSideNavItem = " / " + "Profile";
    } else if(sideNavContent === 'QR Generator'){
      this.navTableContent = false;
      this.navDashboardContent = false;
      this.navProfileContent = false;
      this.navQrContent = true;
      this.navSecurityContent = false;
      this.currentSideNavItem = " / " + "QR Generator";
    } else if(sideNavContent === 'Security'){
      this.navTableContent = false;
      this.navDashboardContent = false;
      this.navProfileContent = false;
      this.navQrContent = false;
      this.navSecurityContent = true;
      this.currentSideNavItem = " / " + "Security";
    } else {
      //Upgrade to pro
    }
  }

  ngAfterViewInit() {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe(result => {
      if (result.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    })
  }

  logout() {
    this.authService.currentUserSubject.next(null)
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    this.router.navigate(['/login']);
  }
}
