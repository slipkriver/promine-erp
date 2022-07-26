import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-validar-medi',
  templateUrl: './form-validar-medi.component.html',
  styleUrls: ['./form-validar-medi.component.scss'],
})

export class FormValidarMediComponent implements OnInit {

  @Input("aspirante") aspirante;
  @Input("rol") rol;
  @Input("objmodal") modal;

  validado = false
  valoracion = []
  evaluacion = []
  condicion = []

  fechaEmision: Date = new Date();

  mdFechaEmision = false

  constructor(
    private http: HttpClient,
    private alertController: AlertController,

  ) { }

  ngOnInit() {

    if (this.rol == 'medi') {
      //this.valoracion = 
      this.getAspiranteLData('valoracion')
      this.getAspiranteLData('evaluacion')
      this.getAspiranteLData('condicion')
      //this.getAspiranteLData('valoracion')

    }

    if (this.aspirante.amv_femision == '') {
      this.aspirante.amv_femision = this.fechaEmision
    }

    //console.log(this.aspirante)
  }

  getAspiranteLData(lista: string) {
    this.http.get("/assets/data/aspirantes/" + lista + ".json").subscribe(res => {
      this[lista] = <any>res
    })
  }

  editTextbox(evento, campo) {
    if (evento.detail.value)
      this.aspirante[campo] = evento.detail.value
  }


  setFecha(evento) {
    const fecha = evento.detail.value.toString()
    var fechaTest = new Date(fecha.substring(0, 21) + "0:00");
    this.fechaEmision = fechaTest
    this.aspirante.amv_femision = fechaTest.toUTCString().substring(0, 22)
    //this[variable] = false
    console.log(evento.detail.value, this.aspirante.amv_femision);

    //this.fechaEntrevista = new Date(evento.detail.value.toLocaleString());

  }

  abrirModalfecha(variable) {
    //console.log(variable,this[variable])
    if (this[variable] == true) {
      this[variable] = false
    } else {
      this[variable] = true
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Desea guardar los cambios realizados en la solicitud del aspirante?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('#Cancelado');
          }
        },
        {
          text: 'CONFIRMAR',
          role: 'confirm',
          handler: () => {
            // setTimeout(() => {
              //console.log('Alert GUARDAR');
              this.finalizarCambios('')
            // }, 1000);
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //console.log(role + " Clic!!")
    if (role == "confirm") {
      //this.finalizarCambios()
    }
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  finalizarCambios(event) {
    var validado = true
    // '../psicologia/0705150803.xlsx'.replace('..','https://getssoma.com/servicios')
    const fecha: Date = new Date()
    const femision = this.fechaEmision.toISOString().substring(0, 19).replace('T', ' ')
    //this.aspirante.amv_femision = this.fechaEmision.toISOString().substring(0, 19).replace('T', ' ')

    this.aspirante.amv_verificado = "true"
    this.aspirante.amv_femision = femision
    this.aspirante.asp_estado = "APROBADO"

    //console.log(this.aspirante)
    // return

    this.modal.dismiss({
      aspirante: this.aspirante
    });

  }


}
