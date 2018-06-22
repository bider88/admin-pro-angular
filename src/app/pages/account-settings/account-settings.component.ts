import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( 
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.colocateCheck();
  }

  changeTheme(theme, link: any) {

    this.applyCheck( link );
    this.settingsService.applyTheme(theme);

  }

  applyCheck(link: any) {
    const selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocateCheck() {
    let selectors: any = document.getElementsByClassName('selector');

    const { theme } = this.settingsService.setting;

    for (let ref of selectors) {
      if ( ref.getAttribute('data-theme') === theme ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
