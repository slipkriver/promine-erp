import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalMedicinaPageRoutingModule } from './principal-medicina-routing.module';

import { PrincipalMedicinaPage } from './principal-medicina.page';

import { ComponentsModule } from '../../componentes/components.module';
import { FormValidarPsicoComponent } from 'src/app/componentes/form-validar-psico/form-validar-psico.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalMedicinaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PrincipalMedicinaPage,FormValidarPsicoComponent],
  entryComponents: [FormValidarPsicoComponent],
})
export class PrincipalMedicinaPageModule {}
