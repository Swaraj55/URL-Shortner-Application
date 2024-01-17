import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {LandingPageComponent} from './landing-page.component';
import { NgwWowModule } from 'ngx-wow';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LandingPageComponent]
})
export class LandingPageModule { }
