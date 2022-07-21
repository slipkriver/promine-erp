import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormValidarMediComponent } from './form-validar-medi/form-validar-medi.component';



@NgModule({
  declarations: [
    FormValidarMediComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,

  ],
  entryComponents: [
    FormValidarMediComponent
  ],

  exports: [
    FormValidarMediComponent
  ]
})
export class ComponentsModule { }
