import { Component, HostListener, Inject, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss'],
})
export class ActionDialogComponent implements OnInit {

  dialogTitle: string = '';
  status: any[] = ['Active', 'Inactive'];
  customTypeDropDown: any[] = ['Custom', 'Built-In'];
  shortUrlForm: FormGroup = new FormGroup({});
  error: string = '';
  local_data: any;
  originalUrlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  exactlySixCharsRegExp = /^[a-zA-Z]{9}$/g;

  // Close the dialog using 'Esc'key
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
  
  constructor(
    public dialogRef: MatDialogRef<ActionDialogComponent>,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    // This data is from the parent component. Usually a data grid row.
    this.local_data = {...data};
    console.log('data in action dialog: ', JSON.stringify(this.local_data));

    if(this.local_data.action === 'Add') {
      this.dialogTitle = 'Add';
    } else {
      this.dialogTitle = 'Edit';
    }
  }

  ngOnInit(): void {
    this.shortUrlForm = this._formBuilder.group({
      custom_type: ['', [Validators.required]],
      original_url: ['', [Validators.required, Validators.pattern(this.originalUrlRegExp)]],
      short_url: ['', [Validators.pattern(this.exactlySixCharsRegExp)]],
      status: ['', [Validators.required]],
    });

    this.handleFormChanges();

    if(this.local_data.action === 'Edit') {
      //Using this logic we can patch the specific value in frequency dropdown
      let customTypeIndex = -1;
      var customTypeValue = this.local_data['custom_type'];
      var frequencyTypeObj = this.customTypeDropDown.find((item, index) => {
        if(item === customTypeValue){
          customTypeIndex = index;
          return index;
        }
      });

      //In UPDATE case user can only change the Status of the url
      this.shortUrlForm.get('original_url')?.disable();
      this.shortUrlForm.get('short_url')?.disable();
      this.shortUrlForm.get('custom_type')?.disable();

      this.shortUrlForm.patchValue({
        custom_type: this.customTypeDropDown[customTypeIndex],
        original_url: this.local_data['url'],
        short_url: this.local_data['shortUrl'],
        status: this.local_data['status'],
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  handleFormChanges() {
    this.shortUrlForm.get('custom_type')?.valueChanges.subscribe((value) => {
      // console.log('value: ', value, this.local_data.action);

      if(this.local_data.action === 'Add') {
        if(value === 'Custom') {
          this.shortUrlForm.get('short_url')?.enable();
        } else {
          this.shortUrlForm.get('short_url')?.disable();
          this.shortUrlForm.get('short_url')?.clearValidators();
          this.shortUrlForm.get('short_url')?.setValue('');
        }
      }

      // Note:-
      // Always use “updateValueAndValidity()” method after updating (either Add or Remove)
      // validators. Because all your changes related to control will be reflected only if
      // you put this statement i.e. updateValueAndValidity().
    });
  }

  saveShortUrl() { 
    // stop here if form is invalid
    if (this.shortUrlForm.invalid) {
      this.error = 'The form is invalid.';
      return;
    }

    const d = new Date();

    let payload = {
      main_url: this.shortUrlForm.controls['original_url']?.value,
      shorted_url: this.shortUrlForm.controls['short_url']?.value || '',
      status: this.shortUrlForm.controls['status']?.value,
      url_type: this.shortUrlForm.controls['custom_type']?.value,
      creator: `ObjectId(${sessionStorage.getItem('id')})`,
      url_created_date: d.toISOString(),
      location: location.origin,
      modify_time: d.toISOString()
    }

    // console.log('obj in action dialog: ', JSON.stringify(payload));
    // Send the form data back to the parent to process.
    this.dialogRef.close({event: this.local_data.action, data: payload});

    this.shortUrlForm.reset();
  }

}
