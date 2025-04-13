import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  testimonials = [
    { name: 'Swaraj KC', text: 'Very satisfied with the services\namazing experience', rating: 5 },
    { name: 'Swaraj KC', text: 'Very satisfied with the services\namazing experience', rating: 5 },
    { name: 'Swaraj KC', text: 'Very satisfied with the services\namazing experience', rating: 5 }
  ];
  
  constructor(
    private router: Router
  ) {

  }

  navigateTo() {
    this.router.navigate(['/signup'])
  }

  ngOnInit(): void {
    
  }
}
