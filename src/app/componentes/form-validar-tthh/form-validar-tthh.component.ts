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
  validado = false

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {

    // setTimeout(() => {
    //   console.log(this.aspirante)
    // }, 1000);

  }

  cambiarCheckbox(campo, event) {
    //console.log(campo,event.detail.checked)
    this.aspirante[campo] = event.detail.checked

    if (this.aspirante.atv_plegales == true && this.aspirante.atv_pfiscalia == true
      && this.aspirante.atv_ppenales == true && this.aspirante.atv_plaborales == true) {
      this.validado = this.aspirante.atv_verificado = true
      console.log(this.aspirante)
    } else {
      this.validado = this.aspirante.atv_verificado = false

    }

  }

  cambiarToggle(evento) {
    this.aspirante.atv_verificado = evento.detail.checked
  }

  cerrarModal() {
    console.log(this.aspirante)
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      // 'data': {}
    });
  }

  guardarCambios() {
    var validado = false
    if (this.aspirante.atv_plegales && this.aspirante.atv_pfiscalia && this.aspirante.atv_ppenales && this.aspirante.atv_plaborales) {
      validado = true
    }
    this.modalController.dismiss({
      aspirante: this.aspirante,
      validado
    });
  }
}
