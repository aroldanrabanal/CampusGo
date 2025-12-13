import { Routes } from '@angular/router';
import {InicioComponent} from "./inicio/inicio.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Inicio',
    pathMatch: 'full',
  },
  {
    path: 'Inicio',
    component: InicioComponent
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'reg',
    loadComponent: () => import('./reg/reg.page').then( m => m.RegPage)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./calendar/calendar.page').then( m => m.CalendarPage)
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./favoritos/favoritos.page').then( m => m.FavoritosPage)
  },
  {
    path: 'pasarela-pago',
    loadComponent: () => import('./pasarela-pago/pasarela-pago.page').then( m => m.PasarelaPagoPage)
  },  {
    path: 'social',
    loadComponent: () => import('./social/social.page').then( m => m.SocialPage)
  },


];
