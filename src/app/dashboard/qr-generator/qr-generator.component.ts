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

  downloadQrCode() {
    if(this.selectedShortUrlCode) {
      /*
      *The Image() constructor creates a new HTMLImageElement instance. 
      *It is functionally equivalent to document.createElement('img').
      */
      let image = new Image();
      image.src = this.selectedShortUrlCode;
      //The .onload event occurs only when an object has been loaded.
      image.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        /**
         * The CanvasRenderingContext2D is an object that is used to issue 2D drawing commands to a canvas. 
         * It is obtained by passing '2d' to the HTMLCanvasElement.getContext() method.
         */
        let context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.imageSmoothingEnabled = false;
        //Draws image to the canvas at dx, dy using the natural size of the image.
        context.drawImage(image, 0, 0);
        console.log(canvas, image)
        this.saveScreenshot(canvas);
      }
    }
  }

  saveScreenshot(canvas: any) {
    let fileName = "shareable-qr-code";
    const link = document.createElement('a');
    link.download = fileName + '.png';
    // console.log(canvas)
    canvas.toBlob(function(blob: any) {
        // console.log(blob)
        link.href = URL.createObjectURL(blob);
        link.click();
    });
  };
}
