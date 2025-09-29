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
];
