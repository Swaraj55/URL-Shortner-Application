import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';

import { UrlShortenTableModule } from './url-shorten-table/url-shorten-table.module';
import { DashboardMainModule } from './dashboard-main/dashboard-main.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { QrGeneratorModule } from './qr-generator/qr-generator.module';
import { SecurityModule } from './security/security.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    UrlShortenTableModule,
    DashboardMainModule,
    UserProfileModule,
    QrGeneratorModule,
    SecurityModule,

    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
