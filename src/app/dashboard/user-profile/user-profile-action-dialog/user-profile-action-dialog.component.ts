import { StepperSelectionEvent } from '@angular/cdk/stepper';
import {Component, Inject, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import * as countries from 'countries-list';

@Component({
  selector: 'app-user-profile-action-dialog',
  templateUrl: './user-profile-action-dialog.component.html',
  styleUrls: ['./user-profile-action-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileActionDialogComponent implements OnInit {
  stepOneFormGroup: FormGroup;
  stepTwoFormGroup: FormGroup;
  stepThreeFormGroup: FormGroup;

  firstFormData: any;
  secondFormData: any;
  thirdFormData: any;

  showAllData: any = [];
  countryList: any[] = [];
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<UserProfileActionDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.local_data = {...data};
    console.log('local_data ', this.local_data);
  }

  ngOnInit(): void {
    let country = countries.countries;
    for (const [key, value] of Object.entries(country)) {
      // console.log(key, value);
      this.countryList.push({
        countryName: value.name,
        nativeName: value.native,
        phone: value.phone,
        currency: value.currency,
        capital: value.capital,
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
      phoneNo: [''],
    });

    this.stepThreeFormGroup = this.fb.group({
      about: ['', [Validators.required]],
    });

    if(this.local_data.action === 'Edit') {
      let username = (this.local_data.username).split(' ');
      this.stepOneFormGroup.patchValue({
        firstname: username[0],
        lastname: username[1],
        email: this.local_data.email,
      });
      this.stepOneFormGroup.controls['email'].disable();

    }

    if(this.local_data.action === 'Update') {
      // console.log((this.local_data.username).split(' '))
      let username = (this.local_data.username).split(' ');
      this.stepOneFormGroup.patchValue({
        firstname: username[0],
        lastname: username[1],
        email: this.local_data.email,
        Occupation: this.local_data.occupation,
      });
      this.stepOneFormGroup.controls['email'].disable();

      this.stepTwoFormGroup.patchValue({
        address: this.local_data.address,
        country: this.local_data.country,
        phoneNo: this.local_data.phone_no,
      });

      this.stepThreeFormGroup.patchValue({
        about: this.local_data.about,
      });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectionChange(event: StepperSelectionEvent) {
    // console.log('selectionChange ', event);

    this.showAllData.length = 0;
    this.showAllData.push(this.getConfiguredData());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getConfiguredData(): any {
    this.firstFormData = this.stepOneFormGroup.getRawValue();
    this.secondFormData = this.stepTwoFormGroup.getRawValue();
    this.thirdFormData = this.stepThreeFormGroup.getRawValue();

    let  formValue = {};
    formValue = {
      first_name: this.firstFormData.firstname,
      last_name: this.firstFormData.lastname,
      email: this.firstFormData.email,
      occupation: this.firstFormData.Occupation,
      address: this.secondFormData.address,
      country: this.secondFormData.country,
      phone_no: this.secondFormData.phoneNo,
      about: this.thirdFormData.about,
      action: this.local_data.action,
      create_time: new Date().getTime(),
      update_time: new Date().getTime(),
    };

    console.log('formValue ', formValue);

    return formValue;
  }

  saveConfiguredData(): any {
    const rawData = this.getConfiguredData();
    console.log('rawData ', rawData);

    // Send the form data back to the parent to process.
    this.dialogRef.close({event: 'Edit Profile', data: rawData});

    this.stepOneFormGroup.reset();
    this.stepTwoFormGroup.reset();
    this.stepThreeFormGroup.reset();
  }
}
