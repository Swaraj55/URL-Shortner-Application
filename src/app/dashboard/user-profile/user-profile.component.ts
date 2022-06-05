import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

  userImageForm: FormGroup = new FormGroup({});

  @ViewChild('userImage', {static: true}) userImage: ElementRef;
  @ViewChild('userLogo', {static: true}) userLogoInput: ElementRef;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.userImageForm = this.fb.group({
      userLogo: ['']
    })
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
}
