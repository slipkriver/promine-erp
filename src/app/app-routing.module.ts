import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = 
[
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'tab-inicio',
    loadChildren: () => import('./tabs/tab-inicio/tab-inicio.module').then(m => m.TabInicioPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'principal-th',
    loadChildren: () => import('./pages/principal-th/principal-th.module').then( m => m.PrincipalThPageModule)
  },
  {
    path: 'principal-psicologia',
    loadChildren: () => import('./pages/principal-psicologia/principal-psicologia.module').then( m => m.PrincipalPsicologiaPageModule)
  },
  {
    path: 'principal-medicina',
    loadChildren: () => import('./pages/principal-medicina/principal-medicina.module').then( m => m.PrincipalMedicinaPageModule)
  },
  {
    path: 'principal-social',
    loadChildren: () => import('./pages/principal-social/principal-social.module').then( m => m.PrincipalSocialPageModule)
  },
  {
    path: 'principal-seguridad',
    loadChildren: () => import('./pages/principal-seguridad/principal-seguridad.module').then( m => m.PrincipalSeguridadPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
