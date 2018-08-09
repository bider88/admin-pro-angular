import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  remember: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  email: string = '';

  auth2: any;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit() {
    init_plugins();
    this.rememberEmail();
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1001739317960-4c86a4hnq1okg9qfiu6ak5q2ksqg980a.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();

      const token = googleUser.getAuthResponse().id_token;

      this._userService.loginGoogle( { token } ).subscribe(
        res => {
          if (res) { window.location.href = '/dashboard'; }
        },
        err => console.log(err)
      );
    });
  }

  rememberEmail() {
    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1 ) {
      this.remember = true;
    }
  }

  login(f: NgForm) {

    if ( f.valid ) {
      const user = new User(
        null,
        f.value.email,
        f.value.password
      );
      this._userService.loginUser( user, f.value.remember ).subscribe(
        res => {
          if (res) { this._router.navigateByUrl('/dashboard'); }
        },
        err => console.log(err)
      );
    }
    // this.router.navigateByUrl('/dashboard');
  }

}
