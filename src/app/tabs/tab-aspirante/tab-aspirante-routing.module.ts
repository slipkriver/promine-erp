import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAspirantePage } from './tab-aspirante.page';
import { AspiranteMedicoPage } from '../../pages/aspirante-medico/aspirante-medico.page';
import { AspiranteMedicoPageModule } from '../../pages/aspirante-medico/aspirante-medico.module';

const routes: Routes = [
  {
    path: '',
    component: TabAspirantePage,
    children: [
      {
        path:'aspirante-home',
        loadChildren: () => import('../../pages/aspirante-home/aspirante-home.module').then( m => m.AspiranteHomePageModule )
      },
      {
        path:'aspirante-new',
        loadChildren: () => import('../../pages/aspirante-new/aspirante-new.module').then( m => m.AspiranteNewPageModule )
      },
      {
        path:'aspirante-psicologia',
        loadChildren: () => import('../../pages/aspirante-psicologia/aspirante-psicologia.module').then( m => m.AspirantePsicologiaPageModule )
      },
      {
        path:'aspirante-medico',
        loadChildren: () => import('../../pages/aspirante-medico/aspirante-medico.module').then( m => m.AspiranteMedicoPageModule )
      },
      {
        path: 'aspirante-social',
        loadChildren: () => import('../../pages/aspirante-social/aspirante-social.module').then( m => m.AspiranteSocialPageModule)
      },
      {
        path: 'aspirante-seguridad',
        loadChildren: () => import('../../pages/aspirante-seguridad/aspirante-seguridad.module').then( m => m.AspiranteSeguridadPageModule)
      },
      {
        path: '',
        redirectTo: 'aspirante-home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAspirantePageRoutingModule {}
