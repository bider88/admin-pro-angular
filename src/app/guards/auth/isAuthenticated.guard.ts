import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate(): boolean {
    const isLoggedIn = this._userService.isLoggedIn();

    if ( !isLoggedIn ) {
      return true;
    }
    this._router.navigateByUrl('/dashboard');
    return false;
  }
}
