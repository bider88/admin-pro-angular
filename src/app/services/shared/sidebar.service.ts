import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Progress bar', url: '/progress' },
        { title: 'Gráficas', url: '/graphics1' },
        { title: 'Promesas', url: '/promises' },
        { title: 'Rxjs', url: '/rxjs' },
      ]
    }
  ];

  constructor() { }
}
