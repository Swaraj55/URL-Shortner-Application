import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  deleteItem: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: object
  ) { 
    this.deleteItem = data; // This data is from the parent component.
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close({event: 'Delete', payload: this.deleteItem});
  }

  onNoClick(): void {
      this.dialogRef.close();
  }


}
