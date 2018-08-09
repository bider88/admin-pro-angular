import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';

import { IsAuthenticatedGuard } from './services/service.index';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [ IsAuthenticatedGuard ] },
    { path: 'register', component: RegisterComponent, canActivate: [ IsAuthenticatedGuard ] },
    { path: '**', component: NopagefoundComponent },
];

// export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );
export const APP_ROUTES = RouterModule.forRoot( routes );
