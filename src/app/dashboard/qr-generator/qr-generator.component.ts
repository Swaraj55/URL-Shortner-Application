import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QrGeneratorService } from './qr-generator.service';
@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss']
})
export class QrGeneratorComponent implements OnInit {

  shortedURL: any[] =[];
  shorted_url = new FormControl();
  selectedShortUrlCode: string = '';

  constructor(
    private qrGeneratorService: QrGeneratorService
  ) { }

  ngOnInit(): void {
    this.generateQrCode();
    this.handleFormChanges();
  }

  generateQrCode() {
    let params = {
      creator: `${sessionStorage.getItem('id')}`,
    }
    this.qrGeneratorService.getQrCodes(params).subscribe((data: any) => {
      if(data.status === 'success') {
        let shortedURL = data.result;

        shortedURL.forEach((element: any) => {
          this.shortedURL.push(element);
        })
      }
    });
  }

  changeShortUrl(event: any) {
    // console.log(event);
    this.selectedShortUrlCode = event.url_qr_code;
  }

  handleFormChanges() {
    this.shorted_url.valueChanges.subscribe((data: any) => {
      //console.log(data);
    })
  }
}
