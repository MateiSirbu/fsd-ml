import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileInput, FileInputComponent } from 'ngx-material-file-input';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public imgURL: any;

  constructor(private userService: UserService, private router: Router) {
    if (!this.userService.isLoggedIn())
      this.router.navigate(['/login'])
  }

  ngOnInit(): void { }

  preview(fileInputComponent: FileInputComponent) {
    if (fileInputComponent.empty)
      return;

    let file = fileInputComponent.value.files[0]
    let mimeType = file.type;

    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported.");
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
