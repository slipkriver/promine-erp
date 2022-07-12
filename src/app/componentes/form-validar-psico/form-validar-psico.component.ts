import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FtpfilesService } from 'src/app/services/ftpfiles.service';

@Component({
  selector: 'app-form-validar-psico',
  templateUrl: './form-validar-psico.component.html',
  styleUrls: ['./form-validar-psico.component.scss'],
})
export class FormValidarPsicoComponent implements OnInit {

  @Input("aspirante") aspirante;
  validado = false
  
  asp_edad:any = ''
  loading: boolean = false;
  file: File = null;
  filename: string = "";


  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    private servicioFtp: FtpfilesService

  ) { }

  ngOnInit() {

    //console.log(this.aspirante)
    
  }

  ionViewDidEnter() {

    if(this.aspirante==true)
      this.validado = true

    this.getEdad()
  }

  getEdad() {
    //convert date again to type Date
    const bdate = new Date(this.aspirante.asp_fecha_nacimiento);
    const timeDiff = Math.abs(Date.now() - bdate.getTime() );
    this.asp_edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    //console.log(this.asp_edad)
  }

  editTextbox(evento, campo) {
    if (evento.detail.value)
      this.aspirante[campo] = evento.detail.value
  }

  setAprobado(evento){
    // console.log(evento)
    this.aspirante.apv_aprobado = evento.detail.value
    if(evento.detail.value == 'NO'){
      this.aspirante.asp_estado = "NO APTO"
    }else{
      this.aspirante.asp_estado = "PSICOSOMETRIA"
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
            //console.log('Alert GUARDAR');
            this.finalizarCambios()
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log(role + " Clic!!")
    //this.roleMessage = `Dismissed with role: ${role}`;
  }
  
  onChange(event) {
    console.log(event.target)
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.servicioFtp.setArchivo(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response
          this.filename = event.link;

          this.loading = false; // Flag variable 
        }
      }
    );
  }
    
  finalizarCambios() {
    var validado = true

    const fecha: Date = new Date()
    const faprobado  = fecha.toISOString().substring(0,11).replace('T',' ')+fecha.toTimeString().substring(0,8)
    this.aspirante.apv_verificado = "true"
    this.aspirante.apv_faprobado = faprobado
    
    // console.log(this.aspirante)
    // return

    this.modalController.dismiss({
      aspirante: this.aspirante,
      validado
    });

  }

  cerrarModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.aspirante = ""
    this.modalController.dismiss({
      role: "cancelar"
    });
  }

}
