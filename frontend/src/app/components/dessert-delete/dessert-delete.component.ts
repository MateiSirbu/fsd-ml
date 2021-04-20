import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dessert-delete',
  templateUrl: './dessert-delete.component.html',
  styleUrls: ['./dessert-delete.component.scss']
})
export class DessertDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<DessertDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
