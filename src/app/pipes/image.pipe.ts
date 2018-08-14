import { environment } from './../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/service.index';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  constructor(
    private _userService: UserService
  ) {}

  transform(img: string, type: string = 'user'): any {

    let token = '';

    if ( this._userService.isLoggedIn() ) {
      token = this._userService.token;
    }

    let url = environment.apiUrl + '';

    if ( !img ) {
      return url + '/image/user/noimage?token=' + token;
    }

    if ( img.startsWith('https') ) {
      return img;
    }

    switch ( type )  {
      case 'user':
        url += '/user/' + img + '?token=' + token;
      break;
      case 'doctor':
        url += '/doctor/' + img + '?token=' + token;
      break;
      case 'hospital':
        url += '/hospital/' + img + '?token=' + token;
      break;
      default:
        console.log('tipo de imagen no existe. (user, doctor, hospita)');
        url += '/image/user/noimage?token=' + token;
    }
    return url;
  }

}
