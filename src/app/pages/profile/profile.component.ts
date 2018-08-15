import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [`
    .fill {
      width: 100%;
    }
    .avatar {
      width: 140px;
      height: 140px;
      margin: 20px auto;
    }
  `]
})
export class ProfileComponent implements OnInit {

  user: User;
  message: string = '';
  selectedFile: File = null;
  fileTemp: any;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.user = this._userService.user;
  }

  save(user: User) {
    this.user.name = user.name;

    if ( !this.user.google ) {
      this.user.email = user.email;
    }

    this._userService.updateUser(this.user).subscribe();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    if ( !this.selectedFile ) {
      this.selectedFile = null;
      return;
    }

    if ( this.selectedFile.type.indexOf('image') < 0 ) {
      this.message = 'Archivo no admitido. Las extensiones permitidas son png, jpg, jpeg y gif.';
      this.selectedFile = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL( this.selectedFile );

    reader.onloadend = () => this.fileTemp = reader.result;
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);

    this._userService.uploadImage( uploadData, 'user', this.user._id ).subscribe( () => this.cancelUpload() );
  }

  cancelUpload() {
    this.selectedFile = null;
    this.fileTemp = null;
  }

}

