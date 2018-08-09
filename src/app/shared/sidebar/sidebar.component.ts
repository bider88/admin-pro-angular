import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menu: any;

  constructor(
    public sideService: SidebarService,
    private _userService: UserService
  ) { }

  ngOnInit() {
  }

  logout() {
    this._userService.logout();
  }

}
