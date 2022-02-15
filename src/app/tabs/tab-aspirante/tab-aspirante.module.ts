import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAspirantePageRoutingModule } from './tab-aspirante-routing.module';

import { TabAspirantePage } from './tab-aspirante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAspirantePageRoutingModule
  ],
  declarations: [TabAspirantePage]
})
export class TabAspirantePageModule {}
