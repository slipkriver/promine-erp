import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FtpfilesService } from 'src/app/services/ftpfiles.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { FormValidarPsicoComponent } from '../../componentes/form-validar-psico/form-validar-psico.component';

@Component({
  selector: 'app-principal-psicologia',
  templateUrl: './principal-psicologia.page.html',
  styleUrls: ['./principal-psicologia.page.scss'],
})
export class PrincipalPsicologiaPage implements OnInit {

  estado
  listaTareas = []
  aspirantesBuscar = []


  constructor(
    private actionSheetCtr: ActionSheetController,
    private dataService: DataService,
    public modalController: ModalController,
    private servicioFtp: FtpfilesService
  ) { }

  ngOnInit() {

    this.dataService.getAspiranteLData("estado").subscribe(lista => {
      //this.estados = lista;
      this.estado = 0;
      //console.log(this.estados[10]);
    });

  }

  ionViewDidEnter() {
    this.listarAspirantes({ detail: { value: 0 } })
    //console.log(this.aspirantesNuevo)

    /*setTimeout(() => {
      this.opcionesTarea(this.listaTareas[0])
      setTimeout(() => {
        this.abrirFormpsico(this.dataService.aspirante)
      }, 1000);
    }, 3000);*/

    //this.validado = this.aspirante.atv_verificado
  }

  listarAspirantes(event) {

    this.dataService.mostrarLoading()

    this.listaTareas = []
    const id = event.detail.value
    this.estado = id
    console.log( id, parseInt(id))
    this.dataService.listadoPorDepartamento('psico',id).subscribe(res => {
      this.listaTareas = res['aspirantes']
      //console.log(res)
      this.dataService.cerrarLoading()
    })

  }

  async opcionesTarea(aspirante) {

    //this.dataService.mostrarLoading()

    this.dataService.getAspiranteRole(aspirante['asp_cedula'], 'psico').subscribe(res => {

      this.dataService.aspirante = res['aspirante']
      //console.log(res)
      aspirante = res['aspirante']
      //this.dataService.cerrarLoading()

    })

    //var strTitulo = aspirante.asp_cedula + '::' 
    var strTitulo = aspirante.asp_nombre
    const opciones = await this.actionSheetCtr.create({
      header: strTitulo,
      cssClass: '',
      buttons: [
        {
          text: 'Verificar pruebas psicosometricas',
          icon: 'checkmark-circle',
          handler: async () => {
            setTimeout(() => {

              this.abrirFormpsico(aspirante)

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

  setEstado(evento){
    // console.log(evento)
    //this.estado = evento.detail.value
    this.listarAspirantes(evento)
  }


  async abrirFormpsico(aspirante) {

    const objAspirante = JSON.parse(JSON.stringify(aspirante))

    const modal = await this.modalController.create({
      component: FormValidarPsicoComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        aspirante: objAspirante,
        rol: 'psico',
        objModal: this.modalController
      }
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    if (!data || data == undefined || data.role == "cancelar") {
      return;
    }

    // if (data.length>0) {
    data.aspirante.task = "actualizar"

    this.dataService.verifyPsicologia(data.aspirante).subscribe(res => {

      if (res['success'] == true && data.ficha != null) {
        this.servicioFtp.uploadFile(data.ficha).subscribe( res2 => {
          res = res2
          this.dataService.cerrarLoading()
        })

      }

      console.log(res)

    })

    // }
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
