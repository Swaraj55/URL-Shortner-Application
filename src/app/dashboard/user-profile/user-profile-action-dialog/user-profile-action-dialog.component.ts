import {Component, Inject, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as countries from 'countries-list';

@Component({
  selector: 'app-user-profile-action-dialog',
  templateUrl: './user-profile-action-dialog.component.html',
  styleUrls: ['./user-profile-action-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileActionDialogComponent implements OnInit {

  stepOneFormGroup: FormGroup;
  stepTwoFormGroup: FormGroup;
  stepThreeFormGroup: FormGroup;

  countryList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserProfileActionDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let country = countries.countries;
    for (const [key, value] of Object.entries(country)) {
      // console.log(key, value);
      this.countryList.push({
        countryName: value.name,
        nativeName: value.native,
        phone: value.phone,
        currency: value.currency,
        capital: value.capital
      });
    }
    // Building the form for the stepper.
    this.stepOneFormGroup = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      Occupation: ['', [Validators.required]],
    });

    this.stepTwoFormGroup = this.fb.group({
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
    });

    this.stepThreeFormGroup = this.fb.group({
      about: ['', [Validators.required]],
    })
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  selectionChange(event: any) {

  }

  onNoClick(): void {
      this.dialogRef.close();
  }


}
