import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TermsAndConditionComponent>
  ) {}

  ngOnInit(): void {
   
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  accept(): void {
    this.dialogRef.close('accepted');
  }
}
