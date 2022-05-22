import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  isNewShortUrlsData: boolean = true;
  isUrlStatusData: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
