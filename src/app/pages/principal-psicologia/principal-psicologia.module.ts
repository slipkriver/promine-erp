import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPsicologiaPageRoutingModule } from './principal-psicologia-routing.module';

import { PrincipalPsicologiaPage } from './principal-psicologia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPsicologiaPageRoutingModule
  ],
  declarations: [PrincipalPsicologiaPage]
})
export class PrincipalPsicologiaPageModule {}
