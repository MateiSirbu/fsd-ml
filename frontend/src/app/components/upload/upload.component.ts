import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileInput, FileInputComponent } from 'ngx-material-file-input';
import { RestRequestService } from 'src/app/services/rest-request.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public imgURL: any;
  public file: File

  constructor(
    private snackBar: MatSnackBar,
    private rest: RestRequestService
  ) { }

  ngOnInit(): void { }

  submitImage() {
    if (!this.file) {
      this.openSnackBar("No file selected.");
      return;
    }
    let formData: FormData = new FormData();
    formData.append('image', this.file, this.file.name)
    this.openSnackBar("Classifying input...")
    this.rest.post('/classify', formData, new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })).subscribe(
      data => { this.openSnackBar(`Classification complete — your digit must be ${data.pred}`) },
      error => { this.openSnackBar(error) })
  }

  preview(fileInputComponent: FileInputComponent) {
    if (fileInputComponent.empty)
      return;

    this.file = fileInputComponent.value.files[0]
    let mimeType = this.file.type;

    if (mimeType.match(/image\/*/) == null) {
      this.openSnackBar("Only images are supported.");
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['custom-snack-bar']
    });
  }
}
