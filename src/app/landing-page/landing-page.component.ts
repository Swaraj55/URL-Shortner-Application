import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  benefits_sections_contents = [
    {
      icons: './assets/group-6.png',
      content: 'Short URL is easy and fast, enter the long link to get your shortened link.',
      bgColor: '#3E4065'
    },
    {
      icons: './assets/group-5.png',
      content: 'Check the amount of clicks that your shortened url received.',
      bgColor: '#33377A'
    },
    {
      icons: './assets/group-4.png',
      content: 'Use any link, no matter what size, ShortURL always shortens.',
      bgColor: '#3E4065'
    },
    {
      icons: './assets/group-2.png',
      content: 'Short URL is easy and fast, enter the long link to get your shortened link.',
      bgColor: '#33377A'
    },
    {
      icons: './assets/group-6.png',
      content: 'Short URL is easy and fast, enter the long link to get your shortened link.',
      bgColor: '#3E4065'
    },
    {
      icons: './assets/group-3.png',
      content: 'Short URL is easy and fast, enter the long link to get your shortened link.',
      bgColor: '#33377A'
    }
  ];

  feature_sections_contents = [
    {
      icons: './assets/group-1.png',
      title: 'URL Shortner',
      sub_points: [
        'URL shortening at scale',
        'URL shortening at scale',
        'URL shortening at scale'
      ],
      content: 'A comprehensive solution to help make every point of connection between your content and your audience more powerful.',
    },
    {
      icons: './assets/group-1.png',
      title: 'QR Codes',
      sub_points: [
        'Fully customizable QR Codes',
        'Fully customizable QR Codes',
        'Fully customizable QR Codes'
      ],
      content: 'QR Code solutions for every customer, business and brand experience',
    },
    {
      icons: './assets/group-1.png',
      title: 'Link in Bio',
      sub_points: [
        'Fully customizable QR Codes',
        'Fully customizable QR Codes',
        'Fully customizable QR Codes'
      ],
      content: 'Link-in-bio, Link Management, to help you curate, package and track your best links',
    },
  ];

  achievements_card_info = [
    {
      count: '500K',
      count_info: 'Global Payments'
    },
    {
      count: '500K',
      count_info: 'Global Payments'
    },
    {
      count: '500K',
      count_info: 'Global Payments'
    },
    {
      count: '500K',
      count_info: 'Global Payments'
    }
  ];

  testimonials = [
    {
      rating_image: 'assets/rating.svg',
      comma_image: 'assets/comma.svg',
      quote: 'This is an amazing product! I highly recommend it to everyone.',
      name: 'Client Name 1',
      position: 'Position 1, Company 1'
    },
    {
      rating_image: 'assets/rating.svg',
      comma_image: 'assets/comma.svg',
      quote: 'This is an amazing product! I highly recommend it to everyone.',
      name: 'Client Name 2',
      position: 'Position 2, Company 2'
    },
    {
      rating_image: 'assets/rating.svg',
      comma_image: 'assets/comma.svg',
      quote: 'This is an amazing product! I highly recommend it to everyone.',
      name: 'Client Name 2',
      position: 'Position 2, Company 2'
    }
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
