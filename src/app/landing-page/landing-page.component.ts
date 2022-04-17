import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private ngwWowService: NgwWowService,
    private router: Router
  ) {
    this.ngwWowService.init();
  }

  ngOnInit(): void {
  }
}
