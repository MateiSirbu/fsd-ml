import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dessert-edit',
  templateUrl: './dessert-edit.component.html',
  styleUrls: ['./dessert-edit.component.scss']
})
export class DessertEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DessertEditComponent>,
    @Inject(MAT_DIALOG_DATA) public form: FormGroup
  ) { }

  ngOnInit(): void { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
