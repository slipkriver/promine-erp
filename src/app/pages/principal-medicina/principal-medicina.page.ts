import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormValidarMediComponent } from '../../componentes/form-validar-medi/form-validar-medi.component';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { FtpfilesService } from 'src/app/services/ftpfiles.service';

@Component({
  selector: 'app-principal-medicina',
  templateUrl: './principal-medicina.page.html',
  styleUrls: ['./principal-medicina.page.scss'],
})

export class PrincipalMedicinaPage implements OnInit {


  aspirantesBuscar = []

  estados = []
  estado

  listaTareas = []

  constructor(
    private dataService: DataService,
    private actionSheetCtr: ActionSheetController,
    private modalController: ModalController,
        private servicioFtp: FtpfilesService
  ) { }


  ngOnInit() {

    // this.dataService.getAspiranteLData("estado").subscribe(lista => {
    //   this.estados = lista;
    //   this.estado = lista[6];
    //   console.log(this.estado);
    // });

  }


  ionViewDidEnter() {
    this.listarAspirantes({ detail: { value: 0 } })
    //console.log(this.aspirantesNuevo)

    /*this.listamenu = [
      { text: '<i class="icon ion-gear-a"></i> Ver ficha de ingreso del aspirante' },
      { text: '<i class="icon ion-cube"></i> Cancelar' }
    ];*/

    setTimeout(() => {

      //this.opcionesTarea(this.listaTareas[0])

    }, 2000);
  }

  setEstado(evento){
    // console.log(evento)
    //this.estado = evento.detail.value
    this.listarAspirantes(evento)
  }
  
  listarAspirantes(event) {

    this.dataService.mostrarLoading()

    this.listaTareas = []
    const id = event.detail.value
    this.estado = this.estados[id]
    //console.log(event, id, parseInt(id))
    this.dataService.listadoPorDepartamento('medi',id).subscribe(res => {
      //console.log(res)
      res['aspirantes'].forEach(element => {
        if (element.asp_estado == 'NO ADMITIDO') {
          element.asp_colorestado = "danger"
        } else if (element.asp_estado == 'EXAMENES') {
          element.asp_colorestado = "success"
        } else {
          element.asp_colorestado = "primary"
        }
      });
      this.listaTareas = res['aspirantes']

      this.dataService.cerrarLoading()
    })

  }

  async opcionesTarea(aspirante) {

    this.dataService.getAspiranteRole(aspirante['asp_cedula'], 'medi').subscribe(res => {

      this.dataService.aspirante = res['aspirante']
      console.log(res)
      aspirante = res['aspirante']

    })

    //var strTitulo = aspirante.asp_cedula + '::' 
    var strTitulo = aspirante.asp_nombre
    const opciones = await this.actionSheetCtr.create({
      header: strTitulo,
      cssClass: '',
      buttons: [
        {
          text: 'Certificado de Aptitud',
          icon: 'checkmark-circle',
          handler: async () => {
            setTimeout(() => {

              this.abrirFormmedi(aspirante)

            }, 1000);
            //console.log(aspirante);
          },
        },
        {
          text: 'Ver informacion del apirante ',
          icon: 'information-circle-outline',
          handler: () => {

            this.dataService.getAspirante(aspirante['asp_cedula']).subscribe(res => {
              //console.log(res)
              this.dataService.aspirante = res['result'][0];
              //this.router.navigate(['/inicio/tab-aspirante/aspirante-new/' + aspirante['asp_cedula']])

            })
            //console.log('/pages/aspirante-new/' + aspirante['asp_cedula']);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await opciones.present();

    const { role } = await opciones.onDidDismiss();
    //console.log('onDidDismiss resolved with role', role);

  }


  async abrirFormmedi(aspirante) {

    const objAspirante = JSON.parse(JSON.stringify(aspirante))

    const modal = await this.modalController.create({
      component: FormValidarMediComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        aspirante: objAspirante,
        rol: 'medi',
        objModal: this.modalController
      }
    });

    await modal.present();

    //const { data } = await modal.onDidDismiss();
    const { data } = await modal.onWillDismiss();
    //console.log(data)

    if (!data || data == undefined || data.role == "cancelar") {
      return;
    }

    data.aspirante.asp_estado = "APROBADO"

    console.log(data.aspirante)

    this.dataService.verifyMedicina(data.aspirante).subscribe(res => {

      if (res['success'] == true && data.ficha != null) {
        this.servicioFtp.uploadFile(data.ficha).subscribe( res2 => {
          res = res2
        })

      }

      console.log(res)

    })

  }


  
  buscarAspirante(event) {

    if (event.detail.value.length < 3) return

    this.aspirantesBuscar = []

    this.dataService.getListanuevos(event.detail.value).subscribe(res => {
      //console.log(res['result'])
      if (res['result'] && res['result'].length > 0) {
        this.aspirantesBuscar = res['result']
      }
    })

  }

}
