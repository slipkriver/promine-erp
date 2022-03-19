import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalSeguridadPageRoutingModule } from './principal-seguridad-routing.module';

import { PrincipalSeguridadPage } from './principal-seguridad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalSeguridadPageRoutingModule
  ],
  declarations: [PrincipalSeguridadPage]
})
export class PrincipalSeguridadPageModule {}
