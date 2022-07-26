import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormValidarMediComponent } from './form-validar-medi/form-validar-medi.component';
import { FormValidarPsicoComponent } from './form-validar-psico/form-validar-psico.component';




@NgModule({
  declarations: [
    FormValidarMediComponent,
    FormValidarPsicoComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,

  ],
  entryComponents: [
    FormValidarMediComponent,
    FormValidarPsicoComponent
  ],

  exports: [
    FormValidarMediComponent,
    FormValidarPsicoComponent
  ]
})
export class ComponentsModule { }
