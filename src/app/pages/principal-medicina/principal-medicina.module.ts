import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalMedicinaPageRoutingModule } from './principal-medicina-routing.module';

import { PrincipalMedicinaPage } from './principal-medicina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalMedicinaPageRoutingModule
  ],
  declarations: [PrincipalMedicinaPage]
})
export class PrincipalMedicinaPageModule {}
