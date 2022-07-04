import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FormValidarTthhComponent } from '../../componentes/form-validar-tthh/form-validar-tthh.component';

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

  constructor(
    private dataService: DataService,
    private actionSheetCtr: ActionSheetController,
    private router: Router,
    public modalController: ModalController

  ) { }

  ngOnInit() {

    this.dataService.getAspiranteLData("estado").subscribe(lista => {
      this.estados = lista;
      this.estado = lista[0];
      //console.log(this.estados[10]);
    });

    // setTimeout(() => {
    this.listarAspirantes({ detail: { value: 0 } })
    // }, 2000);

  }

  buscarAspirante(event) {

    if (event.detail.value.length < 3) return

    this.dataService.getListanuevos(event.detail.value).subscribe(res => {
      //console.log(res['result'])
      if (res['result'] && res['result'].length > 0) {
        this.aspirantesNuevo = res['result']
      }
    })

  }

  listarAspirantes(event) {

    this.listaTareas = []
    const id = event.detail.value
    this.estado = this.estados[id]
    //console.log(event, id, parseInt(id))
    this.dataService.listarPorEstado(id).subscribe(res => {
      this.listaTareas = res['result']
      //console.log(res)

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

    this.dataService.aspirante = aspirante;
    return aspirante

    // }, 2000);

  }

  async opcionesTarea(aspirante) {

    this.dataService.getAspirante(aspirante['asp_cedula']).subscribe(res => {
      //console.log(res['result'][0])
      // this.router.navigate(['/inicio/tab-aspirante/aspirante-new/' + aspirante['asp_cedula']])
      //console.log(res['result'][0])

      this.dataService.aspirante = this.cambiarBool(res['result'][0])
    })

    //var strTitulo = aspirante.asp_cedula + '::' 
    var strTitulo = aspirante.asp_apellidop + " " + aspirante.asp_apellidom + " " + aspirante.asp_nombres
    const opciones = await this.actionSheetCtr.create({
      header: strTitulo,
      cssClass: '',
      buttons: [
        {
          text: 'Ver ficha de ingreso ',
          icon: 'create',
          handler: () => {

            // this.dataService.getAspirante(aspirante['asp_cedula']).subscribe(res => {
            //console.log( res )
            // this.dataService.aspirante = res['result'][0];
            this.router.navigate(['/inicio/tab-aspirante/aspirante-new/' + aspirante['asp_cedula']])

            // })
            //console.log('/pages/aspirante-new/' + aspirante['asp_cedula']);
          },
        },
        {
          text: 'Verificar documentación legal',
          icon: 'checkmark-circle',
          handler: async () => {
            setTimeout(() => {

              this.abrirFormalidar()

            }, 1000);
            //console.log('Play clicked');
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
    //console.log('onDidDismiss resolved with role', role);

  }

  borrarBusqueda() {
    this.textobusqueda = ""
    this.aspirantesNuevo = []
    //console.log(this.aspirantesNuevo)
  }

  async abrirFormalidar() {
    const modal = await this.modalController.create({
      component: FormValidarTthhComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'aspirante': this.dataService.aspirante
      }
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    if (!data || data == undefined || data.role == "cancelar") {
      return;
    }
    //console.log(data);
    // if (data.length>0) {
    if (data.validado == true) {
      if (data.aspirante.atv_verificado == true)
        data.aspirante.asp_estado = this.estados[2].est_nombre
      else {
        data.aspirante.asp_estado = this.estados[3].est_nombre
      }
      data.aspirante.atv_verificado = true
    } else {
      data.aspirante.atv_verificado = false
    }
    data.aspirante.task = "actualizar"
    this.dataService.verifyTalento(data.aspirante).subscribe(res => {
      //console.log(res)
    })
    // }
  }

}
