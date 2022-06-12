import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserProfileActionDialogComponent } from './user-profile-action-dialog/user-profile-action-dialog.component';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

  userImageForm: FormGroup = new FormGroup({});
  showAllData: any[] = [];

  @ViewChild('userImage', {static: true}) userImage: ElementRef;
  @ViewChild('userLogo', {static: true}) userLogoInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.userImageForm = this.fb.group({
      userLogo: ['']
    });

    this.getUserprofileInfo();
  }

  ngAfterViewInit(): void {
    this.userImage.nativeElement.src = '../../../assets/user-images.png';  // set the image source path
  }


  private displayImage(image: any) {
    let userImage = this.userImageForm.getRawValue().userLogo;
    
    this.userImage.nativeElement.src = image;
    this.userImageForm.patchValue({
      userLogo: image
    });
    userImage = image;
    // this.saveImage(userImage);
  }

  //Handle the ViewChild click event and click the designated file input control to force a File Browser dialog.
  public browseFiles(id: string) {
    let el1: HTMLElement = this.userLogoInput.nativeElement;
    el1.click();
  }

  processImage(event: any, image: any) {
    console.log(event);
    let inputFile = event.target.files[0];
    console.log(inputFile.name);
    if (inputFile.name.match(/.png/g)) {
      let reader = new FileReader();
      
      reader.onload = function () {
        //let dataURL = reader.result;
      };
      reader.readAsDataURL(inputFile);
      
      reader.onloadend = (e) => {
        console.log("reader..", reader.result?.toString().length);
        let byteLength = reader.result?.toString().length;
        //Limit image size to 1mb.
        if (byteLength! < 1024000) {
           this.displayImage(reader.result?.toString());
        } else {
          // this.openSnackbar(this._translateService.instant('MESSAGES.IMAGE_TOO_LARGE'));
        }
      };
    } else {
      // this.openAlert(
      //   this._translateService.instant('MESSAGES.IMAGE_WRONG_TYPE')
      // );
    }
  }

  //EDIT PROFILE
  editProfile(action: string, obj: any) {
    obj['action'] = action;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxWidth = '1200px';

    if(this.showAllData[0] !== undefined) {
      this.showAllData[0].action = 'Update';
      dialogConfig.data = this.showAllData[0];
    } else {
      dialogConfig.data = obj;
    }

    //User row data being injected into the child component.
    // Open the form dialog and pass the data from the user selected row in the data table.
    const dialogRef = this._dialog.open(UserProfileActionDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result.event === 'Edit Profile') {
        this.saveUserProfileInfo(result.data);
      }
    });
  }

  openSnackBar(message: string, action: string, cssClass: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: cssClass,
      duration: 4000,
    });
  }

  saveUserProfileInfo(data: any) { 
    console.log(data);
    data.creator = `${sessionStorage.getItem('id')}`;
    this._userProfileService.updateUserProfile(data).subscribe((data) => {
      console.log(data);
      if(data.status === 'success') {
        this.openSnackBar(data.message, '', 'mat-snack-bar-success');
      } else {
        this.openSnackBar(data.message, '', 'mat-snack-bar-danger');
      }
    }, (error) => {
      console.log(error);
    }, () => {
      this.getUserprofileInfo();
    })
  }

  getUserprofileInfo() {
    let params = {
      creator: `${sessionStorage.getItem('id')}`,
    }

    this._userProfileService.readUserProfile(params).subscribe((data) => {
      if(data.status === 'success') {
        this.showAllData.length = 0;
        this.showAllData.push(data.result[0]);
      }

      console.log(this.showAllData);
    });
  }
}
