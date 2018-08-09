import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './login.component.css' ]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  equals(str1: string, str2: string) {
    return ( group: FormGroup ) => {
      const val1 = group.controls[str1].value;
      const val2 = group.controls[str2].value;

      if ( val1 === val2 ) {
        return null;
      }

      return {
        equals: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.form = new FormGroup({
      name: new FormControl( null, Validators.required),
      email: new FormControl( null, [ Validators.required, Validators.email ] ),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      conditions: new FormControl( false )
    }, { validators: this.equals( 'password', 'password2' ) });

    this.form.setValue({
      name: 'test',
      email: 'test@mail.com',
      password: 'holahola',
      password2: 'holahola',
      conditions: true
    });
  }

  signup() {

    if ( !this.form.value.conditions ) {
      swal( 'Aviso',  'Debe aceptar términos y condiciones',  'warning' );
      return;
    }

    if ( this.form.valid ) {

      const user = new User(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password,
      );

      this._userService.createUser( user ).subscribe(
        res => {
          if (res) { this._router.navigateByUrl('/dashboard'); }
        },
        err => console.log(err)
      );
    }
  }

}
