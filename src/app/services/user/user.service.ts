import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly API_URL: string = environment.apiUrl;
  user: User;
  token: string;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {
    this.loadUserAndToken();
  }

  loginUser( user: User, remember: boolean = false ) {
    const url = `${this.API_URL}/auth/login`;

    if ( remember ) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this._httpClient.post(url, user).pipe(
      map( ( res: any ) => {

        this.saveUser ( res.data._id, res.token, res.data );

        return true;
      })
    );
  }

  loginGoogle(token) {
    const url = `${this.API_URL}/auth/google`;

    return this._httpClient.post(url, token).pipe(
      map( ( res: any ) => {

        this.saveUser ( res.data._id, res.token, res.data );

        return true;
      })
    );
  }

  createUser( user: User ) {
    const url = `${this.API_URL}/auth/signup`;

    return this._httpClient.post(url, user).pipe(
      map( ( res: any ) => {

        localStorage.setItem( '_id', res.data._id );
        localStorage.setItem( 'token', res.token );
        localStorage.setItem( 'user', JSON.stringify( res.data ) );

        swal('Usuario creado', user.email, 'success');

        return true;
      })
    );
  }

  logout() {
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.token = null;
    this.user = null;

    this._router.navigate(['/login']);
    console.log('saliendo...');
  }

  isLoggedIn() {
    return this.token !== null;
  }

  loadUserAndToken() {
    this.user = JSON.parse( localStorage.getItem( 'user' ) );
    this.token = localStorage.getItem( 'token' );
  }

  saveUser (_id: string, token: string, user: User ) {
    localStorage.setItem( '_id', _id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'user', JSON.stringify( user ) );

    this.user = user;
    this.token = token;
  }

}
