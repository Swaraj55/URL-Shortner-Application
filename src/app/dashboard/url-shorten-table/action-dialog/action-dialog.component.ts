import { Component, HostListener, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent implements OnInit {

  dialogTitle: string = '';
  status: any[] = ['Active', 'Inactive'];
  customTypeDropDown: any[] = ['Custom', 'Built-In'];
  shortUrlForm: FormGroup = new FormGroup({});
  error: string = '';
  local_data: any;
  originalUrlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

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
    // console.log('data in action dialog: ', JSON.stringify(this.local_data));

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
      short_url: ['', [Validators.maxLength(6)]],
      status: ['', [Validators.required]],
    });

    this.handleFormChanges();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  handleFormChanges() {
    this.shortUrlForm.get('custom_type')?.valueChanges.subscribe(value => {
      if(value !== 'Custom') {
        this.shortUrlForm.get('short_url')?.disable();
        this.shortUrlForm.get('short_url')?.clearValidators();
        this.shortUrlForm.get('short_url')?.setValue('');

        // Note:-
        // Always use “updateValueAndValidity()” method after updating (either Add or Remove) 
        // validators. Because all your changes related to control will be reflected only if 
        // you put this statement i.e. updateValueAndValidity().
      }
    });
  }

  saveShortUrl() { 
    // stop here if form is invalid
    if (this.shortUrlForm.invalid) {
      this.error = 'The form is invalid.';
      return;
    }

    let payload = {
      main_url: this.shortUrlForm.value.original_url,
      shorted_url: this.shortUrlForm.value.short_url || '',
      status: this.shortUrlForm.value.status,
      url_type: this.shortUrlForm.value.custom_type,
      creator: sessionStorage.getItem('id'),
      url_created_date: Date.now(),
      modify_time: Date.now()
    }

    //console.log('obj in action dialog: ', JSON.stringify(obj));
    // Send the form data back to the parent to process.
    this.dialogRef.close({event: this.local_data.action, data: payload});

    this.shortUrlForm.reset();
  }

}
