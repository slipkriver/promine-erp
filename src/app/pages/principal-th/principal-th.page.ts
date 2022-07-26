import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FormValidarTthhComponent } from '../../componentes/form-validar-tthh/form-validar-tthh.component';
import { FormValidarPsicoComponent } from '../../componentes/form-validar-psico/form-validar-psico.component';
import { FormValidarMediComponent } from '../../componentes/form-validar-medi/form-validar-medi.component';

@Component({
  selector: 'app-principal-th',
  templateUrl: './principal-th.page.html',
  styleUrls: ['./principal-th.page.scss'],
})
export class PrincipalThPage implements OnInit {

  aspirantesNuevo = []
  estados = []
  estado

  listaTareas = []
  textobusqueda = ""

  listamenu = []

  constructor(
    private dataService: DataService,
    private actionSheetCtr: ActionSheetController,
    private router: Router,
    public modalController: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {

    this.dataService.getAspiranteLData("estado").subscribe(lista => {
      this.estados = lista;
      this.estado = lista[0];
      //console.log(this.estados[10]);
    });

    // setTimeout(() => {
    // }, 2000);

  }

  ionViewDidEnter() {
    this.listarAspirantes({ detail: { value: 0 } })
    //console.log(this.aspirantesNuevo)

    this.listamenu = [
      { text: '<i class="icon ion-gear-a"></i> Ver ficha de ingreso del aspirante' },
      { text: '<i class="icon ion-cube"></i> Cancelar' }
    ];
    //this.validado = this.aspirante.atv_verificado
  }


  buscarAspirante(event) {

    if (event.detail.value.length < 3) return

    this.aspirantesNuevo = []

    this.dataService.getListanuevos(event.detail.value).subscribe(res => {
      //console.log(res['result'])
      if (res['result'] && res['result'].length > 0) {
        this.aspirantesNuevo = res['result']
      }
    })

  }

  listarAspirantes(event) {

    this.dataService.mostrarLoading()

    this.listaTareas = []
    const id = event.detail.value
    this.estado = this.estados[id]
    //console.log(event, id, parseInt(id))
    this.dataService.listadoPorDepartamento('tthh',id).subscribe(res => {
      res['aspirantes'].forEach(element => {
        if (element.asp_estado == 'NO APROBADO') {
          element.asp_colorestado = "danger"
        } else if (element.asp_estado == 'VERIFICADO') {
          element.asp_colorestado = "success"
        } else {
          element.asp_colorestado = "primary"
        }
      });
      this.listaTareas = res['aspirantes']
      this.dataService.cerrarLoading()
      //console.log(res['aspirante'])

    })


  }

  cambiarBool(aspirante) {


    (Object.keys(aspirante) as (keyof typeof aspirante)[]).forEach((key, index) => {
      if (aspirante[key] == "true") {
        aspirante[key] = true
        // console.log(key, aspirante[key], index);
      } else if (aspirante[key] == "false") {
        aspirante[key] = false
        // console.log(key, aspirante[key], index);
      }
      // 👇️ name Tom 0, country Chile 1
    })

    //this.dataService.aspirante = aspirante;
    return aspirante

    // }, 2000);

  }

  async opcionesTarea(aspirante) {

    const asp_estado = aspirante.asp_estado

    if (asp_estado == 'INGRESADO' || asp_estado == 'VERIFICADO' || asp_estado == 'NO APROBADO') {
      this.dataService.getAspiranteRole(aspirante['asp_cedula'], 'tthh').subscribe(res => {

        this.dataService.aspirante = this.cambiarBool(res['aspirante'])
        aspirante = this.cambiarBool(res['aspirante'])
        this.opcionesTthh1(aspirante)
      })

    } else if (asp_estado == 'PSICOSOMETRIA') {
      this.dataService.getAspiranteRole(aspirante['asp_cedula'], 'psico').subscribe(res => {

        this.dataService.aspirante = this.cambiarBool(res['aspirante'])
        aspirante = this.cambiarBool(res['aspirante'])
        this.opcionesTthh2(aspirante)
      })
    } else if (asp_estado == 'APROBADO') {
      this.dataService.getAspiranteRole(aspirante['asp_cedula'], 'medi').subscribe(res => {

        this.dataService.aspirante = this.cambiarBool(res['aspirante'])
        aspirante = this.cambiarBool(res['aspirante'])
        this.opcionesTthh3(aspirante)
      })
    }
    // this.dataService.getAspirante(aspirante['asp_cedula']).subscribe(res => {
    // this.router.navigate(['/inicio/tab-aspirante/aspirante-new/' + aspirante['asp_cedula']])
    // })

    //var strTitulo = aspirante.asp_cedula + '::' 

    //console.log('onDidDismiss resolved with role');

  }

  async opcionesTthh1(aspirante) {

    var strTitulo = aspirante.asp_nombre
    const opciones = await this.actionSheetCtr.create({
      header: strTitulo,
      cssClass: '',
      buttons: [
        {
          text: 'Ver ficha de ingreso ',
          icon: 'create',
          handler: () => {

            this.dataService.getAspirante(aspirante['asp_cedula']).subscribe(res => {
              // console.log(res)
              this.dataService.aspirante = res['result'][1];
              this.router.navigate(['/inicio/tab-aspirante/aspirante-new/' + aspirante['asp_cedula']])

            })
            //console.log('/pages/aspirante-new/' + aspirante['asp_cedula']);
          },
        },
        {
          text: 'Verificar documentación legal',
          icon: 'checkmark-circle',
          handler: () => {
            this.abrirFormalidar(aspirante)
          },
        },
        {
          text: 'Detalles del proceso',
          icon: 'information-circle',
          handler: async () => {
            //console.log('Play clicked');
          },
        },
        {
          text: 'Descargar ficha en PDF',
          icon: 'cloud-download',
          handler: () => {
            console.log('Favorite clicked');
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
  }

  async opcionesTthh2(aspirante) {

    var strTitulo = aspirante.asp_nombre
    const opciones = await this.actionSheetCtr.create({
      header: strTitulo,
      cssClass: '',
      buttons: [
        {
          text: 'Ver ficha de ingreso ',
          icon: 'create',
          handler: () => {

            this.dataService.getAspirante(aspirante['asp_cedula']).subscribe(res => {
              // console.log(res)
              this.dataService.aspirante = res['result'][0];
              this.router.navigate(['/inicio/tab-aspirante/aspirante-new/' + aspirante['asp_cedula']])

            })
            //console.log('/pages/aspirante-new/' + aspirante['asp_cedula']);
          },
        },
        {
          text: 'Ver ficha de aprobacion Psicologica',
          icon: 'checkmark-circle',
          handler: () => {

            this.abrirFormpsico(aspirante)

          },
        },
        {
          text: 'Autorizar examenes ocupacionales',
          icon: 'checkmark-circle',
          handler: () => {

            this.mostrarAlerMedicina(aspirante)

          },
        },
        {
          text: 'Detalles del proceso',
          icon: 'information-circle',
          handler: async () => {
            //console.log('Play clicked');
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
  }

  async opcionesTthh3(aspirante) {

    var strTitulo = aspirante.asp_nombre
    const opciones = await this.actionSheetCtr.create({
      header: strTitulo,
      cssClass: '',
      buttons: [
        {
          text: 'Ver ficha de ingreso ',
          icon: 'create',
          handler: () => {

            this.dataService.getAspirante(aspirante['asp_cedula']).subscribe(res => {
              // console.log(res)
              this.dataService.aspirante = res['result'][0];
              this.router.navigate(['/inicio/tab-aspirante/aspirante-new/' + aspirante['asp_cedula']])

            })
            //console.log('/pages/aspirante-new/' + aspirante['asp_cedula']);
          },
        },
        {
          text: 'Ver ficha de aprobacion Medica',
          icon: 'checkmark-circle',
          handler: () => {

            this.abrirFormmedi(aspirante)

          },
        },
        {
          text: 'Autorizar entrevista Psicologia',
          icon: 'checkmark-circle',
          handler: () => {

            this.mostrarAlerPsicologia(aspirante)

          },
        },
        {
          text: 'Detalles del proceso',
          icon: 'information-circle',
          handler: async () => {
            //console.log('Play clicked');
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
  }

  borrarBusqueda() {
    this.textobusqueda = ""
    this.aspirantesNuevo = []
    //console.log(this.aspirantesNuevo)
  }


  async abrirFormalidar(aspirante) {

    const objAspirante = JSON.parse(JSON.stringify(aspirante))

    const modal = await this.modalController.create({
      component: FormValidarTthhComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        aspirante: objAspirante
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (!data || data == undefined || data.role == "cancelar") {
      modal.dismiss()
      return;
    }

    data.aspirante.atv_verificado = true

    data.aspirante.task = "actualizar"
    data.aspirante.asp_estado = "VERIFICADO"

    this.dataService.verifyTalento(data.aspirante).subscribe(res => {
      this.listaTareas.forEach((element, index) => {
        if(element.asp_cedula == data.aspirante.asp_cedula){
          this.listaTareas.splice(index,1)
          //console.log(element,index,data.aspirante,this.listaTareas)
        }
      });

      this.dataService.cerrarLoading()
    })
    // }
  }


  async abrirFormpsico(aspirante) {

    const objAspirante = JSON.parse(JSON.stringify(aspirante))

    const modal = await this.modalController.create({
      component: FormValidarPsicoComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        aspirante: objAspirante,
        rol: 'tthh'
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (!data || data == undefined || data.role == "cancelar") {
      //console.log(data);
      //objAspirante = ''
      modal.dismiss()
      return;
    }

    data.aspirante.atv_verificado = true

    data.aspirante.task = "actualizar"
    this.dataService.verifyTalento(data.aspirante).subscribe(res => {
      console.log(res)
      // this.dataService.cerrarLoading()
    })
    // }
  }

  async abrirFormmedi(aspirante) {

    const objAspirante = JSON.parse(JSON.stringify(aspirante))

    const modal = await this.modalController.create({
      component: FormValidarMediComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        aspirante: objAspirante,
        rol: 'tthh'
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (!data || data == undefined || data.role == "cancelar") {
      //console.log(data);
      //objAspirante = ''
      modal.dismiss()
      return;
    }

    data.aspirante.atv_verificado = true

    data.aspirante.task = "actualizar"
    this.dataService.verifyTalento(data.aspirante).subscribe(res => {
      console.log(res)
      // this.dataService.cerrarLoading()
    })
    // }
  }


  async mostrarAlerMedicina(aspirante) {
    const alert = await this.alertCtrl.create({
      header: 'Autorizacion de examenes ocupacionales',

      //subHeader: 'El aspirante ya se escuentra ingresado en el sistema',
      message: "<p>¿Estas seguro de autorizar al aspirante para que proceda a realizar los examenes ocupacionales?</p>" +
        "<ion-item > <ion-icon name='help-circle'  >" +
        "</ion-icon> <ion-label >Cedula: <b>" + aspirante["asp_cedula"] + "<br>" + aspirante["asp_nombre"] + "</b>" +
        "</ion-label></ion-item>" ,
      cssClass: 'alertExamenes',
      buttons: [
        {
          text: 'Cancelar',
          role:'calcel',
        },
        {
          text: 'Autorizar',
          role:'ok',
          cssClass: 'btnAlerAceptar',
          handler: () => {
            //console.log('Alert GUARDAR');
            this.autorizarExamenes(aspirante)
          }
        }
      ]
    });
    await alert.present()
  }

  async mostrarAlerPsicologia(aspirante) {
    const alert = await this.alertCtrl.create({
      header: 'Autorizacion de examenes ocupacionales',

      //subHeader: 'El aspirante ya se escuentra ingresado en el sistema',
      message: "<p>¿El aspirante cumple con todos los requisitos y puede procedera la consulta con el psicologo?</p>" +
        "<ion-item > <ion-icon name='help-circle'  >" +
        "</ion-icon> <ion-label >Cedula: <b>" + aspirante["asp_cedula"] + "<br>" + aspirante["asp_nombre"] + "</b>" +
        "</ion-label></ion-item>" ,
      cssClass: 'alertExamenes',
      buttons: [
        {
          text: 'Cancelar',
          role:'calcel',
        },
        {
          text: 'Autorizar',
          role:'ok',
          cssClass: 'btnAlerAceptar',
          handler: () => {
            //console.log('Alert GUARDAR');
            this.autorizarPsicologo(aspirante)
          }
        }
      ]
    });
    await alert.present()
  }

  autorizarExamenes(aspirante){
    //aspirante.task = "actualizar"

    const fecha: Date = new Date()
    const fexamenes  = fecha.toISOString().substring(0,11).replace('T',' ')+fecha.toTimeString().substring(0,8)
    const aspMedico = {
      amv_aspirante : aspirante.asp_cedula,
      amv_fexamenes : fexamenes,
      asp_estado : "EXAMENES",
      task :  "autorizarex"
    }

    console.log(aspMedico)
    
    this.dataService.autorizarExocupacion(aspMedico).subscribe(res => {

      this.listaTareas.forEach((element, index) => {
        if(element.asp_cedula == aspMedico.amv_aspirante){
          this.listaTareas.splice(index,1)
          //console.log(element,index,data.aspirante,this.listaTareas)
        }
      });

      console.log(res)

    })
    
  }

  autorizarPsicologo(aspirante){
    //aspirante.task = "actualizar"

    const fecha: Date = new Date()
    const fexamenes  = fecha.toISOString().substring(0,11).replace('T',' ')+fecha.toTimeString().substring(0,8)
    const aspPsico = {
      amv_aspirante : aspirante.asp_cedula,
      amv_fexamenes : fexamenes,
      asp_estado : "PSICOLOGIA",
      task :  "psicologia2"
    }

    console.log(aspPsico)
    
    this.dataService.autorizarPsicologia(aspPsico).subscribe(res => {

      this.listaTareas.forEach((element, index) => {
        if(element.asp_cedula == aspPsico.amv_aspirante){
          this.listaTareas.splice(index,1)
          //console.log(element,index,data.aspirante,this.listaTareas)
        }
      });

      console.log(res)

    })
    
  }

}
