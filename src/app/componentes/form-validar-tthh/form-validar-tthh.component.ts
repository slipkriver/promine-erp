import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AspiranteInfo } from '../../interfaces/aspirante';

@Component({
  selector: 'app-form-validar-tthh',
  templateUrl: './form-validar-tthh.component.html',
  styleUrls: ['./form-validar-tthh.component.scss'],
})
export class FormValidarTthhComponent implements OnInit {

  @Input("aspirante") aspirante;
  
  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {

    // setTimeout(() => {
      //console.log(this.aspirante.atv_plegales)
      //this.aspirante.atv_plegales
    // }, 200);
    //console.log(this.aspirante)

  }

  cambiarCheckbox(campo,event){
    //console.log(campo,event.detail.checked)
    this.aspirante[campo] = event.detail.checked
  }

  cerrarModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      // 'data': {}
    });
  }

  guardarCambios(){
    //console.log(this.aspirante)
    var validado = false
    if(this.aspirante.atv_plegales &&  this.aspirante.atv_pfiscalia && this.aspirante.atv_ppenales &&  this.aspirante.atv_plaborales){
      validado = true
    }
    this.modalController.dismiss({
      aspirante: this.aspirante,
      validado
    });
  }
}
